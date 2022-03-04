import React from 'react';
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

const Register = () => {
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
          >
            <Form>
              <FormControl>
                <FormLabel htmlFor='email'>Correo</FormLabel>
                <Field name='email' type='email' />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='email'>Contraseña</FormLabel>
                <Field name='password' type='password' />
              </FormControl>
              <FormControl mb={8}>
                <FormLabel htmlFor='email'>Repetir contraseña</FormLabel>
                <Field name='password2' type='password' />
              </FormControl>

              <Button w='100%' colorScheme='blue' size='lg' type='submit'>Crear cuenta</Button>
            </Form>
          </Formik>
        </Box>
      </Flex>
    </>
  );
}
 
export default Register;