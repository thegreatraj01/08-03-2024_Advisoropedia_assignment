import React from 'react'
import Login from './Pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from './Pages/Posts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Offcanvas from './Component/Offcanvas';


function App() {
  return (
    <div>
      {/* <Offcanvas /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' exact element={<Posts />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App