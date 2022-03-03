import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flex,
  Box
} from '@chakra-ui/react'

const Header = () => {
  return (
    <Flex
      py={2}
      justifyContent='space-between'
      alignItems='center'
    >
      <Box fontWeight="700" fontSize="2xl">
        <Link to="/">SERVICIO</Link>
      </Box>
      <Flex gap={2} >
        <Box>
          <Link to="/login">Iniciar Sesion</Link>
        </Box>
        <Box>
          <Link to="registro">Registrarse</Link>
        </Box>
      </Flex>
    </Flex>
  );
}
 
export default Header;