import React, { useEffect, useState } from 'react';
import {
  Heading,
  Container,
  Button,
  Link,
  Select,
  FormLabel,
  Box
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

import getBase64 from '../../functions/getBase64';
import { errorToast, successToast } from '../../functions/toast';
import { subirInformeCulminacion, getInformeCulminacion } from '../../services/informes.service'
import { useAuth } from '../../contexts/AuthContext';

const CumplimientoInforme = () => {
  const [loading, setLoading] = useState(true)
  const [informe, setInforme] = useState(null)
  const { usuario } = useAuth()
  const [escuela, setEscuela] = useState(usuario.escuela_codigo)

  useEffect(() => {
    const getInforme = async () => {
      try {
        setLoading(true)
        const response = await getInformeCulminacion()
        setInforme(response[0])
      } finally {
        setLoading(false)
      }
    }
    getInforme()
  }, [])

  const handleSubirInforme = async (event) => {
    if(!escuela) {
      errorToast({
        title: 'Error',
        description: 'Debe seleccionar una escuela'
      })
      return
    }
    const fileBase64 = await getBase64(event.target.files[0])

    setLoading(true)
    subirInformeCulminacion({archivo: fileBase64, escuela, nombre_archivo: event.target.files[0].name})
    .then(()=>{
      successToast({
        description: 'Informe subido correctamente'
      })
    })
    .catch((error)=>{
      errorToast({
        description: error.message
      })
    })
    .finally(()=>{
      setLoading(false)
    })
  }

  if(loading) {
    return <p>loading...</p>
  }

  return (
    <>
      <Heading mb={8}>Informe culminacion</Heading>
      <Container>
        {
          !informe && 
          <>
            {
              !usuario.escuela_codigo &&
              <Box mb={8}>
                <FormLabel>Seleccione una escuela</FormLabel>
                <Select onChange={(e)=> setEscuela(e.target.value)}>
                  <option value=''>Seleccionar</option>
                  <option value='eica'>Escuela de Ingeniería de Ciencias Aplicadas</option>
                  <option value='ecsa'>Escuelas de Ciencias Sociales y Administrativas</option>
                  <option value='zootecnia'>Escuela de Zootecnia</option>
                </Select>
              </Box>
            }
            <Button
              colorScheme='teal'
              onClick={()=> document.querySelector(`[data-tipo="informe-culminacion-subir"]`).click()}
            >
              Subir informe
            </Button>
            <input type="file" data-tipo='informe-culminacion-subir' hidden onChange={handleSubirInforme} />
          </>
        }
        {
          informe &&
          <>
            <Heading as='h3' mb={4} size='lg' textTransform='uppercase'>{informe.escuela_codigo} - {informe.periodo}</Heading>
            <Link whiteSpace='nowrap' fontWeight='bold' href={informe.archivo.archivo} target='_blank' download={true} isExternal>
              Informe: {informe.archivo.nombre} <ExternalLinkIcon mx='2px' />
            </Link>
          </>
        }
      </Container>
    </>
  );
}
 
export default CumplimientoInforme;