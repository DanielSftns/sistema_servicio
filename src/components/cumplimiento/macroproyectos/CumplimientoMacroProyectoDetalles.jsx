import React, { useEffect, useState } from 'react';
import { getMacroProyecto } from '../../../services/macroproyectos.service';
import { useParams } from 'react-router-dom';
import { Link as ReactLink, Navigate } from 'react-router-dom';
import { errorToast } from '../../../functions/toast';
import {
  Heading,
  Box,
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Icon,
  Spinner,
} from '@chakra-ui/react'
import { CheckIcon, TimeIcon } from '@chakra-ui/icons';

const CumplimientoMacroProyectoDetalles = () => {
  const paramns = useParams()
  const codigo = paramns.proyectoID
  const [proyecto, setProyecto] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const get = async ()=> {
      getMacroProyecto(codigo)
      .then((proyecto)=>{
        console.log(proyecto)
        setProyecto(proyecto)
      })
      .catch((error)=>{
        errorToast({
          description: error.message
        })
      })
      .finally(()=>{
        setLoading(false)
      })
    }

    get()
  }, [codigo])

  if(loading){
    return <Spinner />
  }

  if (proyecto.macro_grupos.length === 0) {
    return <Navigate to="crear" />
  }

  return (
  <>
    <Heading mb={8}>
      {codigo} - {proyecto.titulo}
    </Heading>

    <Box mb={8}>
      <Heading mb={4}>Grupos</Heading>
      <Button mb={8} as={ReactLink} to="crear">Crear grupo</Button>
      <Accordion maxWidth={1000} allowToggle>
        {
          proyecto.macro_grupos.map((grupo, i) => (
            <AccordionItem key={i}>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    {
                      grupo.estado === 'aprobado' && 
                      <Icon as={CheckIcon} mr={8} />
                    }
                    {
                      grupo.estado !== 'aprobado' && 
                      <Icon as={TimeIcon} mr={8} />
                    }
                    
                    <Text display='inline-block' fontWeight='bold'>{grupo.titulo}</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box mb={8}>
                  <Heading size='sm'>Estado</Heading>
                  <Text>{grupo.estado}</Text>

                  <Heading mt={2} size='sm'>Escuela</Heading>
                  <Text>{grupo.escuela}</Text>

                  <Heading mb={2} size='sm'>Integrantes</Heading>
                  {
                    grupo.estudiantes.map((estudiante, i) => (
                      <Box key={i}>
                        <Text>{estudiante.nombres} {estudiante.apellidos} - {estudiante.cedula}</Text>
                      </Box>
                    ))
                  }

                  <Heading mb={2} size='sm'>Tutores</Heading>
                  {
                    grupo.tutores.map((tutor, i) => (
                      <Box key={i}>
                        <Text>{tutor.nombres} {tutor.apellidos}</Text>
                      </Box>
                    ))
                  }
                </Box>

                <Button size='sm' colorScheme='teal' as={ReactLink} to={grupo.id.toString()}>Detalles</Button>
              </AccordionPanel>
            </AccordionItem>
          ))
        }
      </Accordion>
    </Box>
  </>
  );
}
 
export default CumplimientoMacroProyectoDetalles;