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
}

const Notification: React.FC<NotificationProps> = ({ isOpen, onClose, customStyles }) => {
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
      <h2>จ้างสำเร็จ</h2>
    </Modal>
  );
};

export default Notification;
