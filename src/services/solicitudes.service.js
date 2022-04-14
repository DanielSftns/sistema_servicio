import API from './API'

const obtenerMiSolicitud = async () => {
  try {
    const res = await API.get('estudiantes/proyectos/solicitudes')
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    let message = 'No se ha podido obtener solicitud'
    if (error.response && error.response.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    console.error(message)
    throw new Error(message)
  }
}

const crearSolicitud = async ({archivos, tipo}) => {
  try {
    const res = await API.post('estudiantes/proyectos/solicitud', {
      archivos, tipo
    })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    let message = 'No se ha podido crear solicitud'
    if (error.response && error.response.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    console.error(message)
    throw new Error(message)
  }
}

const obtenerSolicitudes = async () => {
  try {
    const res = await API.get('facilitador/proyectos/solicitudes')
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    let message = 'No se ha podido obtener solicitudes'
    if (error.response && error.response.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    console.error(message)
    throw new Error(message)
  }
}

const accionEnSolicitud = async ({solicitud_id, accion, descripcion}) => {
  try {
    const res = await API.post('solicitudes/proyectos/accion', {
      solicitud_id, accion, descripcion
    })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    let message = `Error al ${accion} solicitud`
    if (error.response && error.response.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    console.error(message)
    throw new Error(message)
  }
}
 
export {
  obtenerMiSolicitud,
  crearSolicitud,
  obtenerSolicitudes,
  accionEnSolicitud
}