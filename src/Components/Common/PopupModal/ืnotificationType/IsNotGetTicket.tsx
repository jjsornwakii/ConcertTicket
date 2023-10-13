import React from 'react'
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import './notificationType.css';


function IsNotGetTicket() {
  return (
  <div id="block-noti" className="TicketFail">
    <div id="block-text">
      <Typography id="Typography" className='h1'>Notification</Typography>
      <Typography id="Typography">Mr.D กดบัตรไม่สำเร็จเสียใจด้วย</Typography>
    </div>
    <div id="block-btn">
        <IconButton id="btn">รับทราบ</IconButton>
    </div>
  </div>
  )
}

export default IsNotGetTicket