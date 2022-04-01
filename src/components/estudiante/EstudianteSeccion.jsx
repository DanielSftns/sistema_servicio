import React, { useState, useEffect } from 'react';

import {
  Box,
  Heading,
  Text,
  Link
} from '@chakra-ui/react'

import { ExternalLinkIcon } from '@chakra-ui/icons'
import { getSecsByEstudiante } from '../../services/seccion.service';

const EstudianteSeccion = () => {
  const [seccion, setSeccion] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const get = async ()=> {
      getSecsByEstudiante()
      .then((seccion)=>{
        console.log({seccion})
        setSeccion(seccion)
      })
      .finally(()=>{
        setLoading(false)
      })
    }

    get()
  }, [])

  if(loading) return <p>Loading</p>

  if(!seccion) {
    return <Text fontSize='2xl' align='center'>Aun no estas en una seccion, espera a ser asigando a una</Text>
  }


  return (
    <>
    <Heading mb={2}>{seccion.nombre} - {seccion.codigo}</Heading>
    {
      seccion.facilitadores.length >= 2 && seccion.facilitadores.map((facilitador, i) => (
        <p key={facilitador.cedula}>Facilitador {i+1}) <b>{facilitador.nombres} {facilitador.apellidos}</b> - {facilitador.email}</p>
      ))
    }
    {
      seccion.facilitadores.length === 1 &&
      <p>Facilitador <b>{seccion.facilitadores[0].nombres} {seccion.facilitadores[0].apellidos}</b> - {seccion.facilitadores[0].email}</p>
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
      {/* {
        seccion.recursos.map(recurso => (
          <Box key={recurso.title}>
            <Link href='https://chakra-ui.com' target='_blank' isExternal>
              {recurso.title} <ExternalLinkIcon mx='2px' />
            </Link>
          </Box>
        ))
      } */}
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
 
export default EstudianteSeccion;