// src/components/assinatura/AssinaturaDigital.jsx
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './AssinaturaDigital.css';

const AssinaturaDigital = ({ onSave, onClear, disabled = false }) => {
  const sigCanvas = useRef({});

  const handleClear = () => {
    sigCanvas.current.clear();
    onClear?.();
  };

  const handleSave = () => {
    if (sigCanvas.current.isEmpty()) {
      return;
    }
    const signature = sigCanvas.current.toDataURL('image/png');
    onSave?.(signature);
  };

  return (
    <div className="signature-container">
      <div className="signature-wrapper">
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            className: 'signature-canvas',
          }}
          penColor="black"
          backgroundColor="white"
          disabled={disabled}
        />
      </div>
      <div className="signature-actions">
        <button 
          type="button" 
          onClick={handleClear} 
          className="clear-button"
          disabled={disabled}
        >
          Limpar
        </button>
        <button 
          type="button" 
          onClick={handleSave} 
          className="save-button"
          disabled={disabled}
        >
          Salvar Assinatura
        </button>
      </div>
    </div>
  );
};

export default AssinaturaDigital;