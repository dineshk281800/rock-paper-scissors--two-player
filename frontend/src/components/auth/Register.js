import { useEffect, useState } from 'react'
// import toast from 'react-hot-toast'
// import MetaData from '../layout/MetaData'

import useSignup from '../../hooks/useSignup';

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const { name, email, password, confirmPassword } = user;

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(user);
  }
  console.log(user)

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <>
      {/* <MetaData title={"Register"} /> */}
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-4">Register</h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password_field" className="form-label">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password_field" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
              />
            </div>

            <button id="register_button" type="submit" className="btn w-100 py-2" disabled={loading}>
              {loading ? "Creating.." : "REGISTER"}
            </button>
            <div className="my-3">
              <a href="/" className="float-end">Already have an account?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register