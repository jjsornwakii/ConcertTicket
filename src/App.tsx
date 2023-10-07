import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConcertInfoPage from './Pages/ConcertInfoPage';
import LoadingPage from './Pages/LoadingPage';
import LandingPage from './Pages/LandingPage';
import Navbar from './Components/Common/NavBar'
import LoadingPageHireling from './Pages/LoadingPageHireling';



const App: React.FC = () => {



  const [ticketStatus, setTicketStatus] = useState<boolean>(false);
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/concert-info/:concertId"
          element={
            <ConcertInfoPage setTicketStatus={setTicketStatus} />
          }
        />
        <Route path="/loading" element={<LoadingPage ticketStatus={ticketStatus} />} />
        <Route path="/loadingHirling" element={<LoadingPageHireling />} />
      </Routes>
    </Router>
  );
};

export default App;