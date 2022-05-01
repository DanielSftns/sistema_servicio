import API from './API'

const registerTutor = async ({cedula, nombres, apellidos, escuela, email}) => {
  try {
    const res = await API.post('crear/tutor/cumplimiento', {
      cedula, nombres, apellidos, escuela, email
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

const getTutores = async () => {
  try {
    const res = await API.get('tutores/cumplimiento')
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    console.error(error)
    let message = 'No se ha podido obtener los tutores de cumplimiento'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

export {
  registerTutor,
  getTutores
}