import React from 'react';

type ImageModalProps = {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen || !imageSrc) return null; 
  return (
    <div
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  }}
  onClick={onClose}
>
  <img
    src={imageSrc}
    alt="Imagem em tela cheia"
    style={{
      maxWidth: '90vw', 
      maxHeight: '90vh', 
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
    }}
    onClick={(e) => e.stopPropagation()}
  />
</div>

  );
};

export default ImageModal;
