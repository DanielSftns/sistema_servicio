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
  Radio
} from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'

import { obtenerMiSolicitud, crearSolicitud } from '../../services/solicitudes.service';
import getBase64 from '../../functions/getBase64';

const EstudianteSolicitud = () => {
  const [solicitud, setSolicitud] = useState()
  const [loading, setLoading] = useState(true)
  const inputFile = useRef()

  useEffect(()=>{
    const get = async ()=> {
      obtenerMiSolicitud()
      .then((solicitud)=>{
        console.log({solicitud})
        setSolicitud(solicitud)
      }).finally(()=>{
        setLoading(false)
      })
    }

    get()
  }, [])

  const handleSubmit = async (values)=> {
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
    try {
      setLoading(true)
      await crearSolicitud({archivos, tipo: values.tipo})
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
    return <p>Loading...</p>
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
            <Text mb={4}>Tienes una solicitud creada, espera por su revisión</Text>

            <Heading size='sm'>{solicitud.tipo}</Heading>
            <Text>Estatus: {solicitud.estado}</Text>
            <Text>Fecha creación: {Date(solicitud.fecha)}</Text>
          </Box>
        }
      </Container>
    </>
  );
}
 
export default EstudianteSolicitud;