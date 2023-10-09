// src/Components/Common/PayingModal.tsx

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import "./ModalCSS/PayingModal.css";
import { dbURL } from '../../../DB';
import { giveMeMoneyPls, hookupUrl } from '../NavBar';
import axios from 'axios';
import { BalanceModal } from './BalanceModal';

const PayingModal: React.FC<{
  modalOverlayStyle: React.CSSProperties;
  modalContentStyle: React.CSSProperties;
  modalinfo: React.CSSProperties;
  contentstyle: React.CSSProperties;
  handleModalClose: () => void;

  _buyer_id: string; 
  concertName: string; 
  _reciever_id: string; 
  TicketNumber: number


}> = ({
  modalOverlayStyle,
  modalContentStyle,
  modalinfo,
  contentstyle,
  _buyer_id,
   concertName, 
   _reciever_id, 
   TicketNumber,
  handleModalClose,

}) => {




  const handleHireButtonClick = async (_buyer_id: string, concertName: string, _reciever_id: string, TicketNumber: number) => {

    const postData = {
      buyer_id: _buyer_id,
      Concert_name: concertName,
      reciever_id: _reciever_id,
      TicketNum: TicketNumber,
    };

    console.log(postData);

    // Send the POST request
    try {
      const response = await axios.post(hookupUrl + dbURL + 'concerts/employ', postData);

      console.log(response.data);
      console.log("จ้างสำเร็จ");

    } catch (error) {
      // Handle errors
      console.error('TicketList error:', error);
    }

    handleModalClose();

  };


    return (
      <div className="paying-modal" style={modalOverlayStyle}>
      <div className="overlap">
        <div className="frame">
          <img className="icon-close" alt="Icon close" src={"icon-close.png"} onClick={handleModalClose} />
          <div className="div">
            <div className="frame-2">
              <div className="text-wrapper">ยอดเงินในบัญชี SafeTicket</div>
              <div className="text-wrapper-2">{giveMeMoneyPls}</div>
            </div>
            <hr className="line" />
            <div className="frame-3">
              <div className="subframe-4">
                <div className="text-wrapper-3">Ticket</div>
                <div className="text-wrapper-4">{concertName}</div>
                <div className="text-wrapper-4">ค่าจ้างกดบัตร</div>
                <div className="text-wrapper-4">รวม</div>
              </div>
              <div className="subframe-5">
                <div className="text-wrapper-5">Price</div>
                <div className="text-wrapper-6">5,000 ₿</div>
                <div className="text-wrapper-6">300 ₿</div>
                <div className="text-wrapper-7">5,300 ₿</div>
              </div>
            </div>
            <button className="button" onClick={() =>handleHireButtonClick(_buyer_id,concertName,_reciever_id,TicketNumber)   }>
              <div className="text-wrapper-8" >จ่ายเงิน</div>
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  };

export default PayingModal;
