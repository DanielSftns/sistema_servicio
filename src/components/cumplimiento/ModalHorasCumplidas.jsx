import React from 'react';
import { Formik, Form } from 'formik';
import Field from '../shared/CustomFieldFormik'
import FormControl from '../shared/FormControl'
import { asignarHorasCumplidas } from '../../services/estudiante.service';
import { errorToast, successToast } from '../../functions/toast';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react'

const ModalHorasCumplidas = ({ isOpen, onClose, estudiantes }) => {
  const [loading, setLoading] = React.useState(false)

  const initialValues = React.useMemo(()=>{
    return estudiantes.reduce((acc, estudiante) => {
      acc[estudiante.cedula] = estudiante.horas_cumplidas || 0
      return acc
    }, {})
  }, [estudiantes])

  const handleSubmit = (values) => {
    const data = Object.keys(values).map(estudiante => {
      return {
        cedula: estudiante,
        horas_cumplidas: values[estudiante]
      }
    })
    setLoading(true)
    asignarHorasCumplidas(data)
    .then(()=>{
      successToast({
        description: 'Horas cumplidas asignadas correctamente'
      })
      onClose()
    })
    .catch((error)=>{
      errorToast({
        description: error.message
      })
    })
    .finally(()=>{
      setLoading(false)
    })
  }

  return (
    <Modal size='lg' isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Asignar horas cumplidas</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            Object.keys(values).forEach(key => {
              if (!values[key] || values[key] < 0 || values[key] >= 200 || /\D/.test(values[key])) {
                errors[key] = 'Error';
              }
            });
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <ModalBody>
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Estudiante</Th>
                      <Th width='30%'>Horas cumplidas</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      estudiantes.map((estudiante) => (
                        <Tr key={estudiante.cedula}>
                          <Td>{estudiante.nombres} - {estudiante.apellidos} - {estudiante.cedula}</Td>
                          <Td>
                            <FormControl notmessage='true' errorprop={estudiante.cedula} marginBottom='0 !important'>
                              <Field name={estudiante.cedula} />
                            </FormControl>
                          </Td>
                        </Tr>
                      ))
                    }
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>
            <ModalFooter>
              <Button isDisabled={loading} type='submit' width='100%' size='lg'>Guardar</Button>
            </ModalFooter>
          </Form>
        </Formik>

      </ModalContent>
    </Modal>
  );
}
 
export default ModalHorasCumplidas;