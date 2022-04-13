class TokenService {
  getLocalAccessToken() {
    const user = JSON.parse(window.localStorage.getItem('usuario'))
    if (user && user.token) {
      return 'Bearer ' + user.token
    } else {
      return {}
    }
  }

  updateLocalAccessToken(token) {
    const user = JSON.parse(window.localStorage.getItem('usuario'))
    user.token = token
    window.localStorage.setItem('usuario', JSON.stringify(user))
  }

  removeLocalAccessToken() {
    window.localStorage.removeItem('usuario')
  }
}
export default new TokenService()
