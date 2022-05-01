import API from './API'

const subirInformeCulminacion = async ({archivo, nombre_archivo}) => {
  try {
    const res = await API.post('informes/crear', {
      archivo, nombre_archivo
    })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data
  } catch (error) {
    console.error(error)
    let message = 'No se ha podido registrar tutor de cumplimiento'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const getInformeCulminacion = async () => {
  try {
    const res = await API.post('informes')
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data
  } catch (error) {
    console.error(error)
    let message = 'No se ha podido obtenr informe de cumplimiento'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

export {
  subirInformeCulminacion,
  getInformeCulminacion
}