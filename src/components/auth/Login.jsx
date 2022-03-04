import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth.service';
import { Formik, Form } from 'formik';
import Field from '../shared/CustomFieldFormik'
import {
  FormControl,
  FormLabel,
  Button,
  Flex,
  Box,
  Heading
} from '@chakra-ui/react'
import LandingHeader from '../landing/LandingHeader';

const Login = () => {
  const navigate = useNavigate()

  const handleLogin = (values)=>{
    const { email, passsword } = values
    login(email, passsword)
    navigate('/estudiante')
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
            onSubmit={handleLogin}
          >
            <Form>
              <FormControl>
                <FormLabel htmlFor='email'>Correo</FormLabel>
                <Field name='email' type='email' />
              </FormControl>
              <FormControl mb={8}>
                <FormLabel htmlFor='email'>Contraseña</FormLabel>
                <Field name='password' type='password' />
              </FormControl>

              <Button w='100%' colorScheme='blue' size='lg' type='submit'>Entrar</Button>
            </Form>
          </Formik>
        </Box>
      </Flex>
    </>
  );
}
 
export default Login;