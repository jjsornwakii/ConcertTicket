import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

function IsDecline() {
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
  return (
    <div id="block-noti">
      <div id="block-text">
        <Typography id="Typography" className="h1">
          Notification
        </Typography>
        <Typography id="Typography" >
          ได้ปฏิเสธคำร้องขอแล้ว
          </Typography>
      </div>
      <div id="block-btn">
          <IconButton id="btn">
            รับทราบ
          </IconButton>
      </div>
    </div>
  );
}

export default IsDecline;
