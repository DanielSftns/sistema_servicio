import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Flex,
  Box,
  Link
} from '@chakra-ui/react'

const LandingHeader = () => {
  return (
    <Flex
      py={2}
      justifyContent='space-between'
      alignItems='center'
      w='100%'
      fontWeight='600'
    >
      <Box fontWeight="700" fontSize="2xl">
        <Link as={NavLink} to="/">SERVICIO</Link>
      </Box>
      <Flex gap={2} >
        <Box>
          <NavLink className='nav-link' to="/login">Iniciar Sesion</NavLink>
        </Box>
        <Box>
          <NavLink className='nav-link' to="/registro">Registrarse</NavLink>
        </Box>
      </Flex>
    </Flex>
  );
}
 
export default LandingHeader;