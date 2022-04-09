import React, { useState, useEffect } from 'react';
import { getAsigsBySeccion } from '../../services/asignaciones.service';
import { getSecsByFacilitador } from '../../services/seccion.service';

import {
  Heading,
  Box,
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container,
  Icon,
  ButtonGroup,
  Flex,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react'
import { TimeIcon, CheckIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons'

import { errorToast, successToast } from '../../functions/toast';
import { SwalModal } from '../../functions/sweetAlertCommon';
import { aprobarFaseFormativa } from './../../services/estudiante.service'
import { useNavigate } from 'react-router-dom';

const FacilitadorAprobarFaseFormativa = () => {
  const [loading, setLoading] = useState(true)
  const [secciones, setSecciones] = useState([])
  const [estudiantes, setEstudiantes] = useState([])
  const [seccion, setSeccion] = useState()
  // const [asignaciones, setAsignaciones] = useState([])
  const [search, setSearch] = useState('')
  const [seleccionados, setSeleccionados] = useState([])
  const navigate = useNavigate()

  useEffect(()=> {
    const get = async ()=> {
      try {
        const secciones = await getSecsByFacilitador()
        setSecciones(secciones)

        if(secciones.length === 0){
          throw new Error('Sin secciones')
        }

        const seccion = secciones[0]
        // getAsignaciones(seccion.codigo)
        setSeccion(seccion)
        const asigs = await getAsigsBySeccion(seccion.codigo)
        const estu = asigs.reduce((prev, current) => {
          if(!prev.some(est => est.cedula === current.cedula_estudiante)){
            const students = prev
            students.push({
              nombres: current.nombres_estudiante,
              apellidos: current.apellidos_estudiante,
              cedula: current.cedula_estudiante,
              asignaciones: [current]
            })
            
            return students
          }else {
            const students = prev.map(stud => {
              if(stud.cedula === current.cedula_estudiante){
                const asigns = stud.asignaciones
                asigns.push(current)
                return {
                  ...stud,
                  asignaciones: asigns
                }
              }else {
                return stud
              }
            })

            return students
          }
        }, [])
        console.log('estu', estu)
        setEstudiantes(estu)
        // console.log(asigs)
        // setAsignaciones(asigs)
        setLoading(false)
      } catch (error) {
        errorToast({
          description: 'Algo ha salido mal'
        })
        navigate(-1)
        // setLoading(false)
      }
    }

    get()
  }, [navigate])

  const getAsignaciones = (codigo)=> {
    const [seccion] = secciones.filter(secc => secc.codigo === codigo)
    setSeccion(seccion)
    
    setLoading(true)
    getAsigsBySeccion(codigo)
    .then(asigs => {
      const estu = asigs.reduce((prev, current) => {
        if(!prev.some(est => est.cedula === current.cedula_estudiante)){
          const students = prev
          students.push({
            nombres: current.nombres_estudiante,
            apellidos: current.apellidos_estudiante,
            cedula: current.cedula_estudiante,
            asignaciones: [current]
          })
          
          return students
        }else {
          const students = prev.map(stud => {
            if(stud.cedula === current.cedula_estudiante){
              const asigns = stud.asignaciones
              asigns.push(current)
              return {
                ...stud,
                asignaciones: asigns
              }
            }else {
              return stud
            }
          })

          return students
        }
      }, [])
      console.log('estu', estu)
      setEstudiantes(estu)
      // setAsignaciones(asigs)
    }).finally(()=>{
      setLoading(false)
    })
  }

  const handleSelect = (cedula) => {
    const [ estudiante ] = estudiantes.concat(seleccionados).filter(student => student.cedula === cedula) 
    const newSeleccionados = seleccionados.map(selected => selected)
    const newEstudiantes = estudiantes.map(student => student)

    // si esta elegido
    if(seleccionados.some(student => student.cedula === cedula)){
      // se quita de elegidos
      const id = newSeleccionados.findIndex((student) => student.cedula === cedula)
      newSeleccionados.splice(id,  1)
      // se agrega a listado
      newEstudiantes.push(estudiante)
    } else{
      // se quita de listado
      const id = newEstudiantes.findIndex((student) => student.cedula === cedula)
      newEstudiantes.splice(id,  1)
      // se agrega a elegidos
      newSeleccionados.push(estudiante)
    }

    setSeleccionados(newSeleccionados)
    setEstudiantes(newEstudiantes)
  }

  const handleAprobarFase = ()=> {
    if(seleccionados.length === 0){
      errorToast({
        description: 'Se requieren estudiantes'
      })
      return
    }

    SwalModal.fire({
      title:'Confirmar aprobar fase formativa',
      text:'Esto no es reversible',
      confirmButtonText: 'Aprobar',
    }).then(result => {
      if(result.isConfirmed){
        const cedulas = seleccionados.map(student => {
          return student.cedula
        })
        aprobarFaseFormativa(cedulas)
        .then(()=>{
          successToast({
            title: 'Operación realizada con exito'
          })
        }).catch((error)=>{
          errorToast({
            description: error.message
          })
        })
      }
    })
  }

  if(loading){
    return <p>loading</p>
  }

  return (
    <>
      <Heading mb={8}>Aprobar fase formativa</Heading>
      <Container>
        <ButtonGroup mb={12}>
          {seccion && secciones.length >= 0 && secciones.map((secc) => {
            return (
              <Button
                key={secc.codigo}
                onClick={()=> getAsignaciones(secc.codigo)}
                fontSize='md'
                fontWeight='bold'
                variant='unstyled'
                color='#000'
                rounded='0'
                borderBottom='3px solid'
                borderColor={seccion.codigo === secc.codigo? 'blue.500' : 'blue.50'}
                userSelect='none'
                _hover={{
                  cursor: 'pointer',
                  borderColor: 'blue.500',
                }}
                mx={5}
                px={5}
                pb={1}
              >{secc.codigo}</Button>
            )
          })}
        </ButtonGroup>

        <Stack mb={12} direction='row' spacing='24px'>
          <Box w='100%'>
            <InputGroup mb={8} maxW={300}>
              <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='gray.300' />}
              />
              <Input value={search} onChange={({currentTarget})=> setSearch(currentTarget.value)} variant='flushed' type="search" placeholder='Buscar por cedula' />
            </InputGroup>

            <Box h={200} overflow='auto'>
              <Accordion allowToggle>
                {
                  estudiantes.length >= 1 && estudiantes.map((estudiante, i) => (
                    <AccordionItem key={estudiante.cedula}>
                      <h2>
                        <Flex
                          userSelect='none'
                          cursor='pointer'
                          bg={ i % 2 === 0? 'gray.100' : 'gray.200'}
                          _hover={{
                            bg: 'blue.100'
                          }}
                          display={search.length <= 3 || estudiante.cedula.includes(search)? 'flex' : 'none'}

                          justifyContent='space-between'
                          alignItems='center'
                          textAlign='left'
                        >
                          <Box width='100%' onClick={()=> handleSelect(estudiante.cedula)}>
                            <Text display='inline-block'>{estudiante.nombres} {estudiante.apellidos} - {estudiante.cedula}</Text>
                          </Box>
                          <AccordionButton title='ver asignaciones' width='auto'>
                            <AccordionIcon />
                          </AccordionButton>
                        </Flex>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Text mb={4}>Asignaciones</Text>
                        {
                          estudiante.asignaciones.map(asignacion => (
                            <Box key={asignacion.id} title={asignacion.estado}>
                              {
                                asignacion.estado === 'por entregar' && 
                                <Icon as={TimeIcon} mr={8} />
                              }
                              {
                                asignacion.estado === 'entregado' && 
                                <Icon as={TimeIcon} mr={8} />
                              }
                              {
                                asignacion.estado === 'aprobado' && 
                                <Icon as={CheckIcon} mr={8} />
                              }
                              {
                                asignacion.estado === 'reprobado' && 
                                <Icon as={CloseIcon} mr={8} />
                              }
                              <Text display='inline-block'>
                                {asignacion.nombre}
                              </Text>
                            </Box>
                          ))
                        }
                      </AccordionPanel>
                    </AccordionItem>
                  ))
                }
              </Accordion>
            </Box>
          </Box>
          <Box w='100%'>
            <Heading mb={12} textAlign='center' size='sm'>Seleccionados</Heading>
            <Box h={200} overflow='auto'>
              <Accordion allowToggle>
                {
                  seleccionados.map((estudiante, i) => (
                    <AccordionItem key={estudiante.cedula}>
                      <h2>
                        <Flex
                          userSelect='none'
                          cursor='pointer'
                          bg={ i % 2 === 0? 'green.100' : 'green.200'}
                          _hover={{
                            bg: 'red.100'
                          }}
                          display={search.length <= 3 || estudiante.cedula.includes(search)? 'flex' : 'none'}

                          justifyContent='space-between'
                          alignItems='center'
                          textAlign='left'
                        >
                          <Box width='100%' onClick={()=> handleSelect(estudiante.cedula)}>
                            <Text display='inline-block'>{estudiante.nombres} {estudiante.apellidos} - {estudiante.cedula}</Text>
                          </Box>
                          <AccordionButton title='ver asignaciones' width='auto'>
                            <AccordionIcon />
                          </AccordionButton>
                        </Flex>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Text mb={4}>Asignaciones</Text>
                        {
                          estudiante.asignaciones.map(asignacion => (
                            <Box key={asignacion.id} title={asignacion.estado}>
                              {
                                asignacion.estado === 'por entregar' && 
                                <Icon as={TimeIcon} mr={8} />
                              }
                              {
                                asignacion.estado === 'entregado' && 
                                <Icon as={TimeIcon} mr={8} />
                              }
                              {
                                asignacion.estado === 'aprobado' && 
                                <Icon as={CheckIcon} mr={8} />
                              }
                              {
                                asignacion.estado === 'reprobado' && 
                                <Icon as={CloseIcon} mr={8} />
                              }
                              <Text display='inline-block'>
                                {asignacion.nombre}
                              </Text>
                            </Box>
                          ))
                        }
                      </AccordionPanel>
                    </AccordionItem>
                  ))
                }
              </Accordion>
            </Box>
          </Box>
        </Stack>
        
        <Button onClick={handleAprobarFase}>Aprobar</Button>
      </Container>
    </>
  );
}

export default FacilitadorAprobarFaseFormativa;
