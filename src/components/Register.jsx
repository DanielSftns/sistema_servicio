import React from 'react';

const Register = () => {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" />
        <div className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Repetir Password</label>
        <input type="password" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Registar</button>
    </form>
  );
}
 
export default Register;