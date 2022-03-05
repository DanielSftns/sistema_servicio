import React from 'react';
import { Link as ReachLink } from 'react-router-dom';
import {
  Flex,
  Box,
  Button,
  Link
} from '@chakra-ui/react'

const EstudianteHeader = () => {
  return (
    <Flex
      py={2}
      justifyContent='space-between'
      alignItems='center'
      w='100%'
      fontWeight='600'
    >
      <Box fontWeight="700" fontSize="2xl">
        <Link as={ReachLink} to="/">SERVICIO</Link>
      </Box>
      <Flex gap={2}>
        <Box>
          <Link as={ReachLink} to="/estudiante">Seccion</Link>
        </Box>
        <Box>
          <Link as={ReachLink} to="asignaciones">Asignaciones</Link>
        </Box>
        <Box>
          <Link as={ReachLink} to="proyecto">Proyecto</Link>
        </Box>
        <Box>
          <Link as={ReachLink} to="perfil">Mi Perfil</Link>
        </Box>
        <Box>
          <Button variant='link'>Salir</Button>
        </Box>
      </Flex>
    </Flex>
  );
}
 
export default EstudianteHeader;