import React from 'react';
import { Link as ReachLink } from 'react-router-dom';
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
        <Link to="/">SERVICIO</Link>
      </Box>
      <Flex gap={2} >
        <Box>
          <Link as={ReachLink} to="/login">Iniciar Sesion</Link>
        </Box>
        <Box>
          <Link as={ReachLink} to="/registro">Registrarse</Link>
        </Box>
      </Flex>
    </Flex>
  );
}
 
export default LandingHeader;