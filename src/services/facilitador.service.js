import API from './API'
import authHeader from './auth-header'

const registerFacilitador = async (data) => {
  try {
    const res = await API.post('crear_facilitador', data, { headers: authHeader() })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data
  } catch (error) {
    console.error(error)
    let message = 'No se ha podido registrar facilitador'
    if (error.response && error.response.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const getFacilitadores = async () => {
  try {
    const res = await API.get('facilitadores', { headers: authHeader() })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    console.error(error)
    let message = 'No se ha podido registrar facilitador'
    if (error.response && error.response.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const getSecciones = async () => {
  try {
    const res = await API.get('facilitador/secciones', { headers: authHeader() })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.secciones
  } catch (error) {
    let message = 'No se ha podido obtener secciones'
    if (error.response && error.response.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    console.error(message)
    if(message === 'sin secciones'){
      return []
    }else {
      throw new Error(message)
    }
  }
}

export {
  registerFacilitador,
  getFacilitadores,
  getSecciones
}