import PropTypes from "prop-types";
import "./ModalCSS/TopupModal.css";
import React, { useState } from 'react';
import axios from 'axios';
import { dbURL } from "../../../DB";
import { UserID } from "../NavBar";
interface Props {
  iconClose: string;
  iconKeyboardArrow: string;
  Balance: number;
  // userId: string;
  BalanceCheck: () => Promise<void>;
  handleModalClose: () => void;
}

export const TopupModal = ({
  iconClose = "icon-close.png",
  iconKeyboardArrow = "icon-keyboard-arrow-down.png",
  Balance,BalanceCheck, handleModalClose
}: Props): JSX.Element => {
  const [inputAddValue, setinputAddValue] = useState('');

    const handleInputChange = (e :React.ChangeEvent<HTMLInputElement>) => {
      setinputAddValue(e.target.value);
    };
    const handleAddandCheck = async  () => {
      const tickMoney = parseFloat(inputAddValue); // Parse the input value to a float
      if (!isNaN(tickMoney)) {
        // Check if the parsed value is a valid number
        console.log(tickMoney);
        await AddBalance(tickMoney);
      }
      BalanceCheck();
    };

    const handleModalCloseClick = () => {
      handleModalClose();
    };


  const AddBalance = async (TickMoney: number) => {
    console.log("user_id: " + UserID + " AddBalance");
    const requestBody = {
      user_id: Number(UserID),
      Ticketpay: TickMoney,
    };
    
    try {
      const response = await axios.post(
        dbURL+'Ticketpay/add',
       requestBody
      );
      const responseData = response.data; // Response data is plain text

      // Handle the successful response (responseData is plain text)
      console.log("Add response",responseData);
     
      
      // You can also perform actions such as setting the user's token in state or redirecting the user to another page
    } catch (error) {
      // Handle login errors
      console.error('Add Balance error:', error);
    }
  };
  return (
    
    <div className="topup-modal">
      <div className="overlap">
        <div className="frame">

          <div className="icon-close" onClick={handleModalCloseClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          {/* <img className="icon-close" alt="Icon close" src={iconClose} onClick={handleModalCloseClick}/> */}

          <div className="div">
            <div className="frame-2">
              <div className="text-wrapper">ยอดเงินในบัญชี SafeTicket</div>
              <div className="text-wrapper-2">
                {Balance === undefined ? '0.00 ฿' : Balance.toFixed(2) + " ₿"}
              </div>
            </div>
            <hr className="line"/>
            <div className="frame-3">
              <div className="text-wrapper-3">เติมเงินจำนวน</div>
              <div className="group">
             
              
                  <input className="text-wrapper-4" onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter top-up amount" />
                
                
              </div>
            </div>
            <div className="frame-3">
              <div className="text-wrapper-5">ช่องทางการเติมเงิน</div>
              <div className="group">
                {/* <div className="overlap-group">
                  <div className="frame-4">
                    <div className="text-wrapper-6">custom top-up method</div> */}
                    <input className="text-wrapper-4" type="text" placeholder="custom top-up method" disabled />
                    {/* <img className="icon-keyboard-arrow" alt="Icon keyboard arrow" src={iconKeyboardArrow} />
                  </div>
                </div> */}
              </div> 
            </div>
            <button className="button" onClick={handleAddandCheck}>
              <div className="text-wrapper-7" >เติมเงิน</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TopupModal.propTypes = {
  iconClose: PropTypes.string,
  line: PropTypes.string,
  iconKeyboardArrow: PropTypes.string,
};