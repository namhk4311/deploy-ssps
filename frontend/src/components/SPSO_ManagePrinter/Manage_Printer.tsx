import React, { useState } from 'react';
import './Manage_Printer.css';

interface Printer {
  name: string;
  features: string[];
  location: string;
}

interface PrinterManagementDialogProps {
  printer: Printer | null;
  onClose: () => void;
}

const PrinterManagementDialog: React.FC<PrinterManagementDialogProps> = ({ onClose, printer }) => {
  // const [printerName, setPrinterName] = useState('Máy in A');
  // const [paperSizeA3, setPaperSizeA3] = useState(false);
  // const [paperSizeA4, setPaperSizeA4] = useState(false);
  // const [printOneSided, setPrintOneSided] = useState(false);
  // const [printTwoSided, setPrintTwoSided] = useState(false);
  // const [maxPages, setMaxPages] = useState('50');
  // const [color1, setColor1] = useState(false);
  // const [color2, setColor2] = useState(false);

  const [printerName, setPrinterName] = useState(printer?.name || "");
  const [paperSizeA3, setPaperSizeA3] = useState(printer?.features.includes("A3") || false);
  const [paperSizeA4, setPaperSizeA4] = useState(printer?.features.includes("A4") || false);
  const [printOneSided, setPrintOneSided] = useState(printer?.features.includes("1 mặt") || false);
  const [printTwoSided, setPrintTwoSided] = useState(printer?.features.includes("2 mặt") || false);
  const [maxPages, setMaxPages] = useState("50");
  const [color1, setColor1] = useState(printer?.features.includes("In trắng đen") || false);
  const [color2, setColor2] = useState(printer?.features.includes("Màu") || false);


  return (
    <div className="print-management-dialog">
      <div className="dialog-container">
        <div className="text-container">
          <h1 className="dialog-heading">Quản lý máy in</h1>
        </div>
        <div className="printer-form">
          <div className="form-fields">
          <div className="input-field">
              
            </div>
            <div className="paper-options">
              {/* <div className="paper-size"> */}
                <label className="switch-container">
                  <input type="checkbox" checked={paperSizeA3} onChange={() => setPaperSizeA3(!paperSizeA3)} />
                  A3
                </label>
                <label className="switch-container">
                  <input type="checkbox" checked={paperSizeA4} onChange={() => setPaperSizeA4(!paperSizeA4)} />
                  A4
                </label>
              {/* </div> */}
              
            </div>

            <div className="printer-options">
                <label className="switch-container">
                  <input type="checkbox" checked={printOneSided} onChange={() => setPrintOneSided(!printOneSided)} />
                  {/* <span className="slider"></span> */}
                  In 1 mặt
                </label>
                <label className="switch-container">
                  <input type="checkbox" checked={printTwoSided} onChange={() => setPrintTwoSided(!printTwoSided)} />
                  In 2 mặt
                </label>
              </div>

            <div className="color-options">
              <label className="switch-container">
                <input type="checkbox" checked={color1} onChange={() => setColor1(!color1)} />
                Trắng đen
              </label>
              <label className="switch-container">
                <input type="checkbox" checked={color2} onChange={() => setColor2(!color2)} />
                Màu
              </label>
            </div>


            <div className="input-field">
              <label>Số trang in tối đa / 1 lần</label>
              <input
                type="text"
                value={maxPages}
                onChange={(e) => setMaxPages(e.target.value)}
                className="printer-select"
              />
            </div>
            
          </div>
        </div>
        <div className="button-container">
          <button className="button cancel-button" onClick={onClose} >Trở lại </button>
          <button className="button save-button">Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default PrinterManagementDialog;
