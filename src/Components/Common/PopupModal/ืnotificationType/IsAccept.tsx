import React from 'react'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { GetHiringByReceiverId } from '../../../../Pages/Interface';
import { hookupUrl } from '../../NavBar';
import { dbURL } from '../../../../DB';
import axios from 'axios';

import './notificationType.css';

interface Props {

  data: GetHiringByReceiverId;
}

function IsAccept({ data }: Props) {

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
  
   };



  return (
    <div id="BuyerAccept">
      <div id="block-text">
      <Typography id="Typography" className='h1'>
        Notification
      </Typography>
        {!data.Accepting ? (
          <Typography id="Typography">
            คุณส่งคำสั่งซื้อให้ {data.buyer_username} แล้ว กรุณารอการตอบรับ
          </Typography>
        ) : (
          <Typography id="Typography">
            {data.buyer_username} ได้ตอบรับคำสั่งซื้อ {data.concert_name} จำนวน {data.TicketNum} แล้ว 
            กรุณารอผู้รับจ้างกดบัตร {data.Ticketpay}
          </Typography>
        )}
      </div>
      <div id="block-btn">
          {data.Accepting ? (
            <IconButton id="btn">
              กรุณารอรับบัตรหากผู้จ้างกดบัตรสำเร็จ
            </IconButton>
          ) : (
            <IconButton id="btn" className="reject"
              onClick={() => ClickToReject(data.id, data.buyer_id, data.concert_name, data.reciever_id)}>
              ปฏิเสธ
            </IconButton>
          )}
      </div>
    </div>
  )
  
}

export default IsAccept