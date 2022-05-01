import API from './API'

const getEstudiantesSinSeccion = async () => {
  try {
    const res = await API.get('estudiantes/sinseccion')
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    console.error(error)
    let message = 'Error obteniendo estudiantes'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const aprobarFaseFormativa = async (estudiantes) => {
  try {
    const res = await API.post('estudiantes/fase/formativa/aprobar', {estudiantes})
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data
  } catch (error) {
    console.error(error)
    let message = 'Error aprobando fase formativa'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const getEstudiantesFaseFormativaAprobada = async () => {
  try {
    const res = await API.get('estudiantes/fase/formativa/aprobada')
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    console.error(error)
    let message = 'Error obteniendo estudiantes'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const asignarHorasCumplidas = async (estudiantes) => {
  try {
    const res = await API.post('estudiantes/horas/cumplidas', {estudiantes})
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data
  } catch (error) {
    console.error(error)
    let message = 'Error asignando horas cumplidas'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

export {
  getEstudiantesSinSeccion,
  aprobarFaseFormativa,
  getEstudiantesFaseFormativaAprobada,
  asignarHorasCumplidas
}