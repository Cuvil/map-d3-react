// src/components/modal/ModalEstConvencionales.js
import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root'); // Asegúrate de que #root sea el id del elemento principal de tu aplicación

const ModalEstConvencionales = ({ isOpen, onRequestClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default ModalEstConvencionales;
