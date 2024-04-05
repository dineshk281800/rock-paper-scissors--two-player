import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import MetaData from '../layout/MetaData'

// custom hooks
import useLogin from '../../hooks/useLogin';

const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const { email, password } = user;
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState("")

  const { loading, login } = useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(user);
  }

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <>
      <MetaData title={"Login"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-4">Login</h2>
            <div className="mb-3">
              <label for="email_field" className="form-label">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                // onChange={(e) => setEmail(e.target.value)}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label for="password_field" className="form-label">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                // onChange={(e) => setPassword(e.target.value)}
                onChange={onChange}
              />
            </div>

            {/* <a href="/password/forgot" className="float-end mb-4">Forgot Password?</a> */}

            <button id="login_button" type="submit" className="btn w-100 py-2" disabled={loading}>
              {loading ? "Authenticating..." : "LOGIN"}
            </button>

            <div className="my-3">
              <a href="/register" className="float-end">New User?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login