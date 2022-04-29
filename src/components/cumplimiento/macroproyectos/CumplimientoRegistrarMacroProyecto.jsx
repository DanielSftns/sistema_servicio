import React, { useState } from 'react';
import { Formik, Form  } from 'formik';
import Field from '../../shared/CustomFieldFormik'
import FormControl from '../../shared/FormControl'
import { successToast, errorToast } from '../../../functions/toast';
import { SwalModal } from '../../../functions/sweetAlertCommon';
import { useNavigate } from 'react-router-dom';
import { registerMacroProyecto } from '../../../services/macroproyectos.service';
import {
  Heading,
  FormLabel,
  Button,
  Container
} from '@chakra-ui/react'

const CumplimientoRegistrarMacroProyecto = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSave = (values) => {
    console.log(values)
    SwalModal.fire({
      title:'Confirmar registro',
      text:'Esto no es reversible',
      confirmButtonText: 'Crear Macro Proyecto',
    }).then(result => {
      if(result.isConfirmed){
        setLoading(true)
    
        registerMacroProyecto(values)
        .then(()=> {
          successToast({
            title: `Macro Proyecto ${values.codigo} registrado`,
          })
          navigate('/tutor/macroproyectos/' + values.codigo)
        }).catch(error =>{
          errorToast({
            description: error.message,
          })
          setLoading(false)
        })
      }
    })
  }

  if(loading){
    return <p>loading...</p>
  }

  return (
    <Container>
      <Heading mb={8}>Registrar Macro Proyecto</Heading>
      <Formik
        initialValues={{
          codigo: '',
          titulo: '',
        }}
        validate={(values)=> {
          let errors = {}

          if(!values.codigo){
            errors.codigo = 'Esto es requerido'
          }
          if(!values.titulo){
            errors.titulo = 'Esto es requerido'
          }

          return errors
        }}
        onSubmit={handleSave}
      >
        <Form>
          <FormControl errorprop='codigo'>
            <FormLabel htmlFor=''>Codigo</FormLabel>
            <Field name='codigo' type='text' />
          </FormControl>
          <FormControl errorprop='titulo'>
            <FormLabel htmlFor=''>Titutlo</FormLabel>
            <Field name='titulo' type='text' />
          </FormControl>

          <Button disabled={loading} w='100%' size='lg' type='submit'>Registrar</Button>
        </Form>
      </Formik>
    </Container>
  );
}
 
export default CumplimientoRegistrarMacroProyecto;