import API from './API'

const getAsigsBySeccion = async (seccion) => {
  try {
    console.log('consultando asignaciones para secc ' + seccion)
    const res = await API.get(`asignaciones/${seccion}`)
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    let message = 'No se ha podido obtener asignaciones'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    console.error(message)
    throw new Error(message)
  }
}

const activarAsignacion = async (seccion, modelo) => {
  try {
    console.log('Activando asignacion ' + modelo)
    const res = await API.post('asignaciones/activar', {
      "codigo_seccion": seccion,
      "archivo_id" : modelo
    })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data
  } catch (error) {
    let message = 'Error activando asignacion'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    console.error(message)
    throw new Error(message)
  }
}

const aprobarAsignacion = async (asignacionID) => {
  try {
    console.log('Activando asignacion ' + asignacionID)
    const res = await API.post('asignaciones/aprobar', {
      id: asignacionID
    })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data
  } catch (error) {
    let message = 'Error aprobando asignacion'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    console.error(message)
    throw new Error(message)
  }
}

const reprobarAsignacion = async (asignacionID) => {
  try {
    const res = await API.post('asignaciones/reprobar', {
      id: asignacionID
    })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data
  } catch (error) {
    let message = 'Error reprobando asignacion'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    console.error(message)
    throw new Error(message)
  }
}

const getMyAsignaciones = async () => {
  try {
    console.log('consultando mis asignaciones')
    const res = await API.get('asignaciones/mias')
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    let message = 'No se ha podido obtener asignaciones'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    console.error(message)
    throw new Error(message)
  }
}

const entregarAsignacion = async (asignacionID, archivo, archivo_nombre) => {
  try {
    const res = await API.post('asignaciones/subir', {
      archivo,
      archivo_nombre,
      asignacion_id: asignacionID
    })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data
  } catch (error) {
    let message = 'Error entregando asignacion'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}


export {
  getAsigsBySeccion,
  activarAsignacion,
  getMyAsignaciones,
  entregarAsignacion,
  aprobarAsignacion,
  reprobarAsignacion
}