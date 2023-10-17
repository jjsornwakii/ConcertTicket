import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import IsAccept from './ืnotificationType/IsAccept';
import GetRequest from './ืnotificationType/GetRequest';
import PayingModal from './PayingModal';
import axios from 'axios';
import { dbURL } from '../../../DB';
import { UserID, hookupUrl } from '../NavBar';
import { GetHiringByBuyerId } from '../../../Pages/Interface';

const NotiList: React.FC = () => {
  const [myList, setMyList] = useState<GetHiringByBuyerId[]>([]);
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

  useEffect(() => {
    async function getReqListByBuyerId(buyer_id: string) {
      const body = { buyer_id: buyer_id };
      try {
        const response = await axios.post(hookupUrl + dbURL + 'concerts/hiringAll', body);
        console.log('Response:', response.data);
        setMyList(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    async function getAcceptListByReceiverId(receiver_id: string) {
      const body = { reciever_id: receiver_id };
      try {
        const response = await axios.post(hookupUrl + dbURL + 'concerts/recieveAll', body);
        console.log('Response:', response.data);
        setMyList(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    console.log(role);
    if (role === 'hiring' || role === 'worker') {
      getReqListByBuyerId(UserID);
    } else {
      getAcceptListByReceiverId(UserID);
    }
  }, [role, UserID]);

  const filteredList2 = myList.filter((item) => item.Complete === false);

  return (
    <>
      {role === 'hiring' ? (
        filteredList2.map((item) => (
          <GetRequest key={item.id} data={item} />
        ))
      ) : (
        filteredList2.map((item) => (
          <IsAccept key={item.id} data={item} />
        ))
      )}
    </>
  );
};

export default NotiList;
