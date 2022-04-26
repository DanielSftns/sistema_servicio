import React, { useRef, useState } from 'react';
import { Formik, Form  } from 'formik';
import Field from '../shared/CustomFieldFormik'
import FormControl from '../shared/FormControl'
import { editProfile } from '../../services/auth.service';

import {
  Heading,
  Button,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  Grid,
  Container
} from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import getBase64 from '../../functions/getBase64';
import { useAuth } from '../../contexts/AuthContext';
import { errorToast, successToast } from '../../functions/toast';

const CompletarRegistro = () => {
  const inputFile = useRef()
  const navigate = useNavigate()
  const [loading, setLoading] = useState()
  const {updateUsuario } = useAuth()

  const handleSave = async (data) =>{
    console.log('data', data)
    setLoading(true)
    const fotoBase64 = await getBase64(data.foto)
    
    editProfile({...data, foto: fotoBase64})
    .then(res => {
      console.info('Perfil completado', res)
      updateUsuario({ perfil_completo: true })
      successToast({
        description: 'Registro completado'
      })

      navigate('/estudiante')
    }).catch(error => {
      errorToast({
        description: error.message,
      })
      setLoading(false)
    })
  }

  return (
    <Container>
      <Heading mb={8}>Completa el registro</Heading>
      <Formik
        initialValues={{
          nombres: '',
          apellidos: '',
          cedula: '',
          especialidad: 'E8',
          telefono: '',
          sexo: '',
          direccion: '',
          foto: ''
        }}

        validate={(values)=>{
          let errors = {}
          
          if(!values.foto){
            errors.foto = 'Debe subir una foto tipo carnet'
          }
          if(!values.sexo){
            errors.sexo = 'Ingrese su sexo'
          }
          if(!values.direccion){
            errors.direccion = 'Ingrese su dirección'
          }
          if(!values.telefono){
            errors.telefono = 'Ingrese su teléfono'
          } else if(!/^\d+$/.test(values.telefono)){
            errors.telefono = 'El teléfono debe ser un número'
          } else if(values.telefono.length !== 11){
            errors.telefono = 'El teléfono debe tener 11 dígitos'
          }

          if(!values.cedula){
            errors.cedula = 'Ingrese su cédula'
          }else if(values.cedula.length <= 5){
            errors.cedula = 'Cédula debe tener al menos 6 dígitos'
          } else if(!/^[0-9]+$/.test(values.cedula)){
            errors.cedula = 'Cédula debe ser solo números'
          } else if(values.cedula.length >= 11){
            errors.cedula = 'Cédula debe tener máximo 10 dígitos'
          }
          if(!values.apellidos){
            errors.apellidos = 'Ingrese sus apellidos'
          }
          if(!values.nombres){
            errors.nombres = 'Ingrese sus nombres'
          }

          return errors
        }}

        onSubmit={handleSave}
      >
        {({ values, setFieldValue })=>(
          <Form>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
              <FormControl errorprop='foto'>
                <FormLabel htmlFor='foto'>Foto</FormLabel>
                <Button onClick={()=> inputFile.current.click()} size='sm' rightIcon={<AddIcon />} variant='outline'>Subir foto</Button>
                <span style={{'marginLeft': '1rem'}}>{values.foto.name || ''}</span>

                <input ref={inputFile} hidden name='foto' type="file" onChange={({currentTarget}) => {
                  if(currentTarget.files && currentTarget.files[0]){
                    setFieldValue('foto', currentTarget.files[0])
                  }
                }}/>
              </FormControl>

              <FormControl errorprop='sexo'>
                <FormLabel>Sexo</FormLabel>

                <RadioGroup onChange={(value)=> setFieldValue('sexo', value)}>
                  <Stack spacing={5} direction='row'>
                    <Radio colorScheme='blue' value='M'>
                      Masculino
                    </Radio>
                    <Radio colorScheme='pink' value='F'>
                      Femenino
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Grid>
            <FormControl errorprop='nombres'>
              <FormLabel htmlFor='nombres'>Nombres</FormLabel>
              <Field name="nombres" type="text" />
            </FormControl>
            <FormControl errorprop='apellidos'>
              <FormLabel htmlFor='apellidos'>Apellidos</FormLabel>
              <Field name='apellidos' type="text" />
            </FormControl>
            <FormControl errorprop='cedula'>
              <FormLabel htmlFor='cedula'>Cedula</FormLabel>
              <Field name='cedula' type="text" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='especialidad'>Especialidad</FormLabel>
              <Field name='especialidad' component='select'>
                <option value='E8'>ingeniería de sistemas</option>
                <option value='E7'>ingeniería de petróleo</option>
                <option value='E6'>licenciado en gerencia de recursos humanos</option>
                <option value='E5'>licenciado en administración</option>
                <option value='E4'>licenciado en contaduría pública</option>
                <option value='E3'>ingeniería de producción animal</option>
                <option value='E2'>ingeniería agronómica</option>
                <option value='E1'>licenciado en tecnología de los alimentos</option>
              </Field>
            </FormControl>
            <FormControl errorprop='direccion'>
              <FormLabel htmlFor='direccion'>Direccion</FormLabel>
              <Field name='direccion' type="text" />
            </FormControl>
            <FormControl errorprop='telefono'>
              <FormLabel htmlFor='telefono'>Telefono</FormLabel>
              <Field name='telefono' type="text" />
            </FormControl>

            <Button disabled={loading} w='100%' size='lg' type='submit'>Guardar</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
 
export default CompletarRegistro;