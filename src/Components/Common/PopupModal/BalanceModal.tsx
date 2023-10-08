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
            <img className="icon-close" alt="Icon close" src={iconClose} onClick={handleModalCloseClick} />
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