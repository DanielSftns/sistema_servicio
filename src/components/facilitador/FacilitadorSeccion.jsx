import React from 'react';
import { Link as ReachLink } from 'react-router-dom';

import {
  Button,
  Text,
  Box
} from '@chakra-ui/react'

const FacilitadorSeccion = () => {
  return (
    <>
      <Box textAlign='center'>
        <Text mb={8}>No tienes secciones a cargo</Text>
        
        <Button as={ReachLink} to="registrar-seccion">Registrar seccion</Button>
      </Box>
    </>
  );
}
 
export default FacilitadorSeccion;