import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { EventData } from './Interface';
import { dbURL } from '../DB';

const LandingPage: React.FC = () => {

  var role = localStorage.getItem("role");

  const Headdiv: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '80px',
    color: 'white',
    marginTop: '50px',
  };

  const Concertticketdiv: React.CSSProperties = {
    display: 'flex',
    width: '1040px',
    padding: '15px 0px',
    alignItems: 'center',
    gap: '10px',
    borderBottom: '1px solid #000',
  };

  const ConcertListdiv: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column', // Change to column layout
    alignItems: 'center',     // Center items horizontally
    gap: '40px',
    marginBottom: '80px'
  };

  const ListRow: React.CSSProperties = {
    display: 'flex',
    gap: '40px',     
    marginTop: '80px',         // Adjust the gap between pictures
    flexWrap: 'wrap', // Wrap items to the next row
    justifyContent: 'center', // Center items horizontally

    width: '1300px',

    
  };
  const information: React.CSSProperties = {
    
    marginLeft: '25px',         // Adjust the gap between pictures
    flexWrap: 'wrap', // Wrap items to the next row
    justifyContent: 'center', // Center items horizontally
    width: '150px',
   

    
  };

  const Listpic: React.CSSProperties = {
    width: '230px',
    height: '350px',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    flexShrink: 0,
    flexWrap: 'wrap', 
    overflow: 'hidden',
  };


  

  const [concertData, setData] = useState<EventData[]>([]);

  useEffect(() => {
    // สร้างฟังก์ชัน async เพื่อรับข้อมูลจาก API
    const fetchData = async () => {
      try {
        const response = await fetch(dbURL+"concerts");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json(); // แปลงข้อมูล json ให้อยู่ในรูปของ Object
        setData(responseData); // นำข้อมูลที่รับมาเก็บ
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // เรียกใช้ฟังก์ชัน fetchData เมื่อคอมโพเนนต์ถูกโหลด

  }, []);
  

  // Generate Listpic elements
  const listPics = concertData.map((concert) => (
    <Link key={concert.id} to={`/concert-info/${concert.id}`}> {/* เพิ่ม URL parameter */}

      <div key={concert.id} style={Listpic}>
        <img src={concert.PhotoUrl} alt="Girl in a jacket" width="230" height="250"></img>
        <div style={information}>
          <Typography color={'black'} fontWeight={'bold'}>{concert.name}</Typography>
          <Typography color={'black'} fontSize={'15px'}>{concert.Start}</Typography>
          <Typography color={'black'} fontWeight={'bold'} fontSize={'12px'} marginTop={'5px'}>{concert.price}</Typography>
        </div>
      </div>
    </Link>
  ));

  const listPicsHiring = concertData.map((concert) => (
  
      <div key={concert.id} style={Listpic}>
        <img src={concert.PhotoUrl} alt="Girl in a jacket" width="230" height="250"></img>
        <div style={information}>
          <Typography color={'black'} fontWeight={'bold'}>{concert.name}</Typography>
          <Typography color={'black'} fontSize={'15px'}>{concert.Start}</Typography>
          <Typography color={'black'} fontWeight={'bold'} fontSize={'12px'} marginTop={'5px'}>{concert.price}</Typography>
        </div>
      </div>

  ));
  
  return (
    <>
      <div style={Headdiv}>
        <div style={Concertticketdiv}>
          <Typography color={'black'} fontWeight={'bold'}>Concert ticket</Typography>
        </div>
      </div>

      <div style={ConcertListdiv}>
        <div style={ListRow}>
        {role === "user" ? listPics : listPicsHiring}

        </div>
      </div>
    </>
  );
};

export default LandingPage;