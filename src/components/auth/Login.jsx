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
          nextPage = res.perfil_completo ? '/seccion' : '/perfil'
          break
        }
        case 'facilitador': {
          nextPage = '/profesor/seccion'
          break
        }
        case 'tutor academico': {
          nextPage = '/profesor/tutor/proyectos'
          break
        }
        case 'tutor etapa cumplimiento': {
          nextPage = '/profesor/proyectos'
          break
        }
        case 'coordinador escuela': {
          nextPage = '/profesor/proyectos'
          break
        }
        case 'jefe servicio': {
          nextPage = '/profesor/proyectos'
          break
        }
        case 'coordinador academico': {
          nextPage = '/profesor/estadisticas'
          break
        }
        case 'admin': {
          nextPage = '/profesor/proyectos'
          break
        }

        default: {
          nextPage = '/seccion'
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
          <Heading align='center' mb={8}>Iniciar Sesi??n</Heading>

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
                errors.password = 'Ingrese su contrase??a'
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
                <FormLabel htmlFor='password'>Contrase??a</FormLabel>
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