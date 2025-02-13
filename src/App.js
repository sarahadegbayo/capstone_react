import React from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';

// Import your page components
import LandingPage from './Components/Landing_Page/LandingPage';
import Sign_Up from './Components/Sign_Up/Sign_Up.js'; // Ensure this path is correct
import Login from './Components/Login/Login.js'; // Ensure this path is correct
import InstantConsultation from 'InstantConsultationBooking/InstantConsultation.js'
// import Appointments from './Components/Appointments/Appointments'; // Uncomment if needed

// Function component for the main App
function App() {
  return (
    <div className="App">
      {/* Set up BrowserRouter for routing */}
      <BrowserRouter>
        {/* Display the Navbar component */}
        <Navbar />

        {/* Set up the Routes for different pages */}
        <Routes>
          {/* Define individual Route components for different pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign_up" element={<Sign_Up />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          {/* <Route path="/appointments" element={<Appointments />} /> */}

          {/* Handle undefined routes (404 Not Found) */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;
