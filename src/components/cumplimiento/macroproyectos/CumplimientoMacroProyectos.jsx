import React, { useEffect,useState } from 'react';
import { getMacroProyectos } from '../../../services/macroproyectos.service';
import { Link as ReactLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
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
  Container,
  Spinner
} from '@chakra-ui/react'

const CumplimientoMacroProyectos = () => {
  const [proyectos, setProyectos] = useState()
  const [loading, setLoading] = useState(true)
  const { usuario } = useAuth()
  const rol = usuario.rol_name

  useEffect(()=>{
    const get = async ()=> {
      getMacroProyectos()
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
    return <Spinner />
  }

  return (
    <>
      <Heading mb={8}>Macroproyectos</Heading>
      <Container>
        {
          rol !== 'tutor etapa cumplimiento' && <Button mb={8} as={ReactLink} to="registrar">Registrar macro proyecto</Button>
        }

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

                    <Heading mt={2} size='sm'>Grupos</Heading>
                    <ul style={{'paddingLeft': '1rem'}}>
                      {
                        proyecto.macro_grupos.map((grupo, i) => (
                          <li key={i}>{grupo.titulo}</li>
                        ))
                      }
                    </ul>
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
 
export default CumplimientoMacroProyectos;