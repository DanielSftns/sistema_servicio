import React from 'react';
import EstudianteCompletarRegistro from './EstudianteCompletarRegistro';

import {
  Heading
} from '@chakra-ui/react'

const EstudiantePerfil = () => {
  const registroCompleto = false

  return (
    <>
      <Heading size='md' mb={8}>Perfil</Heading>

      {
        registroCompleto
        ? <h2>(registro completo) Informacion del perfil</h2>
        : <EstudianteCompletarRegistro />
      }
    </>
  );
}
 
export default EstudiantePerfil;