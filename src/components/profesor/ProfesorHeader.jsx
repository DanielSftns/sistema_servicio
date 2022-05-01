import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  Flex,
  Button,
  Link,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { logout } from '../../services/auth.service';
import { successToast } from '../../functions/toast';
import Notificaciones from '../shared/Notificaciones';
import { useAuth } from '../../contexts/AuthContext';

const ProfesorHeader = () => {
  const navigate = useNavigate()
  const { usuario } = useAuth()
  const rol = usuario.rol_name

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
      {
        rol === 'tutor academico' &&
          <Flex gap={2}>
            <NavLink className='nav-link' to="/profesor/tutor/proyectos">Proyectos</NavLink>
            <NavLink className='nav-link' to="/profesor/tutor/macroproyectos">Macroproyectos</NavLink>
            <NavLink className='nav-link' to="/profesor/perfil">Mi Perfil</NavLink>
            <Notificaciones />
            <Button onClick={handleLogout} variant='link' rightIcon={<ArrowForwardIcon />}>Salir</Button>
          </Flex>
      }
      {
        rol !== 'tutor academico' &&
          <Flex gap={2}>
            <NavLink className='nav-link' to="/profesor/seccion">Seccion</NavLink>
            <NavLink className='nav-link' to="/profesor/asignaciones">Asignaciones</NavLink>
            {
              rol !== 'facilitador' &&
              <>
                <NavLink className='nav-link' to="/profesor/proyectos">Proyectos</NavLink>
                <NavLink className='nav-link' to="/profesor/macroproyectos">Macroproyectos</NavLink>
                <NavLink className='nav-link' to="/profesor/solicitudes">Solicitudes</NavLink>
                <NavLink className='nav-link' to="/profesor/informe">Informe</NavLink>
                {
                  rol !== 'tutor etapa cumplimiento' &&
                  <>
                    <NavLink className='nav-link' to="/profesor/informes">Informes</NavLink>
                  </>
                }
              </>
            }
            <NavLink className='nav-link' to="/profesor/perfil">Mi Perfil</NavLink>
            <Notificaciones />
            <Button onClick={handleLogout} variant='link' rightIcon={<ArrowForwardIcon />}>Salir</Button>
          </Flex>
      }
    </Flex>
  );
}
 
export default ProfesorHeader;