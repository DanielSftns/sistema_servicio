import React, { useEffect, useState } from 'react';
import EstudianteCompletarRegistro from './EstudianteCompletarRegistro';

import {
  Heading,
  Box,
  Image,
  FormLabel,
  Button,
  Input,
  Container,
  Spinner
} from '@chakra-ui/react'
import { useAuth } from '../../contexts/AuthContext';
import { getProfile, editProfile } from '../../services/auth.service';

import { Formik, Form  } from 'formik';
import Field from '../shared/CustomFieldFormik'
import FormControl from '../shared/FormControl'
import getBase64 from '../../functions/getBase64';
import { errorToast, successToast } from '../../functions/toast';

const EstudiantePerfil = () => {
  const { updateUsuario } = useAuth()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState()
  const [photo, setPhoto] = useState()
  const [newPhoto, setNewPhoto] = useState()

  useEffect(()=>{
    const get = async () => {
      const resUserData = await getProfile()
      setUserData(resUserData)
      console.log(resUserData)
      updateUsuario(resUserData)
      setPhoto(resUserData.foto)
      setLoading(false)
    }

    get()
  }, [updateUsuario])

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

  const handleSetPhoto = async (img)=> {
    const fotoBase64 = await getBase64(img)
    setPhoto(fotoBase64)
    setNewPhoto(fotoBase64)
  }

  if(loading){
    return <Spinner />
  }

  return (
    <>
      <Heading size='md' mb={8}>Perfil</Heading>

      {
        userData.perfil_completo
        ? <Container>
          <Formik
            initialValues={{
              telefono: userData.telefono,
              direccion: userData.direccion,
              foto: ''
            }}
            validate={(values)=>{
              let errors = {}
              
              if(!values.telefono){
                errors.telefono = 'Ingrese su teléfono'
              } else if(!/^\d+$/.test(values.telefono)){
                errors.telefono = 'El teléfono debe ser un número'
              } else if(values.telefono.length !== 11){
                errors.telefono = 'El teléfono debe tener 11 dígitos'
              }

              if(!values.direccion){
                errors.direccion = 'Ingrese su dirección'
              } else if(values.direccion.length < 10){
                errors.direccion = 'La dirección debe tener al menos 10 caracteres'
              }

              return errors
            }}
            onSubmit={(values) => {
              const data = {...values}
              if(!data.foto){
                delete data.foto
              }

              handleSave(data)
            }}
          >
            {({values, setFieldValue})=> (
              <Form>
                <Box textAlign='center'>
                  <label>
                    <Image cursor='pointer' d='inline-block' borderRadius='full' boxSize='150px' objectFit='cover' src={photo} alt="perfil" />
                    <input hidden name='foto' type="file" onChange={({currentTarget}) => {
                      setFieldValue("foto", currentTarget.files[0]);
                      handleSetPhoto(currentTarget.files[0])
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
                  <Input variant='flushed' value={userData.especialidad_nombre} type='text' />
                </FormControl>
                <FormControl errorprop='direccion'>
                  <FormLabel htmlFor='direccion'>Direccion</FormLabel>
                  <Field name='direccion' type="text" />
                </FormControl>
                <FormControl errorprop='telefono'>
                  <FormLabel htmlFor='telefono'>Telefono</FormLabel>
                  <Field name='telefono' type="text" />
                </FormControl>

                <Button disabled={loading || (values.telefono === userData.telefono && values.direccion === userData.direccion && !newPhoto)} w='100%' size='lg' type='submit'>Guardar</Button>
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