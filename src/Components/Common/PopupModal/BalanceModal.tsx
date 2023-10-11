import PropTypes from "prop-types";
import React, { useState } from 'react';
import "./ModalCSS/BalanceModal.css";
import { TopupModal } from "./TopupModal";
import { PayoutModal } from "./PayoutModal";

interface Props {
  iconClose: string;
  handleModalClose: () => void;
  // user_id: string;
  Balance: number;
  BalanceCheck: () => Promise<void>;
}

export const BalanceModal = ({ iconClose, handleModalClose, Balance,  BalanceCheck,}: Props): JSX.Element => {
  console.log("BalanceModal show");
  const [isTopupModalclick, setisTopupModalclick] = useState(false);
  const [isPayoutModalclick, setPayoutModalclick] = useState(false);
  
  
  const handleTopup = () => {
    setisTopupModalclick(!isTopupModalclick);
  };

  const handlePayout = () => {
    setPayoutModalclick(!isPayoutModalclick);
  };

  const handleModalCloseClick = () => {
    handleModalClose();
  };

  return (
    <>
      <div className="balance-modal">
        <div className="overlap-group">
          <div className="frame">
            <br/>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={handleModalCloseClick}>
                <path d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z" fill="black"/>
            </svg>
            <div className="div">
              <div className="frame-2">
                <div className="text-wrapper">ยอดเงินในบัญชี SafeTicket</div>
                <div className="text-wrapper-2">
                  {Balance === undefined ? '0.00 ฿' : Balance.toFixed(2) + " ₿"}
                </div>
              </div>
              <div className="frame-3">
                <button className="button" onClick={handleTopup}>
                  <div className="text-wrapper-3">เติมเงิน</div>
                </button>
                <button className="div-wrapper" onClick={handlePayout}>
                  <div className="text-wrapper-3">ถอนเงิน</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isTopupModalclick && (
        <TopupModal
          iconClose="Pics/icon_close.png"
          iconKeyboardArrow="icon-keyboard-arrow-down.png"
          Balance = {Balance}
          // userId = {user_id}
          BalanceCheck ={BalanceCheck}
         
        />
      )}
      {isPayoutModalclick && (
        <PayoutModal
          iconClose="Pics/icon_close.png"
          iconKeyboardArrow="icon-keyboard-arrow-down.png"
          Balance = {Balance}
          // userId = {user_id}
          BalanceCheck ={BalanceCheck}
        />
      )}
    </>
  );
};

BalanceModal.propTypes = {
  iconClose: PropTypes.string.isRequired, // ระบุว่า iconClose เป็นข้อมูลที่จำเป็น
  handleModalClose: PropTypes.func.isRequired, // ระบุว่า handleModalClose เป็นฟังก์ชันที่จำเป็น
};