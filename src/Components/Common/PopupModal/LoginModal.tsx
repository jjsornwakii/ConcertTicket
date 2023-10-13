// src/Components/Common/LoginModal.tsx

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';

const LoginModal: React.FC<{
  modalOverlayStyle: React.CSSProperties;
  modalContentStyle: React.CSSProperties;
  modalinfo: React.CSSProperties;
  contentstyle: React.CSSProperties;
  handleModalClose: () => void;
  handleLogin: (username: string, password: string) => void;
}> = ({
  modalOverlayStyle,
  modalContentStyle,
  modalinfo,
  contentstyle,
  handleModalClose,
  handleLogin,
  
}) => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Update state when input values change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Handle the login button click
  const handleLoginClick = () => {
    // Call the handleLogin function with email and password
    handleLogin(username, password);

    // Close the modal or handle other UI changes as needed
  };
  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <div style={modalinfo}>
          <div
            onClick={handleModalClose}
            style={{ display: 'flex', justifyContent: 'end' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
<path d="M13.2997 1.20997C12.9097 0.819971 12.2797 0.819971 11.8897 1.20997L6.99973 6.08997L2.10973 1.19997C1.71973 0.809971 1.08973 0.809971 0.699727 1.19997C0.309727 1.58997 0.309727 2.21997 0.699727 2.60997L5.58973 7.49997L0.699727 12.39C0.309727 12.78 0.309727 13.41 0.699727 13.8C1.08973 14.19 1.71973 14.19 2.10973 13.8L6.99973 8.90997L11.8897 13.8C12.2797 14.19 12.9097 14.19 13.2997 13.8C13.6897 13.41 13.6897 12.78 13.2997 12.39L8.40973 7.49997L13.2997 2.60997C13.6797 2.22997 13.6797 1.58997 13.2997 1.20997Z" fill="black"/>
</svg>
            </svg>
          </div>
          <Typography fontWeight={'bold'} fontSize={'24px'} fontFamily={'Inter'} marginLeft={'25px'}>
            Login
          </Typography>
          <Typography fontWeight={'bold'} fontSize={'14px'} marginLeft={'25px'}>
            Enter your email and password
          </Typography>

          <div style={contentstyle}>
            <Typography fontSize={'20px'} fontWeight={'bold'} marginTop={'15px'}>
              Email
            </Typography>
            <input type="text"value={username} onChange={handleEmailChange} style={{ width: '296px', marginTop: '5px', height: '25px', borderRadius: '8px' }} />
            <Typography fontSize={'20px'} fontWeight={'bold'} marginTop={'10px'}>
              Password
            </Typography>
            <input type="password"  value={password}  onChange={handlePasswordChange} style={{ width: '296px', marginTop: '5px', height: '25px', borderRadius: '8px' }} />
            <button 
              onClick={handleLoginClick}
              style={{
                backgroundColor: 'black',
                width: '306px',
                borderRadius: '8px',
                marginTop: '20px',
                height: '35px',
                color: 'white',
                cursor:  'pointer' ,
              }}
             
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
