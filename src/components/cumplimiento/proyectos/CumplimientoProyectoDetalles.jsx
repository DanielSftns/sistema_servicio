import React, { useEffect, useState } from 'react';
import { getProyecto } from '../../../services/proyectos.service';
import { Link as ReactLink, useParams } from 'react-router-dom';

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
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons';

const CumplimientoProyectoDetalles = () => {
  const paramns = useParams()
  const codigo = paramns.proyectoID
  const [proyecto, setProyecto] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const get = async ()=> {
      getProyecto(codigo)
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
    return <p>loading...</p>
  }

  return (
  <>
    <Heading mb={8}>{codigo} - {proyecto.titulo}</Heading>
    <Button as={ReactLink} to=''>Asignar horas</Button>
    <Box mb={8}>
      <Heading mb={4}>Integrantes</Heading>
      {
        proyecto.estudiantes.map((estudiante, i) => (
          <Box key={i}>
            <Text>{estudiante.nombres} {estudiante.apellidos} - {estudiante.cedula} - {estudiante.horas_cumplidas} H</Text>
          </Box>
        ))
      }
    </Box>
    <Box mb={8}>
      <Heading mb={4}>Entregables</Heading>
      <Container>
        <Accordion allowToggle>
          {
            proyecto.archivos.map((archivo, i) => (
              <AccordionItem key={i}>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      <Heading size='sm'>{archivo.tipo_archivo} - {archivo.fecha}</Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <Heading size='sm'>Archivos</Heading>

                    <TableContainer>
                      <Table colorScheme='teal' maxWidth={800} whiteSpace='normal'>
                        <Thead>
                          <Tr>
                            <Th>Fecha</Th>
                            <Th>Archivo</Th>
                            <Th>Comentario</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr verticalAlign='baseline'>
                            <Td>{archivo.fecha}</Td>
                            <Td>
                              <Link whiteSpace='nowrap' fontWeight='bold' href={archivo.archivo} target='_blank' download={true} isExternal>
                                {archivo.nombre} <ExternalLinkIcon mx='2px' />
                              </Link>
                            </Td>
                            <Td>
                              <p>{archivo.comentario}</p>
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            ))
          }
        </Accordion>
      </Container>
    </Box>
  </>
  );
}
 
export default CumplimientoProyectoDetalles;