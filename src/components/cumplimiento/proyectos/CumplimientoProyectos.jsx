import React, { useEffect,useState } from 'react';
import { getProyectos } from '../../../services/proyectos.service';
import { Link as ReactLink } from 'react-router-dom';

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
  Container
} from '@chakra-ui/react'

const CumplimientoProyectos = () => {
  const [proyectos, setProyectos] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const get = async ()=> {
      getProyectos()
      .then((proyectos)=>{
        console.log({proyectos})
        setProyectos(proyectos)
      }).finally(()=>{
        setLoading(false)
      })
    }

    get()
  }, [])

  if(loading){
    return <p>loading...</p>
  }

  return (
    <>
      <Heading mb={8}>Proyectos</Heading>
      <Container>
      <Button mb={8} as={ReactLink} to="registrar">Registrar proyecto</Button>

        <Accordion allowToggle>
          {
            proyectos && proyectos.map(proyecto => (
              <AccordionItem key={proyecto.codigo}>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      <Heading size='sm'>{proyecto.codigo} {proyecto.titulo}</Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box mb={4}>
                    <Heading size='sm'>Estado</Heading>
                    <Text>{proyecto.estado}</Text>

                    <Heading mt={2} size='sm'>Escuela</Heading>
                    <Text>{proyecto.nombre_escuela}</Text>

                    <Heading mt={2} size='sm'>Especialidad</Heading>
                    <Text>{proyecto.nombre_especialidad}</Text>

                    <Heading mt={2} size='sm'>Estudiantes</Heading>
                    <Text>
                      {
                        proyecto.estudiantes.map(estudiante => estudiante.nombres + ' ' + estudiante.apellidos).join(', ')
                      }
                    </Text>

                    <Heading mt={2} size='sm'>Entregables</Heading>
                    {
                      proyecto.archivos.map((archivo, i) => (
                        <Text key={i}><b>{archivo.tipo_archivo}:</b> {archivo.estado}</Text>
                      ))
                    }
                  </Box>

                  <Button size='sm' colorScheme='teal' as={ReactLink} to={proyecto.codigo}>Detalles</Button>
                </AccordionPanel>
              </AccordionItem>
            ))
          }
        </Accordion>
      </Container>
    </>
  );
}
 
export default CumplimientoProyectos;