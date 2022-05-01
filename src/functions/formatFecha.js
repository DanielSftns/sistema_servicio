const formatFecha = (fecha) => {
  if (!fecha) return
  return new Date(fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

export {
  formatFecha
}