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
  Heading
} from '@chakra-ui/react'
import LandingHeader from '../landing/LandingHeader';
import { errorToast, successToast } from '../../functions/toast';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { clearUsuario } = useAuth()
  const handleLogin = (values)=>{
    setLoading(true)
    login(values)
    .then((res)=> {
      console.info(res)
      clearUsuario(res)
      let nextPage
      switch(res.rol_name){
        case 'estudiante': {
          nextPage = res.perfil_completo ? '/estudiante' : '/estudiante/perfil'
          break
        }
        case 'facilitador': {
          nextPage = '/facilitador'
          break
        }
        case 'tutor etapa cumplimiento': {
          nextPage = '/proyectos'
          break
        }

        default: {
          nextPage = '/estudiante'
        }
      }
      successToast({
        title: 'Bienvenido',
        description: res.email
      })
      
      navigate(nextPage)
    }).catch(error => {
      console.error(error.message)
      setLoading(false)
      errorToast({
        description: error.message,
      })
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
              if(!values.password){
                errors.password = 'Ingrese su contraseña'
              }

              return errors
            }}
            onSubmit={handleLogin}
          >
            <Form>
              <FormControl errorprop='email'>
                <FormLabel htmlFor='email'>Correo</FormLabel>
                <Field name='email' type='email' />
              </FormControl>
              <FormControl errorprop='password'>
                <FormLabel htmlFor='password'>Contraseña</FormLabel>
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