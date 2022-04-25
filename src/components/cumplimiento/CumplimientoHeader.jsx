import React from 'react';
import { Link as ReachLink, useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  Button,
  Link,
} from '@chakra-ui/react'
import { ArrowForwardIcon, BellIcon } from '@chakra-ui/icons'
import { logout } from '../../services/auth.service';
import { successToast } from '../../functions/toast';

const CumplimientoHeader = () => {
  const navigate = useNavigate()

  const handleLogout = ()=> {
    logout()
    successToast({
      title: 'Sesión cerrada'
    })
    navigate('/login')
  }

  return (
    <Flex
      py={2}
      justifyContent='space-between'
      alignItems='center'
      w='100%'
      fontWeight='600'
    >
      <Link fontWeight="700" fontSize="2xl" as={ReachLink} to="/">SERVICIO</Link>
      <Flex gap={2}>
        <Link as={ReachLink} to="/tutor/proyectos">Proyectos</Link>
        <Link as={ReachLink} to="/tutor/macroproyectos">Macroproyectos</Link>
        <Link as={ReachLink} to="/tutor/solicitudes">Solicitudes</Link>
        <Link as={ReachLink} to="/tutor/perfil">Mi Perfil</Link>
        <Button title='notificaciones' variant='link'>
          <BellIcon />
          <Box w={2} h={2} rounded='full' bg='red'></Box>
        </Button>
        <Button onClick={handleLogout} variant='link' rightIcon={<ArrowForwardIcon />}>Salir</Button>
      </Flex>
    </Flex>
  );
}
 
export default CumplimientoHeader;