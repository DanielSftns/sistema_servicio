import React, { useState, useEffect, useRef } from 'react';
import { getAsigsBySeccion, activarAsignacion } from '../../services/asignaciones.service';
import { getSecsByFacilitador } from '../../services/seccion.service';

import {
  Heading,
  useRadioGroup,
  Box,
  Text,
  HStack,
  useRadio,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { UnlockIcon, CheckIcon } from '@chakra-ui/icons'

import { errorToast, successToast } from '../../functions/toast';
import ConfirmModal from '../shared/ConfirmModal';

const FacilitadorAsignaciones = () => {
  const [loading, setLoading] = useState(true)
  const [secciones, setSecciones] = useState()
  const [seccion, setSeccion] = useState()
  const [asignaciones, setAsignaciones] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const modeloRef = useRef()


  const { getRootProps, getRadioProps, setValue } = useRadioGroup({ 
    name: 'seccion',
    onChange: (value)=> getAsignaciones(value)
  })
  const group = getRootProps()
  
  useEffect(()=> {
    const get = async ()=> {
      try {
        const secciones = [await getSecsByFacilitador()]
        setSecciones(secciones)

        if(secciones.length === 0){
          throw new Error("Sin secciones")
        }

        const seccion = secciones[0]
        setValue(seccion.codigo)
        setSeccion(seccion)
        const asigs = await getAsigsBySeccion(seccion.codigo)
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

  const onSaveAttempt = (modelo) => {
    modeloRef.current = { modelo }
    onOpen()
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

  if(loading){
    return <p>loading</p>
  }

  return (
    <>
      <Heading mb={8}>Asignaciones</Heading>
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

      <Heading size='sm' mb={8} mt={8}>Activar Asignaciones</Heading>
      <HStack spacing={4}>
        {
          seccion && seccion.archivos.map(modelo => {
            return (
              <Button key={modelo.id} rightIcon={<UnlockIcon />} p={6} colorScheme='orange' onClick={() => onSaveAttempt(modelo.id)}>
                {modelo.tipo_archivo}
              </Button>
            )
          })
        }
      </HStack>

      <ConfirmModal
        isOpen={isOpen}
        title='Confirmar activación'
        description='Esto no es reversible'
        confirmText='Activar asignación'
        callBack={(result)=>{
          onClose()
          if(result.isConfirmed){
            handleActivate()
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