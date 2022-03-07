import API from './API'
import authHeader from './auth-header'

const login = async ({email, password}) => {
  try {
    const res = await API.post('login',{
      email, password
    })

    if(res.data.error){
      throw new Error(res.data.message)
    }
  
    localStorage.setItem('usuario', JSON.stringify(res.data))
    return res.data
  } catch (error) {
    console.error(error)
    let message = 'Error iniciando sesión'
    if (error.response && error.response.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }

    throw new Error(message)
  }
}

const register = async ({email, password}) => {
  try {
    const res = await API.post('registrar',{
      email, password
    })
    // }, { headers: authHeader() })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data
  } catch (error) {
    console.error(error)
    let message = 'Algo ha salido mal por favor intentalo nuevamente'
    if (error.response && error.response.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const getUser = async () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'))
  return usuario
  
  // try {
  //   const res = await API.get('registrar', { headers: authHeader() })
  //   if(res.data.error){
  //     throw new Error(res.data.message)
  //   }
    
  //   return res.data
  // } catch (error) {
  //   console.error(error)
  //   let message = 'error obteniendo usuario'
  //   if (error.response && error.response.status === 400) {
  //     message = error.response.data.message || error.response.data
  //   } else if (!error.response) {
  //     message = error.message
  //   }
  //   throw new Error(message)
  // }
}

const logout = async ()=> {
  try {
    const res = await API.post('logout', {}, { headers: authHeader() })

    if(res.data.error){
      throw new Error(res.data.message)
    }
  
    localStorage.removeItem('usuario')
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export {
  login,
  register,
  getUser,
  logout
}