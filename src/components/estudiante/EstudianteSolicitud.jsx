import React, { useEffect, useState, useRef } from 'react';
import { Formik, Form  } from 'formik';
import FormControl from '../shared/FormControl'
import { errorToast, successToast } from '../../functions/toast';

import {
  Heading,
  Container,
  Box,
  Text,
  Button,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  Spinner
} from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'

import { obtenerMiSolicitud, crearSolicitud } from '../../services/solicitudes.service';
import getBase64 from '../../functions/getBase64';
import { formatFecha } from '../../functions/formatFecha';

const EstudianteSolicitud = () => {
  const [solicitud, setSolicitud] = useState()
  const [loading, setLoading] = useState(true)
  const inputFile = useRef()

  useEffect(()=>{
    const get = async ()=> {
      obtenerMiSolicitud()
      .then((solicitudes)=>{
        const solicitud = solicitudes.filter(solicitud => solicitud.estado === 'por aprobar' || solicitud.estado === 'aprobado')[0]
        setSolicitud(solicitud)
      }).finally(()=>{
        setLoading(false)
      })
    }

    get()
  }, [])

  const handleSubmit = async (values)=> {
    let data
    if(values.archivos){
      const archivos = []
      do {
        const archivo = values.archivos[archivos.length]
        const fileBase64 = await getBase64(archivo)
        archivos.push({
          archivo: fileBase64,
          nombre_archivo: archivo.name
        })
      } while (archivos.length < values.archivos.length);
      console.log(archivos)
      data = {archivos, tipo: values.tipo}
    }else {
      data = {tipo: values.tipo}
    }
    try {
      setLoading(true)
      await crearSolicitud(data)
      successToast({
        description: 'Solicitud creada',
      })
    } catch (error) {
      errorToast({
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  if(loading){
    return <Spinner />
  }

  return (
    <>
      <Heading mb={12}>Solicitud de proyecto</Heading>
      <Container>
        {
         !solicitud && <Box>
           <Text mb={8}>No tienes solicitudes abiertas, crea una solicitud</Text>
           <Formik
            initialValues={{
              tipo: '',
              archivos: ''
            }}
            validate={(values)=> {
              let errors = {}
              
              if(!values.tipo){
                errors.tipo = 'Debe elegir uno'
              }
              if(values.tipo === 'proyecto' && !values.archivos){
                errors.archivos = 'Debe adjuntar archivos'
              }
              return errors
            }}
            onSubmit={handleSubmit}
           >
            {({values, setFieldValue})=> (
              <Form>
                <FormControl errorprop='tipo'>
                  <FormLabel>Seleccionar tipo</FormLabel>
                  <RadioGroup onChange={(value)=> setFieldValue('tipo', value)}>
                    <Stack spacing={5} direction='row'>
                      <Radio value='macroproyecto'>
                        Macroproyecto
                      </Radio>
                      <Radio value='proyecto'>
                        Proyecto
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                {
                  values.tipo === 'proyecto' &&
                  <FormControl errorprop='archivos'>
                    <FormLabel htmlFor='archivos'>Adjuntar archivos</FormLabel>
                    <Button onClick={()=> inputFile.current.click()} size='sm' mb={4} rightIcon={<AddIcon />} variant='outline'>Subir archivos</Button>
                    <Box>
                      {
                        values.archivos && values.archivos.map((archivo, i) => (
                          <p key={i}>{archivo.name}</p>
                        ))
                      }
                    </Box>

                    <input ref={inputFile} hidden name='archivos' type="file" multiple onChange={({currentTarget}) => {
                      setFieldValue("archivos", [...currentTarget.files]);
                    }}/>
                  </FormControl>
                }

                <Button type='submit'>Crear solicitud</Button>
              </Form>
            )}
           </Formik>
         </Box>
        }
        {
          solicitud && <Box>
            <Box mb={4}>
              {
                solicitud.estado === 'aprobado' && <Text>Tu solicitud fue aprobada</Text>
              }
              {
                solicitud.estado === 'por aprobar' && <Text>Tu solicitud esta siendo revisada</Text>
              }
            </Box>

            <Heading size='sm'>{solicitud.tipo}</Heading>
            <Text>Estatus: {solicitud.estado}</Text>
            <Text>Fecha creaci??n: {formatFecha(solicitud.fecha)}</Text>
          </Box>
        }
      </Container>
    </>
  );
}
 
export default EstudianteSolicitud;