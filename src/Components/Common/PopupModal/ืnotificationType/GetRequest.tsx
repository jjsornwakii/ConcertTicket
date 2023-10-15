import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { EventData, GetHiringByBuyerId } from "../../../../Pages/Interface";
import { dbURL } from "../../../../DB";
import axios from "axios";
import { hookupUrl } from "../../NavBar";
import { Link} from "react-router-dom";

import './notificationType.css';


interface Props {

  data: GetHiringByBuyerId;

}

function GetRequest({ data }: Props) {


 const ClickToAccept = async (id:number,buyer_id: number,Concert_name:string,reciever_id:number) => {
  
  const postData = {
    id : id , 
    buyer_id : buyer_id,
    Concert_name : Concert_name,
    reciever_id : reciever_id 
  };

  console.log(postData);

  // Send the POST request
  try {

    const response = await axios.post(hookupUrl+dbURL+'concerts/Accept',postData);

    console.log(response.data);
    console.log("ตอบรับแล้วนะครับน้องๆ");

  } catch (error) {
    // Handle errors
    console.error('TicketList error:', error);
  }

  window.location.reload();

 };

 const ClickToReject = async (id:number,buyer_id: number,Concert_name:string,reciever_id:number) => {
  
  const postData = {
    id : id , 
    buyer_id : buyer_id,
    Concert_name : Concert_name,
    reciever_id : reciever_id 
  };

  console.log(postData);

  // Send the POST request
  try {

    const response = await axios.post(hookupUrl+dbURL+'concerts/inject',postData);

    console.log(response.data);
    console.log("rejectแล้วนะครับน้องๆ");

  } catch (error) {
    // Handle errors
    console.error('TicketList error:', error);
  }
  window.location.reload();
 };

  useEffect(() => {

  }, []);

  return (

    <div>
      <div id="block-noti">
        <div id="block-text">
          <Typography id="Typography" className="h1">
            Notification order #{data.id}
          </Typography>
          <Typography id="Typography" >
            Concert's Name : {data.concert_name}
          </Typography>
          <Typography id="Typography" >
            Customer's Name : {data.reciever_username}
          </Typography>
          <Typography id="Typography" >
            Ticket Number : {data.TicketNum}
          </Typography>
          <Typography id="Typography" >
            Total tickpay : {data.Ticketpay}
          </Typography>
          <Typography id="Typography" >
            Concert ID : {data.concert_id}
          </Typography>
        </div>

        <div id="block-btn" className="two-btn">
          {data.Accepting ? (
              <Link to={`concert-info/${data.concert_id}`} state={data}>
              <IconButton
              id="btn"
                >
                  กดบัตร
                </IconButton>
                </Link>
            ) : (
              // Render this content if data.Accepting is not true
              <>
                <IconButton
                id="btn"
                  onClick={() => ClickToAccept(data.id, data.buyer_id, data.concert_name, data.reciever_id)}
                
                >
                  รับงาน
                </IconButton>
                <IconButton
                id="btn"
                className="reject"
                  onClick={() => ClickToReject(data.id, data.buyer_id, data.concert_name, data.reciever_id)}
                >
                  ปฏิเสธ
                </IconButton>
              </>
            )}
        </div>
      </div>
    </div>
  );
}

export default GetRequest;
