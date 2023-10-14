// src/Components/Common/PayingModal.tsx

import React, { useState } from 'react';
import "./ModalCSS/PayingModal.css";
import { dbURL } from '../../../DB';
import { UserID, giveMeMoneyPls, hookupUrl } from '../NavBar';
import axios, { AxiosResponse } from 'axios';
import Notification from './Notification';

const PayingModal: React.FC<{
  modalOverlayStyle: React.CSSProperties;
  modalContentStyle: React.CSSProperties;
  modalinfo: React.CSSProperties;
  contentstyle: React.CSSProperties;
  handleModalClose: () => void;

  _buyer_id: string;
  concertName: string;
  _reciever_id: string;
  TicketNumber: string;
  conPrice: number;
  money: number;


}> = ({
  modalOverlayStyle,
  modalContentStyle,
  modalinfo,
  contentstyle,
  _buyer_id,
  concertName,
  _reciever_id,
  conPrice,
  TicketNumber,
  handleModalClose,
  money

}) => {

    const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
    const [notificationStatus, setNotificationStatus] = useState<number | null>(null);



    const handleButtonClick = () => {
      setNotificationOpen(true);
    };

    const closeNotification = () => {
      setNotificationOpen(false);
    };




    const handleHireButtonClick = async (_buyer_id: string, concertName: string, _reciever_id: string, TicketNumber: string) => {

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

        setNotificationStatus(200); // Set the status for success

      } catch (error) {
        // Handle errors
        console.error('TicketList error:', error);

        setNotificationStatus(500); // Set the status for failure

        console.log("err "+notificationStatus);
      }




      
      handleButtonClick();

      
      setTimeout(() => {
      handleModalClose();
    }, 2000);
    };


    return (
      <div className="paying-modal" style={modalOverlayStyle}>

        <div className="overlap">
          <div className="frame">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={handleModalClose}>
              <path d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z" fill="black" />
            </svg>
            <div className="div">
              <div className="frame-2">
                <div className="text-wrapper">ยอดเงินในบัญชี SafeTicket</div>
                <div className="text-wrapper-2">{money}</div>
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
                  <div className="text-wrapper-6">{conPrice} ₿</div>
                  <div className="text-wrapper-6">300 ₿</div>
                  <div className="text-wrapper-7">{conPrice + 300} ₿</div>
                </div>
              </div>
              <button className="button" onClick={() => handleHireButtonClick(_buyer_id, concertName, _reciever_id, TicketNumber)}>

                <div className="text-wrapper-8" >จ่ายเงิน</div>
              </button>
            </div>
          </div>
        </div>

        {notificationOpen && (
          <Notification
            isOpen={notificationOpen}
            onClose={closeNotification}
            status={notificationStatus}
          />
        )}
      </div>
    );
  };

export default PayingModal;
