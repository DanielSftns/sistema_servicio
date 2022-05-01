import React, { useEffect, useState } from 'react';
import {
  Heading,
  Container,
  Link,
  Box
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

import { errorToast } from '../../functions/toast';
import { getInformesCulminacion } from '../../services/informes.service'

const CoordinadorInformes = () => {
  const [loading, setLoading] = useState(true)
  const [informes, setInformes] = useState([])
  
  useEffect(() => {
    const getInforme = async () => {
      try {
        setLoading(true)
        const response = await getInformesCulminacion()
        setInformes(response)
      } catch (error) {
        errorToast({
          title: 'Error',
          description: error.message
        })
      } finally {
        setLoading(false)
      }
    }
    getInforme()
  }, [])

  if(loading) {
    return <p>loading...</p>
  }

  return (
    <>
      <Heading mb={8}>Informes culminacion</Heading>
      <Container>
        {
          informes.map((informe) => (
            <Box key={informe.id} mb={6}>
              <Heading as='h3' mb={4} size='lg' textTransform='uppercase'>{informe.escuela_codigo} - {informe.periodo}</Heading>
              <Link whiteSpace='nowrap' fontWeight='bold' href={informe.archivo.archivo} target='_blank' download={true} isExternal>
                Informe: {informe.archivo.nombre} <ExternalLinkIcon mx='2px' />
              </Link>
            </Box>
          ))
        }
      </Container>
    </>
  );
}
 
export default CoordinadorInformes;