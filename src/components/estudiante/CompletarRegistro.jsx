import React from 'react';
import { Formik, Form, Field  } from 'formik';
import { completeRegister } from '../../services/estudiante.service';

const CompletarRegistro = ({setRegistroCompleto}) => {
  const handleSave = (data) =>{
    completeRegister(data)
    setRegistroCompleto(true)
  }

  return (
    <>
      <h2>Completa el registro</h2>
      <Formik
        initialValues={{
          nombres: '',
          apellidos: '',
          cedula: '',
          especialidad: '',
          telefono: ''
        }}
        validate={(values)=>{
          let errors = {}
          if(!values.nombres){
            errors.nombres = "error"
          }
          if(!values.apellidos){
            errors.apellidos = "error"
          }
          if(!values.cedula){
            errors.cedula = "error"
          }
          if(!values.especialidad){
            errors.especialidad = "error"
          }
          if(!values.telefono){
            errors.telefono = "error"
          }
          return errors
        }}
        onSubmit={handleSave}
      >
        <Form>
          <div className="mb-3">
            <label className="form-label">Nombres</label>
            <Field name="nombres" type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellidos</label>
            <Field name='apellidos' type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Cedula</label>
            <Field name='cedula' type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Especialidad</label>
            <Field name='especialidad' type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Telefono</label>
            <Field name='telefono' type="text" className="form-control" />
          </div>

          <button type="submit" className="btn btn-primary">Guardar</button>
        </Form>
      </Formik>
    </>
  );
}
 
export default CompletarRegistro;