import React, { useState } from 'react';
import { Formik, Form  } from 'formik';
import Field from '../shared/CustomFieldFormik'
import FormControl from '../shared/FormControl'

import {
  Heading,
  FormLabel,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react'

import { SearchIcon } from '@chakra-ui/icons'

const FacilitadorSeccion = () => {
  const [loading, setLoading] = useState()
  const [seleccionados, setseleccionados] = useState([])
  const [search, setSearch] = useState('')
  const [estudiantes, setEstudiantes] = useState(
  [
    {
      cedula: '2651das6492',
      nombre: 'Daniel Sifontes'
    },
    {
      cedula: '265dsad16492',
      nombre: 'Daniel Sifontes'
    },
    {
      cedula: '265dfasf16492',
      nombre: 'Daniel Sifontes'
    },
    {
      cedula: '26516f1d492',
      nombre: 'Daniel Sifontes'
    },
    {
      cedula: '26516212492',
      nombre: 'Daniel Sifontes'
    },
    {
      cedula: '31313e',
      nombre: 'Daniel Sifontes'
    },
    {
      cedula: '265144246492',
      nombre: 'Daniel Sifontes'
    },
    {
      cedula: '26516545492',
      nombre: 'Daniel Sifontes'
    },
    {
      cedula: '663223',
      nombre: 'Daniel Sifontes'
    },
    {
      cedula: '13sdaads',
      nombre: 'Daniel Sifontes'
    },
    {
      cedula: '2651dasd116492',
      nombre: 'Daniel Sifontes'
    },
    {
      cedula: '2651faf6492',
      nombre: 'Daniel Sifontes'
    },
    {
      cedula: '2651dasf116492',
      nombre: 'Daniel Sifontes'
    },
    {
      cedula: '265fasfx1316492',
      nombre: 'Daniel Sifontes'
    }
  ]
  )

  const handleSelect = (cedula) => {
    const [ estudiante ] = estudiantes.filter(student => student.cedula === cedula) 
    const newSeleccionados = seleccionados.map(selected => selected)

    if(seleccionados.some(student => student.cedula === cedula)){
      const id = newSeleccionados.findIndex((student) => student.cedula === cedula)
      newSeleccionados.splice(id,  1);
    } else{
      newSeleccionados.push(estudiante)
    }

    setseleccionados(newSeleccionados)
  }
  return (
    <>
      <Box maxW={800} m='auto'>
        <Heading mb={8}>Registrar seccion</Heading>
        <Formik
          initialValues={{
            codigo: '',
            nombre: '',
            tutor: ''
          }}
        >
          <Form>
            <FormControl>
              <FormLabel htmlFor=''>Codigo</FormLabel>
              <Field name='codigo' type='text' />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor=''>Nombre</FormLabel>
              <Field name='nombre' type='text' />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='tutor'>Tutor</FormLabel>
              <Field name='tutor' component='select'>
                <option value='1'>tutor 1</option>
                <option value='2'>tutor 2</option>
                <option value='3'>tutor 3</option>
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
                          cursor='pointer'
                          bg={ i % 2 === 0? 'gray.100' : 'gray.200'}
                          padding={2}
                          _hover={{
                            bg: seleccionados.some(student => student.cedula === estudiante.cedula) ? 'red.100' : 'blue.100'
                          }}
                          display={search.length <= 3 || estudiante.cedula.includes(search)? 'flex' : 'none'}
                          spacing={2}
                          direction='row'
                          onClick={()=> handleSelect(estudiante.cedula)}
                          key={i}
                        >
                          <p>{estudiante.cedula}</p>
                          <p> - </p>
                          <p>{estudiante.nombre}</p>
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
                          <p>{estudiante.nombre}</p>
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
      </Box>
    </>
  );
}
 
export default FacilitadorSeccion;