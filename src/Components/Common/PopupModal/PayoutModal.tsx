import PropTypes from "prop-types";
import React, { useState } from 'react';
import "./ModalCSS/PayoutModal.css";
import axios from 'axios';
import { text } from "stream/consumers";
import { UserID, hookupUrl } from "../NavBar";
import { dbURL } from "../../../DB";


interface Props {
  iconClose: string;
  iconKeyboardArrow: string;
 Balance: number;
 BalanceCheck: () => Promise<void>;
 handleModalClose: () => void;
}

export const PayoutModal = ({
  iconClose = "icon-close.png",
  iconKeyboardArrow = "icon-keyboard-arrow-down.png",
  Balance, BalanceCheck, handleModalClose
 
}: Props): JSX.Element => {
  const [inputMinusValue, setinputMinusValue] = useState('');

    const handleInputChange = (e :React.ChangeEvent<HTMLInputElement>) => {
      setinputMinusValue(e.target.value);
    };
    const handleMinusandCheck = async () => {
      const tickMoney = parseFloat(inputMinusValue); // Parse the input value to a float
      if (!isNaN(tickMoney)) {
        // Check if the parsed value is a valid number
      await  MinusBalance(tickMoney);
       
      }
      BalanceCheck();
    };

    const handleModalCloseClick = () => {
      handleModalClose();
    };


  const MinusBalance = async (TickMoney: number) => {
    console.log("MinusBalance is showed");
    const requestBody = {
      user_id: UserID,
      Ticketpay: TickMoney,
    };
    
    try {
      const response = await axios.post(
        hookupUrl+dbURL+'/Ticketpay/minus',
       requestBody
      );
      const responseData = response.data; // Response data is plain text

      // Handle the successful response (responseData is plain text)
      console.log("Minus response",responseData);
     
      
      // You can also perform actions such as setting the user's token in state or redirecting the user to another page
    } catch (error) {
      // Handle login errors
      console.error('MinusBalance error:', error);
    }
  };
  
  
  
  
  return (
    <div className="payout-modal">
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
              <div className="text-wrapper-2">{Balance === 0 ? 'Loading' : Balance.toFixed(2) + " ₿"}</div>
            </div>
            <hr className="line" />
            <div className="frame-3">
              <div className="text-wrapper-3">ถอนเงินจำนวน</div>
              <div className="group">
              <input className="text-wrapper-4" onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter payout amount" />
              </div>
            </div>
            <div className="frame-3">
              <div className="text-wrapper-3">ช่องทางการถอนเงิน</div>
              <div className="group">
                {/* <div className="overlap-group">
                  <div className="frame-4">
                    <div className="text-wrapper-5">custom payout method</div> */}
                    <input className="text-wrapper-4" type="text" placeholder="custom payout method" disabled />
                    {/* <img className="icon-keyboard-arrow" alt="Icon keyboard arrow" src={iconKeyboardArrow} />
                  </div>
                </div> */}
              </div>
            </div>
            <button className="button" onClick={handleMinusandCheck}>
              <div className="text-wrapper-6"  >ถอนเงิน</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PayoutModal.propTypes = {
  iconClose: PropTypes.string,
  line: PropTypes.string,
  iconKeyboardArrow: PropTypes.string,
};