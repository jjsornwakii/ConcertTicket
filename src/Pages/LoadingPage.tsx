import React, { useState, useEffect } from 'react';
// import LoadingComponent from '../Components/LoadingComponent/LoadingComponent';
import LoadingComponent from '../Components/LoadingComponent/LoadingComponent';
import '../Components/CSS/LoadingPage.css';
import GetTicketComponent from '../Components/LoadingComponent/GetTicketComponent';
import FailTicketComponent from '../Components/LoadingComponent/FailTicketComponent';

interface LoadingPageProps {
  ticketStatus: boolean;
}
const LoadingPage: React.FC<LoadingPageProps> = ({ ticketStatus }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);


  const showResult = () => {
    if (ticketStatus === true) {
      return <GetTicketComponent isLoading={!isLoading} />;
    } else {
      return <FailTicketComponent isLoading={!isLoading} />;
    }
  };

  return (
    <div>
        <div className="LoadingPage">
        <LoadingComponent isLoading={isLoading} />
        
        {showResult()}
        </div>
    </div>
  );
};

export default LoadingPage;
