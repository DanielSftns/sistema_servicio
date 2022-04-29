import React, { useState, useEffect } from 'react';
import { Formik, Form  } from 'formik';
import Field from '../../shared/CustomFieldFormik'
import FormControl from '../../shared/FormControl'
import { successToast, errorToast } from '../../../functions/toast';
import { SwalModal } from '../../../functions/sweetAlertCommon';
import { getEstudiantesFaseFormativaAprobada } from '../../../services/estudiante.service';
import { useNavigate } from 'react-router-dom';
import { registerGrupoMacroProyecto } from '../../../services/macroproyectos.service';
import {
  Heading,
  FormLabel,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Container
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router-dom';

const CumplimientoRegistrarGrupo = () => {
  const paramns = useParams()
  const codigo = paramns.proyectoID
  const [loading, setLoading] = useState(true)
  const [seleccionados, setSeleccionados] = useState([])
  const [estudiantes, setEstudiantes] = useState()
  const [tutores, setTutores] = useState()
  const [tutoresSeleccionados, setTutoresSeleccionados] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    const getInfo = async ()=> {
      try {
        const estudiantes = await getEstudiantesFaseFormativaAprobada()
        setEstudiantes(estudiantes)
        setTutores(estudiantes)
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

  const handleSelectTutor = (cedula) => {
    const [ tutor ] = tutores.concat(tutoresSeleccionados).filter(person => person.cedula === cedula) 
    const newTutoresSeleccionados = tutoresSeleccionados.map(selected => selected)
    const newTutores = tutores.map(person => person)

    // si esta elegido
    if(tutoresSeleccionados.some(person => person.cedula === cedula)){
      // se quita de elegidos
      const id = newTutoresSeleccionados.findIndex((person) => person.cedula === cedula)
      newTutoresSeleccionados.splice(id,  1)
      // se agrega a listado
      newTutores.push(tutor)
    } else{
      // se quita de listado
      const id = newTutores.findIndex((person) => person.cedula === cedula)
      newTutores.splice(id,  1)
      // se agrega a elegidos
      newTutoresSeleccionados.push(tutor)
    }

    setTutoresSeleccionados(newTutoresSeleccionados)
    setTutores(newTutores)
  }

  const handleSave = (values) => {
    console.log(values)

    if(seleccionados.length === 0){
      errorToast({
        description: 'No se puede registrar sin estudiantes'
      })
      return
    }
    if(tutoresSeleccionados.length === 0){
      errorToast({
        description: 'No se puede registrar sin tutores'
      })
      return
    }

    SwalModal.fire({
      title:'Confirmar registro',
      text:'Esto no es reversible',
      confirmButtonText: 'Crear grupo',
    }).then(result => {
      if(result.isConfirmed){
        setLoading(true)
        const estudiantes = seleccionados.map(estudiante => estudiante.cedula)
        const tutores = tutoresSeleccionados.map(tutor => tutor.cedula)
        const data = {...values, estudiantes, tutores, macro_proyecto: codigo}
        console.log(data)
    
        registerGrupoMacroProyecto(data)
        .then(()=> {
          successToast({
            title: 'Grupo registrado',
          })
          navigate('/tutor/macroproyectos/' + codigo)
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
      <Heading mb={8}>Registrar Grupo</Heading>
      <Formik
        initialValues={{
          titulo: '',
          escuela: ''
        }}
        validate={(values)=> {
          let errors = {}

          if(!values.titulo){
            errors.titulo = 'El titulo es requerido'
          }
          if(!values.escuela){
            errors.escuela = 'La escuela es requerida'
          }

          return errors
        }}
        onSubmit={handleSave}
      >
        <Form>
          <FormControl errorprop='titulo'>
            <FormLabel htmlFor=''>Titutlo</FormLabel>
            <Field name='titulo' type='text' />
          </FormControl>
          <FormControl errorprop='escuela'>
            <FormLabel htmlFor='escuela'>Escuela</FormLabel>
            <Field name='escuela' component='select'>
              <option value=''>Seleccionar</option>
              <option value='eica'>Escuela de Ingeniería de Ciencias Aplicadas</option>
              <option value='ecsa'>Escuelas de Ciencias Sociales y Administrativas</option>
              <option value='zootecnia'>Escuela de Zootecnia</option>
            </Field>
          </FormControl>
          <FormControl>
            <FormLabel>Estudiantes</FormLabel>
            <Stack mb={8} direction={['column', 'row']} spacing='24px'>
              <Box w='100%'>
                <InputGroup mb={8} maxW={300}>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                  />
                  <Input value={search} onChange={({currentTarget})=> setSearch(currentTarget.value)} variant='flushed' type="search" placeholder='Buscar por cedula' />
                </InputGroup>

                <Box maxH={200} overflow='auto'>
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
                <Box maxH={200} overflow='auto'>
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
          <FormControl>
            <FormLabel>Tutores</FormLabel>
            <Stack direction={['column', 'row']} spacing='24px'>
              <Box w='100%'>
                <InputGroup mb={8} maxW={300}>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                  />
                  <Input value={search} onChange={({currentTarget})=> setSearch(currentTarget.value)} variant='flushed' type="search" placeholder='Buscar por cedula' />
                </InputGroup>

                <Box maxH={200} overflow='auto'>
                  {
                    tutores.map((tutor, i)=> (
                      <Stack
                        userSelect='none'
                        cursor='pointer'
                        bg={ i % 2 === 0? 'gray.100' : 'gray.200'}
                        padding={2}
                        _hover={{
                          bg: 'blue.100'
                        }}
                        display={search.length <= 3 || tutor.cedula.includes(search)? 'flex' : 'none'}
                        spacing={2}
                        direction='row'
                        onClick={()=> handleSelectTutor(tutor.cedula)}
                        key={i}
                      >
                        <p>{tutor.cedula}</p>
                        <p> - </p>
                        <p>{tutor.nombres} {tutor.apellidos}</p>
                      </Stack>
                    ))
                  }
                </Box>
              </Box>
              <Box w='100%'>
                <Heading mb={12} textAlign='center' size='sm' >Seleccionados</Heading>
                <Box maxH={200} overflow='auto'>
                  {
                    tutoresSeleccionados.map((tutor, i)=> (
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
                        onClick={()=> handleSelectTutor(tutor.cedula)}
                        key={i}
                      >
                        <p>{tutor.cedula}</p>
                        <p> - </p>
                        <p>{tutor.nombres} {tutor.apellidos}</p>
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
 
export default CumplimientoRegistrarGrupo;