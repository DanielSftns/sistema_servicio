import React, { useEffect, useState } from 'react';
import { Link as ReachLink } from 'react-router-dom';

import { getSecciones } from '../../services/facilitador.service';

import {
  Button,
  Text,
  Box,
  Heading,
  Link
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const FacilitadorSeccion = () => {
  const [loading, setLoading] = useState(true)
  const [secciones, setSecciones] = useState()
  const [seccion, setSeccion] = useState()

  useEffect(()=>{
    const get = async ()=> {
      const secciones = await getSecciones()
      console.log(secciones)
      setSecciones(secciones)
      setSeccion(secciones)
      setLoading(false)
    }

    get()
  }, [])

  if((loading && !secciones )|| !seccion){
    return <p>loading</p>
  }

  if(secciones.length === 0){
    return (
      <Box textAlign='center'>
        <Text mb={8}>No tienes secciones a cargo</Text>
        <Button as={ReachLink} to="registrar-seccion">Registrar seccion</Button>
      </Box>
    )
  }

  return (
    <>
      <Button as={ReachLink} to="registrar-seccion">Registrar seccion</Button>
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
              <Text>{estudiante.nombres} {estudiante.apellidos}</Text>
            </Box>
          ))
        }
      </Box>
    </>
  );
}
 
export default FacilitadorSeccion;