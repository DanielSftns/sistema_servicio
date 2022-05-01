import React, { useEffect, useState } from 'react';
import {
  Heading,
  Container,
  Button,
  Link
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

import getBase64 from '../../functions/getBase64';
import { errorToast, successToast } from '../../functions/toast';
import { subirInformeCulminacion, getInformeCulminacion } from '../../services/informes.service'

const CumplimientoInforme = () => {
  const [loading, setLoading] = useState(true)
  const [informe, setInforme] = useState(null)

  useEffect(() => {
    const getInforme = async () => {
      try {
        setLoading(true)
        const response = await getInformeCulminacion()
        setInforme(response)
      } finally {
        setLoading(false)
      }
    }
    getInforme()
  }, [])

  const handleSubirInforme = async (event) => {
    const fileBase64 = await getBase64(event.target.files[0])

    setLoading(true)
    subirInformeCulminacion({archivo: fileBase64, nombre_archivo: event.target.files[0].name})
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
            <Button
              colorScheme='teal'
              onClick={()=> document.querySelector(`[data-tipo="grupo-agregar-asignacion"]`).click()}
            >
              Subir informe
            </Button>
            <input type="file" data-tipo='grupo-agregar-asignacion' hidden onChange={handleSubirInforme} />
          </>
        }
        {
          informe &&
            <Link whiteSpace='nowrap' fontWeight='bold' href={informe.archivo} target='_blank' download={true} isExternal>
              {informe.nombre} <ExternalLinkIcon mx='2px' />
            </Link>
        }
      </Container>
    </>
  );
}
 
export default CumplimientoInforme;