import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Divider
} from '@chakra-ui/react'
import { BellIcon } from '@chakra-ui/icons'
import { getNotificaciones, marcarNotificacionesLeidas } from '../../services/notificaciones.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { formatFecha } from '../../functions/formatFecha';

const Notificaciones = () => {
  const [show, setShow] = useState(false)
  const [notificaciones, setNotificaciones] = useState([])
  const navigate = useNavigate()
  const { usuario } = useAuth()
  const rol = usuario.rol_name

  useEffect(() => {
    getNotificaciones()
    .then(notificaciones => {
      setNotificaciones(notificaciones.sort((a, b) => a.fecha - b.fecha))
    })
  }, [])

  const marcarComoLeida = (id) => {
    setShow(false)
    const notificacion = notificaciones.find(n => n.id === id)
    if(notificacion.estado === 'leido') return
    setNotificaciones(notificaciones.map(notificacion => {
      if (notificacion.id === id) {
        notificacion.estado = 'leido'
      }
      return notificacion
    }))
    marcarNotificacionesLeidas([id])
  }

  const marcarTodasComoLeidas = () => {
    setShow(false)
    const noLeidas = notificaciones.filter(n => n.estado !== 'leido')
    if(noLeidas.length === 0) return
    setNotificaciones(notificaciones.map(notificacion => {
      notificacion.estado = 'leido'
      return notificacion
    }))
    marcarNotificacionesLeidas(noLeidas)
  }

  const handleClick = (id) => {
    const notificacion = notificaciones.find(n => n.id === id)
    if(rol === 'estudiante') {
      switch(notificacion.tipo) {
        case 'asignacion':
          navigate(`/asignaciones/`)
          break
        case 'proyecto':
          navigate(`/proyecto/`)
          break
        case 'seccion':
          navigate(`/seccion/`)
          break
        default:
          break
      }
    }
    marcarComoLeida(id)
  }

  return (
    <Box position='relative'>
      <Button title='notificaciones' variant='link' onClick={()=> setShow(!show)}>
        <BellIcon />
        {
          notificaciones.filter(notificacion => notificacion.estado !== 'leido').length !== 0 && <Box w={2} h={2} rounded='full' bg='red'></Box>
        }
      </Button>
      {
        show &&
        <Box
          textAlign='left'
          shadow='xl'
          p={4}
          width={400}
          maxH={400}
          minH={100}
          overflow='auto'
          bg='white'
          position='absolute'
          right={0}
          top='100%'
          transform='translateY(10px)'
          borderTop='2px solid'
          borderColor='blue.400'
          rounded={6}
        >
          {
            notificaciones.length !== 0 &&
            <>
              <Heading
                mb={0}
                as='h6'
                textAlign='right'
                color='blackAlpha.600'
                size='xs'
                cursor='pointer'
                onClick={marcarTodasComoLeidas}
              >
                marcar todo leido
              </Heading>
              {
                notificaciones.map((notificacion, i) => (
                  <Box
                    key={notificacion.id}
                    mt={i === 0? 0 : 4}
                    color={notificacion.estado === 'no leido'?'#000' : 'blackAlpha.300'}
                    cursor='pointer'
                    onClick={()=> handleClick(notificacion.id)}
                  >
                    <Heading size='sm'>{notificacion.titulo}</Heading>
                    <Text>{notificacion.mensaje}</Text>
                    <Text fontSize='xs' textAlign='right'>{formatFecha(notificacion.fecha)}</Text>
                    <Divider />
                  </Box>
                ))
              }
            </>
          }
          {
            notificaciones.length === 0 && <Heading as='h6' textAlign='center' size='xs'>Sin notificaciones</Heading>
          }
        </Box>
      }
    </Box>
  );
}
 
export default Notificaciones;