import React from 'react'
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import './notificationType.css';

function IsGetTicket() {
  return (
  <div className="GotTicket" id="block-noti">
    <div id="block-text">
      <Typography id="Typography" className='h1'>Notification</Typography>
      <Typography id="Typography">Mr.C ได้กดบัตร xxx สำเร็จแล้วกรุณาเช็คที่ กระเป๋า</Typography>
    </div>
    <div id="block-btn">
        <IconButton id="btn">รับทราบ</IconButton>
    </div>
  </div>
  )
}

export default IsGetTicket