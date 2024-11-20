import React from 'react';
import './Print3.css';

export interface Printer {
  name: string;
  features: string[];
  location: string;
}

interface PrintConfirmationDialogProps {
  onBack: () => void; 
  onClose: () => void; 
  onChangePrinter: () => void;
  selectedPrinter: Printer | null;
}

interface PrinterSummaryProps {
  onChangePrinter: () => void; 
  printer: Printer;
}

const PrintConfirmationDialog: React.FC<PrintConfirmationDialogProps> = ({ onBack, onClose, onChangePrinter, selectedPrinter }) => {  
  return (
    <div className="print-confirmation-dialog">
      <div className="dialog-container">
        <div className="text-container">
          <h2 className="dialog-heading">Tạo lệnh in</h2>
          <h2 className="dialog-close-button" onClick={onClose}> X </h2>
          <p className="dialog-description">
            Xác nhận tùy chọn in {selectedPrinter && (
          <PrinterSummary printer={selectedPrinter} onChangePrinter={onChangePrinter} />
        )}
          </p>
        </div>
        <PrintOptions />
        <DialogActions onBack={onBack} onClose={onClose} onChangePrinter={onChangePrinter} selectedPrinter={selectedPrinter} />
      </div>
    </div>
  );
};

const PrinterSummary: React.FC<PrinterSummaryProps> = ({ onChangePrinter, printer }) => {
  return (
    <div className="printer-summary">
      <div className="printer-info">
        <img src="image/printer.png" alt="Printer" className="printer-image" />
        <div className="printer-details">
          <h3 className="printer-name">{printer.name}</h3>
          <div className="printer-features">
            <span className="badge color-badge">In màu</span>
            <span className="badge duplex-badge">2 mặt</span>
          </div>
          <p className="printer-location">Tầng 3 • Tòa B4</p>
        </div>
      </div>
      <a
        href="#"
        className="change-printer-link"
        onClick={(e) => {
          e.preventDefault(); 
          onChangePrinter();
        }}
      >
        Chọn máy in
      </a>
    </div>
  );
};

const PrintOptions: React.FC = () => {
  return (
    <div className="print-options">
      <div className="option-group">
        <label className="option-label">Kích cỡ giấy</label>
        <select className="option-select">
          <option>A4</option>
          <option>A5</option>
        </select>
      </div>
      <div className="option-group">
        <label className="option-label">Bố cục</label>
        <div className="radio-group">
          <label className="radio-option">
            <input type="radio" name="layout" value="dọc" />
            Dọc
          </label>
          <label className="radio-option">
            <input type="radio" name="layout" value="ngang" defaultChecked />
            Ngang
          </label>
        </div>
      </div>
      <div className="option-group">
        <label className="option-label">Màu</label>
        <select className="option-select">
          <option>Trắng đen</option>
          <option>In màu</option>
        </select>
      </div>
      <div className="option-group">
        <label className="option-label">Số trang</label>
        <p className="page-count">20 trang</p>
      </div>
    </div>
  );
};

const DialogActions: React.FC<PrintConfirmationDialogProps> = ({ onBack }) => {
  return (
    <div className="dialog-actions">
      <button className="cancel-button" onClick={onBack}>Trở lại</button>
      <button className="confirm-button">Xác nhận</button>
    </div>
  );
};

export default PrintConfirmationDialog;
