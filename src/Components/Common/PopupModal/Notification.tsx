import React, { useEffect, useState } from 'react';
import Modal, { Styles } from 'react-modal';

interface CustomContentStyles {
  width?: string;
  height?: string;
  position?: 'fixed';
  top?: 0;
  left?: 0;
  display?: 'flex';
  justifyContent?: 'center';
  alignItems?: 'center';
  zIndex?: number;
}

interface CustomStyles extends Styles {
  zIndex?: number;
  content?: CustomContentStyles;
}

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  customStyles?: CustomStyles;
  status: number | null; // Accept status as a prop
  
}

const Notification: React.FC<NotificationProps> = ({ isOpen, onClose, customStyles, status }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(isOpen);
    if (isOpen) {
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 2000);
    }
  }, [isOpen, onClose]);

  // Customize the content based on the status
  let message = 'ฝากซื้อสำเร็จ';
  if (status === 500) {
    message = 'เงินไม่พอ';
  }

  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        ...customStyles,
        content: {
          ...customStyles?.content,
          width: '150px',
          height: '75px',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000,
          border: '1px solid #ccc',
          borderRadius: '10px',
        },
      }}
    >
      {message}
    </Modal>
  );
};

export default Notification;