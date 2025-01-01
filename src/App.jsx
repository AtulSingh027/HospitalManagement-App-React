import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
// ?--------Components----------
import NavBar from './Components/NavBar'
import SideBar from './Components/SideBar'
import Footer from './Components/Footer'

// ?--------Pages----------
import Home from './Pages/Home'
import Doctors from './Pages/Doctors'
import Feed from './Pages/Feed'
import Patients from './Pages/Patients'
import Appointment from './Pages/Appointment'
import About from './Pages/About'


export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <NavBar />
        <SideBar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/Patients" element={<Patients />} />
          <Route path="/BookApointment/:DoctorName" element={<Appointment />} />
          <Route path="/about" element={<About />} />
          
          {/* Other routes can be added similarly */}
          <Route path="*" element={
            <div className="ml-64 mt-16 p-6 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-600 mb-4">404</h1>
                <p className="text-gray-500">Page Not Found</p>
              </div>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}