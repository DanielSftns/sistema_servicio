import axios from "axios"
import TokenService from './token.service'
import { errorToast } from "../functions/toast"
import { history } from "../history"

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  }
})

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    if (err.response?.status === 401) {
      TokenService.removeLocalAccessToken()
      history.push("/login")
      errorToast({
        description: 'Sesion caducada'
      })
      return Promise.reject('Sesion caducada')
    }
    return Promise.reject(err)
  }
)

export default instance
