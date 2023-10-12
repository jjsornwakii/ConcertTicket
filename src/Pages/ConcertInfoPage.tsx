import React, { useState, useEffect } from 'react';
import "../Components/CSS/ConcertInfoPage.css";
import { UserID, hookupUrl } from '../Components/Common/NavBar';
import { Link, useLocation } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom'; // เพิ่มการนำเข้าคำสั่ง useParams
import { Employ, EventData, GetHiringByBuyerId, UserData } from './Interface';

import { dbURL } from '../DB';
import { Username } from '../Components/Common/NavBar';
import axios, { AxiosResponse } from 'axios';
import PayingModal from '../Components/Common/PopupModal/PayingModal';
import Notification from '../Components/Common/PopupModal/Notification';

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  display: "flex",
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  //zIndex: 999, // Ensure the modal is on top of other content
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  height: "300px",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  //zIndex: 1000, // เพิ่ม z-index เพื่อทำให้ BalanceModal อยู่ด้านหน้า
};

const modalinfo: React.CSSProperties = {
  height: "247px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "25px",
  flexShrink: 0,
};
const contentstyle: React.CSSProperties = {
  alignItems: "center",
  marginLeft: "40px",
  justifyContent: "center",
};

const ConcertInfoPage = ({ setTicketStatus }: { setTicketStatus: Function }) => {

  const navigate = useNavigate();

  const { concertId } = useParams();
  const location = useLocation();
  const data = location.state as GetHiringByBuyerId;

  const role = localStorage.getItem("role");

  console.log(data);
  
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const handleButtonClick = () => {
    setNotificationOpen(true);
  };

  const closeNotification = () => {
    setNotificationOpen(false);
  };
  console.log(concertId);

  const [concertData, setData] = useState<EventData[]>([]);
  const [recipients, setRecipients] = useState<UserData[]>([]);
  const [payingModal, setPayingModal] = useState(false);
  const [recepientID, setRecepientID] = useState("");
  const [concertName, setConcertName] = useState("");
  const [receiverID, setreceiverID] = useState("");
  const [TicketNumber, setTicketNumber] = useState("");

  // สร้าง state สำหรับเก็บข้อมูลที่คุณต้องการส่งผ่าน POST request
  //const [postData, setPostData] = useState<Employ>();

  useEffect(() => {
    // สร้างฟังก์ชัน async เพื่อรับข้อมูล concert ทั้งหมด
    const fetchConcert = async () => {
      try {
        const response = await fetch(hookupUrl + dbURL + 'concerts');       
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json(); // แปลงข้อมูล json ให้อยู่ในรูปของ Object
        setData(responseData); // นำข้อมูลที่รับมาเก็บ
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }


    };
    fetchConcert(); // เรียกใช้ฟังก์ชัน fetchData เมื่อคอมโพเนนต์ถูกโหลด


    const fetchUser = async () => {
      try {
        const response = await fetch(hookupUrl + dbURL + 'users');         
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json(); // แปลงข้อมูล json ให้อยู่ในรูปของ Object
        setRecipients(responseData); // นำข้อมูลที่รับมาเก็บ
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }


    };
    fetchUser(); // เรียกใช้ฟังก์ชัน fetchData เมื่อคอมโพเนนต์ถูกโหลด

  }, []);


  const [showBalance , setBalance] = useState(0);

  interface BalanceRespons {
    Ticketpay: number;
  }

  const BalanceCheck = async () => {
    console.log("Balance is showed");
    const requestBody = {
      id: Number(UserID),
    };

    try {
      const response: AxiosResponse<BalanceRespons> =
        await axios.post<BalanceRespons>(
          hookupUrl+  dbURL + "Ticketpay/getTicket",
          requestBody
        );

  // Handle the successful login response
  const {Ticketpay } = response.data;
  console.log('Balance:', Ticketpay);
  setBalance(Ticketpay);
  
  // You can also perform actions such as setting the user's token in state or redirecting the user to another page
} catch (error) {
  // Handle login errors
  console.error('Login error:', error);
}
};



  const handleModalClose = () => {
    setPayingModal(false);
  }






  const handleHireButtonClick = async () => {

    setPayingModal(true);

  };

  const handleGetTicketforRecieverClick = async (id: number, concertName: string, _reciever_id: number, _buyer_id: number) => {

    const postData = {
      id: id,
      buyer_id: _buyer_id,
      Concert_name: concertName,
      reciever_id: _reciever_id
    };

    console.log(postData);

    // Send the POST request
    try {
      const response = await axios.post(hookupUrl + dbURL + 'concerts/employbuy', postData);

      console.log(response.data);
      console.log("ซื้อให้ลูกค้าสำเร็จ");

    } catch (error) {
      // Handle errors
      console.error('TicketList error:', error);
    }

  };

  const handleGetTicketsClick = async (_user_id: string, ticket: number, concert_name: string) => {

    const currentTime = new Date();
    const allowedStartTime = new Date(currentTime);
    allowedStartTime.setHours(0, 0, 0); // เวลาเริ่มต้นที่อนุญาตให้กดบัตร (13:00)

    const allowedEndTime = new Date(currentTime);
    allowedEndTime.setHours(23, 0, 0); // เวลาสิ้นสุดที่อนุญาตให้กดบัตร (16:00)

    if (currentTime >= allowedStartTime && currentTime <= allowedEndTime) {
      const postData = {
        user_id: _user_id,
        Ticket: ticket,
        Concert_name: concert_name
      };

      try {
        const response = await axios.post(
          hookupUrl + dbURL + 'concerts/buys',
          postData
        );

        console.log(response.data);

        navigate('/loading');
        if (response.status === 201) {
          setTicketStatus(true); // อัปเดตค่า ticketStatus เป็น true
          console.log('กดบัตรได้แล้ว ไอเวร');
        } else {
          setTicketStatus(false); // อัปเดตค่า ticketStatus เป็น false
          console.log('กดช้าไป โง่นัก');
        }
      } catch (error) {
        console.error('เออเร่อนะไอโง่ :', error);
      }
    } else {
      // ถ้าไม่ได้ในช่วงเวลาที่อนุญาตให้กดบัตร
      console.log('ไม่ได้ในช่วงเวลาที่อนุญาตให้กดบัตร');
    }
  };






  console.log(Username);
  const selectedConcert = concertData.find(concert => concert.id === concertId);


  const conPrice = selectedConcert?.price as number;
  const conName = selectedConcert?.name as string;
  console.log(conName);

  // กรองให้เหลือแต่ role hiring(worker) สำหรับแสดงให้ user กดจ้าง worker
  const hiringRecipients = recipients.filter(recipient => recipient.role === "hiring");
  //console.log(hiringRecipients);


  return (
    <div className="container" id="content">
      <div className="container" id="info">
        <div className="column" id="concertInfo">
          <div className="container" id="concertHeader">
            <h2 id="concertName">{selectedConcert?.name}</h2>
            <h2 id="concertDate">{selectedConcert?.Start} - {selectedConcert?.End}</h2>

          </div>
          <img id="concertPic" src={selectedConcert?.PhotoUrl} alt="">
          </img>
          <div className="container" id="ticketLine">
            <h2 id="concertTicket">{selectedConcert?.Start}</h2>

            <h2 id="concertTicket">{selectedConcert?.price} THB</h2> {/* Display ticket price here */}

            {role === 'user' ? (
              <Link to="/loading">
                <button type="button" id="btn1" onClick={() => handleGetTicketsClick(UserID, 1, conName)}>GET TICKETS</button>
              </Link>
            ) : (
              <Link to="/loading">
                <button type="button" id="btn1" onClick={() => handleGetTicketforRecieverClick(data.id, data.concert_name, data.reciever_id, data.buyer_id)}>GET TICKETS For Customer</button>
              </Link>)}
          </div>
          <div className="container" id="lineContainer">
            <h2 id="text1">รายละเอียด</h2>
            <hr></hr>
          </div>
          <div>
            <p id="concertText">
              วั้นพร้อมมั้ย ทไว้พร้อมล้าว! TWICE 5TH WORLD TOUR ‘READY TO BE’ IN BANGKOK วันที่ 23 - 24 ก.ย. อิมแพ็ค อารีน่า เมืองทองธานี
            </p>
            <p id="concertText">
              รอบการแสดงวันที่ 24 กันยายน 2566 จำหน่ายบัตรทั่วไป ( 23 มิถุนายน 2566 เวลา 10.00 น. เป็นต้นไป) ที่ <a href="https://www.SafeTicket.com">www.SafeTicket.com</a> เท่านั้น และเปิดจำหน่ายครบทุกช่องทางวันที่ 24 มิถุนายน ตั้งแต่เวลา 10.00 น. เป็นต้นไป <br></br>
              • ลูกค้า 1 ท่าน ซื้อบัตรได้ไม่เกิน 4 ใบ <br></br>
              • การซื้อบัตรทางเว็บไซต์ในวันที่ 23 มิ.ย. 66 โปรดกดรอรับคิวซื้อบัตรได้ที่หน้าเว็บไซต์เวลา 9.00 น. และจำหน่ายบัตรเวลา 10.00 น. เป็นต้นไป
            </p>
          </div>
        </div>


        {role === 'user' ? (
          <div className="column">
            <div className="container" id="recipientSelectBox">
              <div className="container" id="recipientList">
                <h2 id="recipientHeader">ผู้รับกดบัตร</h2>

                {hiringRecipients.map((recipient) => (
                  <div className="container" id="person" key={recipient.user_id}>

                    <div className="left-content">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M14 2.625C7.72789 2.625 2.625 7.72789 2.625 14C2.625 20.2721 7.72789 25.375 14 25.375C20.2721 25.375 25.375 20.2721 25.375 14C25.375 7.72789 20.2721 2.625 14 2.625ZM11.2536 9.01359C11.9465 8.27914 12.9216 7.875 14 7.875C15.0784 7.875 16.0448 8.28188 16.7404 9.02016C17.4453 9.76828 17.7882 10.7734 17.7073 11.8541C17.5454 14 15.8829 15.75 14 15.75C12.1171 15.75 10.4513 14 10.2927 11.8535C10.2123 10.7641 10.5547 9.7557 11.2536 9.01359ZM14 23.625C12.7151 23.6258 11.4431 23.3687 10.2595 22.8687C9.07581 22.3688 8.00461 21.6362 7.10938 20.7145C7.6221 19.9833 8.2754 19.3617 9.03109 18.8858C10.4251 17.9922 12.1893 17.5 14 17.5C15.8107 17.5 17.5749 17.9922 18.9673 18.8858C19.7236 19.3614 20.3775 19.9831 20.8906 20.7145C19.9955 21.6363 18.9243 22.3689 17.7406 22.8689C16.5569 23.3689 15.2849 23.626 14 23.625Z" fill="black" />
                      </svg>

                      <p>{recipient.name}</p>

                    </div>
                    <div className="right-content">
                    <div className="right-content">
                    <button
                      type="button"
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        handleHireButtonClick();
                        BalanceCheck();
                        setRecepientID(recipient.user_id);
                        setConcertName(conName);
                        setreceiverID(UserID);
                        setTicketNumber("1");
                      }}>
                      จ้าง
                    </button>
                  </div>
                      <Notification isOpen={notificationOpen} onClose={closeNotification} />
                    </div>
                  </div>

                ))}

              </div>
            </div>
          </div>
        ) : (<></>)}
      </div>


      {payingModal && (
        <PayingModal
          modalOverlayStyle={modalOverlayStyle}
          modalContentStyle={modalContentStyle}
          modalinfo={modalinfo}
          contentstyle={contentstyle}

          _buyer_id = {recepientID} 
          concertName={concertName}
           _reciever_id={receiverID}
           money = {showBalance}
           conPrice = {conPrice}
          
          TicketNumber= {TicketNumber}
          handleModalClose={handleModalClose}

        />
      )}


    </div >
  )
};

export default ConcertInfoPage;