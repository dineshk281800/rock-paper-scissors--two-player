import { useEffect, useState } from 'react'
// import toast from 'react-hot-toast'
import MetaData from '../layout/MetaData'

import useSignup from '../../hooks/useSignup';

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })

  const { name, email, password } = user;

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(user);
  }

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <>
      <MetaData title={"Register"} />
      <div class="row wrapper">
        <div class="col-10 col-lg-5">
          <form
            class="shadow rounded bg-body"
            onSubmit={handleSubmit}
          >
            <h2 class="mb-4">Register</h2>

            <div class="mb-3">
              <label for="name_field" class="form-label">Name</label>
              <input
                type="text"
                id="name_field"
                class="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div class="mb-3">
              <label for="email_field" class="form-label">Email</label>
              <input
                type="email"
                id="email_field"
                class="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div class="mb-3">
              <label for="password_field" class="form-label">Password</label>
              <input
                type="password"
                id="password_field"
                class="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            <button id="register_button" type="submit" class="btn w-100 py-2" disabled={loading}>
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