import "./App.css";
// Importing the Bootstrap 5 CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from "react-router-dom";

import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import { Toaster } from 'react-hot-toast';

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" />
      <Header />
      <div className="container">
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
