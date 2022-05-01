import React, { useEffect, useState } from 'react';
import { getProyecto, corregirArchivoProyecto, aprobarArchivoProyecto, avalarProyecto } from '../../../services/proyectos.service';
import { useParams } from 'react-router-dom';
import getBase64 from '../../../functions/getBase64';
import { errorToast, successToast } from '../../../functions/toast';
import truncateString from '../../../functions/truncateString';
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
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  useDisclosure,
  ButtonGroup,
  Badge
} from '@chakra-ui/react'
import { ExternalLinkIcon, CheckIcon, TimeIcon } from '@chakra-ui/icons';
import ModalHorasCumplidas from '../ModalHorasCumplidas';
import { formatFecha } from '../../../functions/formatFecha';

const CumplimientoProyectoDetalles = () => {
  const paramns = useParams()
  const codigo = paramns.proyectoID
  const [proyecto, setProyecto] = useState()
  const [loading, setLoading] = useState(true)
  const [comentario, setComentario] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  const handleSelectArchivo = (event)=>{
    getBase64(event.target.files[0])
    .then((fileBase64)=>{
      handleCorregirArchivo({
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

  const handleCorregirArchivo = (dataArchivo) => {
    setLoading(true)
    corregirArchivoProyecto({...dataArchivo, proyecto: codigo, comentario})
    .then(()=>{
      successToast({
        description: 'Correción subida'
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

  const handleAceptarArchivo = (tipo_archivo) => {
    setLoading(true)
    aprobarArchivoProyecto({tipo_archivo, proyecto: codigo})
    .then(()=>{
      successToast({
        description: 'Archivo aceptado'
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

  const handleAvalarProyecto = () => {
    setLoading(true)
    avalarProyecto(codigo)
    .then(()=>{
      successToast({
        description: 'Proyecto avalado'
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
    return <p>loading...</p>
  }

  return (
  <>
    <Heading mb={8}>
      {codigo} - {proyecto.titulo}
      {
        proyecto.estado === 'avalado' &&  
        <Badge ml='1' fontSize='0.5em' colorScheme='green' variant='solid'>
          Avalado
        </Badge>
      }
    </Heading>
    <ButtonGroup spacing={4} isDisabled={loading || proyecto.estado === 'avalado'}>
      <Button onClick={onOpen}>Asignar horas</Button>
      <Button onClick={handleAvalarProyecto}>Avalar</Button>
    </ButtonGroup>
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
      <Accordion maxWidth={1000} allowToggle>
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
                      isDisabled={archivo.estado !== 'entregado'} 
                      mb={4} 
                      colorScheme='teal'
                      onClick={()=>handleAceptarArchivo(archivo.tipo_archivo)}
                    >Aceptar entrega</Button>

                    <InputGroup>
                      <Input value={comentario} onChange={({target})=> setComentario(target.value)} placeholder='Comentario' />
                      <InputRightElement width='5rem'>
                        <Button
                          size='sm'
                          colorScheme='yellow'
                          isDisabled={archivo.estado !== 'entregado'}
                          onClick={()=> document.querySelector(`[data-tipo="${archivo.tipo_archivo}"]`).click()}
                        >Revision</Button>
                      </InputRightElement>
                    </InputGroup>
                  </Box>
                  <input type="file" data-tipo={archivo.tipo_archivo} hidden onChange={handleSelectArchivo} />
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

    <ModalHorasCumplidas estudiantes={proyecto.estudiantes} isOpen={isOpen} onClose={onClose} />
  </>
  );
}
 
export default CumplimientoProyectoDetalles;