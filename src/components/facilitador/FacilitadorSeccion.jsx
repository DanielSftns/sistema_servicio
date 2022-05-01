import React, { useEffect, useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';

import { getSecsByFacilitador } from '../../services/seccion.service';

import {
  Button,
  Text,
  Box,
  Heading,
  Link
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useAuth } from '../../contexts/AuthContext'

const FacilitadorSeccion = () => {
  const [loading, setLoading] = useState(true)
  const [secciones, setSecciones] = useState()
  const [seccion, setSeccion] = useState()
  const { updateUsuario } = useAuth()

  useEffect(()=>{
    const get = async ()=> {
      const secciones = await getSecsByFacilitador()
      setSecciones(secciones)
      if(secciones.length >= 1){
        const seccion = secciones[0]
        setSeccion(seccion)
        updateUsuario({secciones: [seccion.codigo]})
      }
      setLoading(false)
    }

    get()
  }, [updateUsuario])

  if(loading){
    return <p>loading</p>
  }

  if(secciones.length === 0){
    return (
      <Box textAlign='center'>
        <Text mb={8}>No tienes secciones a cargo</Text>
        <Button as={ReactLink} to="/profesor/registrar-seccion">Registrar seccion</Button>
      </Box>
    )
  }

  return (
    <>
      <Button as={ReactLink} to="/profesor/registrar-seccion">Registrar seccion</Button>
      <Button as={ReactLink} to='/profesor/aprobar-fase-formativa' ml={8}>Aprobar fase formativa</Button>
      <Heading mb={2}>{seccion.nombre} - {seccion.codigo}</Heading>
      {
        seccion.facilitadores.map((facilitador, i) => (
          <p key={facilitador.cedula}>Facilitador {i+1}) <b>{facilitador.nombres} {facilitador.apellidos}</b> - {facilitador.email}</p>
        ))
      }
      <Box mb={8}>
        {
          Object.entries(seccion.horario).map(dia => (
            <Text fontSize='sm' key={dia[0]}>{dia[0]} : {dia[1]}</Text>
          ))
        }
      </Box>
  
      <Box mb={4}>
        <Heading mb={4}>Recursos</Heading>
        {
          seccion.archivos.map(recurso => (
            <Box key={recurso.nombre}>
              <Link href={recurso.archivo} download={recurso.nombre} target='_blank' isExternal>
                {recurso.nombre} <ExternalLinkIcon mx='2px' />
              </Link>
            </Box>
          ))
        }
      </Box>
  
      <Box>
        <Heading mb={4}>Integrantes</Heading>
        {
          seccion.estudiantes.map((estudiante, i) => (
            <Box key={i}>
              <Text>{estudiante.nombres} {estudiante.apellidos} - {estudiante.cedula}</Text>
            </Box>
          ))
        }
      </Box>
    </>
  );
}
 
export default FacilitadorSeccion;