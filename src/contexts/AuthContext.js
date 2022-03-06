import React, { useContext, useState, useEffect } from 'react'
import { getUser } from '../services/auth.service'

const AuthContext = React.createContext()

// useHook
const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
    const [usuario, setUsuario] = useState()
    const [loading, setLoading] = useState(true)
    
    const usuarioLocal = localStorage.getItem('usuario')

    useEffect(()=> {
        const fetchGetUser = async ()=> {
            const user = await getUser()
            setUsuario(user)
            setLoading(false)
        }

        fetchGetUser()
    },[usuarioLocal])

    return (
        <AuthContext.Provider value={{usuario: usuario}}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
 
export {AuthProvider, AuthContext, useAuth};