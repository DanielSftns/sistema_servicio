import React, { useState, useEffect } from 'react';
import { Formik, Form  } from 'formik';
import Field from '../../shared/CustomFieldFormik'
import FormControl from '../../shared/FormControl'
import { successToast, errorToast } from '../../../functions/toast';
import { SwalModal } from '../../../functions/sweetAlertCommon';
import { registerProyecto } from '../../../services/proyectos.service';
import { getEstudiantesFaseFormativaAprobada } from '../../../services/estudiante.service';
import { useNavigate } from 'react-router-dom';

import {
  Heading,
  FormLabel,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Container,
  Spinner
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const CumplimientoRegistrarProyecto = () => {
  const [loading, setLoading] = useState(true)
  const [seleccionados, setSeleccionados] = useState([])
  const [estudiantes, setEstudiantes] = useState()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    const getInfo = async ()=> {
      try {
        const estudiantes = await getEstudiantesFaseFormativaAprobada()
        setEstudiantes(estudiantes)
        setLoading(false)
      } catch (error) {
        errorToast({
          description: error.message
        })
      }
    }

    getInfo()
  }, [])

  const handleSelect = (cedula) => {
    const [ estudiante ] = estudiantes.concat(seleccionados).filter(student => student.cedula === cedula) 
    const newSeleccionados = seleccionados.map(selected => selected)
    const newEstudiantes = estudiantes.map(student => student)

    // si esta elegido
    if(seleccionados.some(student => student.cedula === cedula)){
      // se quita de elegidos
      const id = newSeleccionados.findIndex((student) => student.cedula === cedula)
      newSeleccionados.splice(id,  1)
      // se agrega a listado
      newEstudiantes.push(estudiante)
    } else{
      // se quita de listado
      const id = newEstudiantes.findIndex((student) => student.cedula === cedula)
      newEstudiantes.splice(id,  1)
      // se agrega a elegidos
      newSeleccionados.push(estudiante)
    }

    setSeleccionados(newSeleccionados)
    setEstudiantes(newEstudiantes)
  }

  const handleSave = (values) => {
    console.log(values)

    if(seleccionados.length === 0){
      errorToast({
        description: 'No se puede registrar sin estudiantes'
      })
      return
    }

    SwalModal.fire({
      title:'Confirmar registro',
      text:'Esto no es reversible',
      confirmButtonText: 'Crear proyecto',
    }).then(result => {
      if(result.isConfirmed){
        setLoading(true)
        const estudiantes = seleccionados.map(estudiante => estudiante.cedula)
        const data = {...values, estudiantes}
        console.log(data)
    
        registerProyecto(data)
        .then(()=> {
          successToast({
            title: `Proyecto ${values.codigo} registrado`,
          })
          navigate('/tutor/proyectos')
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
    return <Spinner />
  }

  return (
    <Container>
      <Heading mb={8}>Registrar proyecto</Heading>
      <Formik
        initialValues={{
          codigo: '',
          titulo: '',
          especialidad: ''
        }}
        validate={(values)=> {
          let errors = {}

          if(!values.codigo){
            errors.codigo = 'Esto es requerido'
          }
          if(!values.titulo){
            errors.titulo = 'Esto es requerido'
          }
          if(!values.especialidad){
            errors.especialidad = 'Esto es requerido'
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
          <FormControl errorprop='especialidad'>
            <FormLabel htmlFor='especialidad'>Especialidad</FormLabel>
            <Field name='especialidad' component='select'>
              <option value=''>Seleccionar</option>
              <option value='E8'>ingenier??a de sistemas</option>
              <option value='E7'>ingenier??a de petr??leo</option>
              <option value='E6'>licenciado en gerencia de recursos humanos</option>
              <option value='E5'>licenciado en administraci??n</option>
              <option value='E4'>licenciado en contadur??a p??blica</option>
              <option value='E3'>ingenier??a de producci??n animal</option>
              <option value='E2'>ingenier??a agron??mica</option>
              <option value='E1'>licenciado en tecnolog??a de los alimentos</option>
            </Field>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='tutor'>Estudiantes</FormLabel>
            <Stack direction={['column', 'row']} spacing='24px'>
              <Box w='100%'>
                <InputGroup mb={8} maxW={300}>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                  />
                  <Input value={search} onChange={({currentTarget})=> setSearch(currentTarget.value)} variant='flushed' type="search" placeholder='Buscar por cedula' />
                </InputGroup>

                <Box h={200} overflow='auto'>
                  {
                    estudiantes.map((estudiante, i)=> (
                      <Stack
                        userSelect='none'
                        cursor='pointer'
                        bg={ i % 2 === 0? 'gray.100' : 'gray.200'}
                        padding={2}
                        _hover={{
                          bg: 'blue.100'
                        }}
                        display={search.length <= 3 || estudiante.cedula.includes(search)? 'flex' : 'none'}
                        spacing={2}
                        direction='row'
                        onClick={()=> handleSelect(estudiante.cedula)}
                        key={i}
                      >
                        <p>{estudiante.cedula}</p>
                        <p> - </p>
                        <p>{estudiante.nombres} {estudiante.apellidos}</p>
                      </Stack>
                    ))
                  }
                </Box>
              </Box>
              <Box w='100%'>
                <Heading mb={12} textAlign='center' size='sm' >Seleccionados</Heading>
                <Box h={200} overflow='auto'>
                  {
                    seleccionados.map((estudiante, i)=> (
                      <Stack 
                        userSelect='none'
                        cursor='pointer'
                        bg={ i % 2 === 0? 'green.100' : 'green.200'}
                        padding={2}
                        _hover={{
                          bg: 'red.100'
                        }}
                        spacing={2}
                        direction='row'
                        onClick={()=> handleSelect(estudiante.cedula)}
                        key={i}
                      >
                        <p>{estudiante.cedula}</p>
                        <p> - </p>
                        <p>{estudiante.nombres} {estudiante.apellidos}</p>
                      </Stack>
                    ))
                  }
                </Box>
              </Box>
            </Stack>
          </FormControl>

          <Button disabled={loading} w='100%' size='lg' type='submit'>Registrar</Button>
        </Form>
      </Formik>
    </Container>
  );
}
 
export default CumplimientoRegistrarProyecto;