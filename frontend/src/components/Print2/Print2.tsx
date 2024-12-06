import React from 'react';
import './Print2.css';
import axios from 'axios';

export interface Printer {
  name: string;
  features: string[];
  location: string;
}

interface PrinterSelectionDialogProps {
  onBack: () => void; 
  onClose: () => void;
  onContinue: () => void;
  onSelectPrinter: (printer: Printer) => void;
}

const PrinterSelectionDialog: React.FC<PrinterSelectionDialogProps> = ({ onBack, onClose, onContinue, onSelectPrinter }) => {
  // chỗ này sẽ dùng database

  const [allPrinter, setAllPrinter] = React.useState([{PrID: null, Model: '', Floor: '', Campus: '', Short_description: '', Building: ''}]);
  React.useEffect(() => {
    axios.get('http://localhost:8081/api/printer/all').
    then(res => {
      setAllPrinter(res.data);
    });
  }, []);

  // const printers = [
  //   { name: 'Máy in A', features: ['In màu', '2 mặt'], location: 'Tầng 2 • Tòa B4' },
  //   { name: 'Máy in B', features: ['In màu', '1 mặt'], location: 'Tầng 2 • Tòa B4' },
  //   { name: 'Máy in C', features: ['In màu', '2 mặt'], location: 'Tầng 2 • Tòa B1' },
  //   { name: 'Máy in D', features: ['In màu', '1 mặt'], location: 'Tầng 2 • Tòa B1' },
  //   { name: 'Máy in E', features: ['In màu', '2 mặt'], location: 'Tầng 2 • Tòa C4' },
  //   { name: 'Máy in F', features: ['In màu', '1 mặt'], location: 'Tầng 2 • Tòa C4' },
  // ];

  const printers = allPrinter.slice(0, 6).map(
    (printer, index) => ({name: printer.Model, features: (index % 2 ? ['In màu', '1 mặt'] : ['In màu', '2 mặt']), location: `Tầng ${printer.Floor} • Toà ${printer.Building}`})
  );

  return (
    <div className="printer-selection-dialog">
      <div className="dialog-container">
        <div className="text-container">
          <h2 className="dialog-heading">Tạo lệnh in</h2>
          <h2 className="dialog-close-button" onClick={onClose}> X </h2>
          <p className="dialog-description">
            Chọn máy in để thực hiện in <a href="#">Document_A.docx</a>
          </p>
        </div>
        <div className="printer-grid">
        {printers.map((printer, index) => (
            <PrinterCard
              key={index}
              printer={printer}
              onSelect={() => onSelectPrinter(printer)} // Call onSelectPrinter when clicked
            />
          ))}
        </div>
        <DialogActions onBack={onBack} onClose={onClose} onContinue={onContinue} onSelectPrinter={onSelectPrinter}/>
      </div>
    </div>
  );
};

const PrinterCard: React.FC<{ printer: Printer; onSelect: () => void }> = ({ printer, onSelect }) => {


  return (
    <div className="printer-card" onClick={onSelect}>
      <div className="printer-icon">
        <img src="image/printer.png" alt="Printer" />
      </div>
      <div className="printer-details">
        <h3 className="printer-name">{printer.name}</h3>
        <div className="printer-features">
          {printer.features.map((feature, index) => (
            <span key={index} className={`badge ${feature === 'In màu' ? 'color-badge' : 'duplex-badge'}`}>
              {feature}
          {/* {printer.features.map((feature, index) => (
            <span key={index} className="badge">
              {feature} */}
            </span>
          ))}
        </div>
        <p className="printer-location">{printer.location}</p>
      </div>
    </div>
  );
};

const DialogActions: React.FC<PrinterSelectionDialogProps> = ({ onBack, onContinue }) => {
  return (
    <div className="dialog-actions">
      <button className="cancel-button" onClick={onBack} >Trở lại</button>
      <button className="continue-button" onClick={onContinue} >Tiếp tục</button>
    </div>
  );
};

export default PrinterSelectionDialog;
