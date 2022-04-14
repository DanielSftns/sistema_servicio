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
import { TimeIcon, CheckIcon, ExternalLinkIcon, CloseIcon } from '@chakra-ui/icons'
import { accionEnSolicitud } from '../../../services/solicitudes.service';
import { errorToast, successToast } from '../../../functions/toast';
import { SwalModal } from '../../../functions/sweetAlertCommon';

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

  const handleAprobar = (solicitud_id) => {
    SwalModal.fire({
      title:'Confirmar aprobar solicitud',
      text:'Esto no es reversible',
      confirmButtonText: 'Aprobar solicitud',
    }).then(result => {
      if(result.isConfirmed){
        accionEnSolicitud({solicitud_id, accion: 'aprobado'})
        .then(()=>{
          successToast({
            title: 'Solicitud aprobada'
          })
        }).catch((error)=>{
          errorToast({
            description: error.message
          })
        })
      }
    })
  }

  const handleRechazar = (solicitud_id) => {
    SwalModal.fire({
      title:'Confirmar rechazar solicitud',
      text:'Esto no es reversible',
      confirmButtonText: 'Rechazar solicitud',
      input: 'text',
      inputAttributes: {
        placeholder: 'Motivo de rechazo'
      },
      preConfirm: (descripcion)=>{
        return {descripcion}
      }
    }).then(result => {
      if(result.isConfirmed){
        accionEnSolicitud({solicitud_id, accion: 'rechazado', descripcion: result.value.descripcion})
        .then(()=>{
          successToast({
            title: 'Solicitud rechazada'
          })
        }).catch((error)=>{
          errorToast({
            description: error.message
          })
        })
      }
    })
  }

  if(loading){
    return <p>Loading...</p>
  }

  return (
    <>
      <CumplimientoHeader />
      <div style={{'paddingTop': '2rem'}}>
        <Heading mb={8}>Solicitudes de proyecto</Heading>
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
                          solicitud.estado === 'rechazado' && 
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
                      <Button onClick={()=> handleAprobar(solicitud.id)} colorScheme='teal'>Aprobar</Button>
                      <Button onClick={()=> handleRechazar(solicitud.id)} colorScheme='red'>Reprobar</Button>
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