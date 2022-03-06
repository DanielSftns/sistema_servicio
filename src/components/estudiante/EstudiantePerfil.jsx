import React from 'react';
import EstudianteCompletarRegistro from './EstudianteCompletarRegistro';

import {
  Heading
} from '@chakra-ui/react'
import { useAuth } from '../../contexts/AuthContext';

const EstudiantePerfil = () => {
  const { usuario } = useAuth()
  const perfil_completo = usuario?.perfil_completo

  return (
    <>
      <Heading size='md' mb={8}>Perfil</Heading>

      {
        perfil_completo
        ? <h2>(registro completo) Informacion del perfil</h2>
        : <EstudianteCompletarRegistro />
      }
    </>
  );
}
 
export default EstudiantePerfil;