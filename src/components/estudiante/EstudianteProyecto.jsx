import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProyecto, subirArchivoAlProyecto } from '../../services/proyectos.service';
import { errorToast, successToast } from '../../functions/toast';
import getBase64 from '../../functions/getBase64';
import truncateString from '../../functions/truncateString';

import {
  Heading,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Link,
  Button,
  Icon,
  Badge,
  Spinner
} from '@chakra-ui/react';

import { ExternalLinkIcon, CheckIcon, TimeIcon } from '@chakra-ui/icons';
import { formatFecha } from '../../functions/formatFecha';

const EstudianteProyecto = () => {
  const navigate = useNavigate()
  const [proyecto, setProyecto] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getMyProyecto()
    .then((proyecto)=>{
      console.log(proyecto)
      setProyecto(proyecto)
      setLoading(false)
    })
    .catch((error)=>{
      errorToast({
        description: error.message
      })
      navigate('/solicitud')
    })

  }, [navigate])

  const handleSelectArchivo = (event)=>{
    getBase64(event.target.files[0])
    .then((fileBase64)=>{
      handleSubirArchivo({
        archivo: fileBase64,
        nombre: event.target.files[0].name,
        tipo_archivo: event.target.dataset.tipo
      }) 
    }).catch((error)=>{ 
      errorToast({
        description: error.message
      })
    })
  }

  const handleSubirArchivo = (data) => {
    console.log(data)
    setLoading(true)
    subirArchivoAlProyecto(data)
    .then(()=>{
      successToast({
        description: 'Archivo subido'
      })
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

  if(loading){
    return <Spinner />
  }
  
  return (
    <>
      <Heading mb={8}>
        {proyecto.codigo? `${proyecto.codigo} - ${proyecto.titulo}`: `${proyecto.titulo}`}
        {
          proyecto.estado === 'avalado' &&  
          <Badge ml='1' fontSize='0.5em' colorScheme='green' variant='solid'>
            Avalado
          </Badge>
        }
      </Heading>
      <Box mb={8}>
        <Heading mb={4}>Integrantes</Heading>
        {
          proyecto.estudiantes.map((estudiante, i) => (
            <Box key={i}>
              <Text>{estudiante.nombres} {estudiante.apellidos} - {estudiante.cedula}</Text>
            </Box>
          ))
        }
      </Box>
      {
        proyecto.tutores && 
          <Box mb={8}>
            <Heading mb={4}>Tutores</Heading>
            {
              proyecto.tutores.map((tutor, i) => (
                <Box key={i}>
                  <Text>{tutor.nombres} {tutor.apellidos}</Text>
                </Box>
              ))
            }
          </Box>
      }
      <Box mb={8}>
        <Heading mb={4}>Entregables</Heading>
        <Accordion allowToggle maxWidth={1000}>
          {
            proyecto.archivos.map((archivo, i) => (
              <AccordionItem key={i}>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      {
                        archivo.estado === 'aprobado' && 
                        <Icon as={CheckIcon} mr={8} />
                      }
                      {
                        archivo.estado !== 'aprobado' && 
                        <Icon as={TimeIcon} mr={8} />
                      }
                      <Text display='inline-block' fontWeight='bold'>{archivo.tipo_archivo} - {formatFecha(archivo.fecha)}</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <Box mb={6}>
                      <Button
                        size='sm'
                        isDisabled={archivo.estado !== 'por entregar' && archivo.estado !== 'revisado'}
                        onClick={()=> document.querySelector(`[data-tipo="${archivo.tipo_archivo}"]`).click()}
                      >Entregar</Button>
                      <input type="file" data-tipo={archivo.tipo_archivo} hidden onChange={handleSelectArchivo} />
                    </Box>
                    <Box h={300} overflowY='auto'>
                      <TableContainer>
                        <Table colorScheme='teal' whiteSpace='normal'>
                          <Thead>
                            <Tr>
                              <Th>Fecha</Th>
                              <Th>Estatus</Th>
                              <Th>Archivo</Th>
                              <Th>Comentario</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr verticalAlign='baseline'>
                              <Td>{formatFecha(archivo.fecha)}</Td>
                              <Td>{archivo.estado}</Td>
                              <Td>
                                <Link whiteSpace='nowrap' fontWeight='bold' href={archivo.archivo} target='_blank' download={true} isExternal>
                                  {truncateString(archivo.nombre)} <ExternalLinkIcon mx='2px' />
                                </Link>
                              </Td>
                              <Td>
                                <p>{archivo.comentario}</p>
                              </Td>
                            </Tr>
                            {
                              archivo.historial.sort((a,b)=> b.fecha - a.fecha).map((archivo, i) => (
                                <Tr key={i} verticalAlign='baseline'>
                                  <Td>{formatFecha(archivo.fecha)}</Td>
                                  <Td>{archivo.estado}</Td>
                                  <Td>
                                    <Link whiteSpace='nowrap' fontWeight='bold' href={archivo.archivo} target='_blank' download={true} isExternal>
                                      {truncateString(archivo.nombre)} <ExternalLinkIcon mx='2px' />
                                    </Link>
                                  </Td>
                                  <Td>
                                    <p>{archivo.comentario}</p>
                                  </Td>
                                </Tr>
                              ))
                            }
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            ))
          }
        </Accordion>
      </Box>
    </>
  );
}
 
export default EstudianteProyecto;