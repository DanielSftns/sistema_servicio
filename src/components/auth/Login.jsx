import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth.service';
import { Formik, Form  } from 'formik';
import Field from '../shared/CustomFieldFormik'
import FormControl from '../shared/FormControl'

import {
  FormLabel,
  Button,
  Flex,
  Box,
  Heading,
  useToast
} from '@chakra-ui/react'
import LandingHeader from '../landing/LandingHeader';

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const toast = useToast()


  const handleLogin = (values)=>{
    setLoading(true)
    login(values)
    .then((res)=> {
      console.info(res)
      navigate('/estudiante/perfil')
      toast({
        title: 'Bienvenido',
        description: res.email,
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      })
    }).catch(error => {
      console.error(error.messaje)
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
          <Heading align='center' mb={8}>Iniciar Sesión</Heading>

          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validate={(values)=>{
              let errors = {}
              if(!values.email){
                errors.email = 'Ingrese un correo'
              }

              return errors
            }}
            onSubmit={handleLogin}
          >
            <Form>
              <FormControl errorProp='email'>
                <FormLabel htmlFor='email'>Correo</FormLabel>
                <Field name='email' type='email' />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='email'>Contraseña</FormLabel>
                <Field name='password' type='password' />
              </FormControl>

              <Button disabled={loading} w='100%' size='lg' type='submit'>Entrar</Button>
            </Form>
          </Formik>
        </Box>
      </Flex>
    </>
  );
}
 
export default Login;