import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Flex,
  Button,
  Link,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { logout } from '../../services/auth.service';
import { successToast } from '../../functions/toast';
import Notificaciones from '../shared/Notificaciones';

const FacilitadorHeader = () => {
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
      <Link fontWeight="700" fontSize="2xl" as={NavLink} to="/">SERVICIO</Link>
      <Flex gap={2}>
        <NavLink className='nav-link' to="seccion">Seccion</NavLink>
        <NavLink className='nav-link' to="asignaciones">Asignaciones</NavLink>
        <NavLink className='nav-link' to="perfil">Mi Perfil</NavLink>
        <Notificaciones />
        <Button onClick={handleLogout} variant='link' rightIcon={<ArrowForwardIcon />}>Salir</Button>
      </Flex>
    </Flex>
  );
}
 
export default FacilitadorHeader;