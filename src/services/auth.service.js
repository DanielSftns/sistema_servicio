import API from './API'

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
    // })
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
  return new Promise((resolve) => {
    let usuario = JSON.parse(localStorage.getItem('usuario'))
    if(!usuario){
      resolve(usuario)
    }

    if(usuario.token){
      getProfile()
      .then(data =>{
        usuario = {...usuario, ...data}
        localStorage.setItem('usuario', JSON.stringify(usuario))
        resolve(usuario)
      }).catch(error => {
        console.error(error)
        resolve(usuario)
      })
    } else {
      resolve(usuario)
    }
  })
}

const logout = async ()=> {
  try {
    const res = await API.post('logout', {})

    if(res.data.error){
      throw new Error(res.data.message)
    }
  
    return res.data
  } catch (error) {
    console.error(error)
  } finally {
    localStorage.removeItem('usuario')
  }
}

const editProfile = async (data) => {
  try {
    const res = await API.post('perfil', data)
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
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

const getProfile = async () => {
  try {
    const res = await API.get('perfil')
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    console.error(error)
    let message = 'No se ha podido obtener el perfil'
    if (error.response && error.response.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

export {
  login,
  register,
  getUser,
  editProfile,
  getProfile,
  logout
}