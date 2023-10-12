import React from 'react'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { GetHiringByReceiverId } from '../../../../Pages/Interface';
import { hookupUrl } from '../../NavBar';
import { dbURL } from '../../../../DB';
import axios from 'axios';

interface Props {

  data: GetHiringByReceiverId;
}

function IsAccept({ data }: Props) {

  const containerStyle: React.CSSProperties = {
    display: "flex",
    width: "348px",
    height: "148px",
    padding: "15px 0px",
    flexDirection: "column",
    justifyContent: "space-between",
    flexShrink: 0,
    borderRadius: "10px",
    background: "#EDE7E3",
    margin: "auto",
    marginTop: "25px",
    marginBottom: "10px",
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
  
   };



  return (
    <div className="BuyerAccept" style={containerStyle}>
      <div style={{ marginRight: 'auto', marginLeft: '20px', marginTop: 'auto' }}>
        {!data.Accepting ? (
          <Typography fontSize={'16px'}>คุณส่งคำสั่งซื้อให้ {data.buyer_username} แล้ว กรุณารอการตอบรับ</Typography>
        ) : (
          <Typography  fontSize={'16px'}>{data.buyer_username} ได้ตอบรับคำสั่งซื้อ {data.concert_name} จำนวน {data.TicketNum} แล้ว  กรุณารอผู้รับจ้างกดบัตร {data.Ticketpay}</Typography>
        )}
      </div>
      <div id="block" style={{ display: "colum", margin: 'auto', justifyContent: 'space-between', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          {data.Accepting ? (
            <IconButton style={{
              fontSize: '12px', backgroundColor: '#FFA62B', borderRadius: '5px', width: '135px',
              height: '24px', color: 'white'
            }}>กรุณารอรับบัตรหากผู้จ้างกดบัตรสำเร็จ</IconButton>
          ) : (
            <IconButton style={{
              fontSize: '12px', backgroundColor: '#888', borderRadius: '5px', width: '135px',
              height: '24px', color: 'white'
            }}
            onClick={() => ClickToReject(data.id, data.buyer_id, data.concert_name, data.reciever_id)
          
          }>ปฏิเสธ</IconButton>
          )}
        </div>
      </div>
    </div>
  )
  
}

export default IsAccept