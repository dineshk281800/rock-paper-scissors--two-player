import { Link, useNavigate } from 'react-router-dom';

const Header = () => {


  const logoutHandler = () => {
    // logout()
    // navigate(0)
  }
  return (
    // <></>
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <a href="/">
            RPS
          </a>
        </div>
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

        {/* {user ? (

          <div className="ms-4 dropdown">
            <button
              className="btn dropdown-toggle text-white"
              type="button"
              id="dropDownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={user.avatar ? user.avatar.url : "../images/default_avatar.jpg"}
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span>{user.name}</span>
            </button>
            <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>{" "} Logout{" "} </Link>
          </div>
        ) : ( */}
        {/* !isLoading && ( */}
        <Link to="/" className="btn ms-4" id="login_btn">{" "} Login{" "} </Link>
        {/* ) */}
        {/* )} */}

      </div>
    </nav >
  )
}

export default Header
