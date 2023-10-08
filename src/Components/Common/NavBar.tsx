// src/Components/Common/NavBar.tsx

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect } from "react";
import { dbURL } from "../../DB";

import LoginModal from "./PopupModal/LoginModal";
import TicketBagModal from "./PopupModal/TicketBagModal";
import NotiList from "./PopupModal/NotiList";
import { BalanceModal } from "./PopupModal/BalanceModal";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { UserData } from "../../Pages/Interface";

export const hookupUrl = ""; {/* https://cors-anywhere.herokuapp.com/ */}

// import { useCookies } from "react-cookie";

export let Username = "";
export let UserID = "";

const Navbar = () => {


  // เพิ่ม state สำหรับตรวจสอบสถานะการเข้าสู่ระบบ
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [isLoggedInWorker, setIsLoggedInWorker] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isModalTkBagOpen, setIsModalTkBagOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isBalanceModalVisible, setisBalanceModalVisible] = useState(false);

  const [user_id, setUser_id] = useState<string>("");
  var [user_data, setUser_data] = useState<UserData>();
  const [showBalance, setShowBalance] = useState(0);

  const handleLoginClickOpen = () => {
    setIsModalLoginOpen(true);
  };
  const handleTkBagClickOpen = () => {
    setIsModalTkBagOpen(true);
  };

  const handleModalClose = () => {
    setIsModalLoginOpen(false);
    setIsModalTkBagOpen(false);
    setisBalanceModalVisible(false);
  };

  // const handleLogout = () => {
  //   setIsLoggedInUser(false);
  //   setIsLoggedInWorker(false);
  // };

  // const handlenotiClick = () => {
  //   setDropdownVisible(true);
  // };

  const handleLogout = () => {
    // ลบ token และบทบาทออกจาก localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("Username");
    localStorage.removeItem("Id");

    UserID = "";
    Username = "";

    // ตั้งค่าสถานะการเข้าสู่ระบบเป็น false สำหรับทั้งผู้ใช้ทั่วไปและ worker
    setIsLoggedInUser(false);
    setIsLoggedInWorker(false);
  };

  const handlenotiClick = () => {
    setDropdownVisible(true);
  };
  const handleNonotiClick = () => {
    setDropdownVisible(false);
  };
  const handleBalanceModal = () => {
    setisBalanceModalVisible(true);
    BalanceCheck();
  };

  const checkLoggedIn = () => {
    const token = localStorage.getItem("token"); // ดึง token จาก localStorage

    if (token) {
      // มี token ใน localStorage แสดงว่าผู้ใช้เคยเข้าสู่ระบบ
      setIsLoggedIn(true);
      // ตรวจสอบบทบาทของผู้ใช้และตั้งค่าตามความเหมาะสม
      const role = localStorage.getItem("role");

      console.log(role);

      if (role === "user") {
        
        setIsLoggedInUser(true);
      } else if (role === "worker" || role === "hiring") {
        setIsLoggedInWorker(true);

      }

      FindUsernameByID(user_id);
    } else {

      setIsLoggedIn(false);
      setIsLoggedInUser(false);
      setIsLoggedInWorker(false);

    }
  };

  // เรียกใช้ checkLoggedIn ใน useEffect เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    console.log("refresh username and Id");

    const storedUsername = localStorage.getItem("Username");
    if (storedUsername) {
      Username = storedUsername;
    }

    const storedID = localStorage.getItem("Id");
    if (storedID) {
      UserID = storedID;
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    console.log("Login Is clicked");

    const requestBody = {
      username: username,
      password: password,
    };

    try {
      const response: AxiosResponse<LoginResponse> = await axios.post<LoginResponse>(hookupUrl+  dbURL + "auth/login",requestBody);

      // Handle the successful login response
      var { access_token, role, user_id } = response.data;
      console.log("Logged in user:", access_token);
      console.log("role:", role);
      console.log("user_id:", user_id);

      UserID = user_id;

      var req1 = {
        id: user_id,
      };
      console.log(requestBody);
      //เก็บ token และบทบาทลงใน localStorage
      localStorage.setItem("token", access_token);
      localStorage.setItem("role", role);

      // เอาชื่อ id ไป แสดง

      try {
        const response: AxiosResponse<UserData> = await axios.post(
          hookupUrl+ dbURL + "users/id",
          req1
        );

        setUser_data(response.data);

        Username = response.data.name as string; // Update Username here

        console.log(response.data); // Use response.data instead of user_data

        // ...
      } catch (error) {
        // Handle login errors
        console.error(error);
      }

      setUser_id(user_id);
      setIsLoggedIn(true);

      if (role === "user") {
        setIsLoggedInUser(true);
        setIsModalLoginOpen(false);
      } else {
        setIsLoggedInWorker(true);
        setIsModalLoginOpen(false);
      }

      localStorage.setItem("Username", Username);
      localStorage.setItem("Id", UserID);

      window.location.href = 'http://localhost:3000/';

      // You can also perform actions such as setting the user's token in state or redirecting the user to another page
    } catch (error) {
      // Handle login errors
      console.error("Login error:", error);
    }

    interface LoginResponse {
      access_token: string;
      role: string;
      user_id: string;
    }

    try {
      const response: AxiosResponse<BalanceRespons> =
        await axios.post<BalanceRespons>(
          hookupUrl+ dbURL+"Ticketpay/getTicket",
          requestBody
        );

      // Handle the successful login response
      const { Ticketpay } = response.data;
      console.log("Balance:", Ticketpay);
      setShowBalance(Ticketpay);
    } catch (error) {
      console.log(error);
    }
  }

    const FindUsernameByID = async (u_id: string) => {
      console.log("Find User Name by ID");

      const requestBody = {
        id: parseInt(u_id),
      };
      try {
        const response: AxiosResponse<UserData> = await axios.post(
          hookupUrl+  dbURL + "users/id",
          requestBody
        );

        setUser_data(response.data);

        Username = user_data?.name as string;

        // You can also perform actions such as setting the user's token in state or redirecting the user to another page
      } catch (error) {
        // Handle login errors
        console.error(error);
      }
    };

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
        const { Ticketpay } = response.data;
        console.log("Balance:", Ticketpay);
        setShowBalance(Ticketpay);

        // You can also perform actions such as setting the user's token in state or redirecting the user to another page
      } catch (error) {
        // Handle login errors
        console.error("Login error:", error);
      }
    };

    interface BalanceRespons {
      Ticketpay: number;
    }

    const [ticketList, setTicketList] = useState([]);
    const [countingNumber, setCountingNumber] = useState(0);

    const TicketList = async () => {
      console.log("Ticket list is being fetched");
      const requestBody = {
        id: Number(user_id),
      };

      try {
        const response = await axios.post(
          hookupUrl+dbURL+ "concerts/Ticket_id",
          requestBody
        );

        const [ticketList, countingNumber] = response.data;

        // Process the ticket list
        console.log("Ticket List:", ticketList);

        // Process the counting number
        console.log("Counting Number:", countingNumber);
        setTicketList(ticketList);
        setCountingNumber(countingNumber);
        // You can also perform actions such as setting the user's token in state or redirecting the user to another page
      } catch (error) {
        // Handle errors
        console.error("TicketList error:", error);
      }
    };

    const appBarStyle: React.CSSProperties = {
      backgroundColor: "white",
      height: "40px",
    };

    const svgStyle: React.CSSProperties = {
      marginBottom: "25px",
    };
    const loginButtonStyle: React.CSSProperties = {
      borderRadius: "50px",
      background: "#000",
      width: "94px",
      height: "32px",
      marginBottom: "25px",
      color: "#FFF",
      textAlign: "center", // Enclose property name in quotes
      fontFamily: "Inter", // Enclose property name in quotes
      fontSize: "12px",
      fontStyle: "normal", // Enclose property value in quotes
      fontWeight: "700",
      lineHeight: "normal", // Enclose property value in quotes
    };
    const iconStyle: React.CSSProperties = {
      marginBottom: "25px",
    };
    const Groupstyle: React.CSSProperties = {
      marginLeft: "auto",
    };

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
      zIndex: 999, // Ensure the modal is on top of other content
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
      zIndex: 1000, // เพิ่ม z-index เพื่อทำให้ BalanceModal อยู่ด้านหน้า
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

    const dropdown: React.CSSProperties = {
      width: "480px",
      height: "650px",
      borderRadius: "8px",
      border: "1px solid #E4E4E4",
      background: "#FFF",
      right: "0", // Position the dropdown at the right side
      top: "40px",
      zIndex: 999,
      position: "absolute",

      overflowY: "auto",
    };

    return (
      <>
        <AppBar position="static" style={appBarStyle}>
          <Toolbar>
            <Link to="/">
              <IconButton edge="start" color="inherit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  style={svgStyle}
                >
                  <path
                    d="M13.3335 25.3333V18.6666H18.6668V25.3333C18.6668 26.0666 19.2668 26.6666 20.0001 26.6666H24.0001C24.7335 26.6666 25.3335 26.0666 25.3335 25.3333V16H27.6001C28.2135 16 28.5068 15.24 28.0401 14.84L16.8935 4.79996C16.3868 4.34663 15.6135 4.34663 15.1068 4.79996L3.96013 14.84C3.5068 15.24 3.7868 16 4.40013 16H6.6668V25.3333C6.6668 26.0666 7.2668 26.6666 8.00013 26.6666H12.0001C12.7335 26.6666 13.3335 26.0666 13.3335 25.3333Z"
                    fill="black"
                  />
                </svg>
              </IconButton>
            </Link>
            <div style={Groupstyle}>
              {isLoggedInUser ? (
                /* When logged in, display these icons */
                <>
                  <IconButton style={iconStyle}>
                  {Username}
                    {/* แสดง Username ที่ได้รับจากการเข้าสู่ระบบ */}
                  </IconButton>

                  <IconButton style={iconStyle} onClick={handleBalanceModal}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="57"
                      height="32"
                      viewBox="0 0 57 32"
                      fill="none"
                    >
                      <rect width="57" height="32" rx="16" fill="#EEEEEE" />
                      <path
                        d="M39.5 10.4933V7.83333C39.5 6.55 38.45 5.5 37.1667 5.5H20.8333C19.5383 5.5 18.5 6.55 18.5 7.83333V24.1667C18.5 25.45 19.5383 26.5 20.8333 26.5H37.1667C38.45 26.5 39.5 25.45 39.5 24.1667V21.5067C40.1883 21.0983 40.6667 20.3633 40.6667 19.5V12.5C40.6667 11.6367 40.1883 10.9017 39.5 10.4933ZM38.3333 12.5V19.5H30.1667V12.5H38.3333ZM20.8333 24.1667V7.83333H37.1667V10.1667H30.1667C28.8833 10.1667 27.8333 11.2167 27.8333 12.5V19.5C27.8333 20.7833 28.8833 21.8333 30.1667 21.8333H37.1667V24.1667H20.8333Z"
                        fill="black"
                      />
                      <path
                        d="M33.667 17.75C34.6335 17.75 35.417 16.9665 35.417 16C35.417 15.0335 34.6335 14.25 33.667 14.25C32.7005 14.25 31.917 15.0335 31.917 16C31.917 16.9665 32.7005 17.75 33.667 17.75Z"
                        fill="black"
                      />
                    </svg>
                  </IconButton>
                  <IconButton style={iconStyle} onClick={handleTkBagClickOpen}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="57"
                      height="32"
                      viewBox="0 0 57 32"
                      fill="none"
                    >
                      <rect width="57" height="32" rx="16" fill="#EEEEEE" />
                      <path
                        d="M33.142 17.1667C34.017 17.1667 34.787 16.6884 35.1837 15.965L39.3603 8.39337C39.792 7.62337 39.232 6.66671 38.3453 6.66671H21.0787L19.982 4.33337H16.167V6.66671H18.5003L22.7003 15.5217L21.1253 18.3684C20.2737 19.9317 21.3937 21.8334 23.167 21.8334H37.167V19.5H23.167L24.4503 17.1667H33.142ZM22.187 9.00004H36.362L33.142 14.8334H24.952L22.187 9.00004ZM23.167 23C21.8837 23 20.8453 24.05 20.8453 25.3334C20.8453 26.6167 21.8837 27.6667 23.167 27.6667C24.4503 27.6667 25.5003 26.6167 25.5003 25.3334C25.5003 24.05 24.4503 23 23.167 23ZM34.8337 23C33.5503 23 32.512 24.05 32.512 25.3334C32.512 26.6167 33.5503 27.6667 34.8337 27.6667C36.117 27.6667 37.167 26.6167 37.167 25.3334C37.167 24.05 36.117 23 34.8337 23Z"
                        fill="black"
                      />
                    </svg>
                  </IconButton>
                  <IconButton
                    style={iconStyle}
                    onClick={handlenotiClick}
                    onMouseLeave={handleNonotiClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="57"
                      height="32"
                      viewBox="0 0 57 32"
                      fill="none"
                    >
                      <rect width="57" height="32" rx="16" fill="#EEEEEE" />
                      <path
                        d="M29.0003 27.6666C30.2837 27.6666 31.3337 26.6166 31.3337 25.3333H26.667C26.667 26.6166 27.717 27.6666 29.0003 27.6666ZM36.0003 20.6666V14.8333C36.0003 11.2516 34.0987 8.25329 30.7503 7.45996V6.66663C30.7503 5.69829 29.9687 4.91663 29.0003 4.91663C28.032 4.91663 27.2503 5.69829 27.2503 6.66663V7.45996C23.9137 8.25329 22.0003 11.24 22.0003 14.8333V20.6666L19.667 23V24.1666H38.3337V23L36.0003 20.6666ZM33.667 21.8333H24.3337V14.8333C24.3337 11.94 26.0953 9.58329 29.0003 9.58329C31.9053 9.58329 33.667 11.94 33.667 14.8333V21.8333Z"
                        fill="black"
                      />
                    </svg>
                  </IconButton>
                  <IconButton style={loginButtonStyle} onClick={handleLogout}>
                    <Typography>Logout</Typography>
                  </IconButton>
                  <IconButton style={iconStyle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="57"
                      height="32"
                      viewBox="0 0 57 32"
                      fill="none"
                    >
                      <rect width="57" height="32" rx="16" fill="#EEEEEE" />
                      <path
                        d="M19.125 22.75H37.875V20.6667H19.125V22.75ZM19.125 17.5417H37.875V15.4583H19.125V17.5417ZM19.125 10.25V12.3333H37.875V10.25H19.125Z"
                        fill="black"
                      />
                    </svg>
                  </IconButton>
                </>
              ) : isLoggedInWorker ? (
                /* When logged in, display these icons */
                <>
                  <IconButton style={iconStyle}>
                    <Typography>{Username}</Typography>{" "}
                    {/* แสดง Username ที่ได้รับจากการเข้าสู่ระบบ */}
                  </IconButton>
                  <IconButton style={iconStyle} onClick={handleBalanceModal}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="57"
                      height="32"
                      viewBox="0 0 57 32"
                      fill="none"
                    >
                      <rect width="57" height="32" rx="16" fill="#EEEEEE" />
                      <path
                        d="M39.5 10.4933V7.83333C39.5 6.55 38.45 5.5 37.1667 5.5H20.8333C19.5383 5.5 18.5 6.55 18.5 7.83333V24.1667C18.5 25.45 19.5383 26.5 20.8333 26.5H37.1667C38.45 26.5 39.5 25.45 39.5 24.1667V21.5067C40.1883 21.0983 40.6667 20.3633 40.6667 19.5V12.5C40.6667 11.6367 40.1883 10.9017 39.5 10.4933ZM38.3333 12.5V19.5H30.1667V12.5H38.3333ZM20.8333 24.1667V7.83333H37.1667V10.1667H30.1667C28.8833 10.1667 27.8333 11.2167 27.8333 12.5V19.5C27.8333 20.7833 28.8833 21.8333 30.1667 21.8333H37.1667V24.1667H20.8333Z"
                        fill="black"
                      />
                      <path
                        d="M33.667 17.75C34.6335 17.75 35.417 16.9665 35.417 16C35.417 15.0335 34.6335 14.25 33.667 14.25C32.7005 14.25 31.917 15.0335 31.917 16C31.917 16.9665 32.7005 17.75 33.667 17.75Z"
                        fill="black"
                      />
                    </svg>
                  </IconButton>

                  <IconButton
                    style={iconStyle}
                    onClick={handlenotiClick}
                    onMouseLeave={handleNonotiClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="57"
                      height="32"
                      viewBox="0 0 57 32"
                      fill="none"
                    >
                      <rect width="57" height="32" rx="16" fill="#EEEEEE" />
                      <path
                        d="M29.0003 27.6666C30.2837 27.6666 31.3337 26.6166 31.3337 25.3333H26.667C26.667 26.6166 27.717 27.6666 29.0003 27.6666ZM36.0003 20.6666V14.8333C36.0003 11.2516 34.0987 8.25329 30.7503 7.45996V6.66663C30.7503 5.69829 29.9687 4.91663 29.0003 4.91663C28.032 4.91663 27.2503 5.69829 27.2503 6.66663V7.45996C23.9137 8.25329 22.0003 11.24 22.0003 14.8333V20.6666L19.667 23V24.1666H38.3337V23L36.0003 20.6666ZM33.667 21.8333H24.3337V14.8333C24.3337 11.94 26.0953 9.58329 29.0003 9.58329C31.9053 9.58329 33.667 11.94 33.667 14.8333V21.8333Z"
                        fill="black"
                      />
                    </svg>
                  </IconButton>
                  <IconButton style={loginButtonStyle} onClick={handleLogout}>
                    <Typography>Logout</Typography>
                  </IconButton>
                  <IconButton style={iconStyle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="57"
                      height="32"
                      viewBox="0 0 57 32"
                      fill="none"
                    >
                      <rect width="57" height="32" rx="16" fill="#EEEEEE" />
                      <path
                        d="M19.125 22.75H37.875V20.6667H19.125V22.75ZM19.125 17.5417H37.875V15.4583H19.125V17.5417ZM19.125 10.25V12.3333H37.875V10.25H19.125Z"
                        fill="black"
                      />
                    </svg>
                  </IconButton>
                </>
              ) : (
                <>
                  {" "}
                  <IconButton
                    style={loginButtonStyle}
                    onClick={handleLoginClickOpen}
                  >
                    <Typography>Login</Typography>
                  </IconButton>
                  <IconButton style={iconStyle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="57"
                      height="32"
                      viewBox="0 0 57 32"
                      fill="none"
                    >
                      <rect width="57" height="32" rx="16" fill="#EEEEEE" />
                      <path
                        d="M19.125 22.75H37.875V20.6667H19.125V22.75ZM19.125 17.5417H37.875V15.4583H19.125V17.5417ZM19.125 10.25V12.3333H37.875V10.25H19.125Z"
                        fill="black"
                      />
                    </svg>
                  </IconButton>
                </>
                /* When not logged in, display the "Login" button */
              )}
            </div>
          </Toolbar>
        </AppBar>

        {isModalLoginOpen && (
          <LoginModal
            modalOverlayStyle={modalOverlayStyle}
            modalContentStyle={modalContentStyle}
            modalinfo={modalinfo}
            contentstyle={contentstyle}
            handleModalClose={handleModalClose}
            handleLogin={handleLogin}
          />
        )}

        {isModalTkBagOpen && (
          <TicketBagModal
            handleModalClose={handleModalClose}
            index={0}
            ticketList={[]}
          />
        )}
        {isDropdownVisible && (
          <div
            style={dropdown}
            onMouseEnter={handlenotiClick}
            onMouseLeave={handleNonotiClick}
          >
            <NotiList />
          </div>
        )}
        {isBalanceModalVisible && (
          <BalanceModal
            iconClose="Pics/icon_close.png"
            handleModalClose={handleModalClose} // ตรวจสอบว่าส่งฟังก์ชันนี้ไปยัง BalanceModal หรือไม่
            Balance={showBalance}
            BalanceCheck={BalanceCheck}
          />
        )}
      </>
    );
  };

export default Navbar;