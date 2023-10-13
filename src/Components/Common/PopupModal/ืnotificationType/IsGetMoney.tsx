import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import './notificationType.css';

function IsGetMoney() {
  return (
  <div className="DepositSuccess" id="block-noti">
    <div id="block-text">
      <Typography id="Typography" className="h1">
        Notification
      </Typography>
      <Typography id="Typography">Mrs.F ได้ทำการโอนเงินเรียบร้อยแล้ว</Typography>
    </div>
    <div id="block-btn">
        <IconButton id="btn">
          รับทราบ
        </IconButton>
    </div>
  </div>
  );
}

export default IsGetMoney;
