import React, { useEffect } from 'react';
import { ImageData } from '../types';
import './Modal.css';

interface ModalProps {
  image: ImageData;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ image, onClose }) => {
  // Close on Escape and lock background scroll while the modal is open.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
    >
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <img src={image.url} alt={image.title} className="modal-img" />
        <div className="modal-title">{image.title}</div>
        <button className="modal-close" onClick={onClose} autoFocus>Close</button>
      </div>
    </div>
  );
};

export default Modal;
