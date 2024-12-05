import React, { useState } from 'react';
import './Print3.css';

// Define the Printer interface
export interface Printer {
  name: string;
  features: string[];
  location: string;
}

// Define the props for PrintConfirmationDialog
interface PrintConfirmationDialogProps {
  selectedPrinter: Printer | null;
  totalPages: number;
  onBack: () => void;
  onClose: () => void;
  onChangePrinter: () => void;
  onStartPrinting: (pages: number) => void;
}

// Define the props for PrinterSummary
interface PrinterSummaryProps {
  onChangePrinter: () => void;
  printer: Printer;
}

// Define the props for PrintOptions
interface PrintOptionsProps {
  totalPages: number; // Only passing totalPages here
  onChangeTotalPages: (newTotalPages: number) => void;
}

interface DialogActionsProps {
  onBack: () => void;
  onClose: () => void;
  onStartPrinting: (pages: number) => void;
  totalPages: number;
}


const PrintConfirmationDialog: React.FC<PrintConfirmationDialogProps> = ({
  onBack,
  onClose,
  onChangePrinter,
  selectedPrinter,
  onStartPrinting,
  totalPages }) => {

  const [updatedTotalPages, setUpdatedTotalPages] = useState<number>(totalPages);

  const handleTotalPagesChange = (newTotalPages: number) => {
    setUpdatedTotalPages(newTotalPages); // Update local state, don't trigger print yet
  };

  const handleConfirmClick = () => {
    onStartPrinting(updatedTotalPages); // Trigger print when confirm is clicked
    onClose(); // Close dialog after confirmation
  };

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
        <PrintOptions totalPages={updatedTotalPages} onChangeTotalPages={handleTotalPagesChange} />
        <DialogActions
          onBack={onBack}
          onClose={onClose}
          onStartPrinting={handleConfirmClick} // Use the new confirmation handler
          totalPages={updatedTotalPages}
        />
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


const PrintOptions: React.FC<PrintOptionsProps> = ({ totalPages, onChangeTotalPages }) => {
  const [pageNumbers, setPageNumbers] = useState<string>(''); // Store page numbers as input

  // Handle the input of page numbers to print
  const handlePageNumbersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPageNumbers(value);

    // Calculate total number of pages based on page numbers input
    const pagesArray = value.split(',').map((num) => parseInt(num.trim(), 10)).filter((num) => !isNaN(num));
    const newTotalPages = pagesArray.length;
    onChangeTotalPages(newTotalPages); // Update totalPages in parent component
  };

  return (
    <div className="print-options">
      <div className="option-group">
        <label className="option-label">Kích cỡ giấy</label>
        <select className="option-select">
          <option>A4</option>
          <option>A3</option>
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
        <label className="option-label">Kiểu in</label>
        <div className="radio-group">
          <label className="radio-option">
            <input type="radio" name="print_type" value="chẵn" />
            Chẵn
          </label>
          <label className="radio-option">
            <input type="radio" name="print_type" value="lẻ" defaultChecked />
            Lẻ
          </label>
          <label className="radio-option">
            <input type="radio" name="print_type" value="tất cả" defaultChecked />
            Tất cả
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
        <label className="option-label">Các trang cần in</label>
        <input
          type="text"
          className="page-numbers-input"
          placeholder="Nhập số trang (ví dụ: 1, 2, 4, 5, 7)"
          value={pageNumbers}
          onChange={handlePageNumbersChange}
        />
      </div>

      {/* Total Pages Calculation */}
      <div className="option-group">
        <label className="option-label">Số trang</label>
        <input
          type="number"
          className="page-input"
          value={totalPages}
          readOnly
        />
      </div>
    </div>
  );
};


const DialogActions: React.FC<DialogActionsProps> = ({ onBack, onClose, onStartPrinting, totalPages }) => {
  return (
    <div className="dialog-actions">
      <button className="cancel-button" onClick={onBack}>Trở lại</button>
      <button
        className="confirm-button"
        onClick={() => {
          onStartPrinting(totalPages);
          onClose();
        }}
      >
        Xác nhận
      </button>
    </div>
  );
};

export default PrintConfirmationDialog;
