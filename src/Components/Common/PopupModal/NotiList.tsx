import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import IsAccept from './ืnotificationType/IsAccept';
import GetRequest from './ืnotificationType/GetRequest';
import { PayingModal } from './PayingModal';
import axios from 'axios';
import { dbURL } from '../../../DB';
import { UserID, hookupUrl } from '../NavBar';
import { GetHiringByBuyerId } from '../../../Pages/Interface';




const NotiList: React.FC = () => {

  //    {/* User */}
  //   const [isAcceptNoti, setisAcceptNoti] = useState(true);//worker is accept
  //   const [isdeclineNoti, setisdeclineNoti] = useState(false);//woker is decline
  //   const [isGotticket, setisGotticket] = useState(false);//user is got ticker
  //   const [isGotticketFail, setisGotticketFail] = useState(false);//user fail to get ticket 


  //    {/* Worker */}
  const [isGotRequest, setisGotRequest] = useState(true); //got request from user
  //   const [isGotMoney, setisGotMoney] = useState(false);//got money from user
  const [myList, setList] = useState<GetHiringByBuyerId[]>([]); //got request from user

  var role = localStorage.getItem('role');

  console.log(role);

  useEffect(() => {

    
    if (role === "hiring"){
      getReqListByBuyerId(UserID);
    }
    else{
        getAcceptListByReceiverId(UserID);
    }
  }, [UserID, role]);


   async function getReqListByBuyerId(buyer_id: string) {

    var body = {
      buyer_id: buyer_id
    }

    try {
      const response =  await axios.post(hookupUrl + dbURL + 'concerts/hiringAll', body);

      setList(response.data);
      console.log('Response:', response.data);

    } catch (error) {

      console.error('Error:', error);

    }

  }

  async function getAcceptListByReceiverId(reciever_id: string) {

    var body = {
      reciever_id: reciever_id
    }

    try {
      
      const response = await axios.post(hookupUrl + dbURL + 'concerts/recieveAll', body);

      setList(response.data);
      console.log('Response:', response.data);

    } catch (error) {

      console.error('Error:', error);

    }

  }







  //   {/*Action accept*/}
  const [isPaying, setisPaying] = useState(false);
  const handlePaying = () => {
    setisPaying(!isPaying);
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    width: '348px',
    height: 'auto',
    padding: '15px 0px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: '10px',
    background: '#EDE7E3',
    margin: 'auto',
    marginTop: '25px',
    marginBottom: '10px',

  };


  const filteredList = myList.filter((item) => item.Complete === false);

  return (
    <>
      {role === 'hiring' ? (
        filteredList.map((item) => (
          
          <GetRequest key={item.id} data={item} />
          
        ))
      ) : (
        myList.map((item) => (
          <IsAccept key={item.id} data={item} />
        ))
      )}

      {isPaying && <PayingModal iconClose="icon-close.png" />}
    </>
    
  );
};

export default NotiList;