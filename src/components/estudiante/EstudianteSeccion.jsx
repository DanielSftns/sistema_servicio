import React, { useState, useEffect } from 'react';

import {
  Box,
  Heading,
  Text,
  Link
} from '@chakra-ui/react'

import { ExternalLinkIcon } from '@chakra-ui/icons'

const EstudianteSeccion = () => {
  const [seccion, setSeccion] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      // setSeccion(null)
      // return
      setSeccion({
        number: 6,
        facilitador: 'Prof Perez',
        estudiantes: ['Pepe Perez', 'Juan Perez', 'Maria Perez', 'Jose Perez'],
        horario: {
          lunes: '8am - 10am',
          jueves: '9am - 9:45am'
        },
        recursos: [
          {
            title: 'Guia 1',
            type: 'file',
            recurso: 'FILE'
          },
          {
            title: 'Forma 2',
            type: 'link',
            recurso: 'url/file'
          }
        ]
      })
      setLoading(false)
    }, 1000)
  }, [])

  if(loading) return <p>Loading</p>

  if(!seccion) {
    return <Text fontSize='2xl' align='center'>Aun no estas en una seccion, espera a ser asigando a una</Text>
  }


  return (
    <>
    <Heading mb={2}>Seccion {seccion.number}</Heading>
    <p>Facilitador <b>{seccion.facilitador}</b></p>
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
        seccion.recursos.map(recurso => (
          <Box key={recurso.title}>
            <Link href='https://chakra-ui.com' target='_blank' isExternal>
              {recurso.title} <ExternalLinkIcon mx='2px' />
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
            <Text>{estudiante}</Text>
          </Box>
        ))
      }
    </Box>
    </>
  );
}
 
export default EstudianteSeccion;