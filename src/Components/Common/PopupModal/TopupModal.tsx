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
  BalanceCheck: () => Promise<void>;
  onClose: () => void;
}

export const TopupModal = ({ iconClose, iconKeyboardArrow, Balance, BalanceCheck, onClose }: Props): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={() => { onClose(); setIsModalOpen(false); }}>
                <path d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z" fill="black"/>
            </svg>
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
                <div className="overlap-group">
                  <div className="frame-4">
                    <div className="text-wrapper-6">custom top-up method</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="10" viewBox="0 0 21 13" fill="none">
                      <path d="M3.12073 1.03303L10.1913 8.10364L17.262 1.03303C17.9727 0.322323 19.1207 0.322323 19.8314 1.03303C20.5421 1.74374 20.5421 2.8918 19.8314 3.60251L11.467 11.967C10.7563 12.6777 9.6082 12.6777 8.89749 11.967L0.53303 3.60251C-0.177677 2.8918 -0.177677 1.74374 0.53303 1.03303C1.24374 0.340547 2.41002 0.322323 3.12073 1.03303Z" fill="black"/>
                    </svg>
                  </div>
                </div>
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