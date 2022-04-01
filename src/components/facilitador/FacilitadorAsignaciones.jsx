import React, { useState, useEffect, useRef } from 'react';
import { getAsigsBySeccion, activarAsignacion, aprobarAsignacion, reprobarAsignacion } from '../../services/asignaciones.service';
import { getSecsByFacilitador } from '../../services/seccion.service';

import {
  Heading,
  useRadioGroup,
  Box,
  Text,
  HStack,
  useRadio,
  Button,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container,
  Link,
  Icon,
  ButtonGroup
} from '@chakra-ui/react'
import { UnlockIcon, TimeIcon, CheckIcon, ExternalLinkIcon, CalendarIcon, CloseIcon } from '@chakra-ui/icons'

import { errorToast, successToast } from '../../functions/toast';
import ConfirmModal from '../shared/ConfirmModal';

const FacilitadorAsignaciones = () => {
  const [loading, setLoading] = useState(true)
  const [secciones, setSecciones] = useState([])
  const [seccion, setSeccion] = useState()
  const [asignaciones, setAsignaciones] = useState([])
  const { isOpen: isOpenM1, onOpen: onOpenM1, onClose: onCloseM1 } = useDisclosure()
  const { isOpen: isOpenM2, onOpen: onOpenM2, onClose: onCloseM2 } = useDisclosure()
  const { isOpen: isOpenM3, onOpen: onOpenM3, onClose: onCloseM3 } = useDisclosure()
  const modeloRef = useRef()
  const asignacionRef = useRef()


  const { getRootProps, getRadioProps, setValue } = useRadioGroup({ 
    name: 'seccion',
    onChange: (value)=> getAsignaciones(value)
  })
  const group = getRootProps()
  
  useEffect(()=> {
    const get = async ()=> {
      try {
        const secciones = await getSecsByFacilitador()
        setSecciones(secciones)

        if(secciones.length === 0){
          throw new Error("Sin secciones")
        }

        const seccion = secciones[0]
        setValue(seccion.codigo)
        setSeccion(seccion)
        const asigs = await getAsigsBySeccion(seccion.codigo)
        console.log(asigs)
        setAsignaciones(asigs)
        setLoading(false)
      } catch (error) {
        errorToast({
          description: error.message
        })
        setLoading(false)
      }
    }

    get()
  }, [setValue])

  const getAsignaciones = (codigo)=> {
    const [seccion] = secciones.filter(secc => secc.codigo === codigo)
    setSeccion(seccion)
    
    setLoading(true)
    getAsigsBySeccion(codigo)
    .then(asigs => {
      setAsignaciones(asigs)
    }).finally(()=>{
      setLoading(false)
    })
  }

  const onSaveAttemptActivar = (modelo) => {
    modeloRef.current = { modelo }
    onOpenM1()
  }
  const onSaveAttemptAprobar = (asignacionID) => {
    asignacionRef.current = { asignacionID }
    onOpenM2()
  }
  const onSaveAttemptReprobar = (asignacionID) => {
    asignacionRef.current = { asignacionID }
    onOpenM3()
  }

  const handleActivate = () =>{
    const { modelo } = modeloRef.current
    activarAsignacion(seccion.codigo, modelo)
    .then(()=>{
      successToast({
        title: 'Asignación activada'
      })
    }).catch((error)=>{
      errorToast({
        description: error.message
      })
    })
  }

  const handleAprobar = () => {
    const { asignacionID } = asignacionRef.current
    aprobarAsignacion(asignacionID)
    .then(()=>{
      successToast({
        title: 'Asignación aprobada'
      })
    }).catch((error)=>{
      errorToast({
        description: error.message
      })
    })
  }

  const handleReprobar = () => {
    const { asignacionID } = asignacionRef.current
    reprobarAsignacion(asignacionID)
    .then(()=>{
      successToast({
        title: 'Asignación reprobada'
      })
    }).catch((error)=>{
      errorToast({
        description: error.message
      })
    })
  }

  if(loading){
    return <p>loading</p>
  }

  return (
    <>
      <Heading mb={8}>Asignaciones</Heading>
      <Container>
        <HStack mb={12} {...group}>
          {secciones.map((seccion) => {
            const radio = getRadioProps({ value: seccion.codigo })
            return (
              <RadioCard key={seccion.codigo} {...radio}>
                <Text fontSize='md' fontWeight='bold'>
                  {seccion.codigo}
                </Text>
              </RadioCard>
            )
          })}
        </HStack>
        
        {
          asignaciones.length === 0 &&
          <p>Sin asignaciones</p> 
        }
        <Accordion allowToggle>
          {
            asignaciones.length >= 1 && asignaciones.map(asignacion => (
              <AccordionItem key={asignacion.id}>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      {
                        asignacion.estado === 'por entregar' && 
                        <Icon as={CalendarIcon} mr={8} />
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
                      <Text display='inline-block'>{asignacion.nombres_estudiante} {asignacion.apellidos_estudiante} - {asignacion.cedula_estudiante}</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text mb={4}>Abajo se abjunta el contenido</Text>
                  <Box mb={12}>
                    <Link fontWeight='bold' href={asignacion.archivo} target='_blank' download={true} isExternal>
                      {asignacion.nombre_archivo} <ExternalLinkIcon mx='2px' />
                    </Link>
                  </Box>
                    
                  <ButtonGroup isDisabled={asignacion.estado !== 'entregado'}>
                    <Button onClick={() => onSaveAttemptAprobar(asignacion.id)} colorScheme='teal'>Aprobar asignación</Button>
                    <Button onClick={() => onSaveAttemptReprobar(asignacion.id)} colorScheme='red'>Reprobar asignación</Button>
                  </ButtonGroup>
                </AccordionPanel>
              </AccordionItem>
            ))
          }
        </Accordion>

        <Heading size='sm' mb={8} mt={8}>Activar Asignaciones</Heading>
        <HStack spacing={4}>
          {
            seccion && seccion.archivos.map(modelo => {
              return (
                <Button key={modelo.id} rightIcon={<UnlockIcon />} p={6} colorScheme='orange' onClick={() => onSaveAttemptActivar(modelo.id)}>
                  {modelo.tipo_archivo}
                </Button>
              )
            })
          }
        </HStack>
      </Container>

      <ConfirmModal
        isOpen={isOpenM1}
        title='Confirmar activación'
        description='Esto no es reversible'
        confirmText='Activar asignación'
        callBack={(result)=>{
          onCloseM1()
          if(result.isConfirmed){
            handleActivate()
          }
        }}
      />
      <ConfirmModal
        isOpen={isOpenM2}
        title='Confirmar aprobar asignación'
        description='Esto no es reversible'
        confirmText='Aprobar asignación'
        callBack={(result)=>{
          onCloseM2()
          if(result.isConfirmed){
            handleAprobar()
          }
        }}
      />
      <ConfirmModal
        isOpen={isOpenM3}
        title='Confirmar reprobar asignación'
        description='Esto no es reversible'
        confirmText='Reprobar asignación'
        callBack={(result)=>{
          onCloseM3()
          if(result.isConfirmed){
            handleReprobar()
          }
        }}
      />
    </>
  );
}

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        borderBottom='3px solid'
        borderColor= 'blue.50'
        userSelect='none'
        _checked={{
          borderColor: 'blue.500',
        }}
        _hover={{
          cursor: 'pointer',
          borderColor: 'blue.500',
        }}
        mx={5}
        px={5}
        pb={1}
      >
        {props.children}
      </Box>
    </Box>
  )
}
 
export default FacilitadorAsignaciones;