import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import IsAccept from './ืnotificationType/IsAccept';
import GetRequest from './ืnotificationType/GetRequest';
import PayingModal from './PayingModal';
import axios from 'axios';
import { dbURL } from '../../../DB';
import { UserID, filteredList, hookupUrl } from '../NavBar';
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
  var [myList, setList] = useState<GetHiringByBuyerId[]>([]); //got request from user


  var role = localStorage.getItem('role');

  


  console.log(role);

  



  return (
    <>
      {role === 'hiring' ? (
        filteredList.map((item) => (
          
          <GetRequest key={item.id} data={item} />
          
        ))
      ) : (
        filteredList.map((item) => (
          <IsAccept key={item.id} data={item} />
        ))
      )}

    </>
  );
};

export default NotiList;