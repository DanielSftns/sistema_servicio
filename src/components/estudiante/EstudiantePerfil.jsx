import React, { useEffect, useState } from 'react';
import EstudianteCompletarRegistro from './EstudianteCompletarRegistro';

import {
  Heading,
  Box,
  Image,
  FormLabel,
  Button,
  Input,
  Container
} from '@chakra-ui/react'
import { useAuth } from '../../contexts/AuthContext';
import { getProfile, editProfile } from '../../services/estudiante.service';

import { Formik, Form  } from 'formik';
import Field from '../shared/CustomFieldFormik'
import FormControl from '../shared/FormControl'
import getBase64 from '../../functions/getBase64';
import { errorToast, successToast } from '../../functions/toast';

const EstudiantePerfil = () => {
  const { usuario } = useAuth()
  const perfil_completo = usuario?.perfil_completo

  const [loading, setLoading] = useState(perfil_completo)
  const [userData, setUserData] = useState()

  useEffect(()=>{
    const get = async () => {
      const resUserData = await getProfile()
      setUserData(resUserData)
      console.log(resUserData)
      setLoading(false)
    }

    get()
  }, [])

  const handleSave = async (values) =>{
    console.log('data', values)
    setLoading(true)
    const data = { ...values }
    if(values.foto){
      const fotoBase64 = await getBase64(data.foto)
      data.foto = fotoBase64
    }
    
    editProfile(data)
    .then(() => {
      successToast({
        description: 'Perfil actualizado',
      })
    }).catch(error => {
      errorToast({
        description: error.message,
      })
    }).finally(()=>{
      setLoading(false)
    })
  }

  if(loading){
    return <p>Loading</p>
  }

  return (
    <>
      <Heading size='md' mb={8}>Perfil</Heading>

      {
        perfil_completo
        ? <Container>
          <Formik
            initialValues={{
              telefono: userData.telefono,
              direccion: userData.direccion,
              foto: ''
            }}
            onSubmit={(values) => {
              const data = {...values}
              if(!data.foto){
                delete data.foto
              }

              handleSave(data)
            }}
          >
            {({setFieldValue})=> (
              <Form>
                <Box textAlign='center'>
                  <label>
                    <Image cursor='pointer' d='inline-block' borderRadius='full' boxSize='150px' objectFit='cover' src={userData.foto} alt="perfil" />
                    <input hidden name='foto' type="file" onChange={({currentTarget}) => {
                      setFieldValue("foto", currentTarget.files[0]);
                    }} />
                  </label>
                </Box>

                <FormControl isReadOnly>
                  <FormLabel htmlFor='nombres'>Nombres</FormLabel>
                  <Input variant='flushed' value={userData.nombres} type="text" />
                </FormControl>
                <FormControl isReadOnly>
                  <FormLabel htmlFor='apellidos'>Apellidos</FormLabel>
                  <Input variant='flushed' value={userData.apellidos} type="text" />
                </FormControl>
                <FormControl isReadOnly>
                  <FormLabel htmlFor='cedula'>Cedula</FormLabel>
                  <Input variant='flushed' value={userData.cedula} type="text" />
                </FormControl>
                <FormControl isReadOnly>
                  <FormLabel htmlFor='sexo'>Sexo</FormLabel>
                  <Input variant='flushed' value={userData.sexo === 'M'? 'Masculino' : 'Femenino'} type="text" />
                </FormControl>
                <FormControl isReadOnly>
                  <FormLabel htmlFor='especialidad'>Especialidad</FormLabel>
                  <Input variant='flushed' value={userData.especialidades_nombre} type='text' />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='direccion'>Direccion</FormLabel>
                  <Field name='direccion' type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='telefono'>Telefono</FormLabel>
                  <Field name='telefono' type="text" />
                </FormControl>

                <Button disabled={loading} w='100%' size='lg' type='submit'>Guardar</Button>
              </Form>
            )}
          </Formik>

        </Container>
        : <EstudianteCompletarRegistro />
      }
    </>
  );
}
 
export default EstudiantePerfil;