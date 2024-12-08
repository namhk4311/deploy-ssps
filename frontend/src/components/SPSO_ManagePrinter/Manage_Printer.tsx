import React, { useEffect, useState } from 'react';
import './Manage_Printer.css';
import { Lock, Unlock } from 'lucide-react';
import axios from 'axios';

interface Printer {
  status: string,
  PrID: number,
  name: string;
  features: string[];
  location: {
    building: string;
    campus: string;
    floor: string;
  };
}


interface PrinterManagementDialogProps {
  printer: Printer | null;
  onClose: () => void;
  onSave: (printer: Printer) => void;
  setCurrentView: () => void
}

const PrinterManagementDialog: React.FC<PrinterManagementDialogProps> = ({ onClose, printer, onSave, setCurrentView }) => {
  const [printerName, setPrinterName] = useState(printer?.name || "");
  const [printerFeature, setPrinterFeature] = useState(printer?.features || "");
  
  const [paperSizeA3, setPaperSizeA3] = useState(printer?.features[2].includes("A3") || false);
  const [paperSizeA4, setPaperSizeA4] = useState(printer?.features[2].includes("A4") || false);
  const [printOneSided, setPrintOneSided] = useState(printer?.features[1].includes("1 mặt") || false);
  const [printTwoSided, setPrintTwoSided] = useState(printer?.features[1].includes("2 mặt") || false);
  const [maxPages, setMaxPages] = useState("50");
  const [color1, setColor1] = useState(printer?.features[0].includes("In thuờng") || false);
  const [color2, setColor2] = useState(printer?.features[0].includes("In màu") || false);


  const [isNameLocked, setIsNameLocked] = useState(true);
  const [isBuildingLocked, setIsBuildingLocked] = useState(true);
  const [isTowerLocked, setIsTowerLocked] = useState(true);
  const [isFloorLocked, setIsFloorLocked] = useState(true);
  const [isFeatureLocked, setIsFeatureLocked] = useState(true);
  
  const [location, setLocation] = useState({
    building: printer?.location.building,
    campus: printer?.location.campus,
    floor: printer?.location.floor
  });

  //check printer status
  
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/printer/checkOnline/${printer?.PrID}`).then(
      res => {
        if (res.data) {
          if (res.data.Status === "Available") {
            setIsActive(true);
          }
          else if (res.data.Status === "Out of Service") {
            setIsActive(false);
          }
        }
      }
    ).catch(err => console.log(err))
  }, []);


  const handleStatusPrinter = () => {
      if (isActive === true) {
        axios.get(`http://localhost:8081/api/printer/disable/${printer?.PrID}`).then(
          res => {
            if (res.data.Message === "Disable Successfully") {
              console.log(res.data);
              alert("Máy in đã được vô hiệu hóa");
              // setCurrentView();
              // window.location.reload();
            }
            else {
              alert("Máy in không thể vô hiệu hóa");
            }
          }
        ).catch(err => console.log(err));
      
      }
      if (isActive === false) {
        axios.get(`http://localhost:8081/api/printer/enable/${printer?.PrID}`).then(
          res => {
            if (res.data.Message === "Enable Successfully") {
              console.log(res.data);
              alert("Máy in đã được kích hoạt");
              // setCurrentView();
              // window.location.reload();
            }
            else {
              alert("Máy in không thể kích hoạt");
            }
          }
        ).catch(err => console.log(err));
      }
  }

  const handleSave = () => {
    if (printer) {
      const sendData = {
         "id": printer.PrID,
          "data": {
            Campus: location.campus,
            Building: location.building,
            Floor: location.floor,
            Model: printerName,
            Short_description: `
              ${(color1 && color2) ? "In thường, In màu" :
                color1 ? "In thường" :
                color2 ? "In màu" : ""}; 
              ${(printOneSided && printTwoSided) ? "In 1 mặt, In 2 mặt" :
                printOneSided ? "In 1 mặt" :
                printTwoSided ? "In 2 mặt" : ""};
              ${(paperSizeA3 && paperSizeA4) ? "In A3, A4" :
                paperSizeA3 ? "In A3" :
                paperSizeA4 ? "In A4" : ""}
            `,
            Brand: printerName.split(" ")[0]
          }
      }

      axios.post('http://localhost:8081/api/printer/update', sendData).then(
        res => {
          console.log(res.data);
          window.location.reload();
        }
      )

      

      // onSave(updatedPrinter);
    }
  };

  const onDeletePrinter = () => {
    if (confirm("Bạn có chắc muốn xóa máy in này không?")) {
      axios.get(`http://localhost:8081/api/printer/delete/${printer?.PrID}`).then(
        res => {
          if (res.data.Status === "Success") {
            alert("Đã xóa thành công!");
            window.location.reload();
          }
          else {
            alert("Xoá không thành công!");
          }
        }
      )
    }
  }

  return (
    <div className="print-management-dialog">
      <div className="dialog-container">
        <div className="text-container">
          <h1 className="dialog-heading">Quản lý máy in</h1>
        </div>
        <div className="printer-form">
          <div className="form-fields">
            <div className="input-field">
                <h5>Chức năng:</h5>
            </div>
            <div className="paper-options">
              <label className="switch-container">
                <input 
                  type="checkbox" 
                  checked={paperSizeA3} 
                  onChange={() => setPaperSizeA3(!paperSizeA3)} 
                  className="slider-switch"
                />
                <span className="slider-text"></span>
                <span className="slider-label">A3</span>
              </label>
              <label className="switch-container">
                <input 
                  type="checkbox" 
                  checked={paperSizeA4} 
                  onChange={() => setPaperSizeA4(!paperSizeA4)} 
                  className="slider-switch"
                />
                <span className="slider-text"></span>
                <span className="slider-label">A4</span>
              </label>
            </div>

            <div className="printer-options">
              <label className="switch-container">
                <input 
                  type="checkbox" 
                  checked={printOneSided} 
                  onChange={() => setPrintOneSided(!printOneSided)} 
                  className="slider-switch"
                />
                <span className="slider-text"></span>
                <span className="slider-label">In 1 mặt</span>
              </label>
              <label className="switch-container">
                <input 
                  type="checkbox" 
                  checked={printTwoSided} 
                  onChange={() => setPrintTwoSided(!printTwoSided)} 
                  className="slider-switch"
                />
                <span className="slider-text"></span>
                <span className="slider-label">In 2 mặt</span>
              </label>
            </div>

            <div className="color-options">
              <label className="switch-container">
                <input 
                  type="checkbox" 
                  checked={color1} 
                  onChange={() => setColor1(!color1)} 
                  className="slider-switch"
                />
                <span className="slider-text"></span>
                <span className="slider-label">Trắng đen</span>
              </label>
              <label className="switch-container">
                <input 
                  type="checkbox" 
                  checked={color2} 
                  onChange={() => setColor2(!color2)} 
                  className="slider-switch"
                />
                <span className="slider-text"></span>
                <span className="slider-label">Màu</span>
              </label>
            </div>

            <div className="input-field">
              <h5>Tên:</h5>
              <div className="input-with-lock">
                <input
                  type="text"
                  className="printer-select"
                  value={printerName}
                  onChange={(e) => setPrinterName(e.target.value)}
                  disabled={isNameLocked}
                />
                <div
                  className="lock-button" 
                  onClick={() => setIsNameLocked(!isNameLocked)}
                >
                  {isNameLocked ? <Lock size={20} /> : <Unlock size={20} />}
                </div>
              </div>
            </div>

            <div className="location-fields">
              <h5>Vị trí:</h5>
              <div className="location-row">
                <div className="input-field">
                  <label>Cơ sở:</label>
                  <div className="input-with-lock">
                    <input
                      type="text"
                      className="printer-select"
                      value={location.campus}
                      onChange={(e) => setLocation(location => ({...location, campus: e.target.value}))}  // chỉnh lại cái này giúp t nha
                      disabled={isBuildingLocked}
                    />
                    <div
                  className="lock-button" 
                  onClick={() => setIsBuildingLocked(!isBuildingLocked)}
                >
                  {isBuildingLocked ? <Lock size={20} /> : <Unlock size={20} />}
                </div>
                  </div>
                </div>
                <div className="input-field">
                  <label>Tòa:</label>
                  <div className="input-with-lock">
                    <input
                      type="text"
                      className="printer-select"
                      value={location.building}
                      onChange={(e) => setLocation(location => ({...location, building: e.target.value}))} // chỉnh lại cái này giúp t nha
                      disabled={isTowerLocked}
                    />
                    <div
                  className="lock-button" 
                  onClick={() => setIsTowerLocked(!isTowerLocked)}
                >
                  {isTowerLocked ? <Lock size={20} /> : <Unlock size={20} />}
                </div>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Tầng:</label>
                <div className="input-with-lock">
                  <input
                    type="text"
                    className="printer-select"
                    value={location.floor}
                    onChange={(e) => setLocation(location => ({...location, floor: e.target.value}))} // chỉnh lại cái này giúp t nha
                    disabled={isFloorLocked}
                  />
                  <div
                  className="lock-button" 
                  onClick={() => setIsFloorLocked(!isFloorLocked)}
                >
                  {isFloorLocked ? <Lock size={20} /> : <Unlock size={20} />}
                </div>
                </div>
              </div>
            </div>

            {/* <div className="input-field">
              <label>Mô tả</label>
              <div className="input-with-lock">
                <input
                  type="text"
                  className="printer-select"
                  value={printerFeature}
                  onChange={(e) => setPrinterFeature(e.target.value)}
                  disabled={isFeatureLocked}
                />
                <div
                  className="lock-button" 
                  onClick={() => setIsFeatureLocked(!isFeatureLocked)}
                >
                  {isFeatureLocked ? <Lock size={20} /> : <Unlock size={20} />}
                </div>
              </div>
            </div> */}

            <div className="activation-option">
              <label className="switch-container">
                <input 
                  type="checkbox" 
                  checked={isActive} 
                  onChange={() => {
                      handleStatusPrinter();

                      setIsActive(!isActive)
                    }
                  } 
                  className="slider-switch" 
                />
                <span className="slider-text"></span>
                <span className="slider-label">{isActive ? 'Kích hoạt' : 'Vô hiệu hóa'}</span>
              </label>
            </div>

          </div>
        </div>
        <div className="button-container">
          <button className="button delete-button" onClick={onDeletePrinter}>Xóa máy in</button>
          <button className="button cancel-button" onClick={onClose}>Trở lại</button>
          <button className="button save-button" onClick={handleSave}>Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default PrinterManagementDialog;

