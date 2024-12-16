import React, { useState } from 'react';
import './Print3.css';
import axios from "axios";

// Define the Printer interface
export interface Printer {
  name: string;
  features: string[];
  location: string;
}

interface IDOCUMENT {
  Name: string,
  pages: number,
  End_time: string,
  time: string,
  Format: string,
  Number_of_pages: number
}

interface MetaInfo {
  Name: string,
  Number_of_pages: number,
  PrID: number,
  numCopies: number,
  printingColor: string,
  pageSide: string, 
  sizePage: string,
  layout: string,
  oddEven: string
}

// Define the props for PrintConfirmationDialog
interface PrintConfirmationDialogProps {
  selectedPrinter: Printer | null;
  totalPages: number;
  onBack: () => void;
  onClose: () => void;
  onChangePrinter: () => void;
  onStartPrinting: (pages: number) => void;
  metafile: MetaInfo;
  setMetafile: React.Dispatch<React.SetStateAction<MetaInfo>>;
  setFetchDocument: React.Dispatch<React.SetStateAction<IDOCUMENT[]>>;
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
  metafile: MetaInfo;
  setMetafile: React.Dispatch<React.SetStateAction<MetaInfo>>;
}

interface DialogActionsProps {
  onBack: () => void;
  onClose: () => void;
  onStartPrinting: (pages: number) => void;
  totalPages: number;
  metafile: MetaInfo;
  setFetchDocument: React.Dispatch<React.SetStateAction<IDOCUMENT[]>>;
}



// ALL
const PrintConfirmationDialog: React.FC<PrintConfirmationDialogProps> = ({
  onBack,
  onClose,
  onChangePrinter,
  selectedPrinter,
  onStartPrinting,
  totalPages,
  metafile,
  setMetafile,
  setFetchDocument }) => {

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
        <PrintOptions totalPages={updatedTotalPages} metafile={metafile} onChangeTotalPages={handleTotalPagesChange} setMetafile={setMetafile} />
        <DialogActions
          onBack={onBack}
          onClose={onClose}
          onStartPrinting={handleConfirmClick} // Use the new confirmation handler
          totalPages={updatedTotalPages}
          metafile={metafile}
          setFetchDocument={setFetchDocument}
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
          <div className="printer-features2">
            <span className={`badge ${printer.features[0] === 'In màu' ? 'color-badge' : 'duplex-badge'}`}>{printer.features[0]}</span>
            <span className="badge duplex-badge">{printer.features[1]}</span>
          </div>
          <p className="printer-location">{printer.location}</p>
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


const PrintOptions: React.FC<PrintOptionsProps> = ({ totalPages, onChangeTotalPages, metafile, setMetafile }) => {
  const [pageNumbers, setPageNumbers] = useState<string>(''); // Store page numbers as input
  const [selectedSizePage, setSelectedSizePage] = useState<string>();


  const [printType, setPrintType] = useState<'All' | 'Even' | 'Odd' | 'Custom'>('All');



  const [selectedLayout, setSelectedLayout] = useState<string>('Potrait');
  const [selectedColor, setSelectedColor] = useState<string>();
  const [numCopies, setNumCopies] = useState<number>(1);
  const [selectedSide, setSelectSide] = useState<string>('Double-sided');

  const handleSizePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    setMetafile(prev => ({...prev, sizePage: value}))
    console.log(value);
    setSelectedSizePage(value);
  }

  //update handle Odd Even
  const handlePrintTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as 'All' | 'Even' | 'Odd' | 'Custom';
    console.log(value);
    
    setPrintType(value);


    let newTotalPages = totalPages;

    if (value === 'All') {
      newTotalPages = metafile.Number_of_pages;
    } else if (value === 'Even') {
      newTotalPages = Math.floor(metafile.Number_of_pages / 2);
    } else if (value === 'Odd') {
      newTotalPages = Math.ceil(metafile.Number_of_pages / 2);
    }

    setMetafile(prev => ({...prev, oddEven: value, Number_of_pages: newTotalPages}))

    onChangeTotalPages(newTotalPages * numCopies); 
  }

  // update handlePageNumbersChange
  const handlePageNumbersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPageNumbers(value);
    setPrintType('Custom');

    const pagesArray: number[] = [];
    value.split(',').forEach((part) => {
      part = part.trim();
      if (part.includes('-')) {
        const [start, end] = part.split('-').map((num) => parseInt(num.trim(), 10));
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let i = start; i <= end; i++) {
            pagesArray.push(i);
          }
        }
      } else {
        const page = parseInt(part, 10);
        if (!isNaN(page)) {
          pagesArray.push(page);
        }
      }
    });

    const uniquePages = Array.from(new Set(pagesArray));
    const newTotalPages = uniquePages.length;
    setMetafile(prev => ({...prev, oddEven: 'Custom', Number_of_pages: newTotalPages}))
    onChangeTotalPages(newTotalPages * numCopies);
    
    // const value = e.target.value;
    // setPageNumbers(value);
    // setPrintType('Custom');

    // console.log(value);
    // if (printType === "All") setMetafile(prev => ({...prev, Number_of_pages: 10}));
    // else if (printType === "Even") setMetafile(prev => ({...prev, Number_of_pages: 5}));
    // else if (printType === "Odd") setMetafile(prev => ({...prev, Number_of_pages: 5}));
    // else {
    //   const pagesArray = value.split(',').map((num) => parseInt(num.trim(), 10)).filter((num) => !isNaN(num));
    //   const newTotalPages = pagesArray.length;
    //   setMetafile(prev => ({...prev, Number_of_pages: newTotalPages}));
    //   onChangeTotalPages(newTotalPages);
    // }


    // const pagesArray: number[] = [];
    // value.split(',').forEach((part) => {
    //   part = part.trim();
    //   if (part.includes('-')) {
    //     const [start, end] = part.split('-').map((num) => parseInt(num.trim(), 10));
    //     if (!isNaN(start) && !isNaN(end) && start <= end) {
    //       for (let i = start; i <= end; i++) {
    //         pagesArray.push(i);
    //       }
    //     }
    //   } else {
    //     const page = parseInt(part, 10);
    //     if (!isNaN(page)) {
    //       pagesArray.push(page);
    //     }
    //   }
    // });

    // const uniquePages = Array.from(new Set(pagesArray));
    // const newTotalPages = uniquePages.length;
    // setMetafile(prev => ({...prev, Number_of_pages: newTotalPages}));
    // onChangeTotalPages(newTotalPages * numCopies); // Calculate total pages with copies
  };

  const handleSelectedColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    setMetafile(prev => ({...prev, printingColor: value})) // set printingColor to metafile
    console.log(value);
    setSelectedColor(value);
  }

  const handleNumCopiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copies = parseInt(e.target.value, 10);
    if (!isNaN(copies) && copies > 0) {
      setNumCopies(copies);
      console.log(copies);
      setMetafile(prev => ({...prev, numCopies: copies}))
      onChangeTotalPages(totalPages); 
    }
  };

  const handleSelectedLayout = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    console.log(value);
    setSelectedLayout(value);
    setMetafile(prev => ({...prev, layout: value}));
  }
  const handleSideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    console.log(value);
    setSelectSide(value);
    setMetafile(prev => ({...prev, pageSide: value}));
  }

  console.log(metafile.Number_of_pages) //test

  return (
    <div className="print-options">
      <div className="option-group">
        
        <label className="option-label">Kích cỡ giấy</label>
            <select className="option-select" onChange={handleSizePageChange}>
              <option disabled value="none" selected>Chọn kích cỡ</option>
              <option value={"A3"}>A3</option>
              <option value={"A4"}>A4</option>
            </select>
      
      </div>
      <div className="option-group">
        <label className="option-label">Màu</label>
        <select className="option-select" onChange={handleSelectedColorChange}>
          <option disabled value="none" selected>Chọn màu</option>
          <option value={"Black and white"}>Trắng đen</option>
          <option value={"Color"}>In màu</option>
        </select>
      </div>

      <div className="option-landscape">
        <div className="option-group">
          <label className="option-label">Bố cục</label>
          <div className="radio-group">
            <label className="radio-option">
              <input type="radio" name="layout" value="Potrait" onChange={handleSelectedLayout} />
              <span>Dọc</span>
            </label>
            <label className="radio-option">
              <input type="radio" name="layout" value="Landscape" onChange={handleSelectedLayout} />
              <span>Ngang</span>
            </label>
          </div>
        </div>

        <div className="option-group">
          <label className="option-label">In mặt</label>
          <div className="radio-group">
            <label className="radio-option">
              <input type="radio" name="pageSide" value="One-sided" onChange={handleSideChange} />
              <span>In 1 mặt</span>
            </label>
            <label className="radio-option">
              <input type="radio" name="pageSide" value="Double-sided" onChange={handleSideChange} />
              <span>In 2 mặt</span>
            </label>
          </div>
        </div>
      </div>

      <div className="option-group">
        <label className="option-label">Kiểu in</label>
        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              name="print_type"
              value="All"
              checked={printType === 'All'}
              onChange={handlePrintTypeChange}
            />
            <span>Tất cả</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="print_type"
              value="Even"
              checked={printType === 'Even'}
              onChange={handlePrintTypeChange}
            />
            <span>Chẵn</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="print_type"
              value="Odd"
              checked={printType === 'Odd'}
              onChange={handlePrintTypeChange}
            />
            <span>Lẻ</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="print_type"
              value="Custom"
              checked={printType === 'Custom'}
              onChange={handlePrintTypeChange}
            />
            <span>Tùy chỉnh</span>
          </label>
        </div>
      </div>
      {printType === 'Custom' && (
        <div className="option-group">
          <label className="option-label">Các trang cần in</label>
          <input
            type="text"
            className="page-numbers-input"
            placeholder="Nhập số trang (ví dụ: 1, 2, 4-7, 9)"
            value={pageNumbers}
            onChange={handlePageNumbersChange}
          />
        </div>
      )}

      <div className="option-group-row">
        <div className="option-group">
          <label className="option-label">Số bản sao</label>
          <input
            type="number"
            className="copies-input"
            value={numCopies}
            onChange={handleNumCopiesChange}
            min={1}
          />
        </div>
      </div>


      {/* Total Pages Calculation */}
      {/* <div className="option-group">
        <label className="option-label">Số trang: {totalPages * numCopies}</label>
      </div> */}
    </div>
      
      
  );
};


const DialogActions: React.FC<DialogActionsProps> = ({ onBack, onClose, onStartPrinting, totalPages, metafile, setFetchDocument }) => {

  function separateFilenameRegex(filename: string): { name: string, format: string } {
    const match = filename.match(/^(.*)\.([^.]*)$/);
        if (match) {
            return { name: match[1], format: match[2] };
        }
        return { name: filename, format: '' }; // If no format, return empty string
    }  

    function APIcallPrintOrder() {
      const {name, format} = separateFilenameRegex(metafile.Name);

      const {ID} = JSON.parse(localStorage.getItem("myid") || '');
          const sendData = 
          {
            "Name": name, 
            "Format": format,
            "Number_of_pages": metafile.Number_of_pages,
            "PrID": metafile.PrID,
            "order": {
              "numCopies": metafile.numCopies, 
              "printingColor": metafile.printingColor, 
              "pageSide": "Double-sided", 
              "sizePage": metafile.sizePage, 
              "layout": "Potrait",
              "oddEven": "All",
              "studentID": ID
            }
          }
          console.log(sendData, "hehe");
          axios.post('http://localhost:8081/api/print/addOrder', sendData).then(
            res => {
              console.log(res);
            }
          ).catch(err => console.log(err))
          
          
    }

  return (
    <div className="dialog-actions">
      <button className="cancel-button" onClick={onBack}>Trở lại</button>
      <button
        className="confirm-button"
        onClick={() => {
          //confirm printing action and start API call to the server
          console.log("start printing");
          const {ID} = JSON.parse(localStorage.getItem("myid") || '');
          APIcallPrintOrder();
          
          
          axios.post('http://localhost:8081/api/student/updateBalance', {id: ID, numberUpdate: totalPages * -1}).then(
            res => {
              console.log(metafile.Number_of_pages)
              onStartPrinting(metafile.Number_of_pages * metafile.numCopies);
              onClose();
            }
          );
        }}
      >
        Xác nhận
      </button>
    </div>
  );
};

export default PrintConfirmationDialog;
