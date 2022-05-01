import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Field from '../shared/CustomFieldFormik'
import FormControl from '../shared/FormControl'

import {
  FormLabel,
  Button,
  Flex,
  Box,
  Heading
} from '@chakra-ui/react'
import LandingHeader from '../landing/LandingHeader';
import { register, login } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { errorToast } from '../../functions/toast';

const Register = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = (data)=> {  
    setLoading(true)
    register(data)
    .then(async res => {
      console.info(res)
      await login(data)
      navigate('/perfil')
    }).catch(error => {
      console.error(error.message)
      errorToast({
        description: error.message,
      })
    }).finally(()=>{
      setLoading(false)
    })
  }

  return (
    <>
      <LandingHeader />
      <Flex 
        minH='100vh'
        align='center'
        justify='center'
      >
        <Box w='100%' maxW={500}>
          <Heading align='center' mb={8}>Registrarse</Heading>

          <Formik
            initialValues={{
              email: '',
              password: '',
              password2: ''
            }}
            validate={(values)=>{
              let errors = {}
              if(!values.email){
                errors.email = 'Ingrese un correo'
              }

              if(!values.password){
                errors.password = 'Ingrese una contraseña'
              }else if(values.password !== values.password2){
                errors.password2 = 'Contraseña no coincide'
              }

              return errors
            }}
            onSubmit={handleRegister}
          >
            <Form>
              <FormControl errorprop='email'>
                <FormLabel htmlFor='email'>Correo</FormLabel>
                <Field name='email' type='email' />
              </FormControl>
              <FormControl errorprop='password'>
                <FormLabel htmlFor='email'>Contraseña</FormLabel>
                <Field name='password' type='password' />
              </FormControl>
              <FormControl errorprop='password2'>
                <FormLabel htmlFor='email'>Repetir contraseña</FormLabel>
                <Field name='password2' type='password' />
              </FormControl>

              <Button disabled={loading} w='100%' size='lg' type='submit'>Crear cuenta</Button>
            </Form>
          </Formik>
        </Box>
      </Flex>
    </>
  );
}

export default Register;