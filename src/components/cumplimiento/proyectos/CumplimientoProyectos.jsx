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
      <Button as={ReactLink} to="registrar">Registrar proyecto</Button>

        <Accordion allowToggle>
          {
            proyectos && proyectos.map(proyecto => (
              <AccordionItem key={proyecto.codigo}>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      <Text display='inline-block'>{proyecto.codigo} {proyecto.titulo}</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text mb={4}>Abajo se abjunta el contenido</Text>

                
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