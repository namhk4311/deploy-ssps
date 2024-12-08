import React, { useState } from 'react';
import './AddPrinter.css';
import axios from 'axios';

interface Printer {
  
  PrID: number;
  name: string;
  features: string[];
  location: {
    building: string;
    campus: string;
    floor: string;
  };
}

interface AddPrinterProps {
  // printer: Printer | null;
  onClose: () => void;
  onSave: (printer: Printer) => void;
}

const AddPrinter: React.FC<AddPrinterProps> = ({ onClose, onSave }) => {
  const [printerName, setPrinterName] = useState(/*printer?.name ||*/ "");
  const [printerDescription, setPrinterDescription] = useState(/*printer?.features ||*/ "");

  const [location, setLocation] = useState({
    building: /*printer?.location?.building ||*/ '',
    campus: /*printer?.location?.campus ||*/ '',
    floor: /*printer?.location?.floor ||*/ ''
  });

  const handleSave = () => {
    // if (printer) {
    //   const updatedPrinter = {
    //     ...printer,
    //     name: printerName,
    //     location,
    //   };
    //   onSave(updatedPrinter);
    // }
    
    if (location.campus !== "" && location.floor !== "" && location.building !== "" && printerName !== "" && printerDescription !== "") {
      //adding printer into database
      const sendData = {
        Campus: location.campus,
        "Building": location.building,
        "Floor": location.floor,
        "Model": printerName,
        "Short_description": printerDescription,
        "Brand": printerName.split(" ")[0]
      }
      axios.post('http://localhost:8081/api/printer/add', sendData).then(
        res => {
          alert("Thêm máy in thành công");
          window.location.reload();
        }
      ).catch(err => console.log(err));
      return;
    }
    alert("Bạn chưa nhập đủ thông tin máy in");
  };

  return (
    <div className="print-management-dialog">
      <div className="dialog-container">
        <div className="text-container">
          <h1 className="dialog-heading">Thêm máy in</h1>
        </div>
        <div className="printer-form">
          <div className="form-fields">
            <div className="input-field">
              <label>Tên:</label>
              <input
                type="text"
                className="printer-select"
                value={printerName}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setPrinterName(e.target.value)
                }}
              />
            </div>
          

          <div className="location-fields">
            <h2>Vị trí:</h2>
            <div className="location-row">
              <div className="input-field">
                <label>Cơ sở:</label>
                <input
                  type="text"
                  className="printer-select"
                  value={location.campus}
                  onChange={(e) => setLocation({ ...location, campus: e.target.value })}
                />
              </div>

              <div className="input-field">
                <label>Tòa:</label>
                <input
                  type="text"
                  className="printer-select"
                  value={location.building}
                  onChange={(e) => setLocation({ ...location, building: e.target.value })}
                />
              </div>
            </div>

            <div className="input-field">
              <label>Tầng:</label>
              <input
                type="text"
                className="printer-select"
                value={location.floor}
                onChange={(e) => setLocation({ ...location, floor: e.target.value })}
              />
            </div>

            <div className="input-field">
              <label>Mô tả</label>
              <div className="input-with-lock">
                <input
                  type="text"
                  className="printer-select"
                  value={printerDescription}
                  onChange={(e) => setPrinterDescription(e.target.value)}
                />
              </div>
            </div>

          </div>
          </div>
          
        </div>
        <div className="button-container">
          <button className="button cancel-button" onClick={onClose}>
            Trở lại
          </button>
          <button className="button save-button" onClick={handleSave}>
            Thêm
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default AddPrinter;
