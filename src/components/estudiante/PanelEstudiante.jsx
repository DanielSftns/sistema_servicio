import React, { useEffect, useState } from 'react';
import CompletarRegistro from './CompletarRegistro';

const PanelEstudiante = () => {
  const [email, setEmail] = useState()
  const [registroCompleto, setRegistroCompleto] = useState(false)
  const user = JSON.parse(localStorage.getItem('userSer'))

  useEffect(()=>{
    setEmail(user.email)
  }, [user])

  return (
    <>
      <h1>Bienvenido</h1>
      <p>{email}</p>
      {
        registroCompleto
        ? <>
          <h5>{user.nombres}</h5>
          <h5>{user.cedula}</h5>
        </>
        : <CompletarRegistro setRegistroCompleto={setRegistroCompleto} />
      }
    </>
  );
}
 
export default PanelEstudiante;