import API from './API'
import authHeader from './auth-header'

const editProfile = async (data) => {
  try {
    const res = await API.post('perfil', data, { headers: authHeader() })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    const user = JSON.parse(localStorage.getItem('usuario'))
    user.perfil_completo = true
  
    localStorage.setItem('usuario', JSON.stringify(user))
    return res.data
  } catch (error) {
    console.error(error)
    let message = 'No se ha podido editar el perfil'
    if (error.response && error.response.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

export {
  editProfile
}