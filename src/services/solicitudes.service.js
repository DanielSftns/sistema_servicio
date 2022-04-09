import API from './API'
import authHeader from './auth-header'

const obtenerMiSolicitud = async () => {
  try {
    const res = await API.get('estudiantes/proyectos/solicitudes', { headers: authHeader() })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data[0]
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
    }, { headers: authHeader() })
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
    const res = await API.get('facilitador/proyectos/solicitudes', { headers: authHeader() })
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
 
export {
  obtenerMiSolicitud,
  crearSolicitud,
  obtenerSolicitudes
}