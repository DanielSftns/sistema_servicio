import React, { useEffect, useState } from 'react';
import { Link as ReachLink } from 'react-router-dom';

import { getSecciones } from '../../services/facilitador.service';

import {
  Button,
  Text,
  Box
} from '@chakra-ui/react'

const FacilitadorSeccion = () => {
  const [loading, setLoading] = useState(true)
  const [secciones, setSecciones] = useState()

  useEffect(()=>{
    const get = async ()=> {
      const secciones = await getSecciones()
      console.log({secciones})
      setSecciones(secciones)
      setLoading(false)
    }

    get()
  }, [])

  if(loading && !secciones){
    return <p>loading</p>
  }

  if(secciones.length === 0){
    return (
      <Box textAlign='center'>
        <Text mb={8}>No tienes secciones a cargo</Text>
        <Button as={ReachLink} to="registrar-seccion">Registrar seccion</Button>
      </Box>
    )
  }

  return (
    <>
      <Button as={ReachLink} to="registrar-seccion">Registrar seccion</Button>
    </>
  );
}
 
export default FacilitadorSeccion;