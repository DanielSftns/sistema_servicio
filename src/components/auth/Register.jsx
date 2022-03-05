import React from 'react';
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
          >
            <Form>
              <FormControl errorProp='email'>
                <FormLabel htmlFor='email'>Correo</FormLabel>
                <Field name='emails' type='email' />
              </FormControl>
              <FormControl errorProp='password'>
                <FormLabel htmlFor='email'>Contraseña</FormLabel>
                <Field name='password' type='password' />
              </FormControl>
              <FormControl errorProp='password2'>
                <FormLabel htmlFor='email'>Repetir contraseña</FormLabel>
                <Field name='password2' type='password' />
              </FormControl>

              <Button w='100%' size='lg' type='submit'>Crear cuenta</Button>
            </Form>
          </Formik>
        </Box>
      </Flex>
    </>
  );
}

export default Register;