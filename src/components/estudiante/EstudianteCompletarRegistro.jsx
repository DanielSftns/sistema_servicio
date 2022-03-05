import React, { useRef } from 'react';
import { Formik, Form  } from 'formik';
import Field from '../shared/CustomFieldFormik'
import FormControl from '../shared/FormControl'
// import { completeRegister } from '../../services/estudiante.service';

import {
  Heading,
  Button,
  FormLabel,
  Box,
  RadioGroup,
  Stack,
  Radio,
  Grid
} from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';

const CompletarRegistro = () => {
  const inputFile = useRef()
  const navigate = useNavigate()
  const handleSave = (data) =>{
    console.log('data', data)
    // completeRegister(data)
    navigate('/estudiante')
  }

  return (
    <Box maxW={800} m='auto'>
      <Heading mb={8}>Completa el registro</Heading>
      <Formik
        initialValues={{
          nombres: '',
          apellidos: '',
          cedula: '',
          especialidad: '',
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

          return errors
        }}

        onSubmit={handleSave}
      >
        {({ values, setFieldValue })=>(
          <Form>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
              <FormControl errorProp='foto'>
                <FormLabel htmlFor='foto'>Foto</FormLabel>
                <Button onClick={()=> inputFile.current.click()} size='sm' rightIcon={<AddIcon />} variant='outline'>Subir foto</Button>
                <span style={{'marginLeft': '1rem'}}>{values.foto.name || ''}</span>

                <input ref={inputFile} hidden name='foto' type="file" onChange={({currentTarget}) => {
                  setFieldValue("foto", currentTarget.files[0]);
                }}/>
              </FormControl>

              <FormControl errorProp='sexo'>
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
            <FormControl>
              <FormLabel htmlFor='nombres'>Nombres</FormLabel>
              <Field name="nombres" type="text" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='apellidos'>Apellidos</FormLabel>
              <Field name='apellidos' type="text" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='cedula'>Cedula</FormLabel>
              <Field name='cedula' type="text" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='especialidad'>Especialidad</FormLabel>
              <Field name='especialidad' type="text" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='direccion'>Direccion</FormLabel>
              <Field name='direccion' type="text" />
            </FormControl>
            <FormControl mb={12}>
              <FormLabel htmlFor='telefono'>Telefono</FormLabel>
              <Field name='telefono' type="text" />
            </FormControl>

            <Button w='100%' size='lg' type='submit'>Guardar</Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
 
export default CompletarRegistro;