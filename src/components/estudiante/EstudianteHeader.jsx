import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flex,
  Box,
  Button
} from '@chakra-ui/react'

const EstudianteHeader = () => {
  return (
    <Flex
      py={2}
      justifyContent='space-between'
      alignItems='center'
      w='100%'
    >
      <Box fontWeight="700" fontSize="2xl">
        <Link to="/">SERVICIO</Link>
      </Box>
      <Flex gap={2}>
        <Box>
          <Link to="seccion">Seccion</Link>
        </Box>
        <Box>
          <Link to="asignaciones">Asignaciones</Link>
        </Box>
        <Box>
          <Link to="proyecto">Proyecto</Link>
        </Box>
        <Box>
          <Link to="perfil">Mi Perfil</Link>
        </Box>
        <Box>
          <Button variant='link'>Salir</Button>
        </Box>
      </Flex>
    </Flex>
  );
}
 
export default EstudianteHeader;