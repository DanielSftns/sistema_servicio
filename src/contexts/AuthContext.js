import React, { useContext, useState, useEffect } from 'react'
import { getUser } from '../services/auth.service'

const AuthContext = React.createContext()

// useHook
const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
    const [usuario, setUsuario] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        if(usuario?.token){
            localStorage.setItem('usuario', JSON.stringify(usuario))
        }
    }, [usuario])

    useEffect(()=> {
        const fetchGetUser = async ()=> {
            const user = await getUser()
            setUsuario(user)
            setLoading(false)
        }

        fetchGetUser()
    },[])

    return (
        <AuthContext.Provider value={{usuario, setUsuario}}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
 
export {AuthProvider, AuthContext, useAuth};