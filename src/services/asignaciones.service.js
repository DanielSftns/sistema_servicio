import API from './API'
import authHeader from './auth-header'

const getAsigsBySeccion = async (seccion) => {
  try {
    console.log('consultando asignaciones para secc ' + seccion)
    const res = await API.get('asignaciones', { headers: authHeader() })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data
  } catch (error) {
    let message = 'No se ha podido obtener asignaciones'
    if (error.response && error.response.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    console.error(message)
    if(message === 'sin asignaciones'){
      return []
    }else {
      throw new Error(message)
    }
  }
}

const activarAsignacion = async (seccion, modelo) => {
  try {
    console.log('Activando asignacion ' + modelo)
    const res = await API.post('asignaciones/activar', {
      "codigo_seccion": seccion,
      "archivo_id" : modelo
    }, { headers: authHeader() })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data
  } catch (error) {
    let message = 'Error actiavndo asignacion'
    if (error.response && error.response.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    console.error(message)
    if(message === 'sin asignaciones'){
      return []
    }else {
      throw new Error(message)
    }
  }
}

export {
  getAsigsBySeccion,
  activarAsignacion
}