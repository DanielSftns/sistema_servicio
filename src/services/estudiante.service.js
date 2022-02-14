const completeRegister = (data) => {
  let user = JSON.parse(localStorage.getItem('userSer'))
  user = {...user, ...data}

  localStorage.setItem('userSer', JSON.stringify(user))
}

export {
  completeRegister
}