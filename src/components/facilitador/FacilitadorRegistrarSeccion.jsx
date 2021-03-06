import React, { useState, useEffect } from 'react';
import { Formik, Form, useFormikContext  } from 'formik';
import Field from '../shared/CustomFieldFormik'
import FormControl from '../shared/FormControl'
import { registerSeccion } from '../../services/seccion.service';
import {
  Heading,
  FormLabel,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useRadio,
  useRadioGroup,
  HStack,
  Text,
  Checkbox,
  useCheckboxGroup,
  Container,
  Spinner
} from '@chakra-ui/react'

import { SearchIcon } from '@chakra-ui/icons'
import { errorToast, successToast } from '../../functions/toast';
import { getHorarios } from '../../services/horario.service';
import { getEstudiantesSinSeccion } from '../../services/estudiante.service';
import { useAuth } from '../../contexts/AuthContext'
import { getFacilitadores } from '../../services/facilitador.service';
import { useNavigate } from 'react-router-dom';
import { SwalModal } from '../../functions/sweetAlertCommon';

const FacilitadorRegistrarSeccion = () => {
  const [loading, setLoading] = useState(true)
  const [seleccionados, setSeleccionados] = useState([])
  const [horarios, setHorarios] = useState()
  const [estudiantes, setEstudiantes] = useState()
  const [facilitadores, setFacilitadores] = useState()
  const [search, setSearch] = useState('')
  const { getRootProps, getRadioProps } = useRadioGroup({ name: 'horario' })
  const group = getRootProps()
  const { value: facilitadoresSeleccionados, getCheckboxProps } = useCheckboxGroup()
  const { usuario } = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    const getInfo = async ()=> {
      try {
        const horarios = await getHorarios()
        const estudiantes = await getEstudiantesSinSeccion()
        const facilitadores = await getFacilitadores()
        setHorarios(horarios.map(horario => {
          const { codigo, aula, lunes, martes, miercoles, jueves, viernes } = horario
          return {
            codigo, aula, lunes, martes, miercoles, jueves, viernes
          }
        }))
        setEstudiantes(estudiantes)
        setFacilitadores(facilitadores)
        setLoading(false)
      } catch (error) {
        errorToast({
          description: error.message
        })
      }
    }

    getInfo()
  }, [usuario])

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

  const handleSave = (values) => {
    if(seleccionados.length === 0){
      errorToast({
        description: 'No se puede registrar sin estudiantes'
      })
      return
    }
    if(facilitadoresSeleccionados.length === 0 && usuario.rol_name !== 'facilitador'){
      errorToast({
        description: 'No se puede registrar sin facilitadores'
      })
      return
    }
    SwalModal.fire({
      title:'Confirmar registro',
      text:'Esto no es reversible',
      confirmButtonText: 'Crear secci??n',
    }).then(result => {
      if(result.isConfirmed){
        setLoading(true)
        const estudiantesID = seleccionados.map(estudiante => estudiante.id)
        const data = {...values, estudiantes: estudiantesID}
        if(usuario.rol_name !== 'facilitador'){
          data.facilitadores = facilitadoresSeleccionados
        }
        console.log(data)
    
        registerSeccion(data)
        .then(()=> {
          successToast({
            title: `Seccion ${values.codigo} creada`,
          })
          navigate('/profesor/seccion')
        }).catch(error =>{
          errorToast({
            description: error.message,
          })
          setLoading(false)
        })
      }
    })
  }

  if(!horarios || !estudiantes || !facilitadores){
    return <Spinner />
  }

  return (
    <Container>
      <Heading mb={8}>Registrar seccion</Heading>
      <Formik
        initialValues={{
          codigo: '',
          nombre: '',
          horario: ''
        }}
        validate={(values)=> {
          let errors = {}

          if(!values.codigo){
            errors.codigo = 'Esto es requerido'
          }
          if(!values.nombre){
            errors.nombre = 'Esto es requerido'
          }
          if(!values.horario){
            errors.horario = 'Esto es requerido'
          }

          return errors
        }}
        onSubmit={handleSave}
      >
        <Form>
          <FormControl errorprop='codigo'>
            <FormLabel htmlFor=''>Codigo</FormLabel>
            <Field name='codigo' type='text' />
          </FormControl>
          <FormControl errorprop='nombre'>
            <FormLabel htmlFor=''>Nombre</FormLabel>
            <Field name='nombre' type='text' />
          </FormControl>
          {
            usuario.rol_name !== 'facilitador' &&
            <FormControl>
              <FormLabel>facilitadores</FormLabel>
              <Stack spacing={5} direction='row'>
                {
                  facilitadores.map(facilitador => {
                    const checkbox = getCheckboxProps({ value: facilitador.id })
                    return (
                      <Checkbox key={facilitador.id} {...checkbox}>
                        {facilitador.nombres} {facilitador.apellidos}
                      </Checkbox>
                    )
                  })
                }
              </Stack>
            </FormControl>
          }
          <FormControl overflow='hidden' errorprop='horario'>
            <FormLabel htmlFor='horario'>Horario</FormLabel>
            <HStack pb={5} w='100%' overflow='auto' {...group} alignItems='start'>
              {horarios.map((horario) => {
                const radio = getRadioProps({ value: horario.codigo })
                return (
                  <RadioCard key={horario.codigo} {...radio}>
                    <Box>
                      {
                        Object.entries(horario).map(dia => (
                          <Text 
                            display={dia[1]? 'block': 'none'}
                            whiteSpace='nowrap'
                            fontSize='sm' 
                            key={dia[0]}
                          >
                            {dia[0]} : {dia[1]}
                          </Text>
                        ))
                      }
                    </Box>
                  </RadioCard>
                )
              })}
            </HStack>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='tutor'>Estudiantes</FormLabel>
            <Stack direction={['column', 'row']} spacing='24px'>
              <Box w='100%'>
                <InputGroup mb={8} maxW={300}>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                  />
                  <Input value={search} onChange={({currentTarget})=> setSearch(currentTarget.value)} variant='flushed' type="search" placeholder='Buscar por cedula' />
                </InputGroup>

                <Box h={200} overflow='auto'>
                  {
                    estudiantes.map((estudiante, i)=> (
                      <Stack
                        userSelect='none'
                        cursor='pointer'
                        bg={ i % 2 === 0? 'gray.100' : 'gray.200'}
                        padding={2}
                        _hover={{
                          bg: 'blue.100'
                        }}
                        display={search.length <= 3 || estudiante.cedula.includes(search)? 'flex' : 'none'}
                        spacing={2}
                        direction='row'
                        onClick={()=> handleSelect(estudiante.cedula)}
                        key={i}
                      >
                        <p>{estudiante.cedula}</p>
                        <p> - </p>
                        <p>{estudiante.nombres} {estudiante.apellidos}</p>
                      </Stack>
                    ))
                  }
                </Box>
              </Box>
              <Box w='100%'>
                <Heading mb={12} textAlign='center' size='sm' >Seleccionados</Heading>
                <Box h={200} overflow='auto'>
                  {
                    seleccionados.map((estudiante, i)=> (
                      <Stack 
                        userSelect='none'
                        cursor='pointer'
                        bg={ i % 2 === 0? 'green.100' : 'green.200'}
                        padding={2}
                        _hover={{
                          bg: 'red.100'
                        }}
                        spacing={2}
                        direction='row'
                        onClick={()=> handleSelect(estudiante.cedula)}
                        key={i}
                      >
                        <p>{estudiante.cedula}</p>
                        <p> - </p>
                        <p>{estudiante.nombres} {estudiante.apellidos}</p>
                      </Stack>
                    ))
                  }
                </Box>
              </Box>
            </Stack>
          </FormControl>

          <Button disabled={loading} w='100%' size='lg' type='submit'>Registrar</Button>
        </Form>
      </Formik>
    </Container>
  );
}

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const { setFieldValue } = useFormikContext()
  const input = getInputProps()
  const checkbox = getCheckboxProps()

  React.useEffect(()=>{
    if(input.checked){
      setFieldValue(input.name, input.value)
    }
  }, [input.checked, input.name, input.value, setFieldValue])

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        userSelect='none'
        _checked={{
          bg: 'blue.500',
          color: 'white',
          borderColor: 'blue.500',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}
 
export default FacilitadorRegistrarSeccion;