import React, { useEffect,useState } from 'react';
import CumplimientoHeader from '../CumplimientoHeader';
import { obtenerSolicitudes } from '../../../services/solicitudes.service';

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
  Link,
  Icon,
  ButtonGroup
} from '@chakra-ui/react'
import { TimeIcon, CheckIcon, ExternalLinkIcon, CalendarIcon, CloseIcon } from '@chakra-ui/icons'


const CumplimientoSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const get = async ()=> {
      obtenerSolicitudes()
      .then((solicitudes)=>{
        console.log({solicitudes})
        setSolicitudes(solicitudes)
      }).finally(()=>{
        setLoading(false)
      })
    }

    get()
  }, [])

  if(loading){
    return <p>Loading...</p>
  }

  return (
    <>
      <CumplimientoHeader />
      <div style={{'paddingTop': '2rem'}}>
        <Heading mb={8}>Solicitudes de macroproyecto</Heading>
        <Container>
          <Accordion allowToggle>
            {
              solicitudes.map(solicitud => (
                <AccordionItem key={solicitud.id}>
                  <h2>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                        {
                          solicitud.estado === 'por aprobar' && 
                          <Icon as={TimeIcon} mr={8} />
                        }
                        {
                          solicitud.estado === 'aprobado' && 
                          <Icon as={CheckIcon} mr={8} />
                        }
                        {
                          solicitud.estado === 'reprobado' && 
                          <Icon as={CloseIcon} mr={8} />
                        }
                        <Text display='inline-block'>{solicitud.nombres_estudiante} {solicitud.apellidos_estudiante} - {solicitud.cedula_estudiante}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text mb={4}>Abajo se abjunta el contenido</Text>
                    <Box mb={12}>
                      {
                        solicitud.archivos && solicitud.archivos.map((archivo, i) => (
                          <Link key={i} display='block' fontWeight='bold' href={archivo.archivo} target='_blank' download={true} isExternal>
                            {archivo.nombre} <ExternalLinkIcon mx='2px' />
                          </Link>
                        ))
                      }
                    </Box>
                      
                    <ButtonGroup isDisabled={solicitud.estado !== 'por aprobar'}>
                      <Button colorScheme='teal'>Aprobar</Button>
                      <Button colorScheme='red'>Reprobar</Button>
                    </ButtonGroup>
                  </AccordionPanel>
                </AccordionItem>
              ))
            }
          </Accordion>
        </Container>
      </div>
    </>
  );
}
 
export default CumplimientoSolicitudes;