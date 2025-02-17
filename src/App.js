import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.js';
import LandingPage from './Components/Landing_Page/LandingPage';
import SignUp from './Components/SignUp/SignUp.js';
import Login from './Components/Login/Login.js';
import InstantConsultation from './InstantConsultationBooking/InstantConsultation.js'
import FindDoctorSearch from "./Components/FindDoctorSearch/FindDoctorSearch.js"
import DoctorCard from './Components/DoctorCard/DoctorCard.js';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation.js'
import Notification from './Components/Notification/Notification.js';
import ReviewForm from './Components/ReviewForm/ReviewForm.js';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout.js';

function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
        
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instantconsultation" element={<InstantConsultation />} />
          <Route path="/findDoctor" element={<FindDoctorSearch />} />
          <Route path="/doctorCard" element={<DoctorCard />} />
          <Route path="/bookingconsultation" element={<BookingConsultation />} />
          <Route path="/notification" element={< Notification/>} />
          <Route path="/reviews" element={<ReviewForm />} />
          <Route path="/reportslayout" element={<ReportsLayout />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;