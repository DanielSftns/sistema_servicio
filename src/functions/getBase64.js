const getBase64 = (file)=> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = ()=> resolve(reader.result)
    } catch (error) {
      reject(error)
    }
  })
}

export default getBase64