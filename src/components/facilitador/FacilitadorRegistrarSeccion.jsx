import React, { useState } from 'react';
import { Formik, Form, useFormikContext  } from 'formik';
import Field from '../shared/CustomFieldFormik'
import FormControl from '../shared/FormControl'
import ConfirmModal from '../shared/ConfirmModal';
import { registerSeccion } from '../../services/seccion.service';
import {
  Heading,
  FormLabel,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useRadio,
  useRadioGroup,
  HStack,
  Text,
  useDisclosure
} from '@chakra-ui/react'

import { SearchIcon } from '@chakra-ui/icons'
import { errorToast, successToast } from '../../functions/toast';

const FacilitadorRegistrarSeccion = () => {
  const [loading, setLoading] = useState()
  const [seleccionados, setseleccionados] = useState([])
  const [search, setSearch] = useState('')
  const { getRootProps, getRadioProps } = useRadioGroup({ name: 'horario' })
  const group = getRootProps()
  const formSubmitRef = React.useRef({})
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  const horarios = [
    {
      "especialidad": "E2",
      "codigo": "H3",
      "aula": "A2",
      "lunes": "4 pm - 4 pm",
      "martes": "",
      "miercoles": "12 am - 4 pm",
      "jueves": "",
      "viernes": "12 am - 4 pm"
    },
    {
      "especialidad": "E2",
      "codigo": "H4",
      "aula": "A3",
      "lunes": "",
      "martes": "4 pm - 4 pm",
      "miercoles": "12 am - 4 pm",
      "jueves": "",
      "viernes": ""
    }
  ]

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

    setseleccionados(newSeleccionados)
    setEstudiantes(newEstudiantes)
  }

  const onSaveAttempt = (values) => {
    formSubmitRef.current = { values }
    onOpen()
  }

  const handleSave = () => {
    if(seleccionados.length === 0){
      errorToast({
        description: 'No se puede registrar sin estudiantes'
      })
      return
    }
    const { values } = formSubmitRef.current
    setLoading(true)
    const data = {...values, estudiantes: seleccionados}
    console.log(data)
    registerSeccion(data)
    .then(()=> {
      successToast({
        title: `Seccion ${values.codigo} creada`,
      })
    }).catch(error =>{
      errorToast({
        description: error.message,
      })
    }).finally(()=>{
      setLoading(false)
    })
  }

  return (
    <>
      <Box maxW={800} m='auto'>
        <Heading mb={8}>Registrar seccion</Heading>
        <Formik
          initialValues={{
            codigo: '',
            nombre: '',
            tutor: '',
            horario: ''
          }}
          validate={(values)=> {
            let errors = {}

            if(!values.codigo){
              errors.codigo = 'Esto es requerido'
            }
            if(!values.nombre){
              errors.nombre = 'Esto es requerido'
            }
            if(!values.tutor){
              errors.tutor = 'Esto es requerido'
            }
            if(!values.horario){
              errors.horario = 'Esto es requerido'
            }

            return errors
          }}
          onSubmit={onSaveAttempt}
        >
          <Form>
            <FormControl errorprop='codigo'>
              <FormLabel htmlFor=''>Codigo</FormLabel>
              <Field name='codigo' type='text' />
            </FormControl>
            <FormControl errorprop='nombre'>
              <FormLabel htmlFor=''>Nombre</FormLabel>
              <Field name='nombre' type='text' />
            </FormControl>
            <FormControl errorprop='tutor'>
              <FormLabel htmlFor='tutor'>Tutor</FormLabel>
              <Field name='tutor' component='select'>
                <option value='1'>tutor 1</option>
                <option value='2'>tutor 2</option>
                <option value='3'>tutor 3</option>
              </Field>
            </FormControl>
            <FormControl errorprop='horario'>
              <FormLabel htmlFor='horario'>Horario</FormLabel>
              <HStack {...group} alignItems='start'>
                {horarios.map((horario) => {
                  const radio = getRadioProps({ value: horario.codigo })
                  return (
                    <RadioCard key={horario.codigo} {...radio}>
                      <Box>
                        {
                          Object.entries(horario).map(dia => (
                            <Text 
                              display={dia[1]? 'block': 'none'}
                              fontSize='sm' 
                              key={dia[0]}
                            >
                              {dia[0]} : {dia[1]}
                            </Text>
                          ))
                        }
                      </Box>
                    </RadioCard>
                  )
                })}
              </HStack>
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

        <ConfirmModal 
          isOpen={isOpen}
          title='Confirmar registro'
          description='Esto no es reversible'
          confirmText='Registrar'
          callBack={(result)=>{
            onClose()
            if(result.isConfirmed){
              handleSave()
            }
          }}
        />
      </Box>
    </>
  );
}

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const { setFieldValue } = useFormikContext()
  const input = getInputProps()
  const checkbox = getCheckboxProps()

  React.useEffect(()=>{
    if(input.checked){
      setFieldValue(input.name, input.value)
    }
  }, [input.checked, input.name, input.value, setFieldValue])

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        userSelect='none'
        _checked={{
          bg: 'blue.500',
          color: 'white',
          borderColor: 'blue.500',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}
 
export default FacilitadorRegistrarSeccion;