import React, { useEffect,useState } from 'react';
import CumplimientoHeader from '../CumplimientoHeader';
import { obtenerSolicitudes } from '../../../services/solicitudes.service';
import { Formik, Form  } from 'formik';
import Field from '../../shared/CustomFieldFormik'
import FormControl from '../../shared/FormControl'
import { getEstudiantesFaseFormativaAprobada } from '../../../services/estudiante.service'

import {
  Heading,
  Box,
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container,
  Link,
  Icon,
  ButtonGroup,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react'
import { TimeIcon, CheckIcon, ExternalLinkIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons'

import { rechazarSolicitud, aprobarSolicitudRegisterProyecto } from '../../../services/solicitudes.service';
import { errorToast, successToast } from '../../../functions/toast';
import { SwalModal } from '../../../functions/sweetAlertCommon';

const CumplimientoSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState()
  const [loading, setLoading] = useState(true)
  const [handleAprobar, setHandleAprobar] = useState()
  const [estudiantes, setEstudiantes] = useState()


  useEffect(()=>{
    const get = async ()=> {
      obtenerSolicitudes()
      .then((solicitudes)=>{
        console.log({solicitudes})
        setSolicitudes(solicitudes)
      }).finally(()=>{
        setLoading(false)
      })
    }

    get()
  }, [])

  const handleAprobarSubmit = (data) => {
    SwalModal.fire({
      title:'Confirmar aprobar solicitud',
      text:'Esto no es reversible',
      confirmButtonText: 'Aprobar solicitud',
    }).then(result => {
      if(result.isConfirmed){
        aprobarSolicitudRegisterProyecto(data)
        .then(()=>{
          successToast({
            title: 'Solicitud aprobada'
          })
        }).catch((error)=>{
          errorToast({
            description: error.message
          })
        })
      }
    })
  }

  const handleRechazar = (solicitud_id) => {
    SwalModal.fire({
      title:'Confirmar rechazar solicitud',
      text:'Esto no es reversible',
      confirmButtonText: 'Rechazar solicitud',
      input: 'text',
      inputAttributes: {
        placeholder: 'Motivo de rechazo'
      },
      preConfirm: (descripcion)=>{
        return {descripcion}
      }
    }).then(result => {
      if(result.isConfirmed){
        rechazarSolicitud({solicitud_id, descripcion: result.value.descripcion})
        .then(()=>{
          successToast({
            title: 'Solicitud rechazada'
          })
        }).catch((error)=>{
          errorToast({
            description: error.message
          })
        })
      }
    })
  }

  const handleShowForm = (solicitud_id) => {
    setHandleAprobar(solicitud_id)
    if(estudiantes) return
    
    setLoading(true)
    getEstudiantesFaseFormativaAprobada()
    .then((estudiantes)=>{
      setEstudiantes(estudiantes)
    })
    .catch((error)=>{
      errorToast({
        description: error.message
      })
    })
    .finally(()=>{ setLoading(false) })
  }

  if(loading){
    return <p>Loading...</p>
  }

  return (
    <>
      <CumplimientoHeader />
      <div style={{'paddingTop': '2rem'}}>
        <Heading mb={8}>Solicitudes de proyecto</Heading>
        <Container>
          <Accordion allowToggle>
            {
              solicitudes.map(solicitud => (
                <AccordionItem key={solicitud.id}>
                  <h2>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                        {
                          solicitud.estado === 'por aprobar' && 
                          <Icon as={TimeIcon} mr={8} />
                        }
                        {
                          solicitud.estado === 'aprobado' && 
                          <Icon as={CheckIcon} mr={8} />
                        }
                        {
                          solicitud.estado === 'rechazado' && 
                          <Icon as={CloseIcon} mr={8} />
                        }
                        <Text display='inline-block'>{solicitud.nombres_estudiante} {solicitud.apellidos_estudiante} - {solicitud.cedula_estudiante}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text mb={4}>Abajo se abjunta el contenido</Text>
                    <Box mb={12}>
                      {
                        solicitud.archivos && solicitud.archivos.map((archivo, i) => (
                          <Link key={i} display='block' fontWeight='bold' href={archivo.archivo} target='_blank' download={true} isExternal>
                            {archivo.nombre} <ExternalLinkIcon mx='2px' />
                          </Link>
                        ))
                      }
                    </Box>
                    
                    {
                      handleAprobar === solicitud.id &&
                        <SolicitudForm solicitud={solicitud} estudiantesData={estudiantes} handleAprobarSubmit={handleAprobarSubmit} />
                    }

                    <ButtonGroup isDisabled={solicitud.estado !== 'por aprobar'}>
                      {
                        handleAprobar !== solicitud.id &&
                          <Button onClick={()=> handleShowForm(solicitud.id)} colorScheme='gray'>Aprobar</Button>
                      }
                      {
                        handleAprobar === solicitud.id &&
                          <Button form={`form-solicitud-${solicitud.id}`} type='submit' colorScheme='teal'>Aprobar</Button>
                      }
                      <Button onClick={()=> handleRechazar(solicitud.id)} colorScheme='red'>Reprobar</Button>
                    </ButtonGroup>
                  </AccordionPanel>
                </AccordionItem>
              ))
            }
          </Accordion>
        </Container>
      </div>
    </>
  );
}
 
export default CumplimientoSolicitudes;

const SolicitudForm = ({solicitud, handleAprobarSubmit, estudiantesData}) => {
  const [seleccionados, setSeleccionados] = useState([])
  const [estudiantes, setEstudiantes] = useState(estudiantesData)
  const [search, setSearch] = useState('')

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

  return(
    <>
      <Heading size='lg' mb={8}>Registrar proyecto</Heading>
      <Formik
        initialValues={{
          solicitud_id: solicitud.id,
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
        onSubmit={(values)=>{
          if(seleccionados.length === 0){
            errorToast({
              description: 'No se puede registrar sin estudiantes'
            })
            return
          }
          const estudiantes = seleccionados.map(estudiante => estudiante.cedula)
          const data = {...values, estudiantes}
          handleAprobarSubmit(data)
        }}
      >
        <Form id={`form-solicitud-${solicitud.id}`}>
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
        </Form>
      </Formik>
    </>
  )
}