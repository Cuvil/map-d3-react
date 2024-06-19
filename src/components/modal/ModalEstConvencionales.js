import React from 'react';
import Modal from 'react-modal';
import ChartEstConvencionales from '../graficos/ChartEstConvencionales';

const ModalEstConvencionales = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000 // Asegura que la superposición esté por encima de otros elementos
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          padding: '20px',
          zIndex: 1001 // Asegura que el contenido del modal esté por encima de la superposición
        }
      }}
    >
      {children}
    </Modal>
  );
};

export default ModalEstConvencionales;
