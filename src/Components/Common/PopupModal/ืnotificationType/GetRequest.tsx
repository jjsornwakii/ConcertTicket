import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { EventData, GetHiringByBuyerId } from "../../../../Pages/Interface";
import { dbURL } from "../../../../DB";
import axios from "axios";
import { hookupUrl } from "../../NavBar";
import { Link } from "react-router-dom";



interface Props {

  data: GetHiringByBuyerId;

}

function GetRequest({ data }: Props) {

  const [isVisible, setIsVisible] = useState(true);


  const containerStyle: React.CSSProperties = {
    display: "flex",
    width: "348px",
    height: "auto",
    padding: "15px",
    flexDirection: "column",
    justifyContent: "space-between",
    flexShrink: 0,
    borderRadius: "10px",
    background: "#EDE7E3",
    margin: "auto",
    marginTop: "25px",
    marginBottom: "10px",
  };




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
    alert("คุณได้ตอบรับคำสั่งซื้อของลูกค้า");
  } catch (error) {
    // Handle errors
    console.error('TicketList error:', error);
  }

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
    console.log("worker/buyer reject");
    setIsVisible(false);
  } catch (error) {
    // Handle errors
    console.error('TicketList error:', error);
  }

 };



  const [concertData, setData] = useState<EventData[]>([]);

  useEffect(() => {
      

  }, []);



  return isVisible ? (

    <div>
      <div className="RequestBuyer" style={{
        ...containerStyle,
        background: data.Accepting ? '#00CC99' : '#EDE7E3',
      }}>

        <div style={{ margin: "auto" }}>
          <Typography fontWeight={"bold"} fontSize={"24px"}>
            Notification order #{data.id}
          </Typography>
          <Typography>
            Concert's Name : {data.concert_name}
          </Typography>
          <Typography>
            Customer's Name : {data.reciever_username}
          </Typography>
          <Typography>
            Ticket Number : {data.TicketNum}
          </Typography>
          <Typography>
            Total tickpay : {data.Ticketpay}
          </Typography>
          <Typography>
            Concert ID : {data.concert_id}
          </Typography>
        </div>



        {data.Accepting ? (
            // Render this content if data.Accepting is true
          
            <Link to={`http://localhost:3000/concert-info/${data.concert_id}`} state={data}>
            <IconButton
                style={{
                  fontSize: '12px',
                  backgroundColor: '#FFA62B',
                  borderRadius: '5px',
                  width: '135px',
                  height: '24px',
                  color: 'white',
                }}
              >
                กดบัตร
              </IconButton>
              </Link>
          ) : (
            // Render this content if data.Accepting is not true
            <div style={{display: 'flex', gap: '70px'}}>
              <IconButton
                style={{
                  fontSize: '12px',
                  backgroundColor: '#FFA62B',
                  borderRadius: '5px',
                  width: '40%',
                  height: '24px',
                  color: 'white',
                }}
                onClick={() => ClickToAccept(data.id, data.buyer_id, data.concert_name, data.reciever_id)}
              
              >
                รับงาน
              </IconButton>
              <IconButton
                style={{
                  fontSize: '12px',
                  backgroundColor: '#888',
                  borderRadius: '5px',
                  width: '40%',
                  height: '24px',
                  color: 'white',
                }}
                onClick={() => ClickToReject(data.id, data.buyer_id, data.concert_name, data.reciever_id)}
              >
                ปฏิเสธ
              </IconButton>
            </div>
          )}
      </div>
    </div>
  ) : null
}

export default GetRequest;