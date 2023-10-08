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
    setPayoutModalclick(false);
  };

  const handlePayout = () => {
    setPayoutModalclick(!isPayoutModalclick);
    setisTopupModalclick(false);
  };

  const handleModalCloseClick = () => {
    handleModalClose();
  };

  return (
    <>
      <div className="balance-modal">
        <div className="overlap-group">
          <div className="frame">
            
            <div className="icon-close" onClick={handleModalCloseClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            {/* <img className="icon-close" alt="Icon close" src={iconClose} onClick={handleModalCloseClick} /> */}

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
          iconClose={iconClose}
          iconKeyboardArrow="icon-keyboard-arrow-down.png"
          Balance = {Balance}
          // userId = {user_id}
          BalanceCheck ={BalanceCheck}
          handleModalClose= {handleModalCloseClick}
        />
      )}
      {isPayoutModalclick && (
        <PayoutModal
          iconClose={iconClose}
          iconKeyboardArrow="icon-keyboard-arrow-down.png"
          Balance = {Balance}
          // userId = {user_id}
          BalanceCheck ={BalanceCheck}
          handleModalClose= {handleModalCloseClick}
        />
      )}
    </>
  );
};

BalanceModal.propTypes = {
  iconClose: PropTypes.string.isRequired, // ระบุว่า iconClose เป็นข้อมูลที่จำเป็น
  handleModalClose: PropTypes.func.isRequired, // ระบุว่า handleModalClose เป็นฟังก์ชันที่จำเป็น
};