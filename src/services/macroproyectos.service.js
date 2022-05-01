import API from './API'

const getMacroProyectos = async () => {
  try {
    const res = await API.get('macroproyectos')
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    console.error(error)
    let message = 'No se ha podido obtener macroproyectos'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const getMacroProyecto = async (codigo) => {
  try {
    const res = await API.get('macroproyecto/' + codigo)
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    console.error(error)
    let message = 'No se ha podido obtener macroproyecto'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const registerMacroProyecto = async ({ titulo, codigo }) => {
  try {
    const res = await API.post('macroproyecto/crear', {
      titulo, codigo
    })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    console.error(error)
    let message = 'No se ha podido registrar macroproyecto'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const registerGrupoMacroProyecto = async ({ titulo, escuela, estudiantes, tutores, macro_proyecto }) => {
  try {
    const res = await API.post('macroproyecto/crear', {
      titulo, escuela, estudiantes, tutores, macro_proyecto
    })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    console.error(error)
    let message = 'No se ha podido registrar grupo'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const getGrupoMacroProyecto = async (codigo) => {
  try {
    const res = await API.get('macroproyecto/grupos/' + codigo)
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    console.error(error)
    let message = 'No se ha podido obtener grupo de macroproyecto'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const subirArchivoAlGrupo = async ({nombre, tipo_archivo, archivo}) => {
  try {
    const res = await API.post('proyectos/subir/archivos', {
      nombre, tipo_archivo, archivo
    })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    console.error(error)
    let message = 'Error subiendo archivo'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const corregirArchivoGrupo = async ({nombre, tipo_archivo, archivo, macro_grupo, comentario}) => {
  try {
    const res = await API.post('macroproyecto/archivo/corregir', {
      nombre, tipo_archivo, archivo, macro_grupo, comentario
    })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    console.error(error)
    let message = 'Error subiendo correccion'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const aprobarArchivoGrupo = async ({tipo_archivo, macro_grupo}) => {
  try {
    const res = await API.post('macroproyecto/archivo/aprobar', {
      tipo_archivo, macro_grupo
    })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    console.error(error)
    let message = 'Error al aprobar archivo'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const avalarGrupo = async (codigo) => {
  try {
    const res = await API.post('macroproyecto/grupo/avalar', {
      macro_grupo: codigo
    })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    console.error(error)
    let message = 'Error al aprobar proyecto'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

const subirArchivoAsignacion = async ({nombre_archivo, macro_grupo, archivo}) => {
  try {
    const res = await API.post('macroproyecto/archivo/crear', {
      nombre_archivo, macro_grupo, archivo
    })
    if(res.data.error){
      throw new Error(res.data.message)
    }
    
    return res.data.data
  } catch (error) {
    console.error(error)
    let message = 'Error subiendo archivo'
    if (error.response && error.response?.status === 400) {
      message = error.response.data.message || error.response.data
    } else if (!error.response) {
      message = error.message
    }
    throw new Error(message)
  }
}

export {
  getMacroProyectos,
  getMacroProyecto,
  registerMacroProyecto,
  registerGrupoMacroProyecto,
  getGrupoMacroProyecto,
  subirArchivoAlGrupo,
  corregirArchivoGrupo,
  aprobarArchivoGrupo,
  avalarGrupo,
  subirArchivoAsignacion
}