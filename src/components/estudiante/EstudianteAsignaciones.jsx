import React, { useState, useEffect } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Box,
  Container,
  Link,
  Text,
  Icon
} from '@chakra-ui/react'
import { ExternalLinkIcon, LinkIcon, CheckIcon, TimeIcon } from '@chakra-ui/icons'

import { getMyAsignaciones, entregarAsignacion } from '../../services/asignaciones.service';

import getBase64 from '../../functions/getBase64'
import { errorToast, successToast } from '../../functions/toast';

const EstudianteAsignaciones = () => {
  const [asignaciones, setAsignaciones] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const get = async ()=>{
      const asigns = await getMyAsignaciones()
      setAsignaciones(asigns)
      setLoading(false)
    }

    get()
  }, [])

  const handleEntregar = async (e)=>{
    const file = e.currentTarget.files[0]
    const asignacion = e.currentTarget.dataset.asignacion
    console.log(asignacion, file)
    setLoading(true)
    const archivoBase64 = await getBase64(file)
    entregarAsignacion(asignacion, archivoBase64)
    .then((res)=> {
      console.info(res)
      successToast({
        description: 'Asiganción entregada'
      })
    }).catch(error =>{
      errorToast({
        description: error.message
      })
    }).finally(()=>{
      setLoading(false)
    })
  }

  if(loading){
    return <p>...loading</p>
  }

  return (
    <>
      <Heading mb={12}>Asignaciones</Heading>
      <Container>
        <Accordion allowToggle>
          {
            asignaciones.map(asignacion => (
              <AccordionItem key={asignacion.id}>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      {
                        asignacion.estado === 'por entregar' && 
                        <Icon as={TimeIcon} mr={8} />
                      }
                      {/* <Icon as={CheckIcon} mr={8} /> */}
                      <p display='inline-block'>{asignacion.nombre}</p>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Heading mb={8}>Asignación {asignacion.estado}</Heading>
                  <Text mb={4}>Abajo se abjuntan los archivos necesarios para la entrega</Text>
                  <Box mb={12}>
                    <Link fontWeight='bold' href={asignacion.archivo} target='_blank' isExternal>
                      {asignacion.nombre_archivo} <ExternalLinkIcon mx='2px' />
                    </Link>
                  </Box>

                  <label>
                    <Text
                      rounded={4}
                      px={4}
                      py={2}
                      color='#fff'
                      fontWeight='500'
                      display={asignacion.estado === 'por entregar'? 'inline-block' : 'none'}
                      bg='blue.500'
                      _hover= {{
                        cursor: 'pointer',
                        bg: 'blue.600'
                      }}
                    >
                      <LinkIcon /> Entregar asignación
                    </Text>
                    <input onChange={handleEntregar} data-asignacion={asignacion.id} type="file" name="asignacion" hidden />
                  </label>
                </AccordionPanel>
              </AccordionItem>
            ))
          }
        </Accordion>
      </Container>
    </>
  );
}
 
export default EstudianteAsignaciones;