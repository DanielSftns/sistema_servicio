const login = (email, password) => {
  const user = {
    email,
    password
  }

  localStorage.setItem('userSer', JSON.stringify(user))
}

const register = (email, password, password2) => {
  const user = {
    email,
    password
  }

  localStorage.setItem('userSer', JSON.stringify(user))
}

export {
  login,
  register
}