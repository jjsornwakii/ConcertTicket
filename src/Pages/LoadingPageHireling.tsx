import React, { useState, useEffect } from "react";
// import LoadingComponent from '../Components/LoadingComponent/LoadingComponent';
import LoadingComponent from "../Components/LoadingComponent/LoadingComponent";
import "../Components/CSS/LoadingPage.css";
import GetTicketComponent from "../Components/LoadingComponent/GetTicketComponent";
import FailTicketComponent from "../Components/LoadingComponent/FailTicketComponent";
import { useCookies } from "react-cookie";
import { dbURL } from "../DB";

const LoadingPageHireling = () => {

  const [cookies] = useCookies(['user']);

  const [isLoading, setIsLoading] = useState(true);
  const [isApprove, setIsApprove] = useState(false);

  const getUserDataFromCookie = () => {
    const userDataString = cookies['user'];
    console.log(userDataString)
    return userDataString ? JSON.parse(userDataString) : null;
  };

  const userData = getUserDataFromCookie();

  useEffect(() => {
    // สร้างฟังก์ชัน async เพื่อรับข้อมูลจาก API
    const fetchHirlingBuyConcertTicket = async () => {
      try {
        const data = {
            buyer_id: userData.userId,
            // Concert_name: string,
            // reciever_id: UsersS,
            TicketNum:1
        };
        const response = await fetch(dbURL + "concerts/employbuy",{
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },body: JSON.stringify(data)}); 
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        // setData(responseData); // นำข้อมูลที่รับมาเก็บ
        // console.log(userData.username);
        console.log(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setIsLoading(false);
  }, []);

  return (
    <div>
      <div className="LoadingPage">
        <LoadingComponent isLoading={isLoading} />
        {isLoading ? (
          <GetTicketComponent isLoading={!isApprove} />
        ) : (
          <FailTicketComponent isLoading={isApprove} />
        )}
      </div>
    </div>
  );
};

export default LoadingPageHireling;
