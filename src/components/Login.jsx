import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [passsword, setPasssword] = useState('')

  const handleLogin = (e)=>{
    e.preventDefault()
    login(email, passsword)
    navigate('/estudiante')
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input
          onChange={({target})=> setEmail(target.value)}
          value={email}
          type="email"
          className="form-control"
        />
        <div className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input 
          onChange={({target})=> setPasssword(target.value)}
          value={passsword}
          type="password"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Entrar</button>
    </form>
  );
}
 
export default Login;