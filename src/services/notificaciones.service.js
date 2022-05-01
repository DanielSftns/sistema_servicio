import API from './API'

const getNotificaciones = async () => {
  try {
    const res = await API.get('notificaciones')
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    let message = 'No se ha podido obtener notificaciones'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    console.error(message)
    throw new Error(message)
  }
}

const marcarNotificacionesLeidas = async (notificaciones) => {
  try {
    const res = await API.post('notificaciones/marcar/leidas', {notificaciones})
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    let message = 'No se ha podido marcar notificaciones como leidas'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    console.error(message)
    throw new Error(message)
  }
}

export {
  getNotificaciones,
  marcarNotificacionesLeidas
}