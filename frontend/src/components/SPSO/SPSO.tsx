import React, { useState } from "react";
import "./SPSO.css";
import PrinterManagementDialog from "../SPSO_ManagePrinter/Manage_Printer";
import axios, { all } from 'axios';
import { useNavigate } from "react-router-dom";
import AddPrinter from "../AddPrinter/AddPrinter";

interface SPSOProps {
  // onLogout: () => void;
}

interface Printer {
  status: string;
  PrID: number;
  name: string;
  features: string[];
  location: {
    building: string;
    campus: string;
    floor: string;
  };
}

interface ListOfPrinterProps {
  onSelectPrinter: (printer: Printer) => void;
  onAddPrinter: () => void;
}


interface HeaderProps {
  onOpenPrintDialog: () => void;
  onLogout: () => void;
  onGoToHomePage: () => void; 
}

interface CurrentPrintOrderProps {
  onCreatePrintOrder: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onOpenPrintDialog,
  onLogout,
  onGoToHomePage,
}) => {
  return (
    <header className="header">

      <nav className="nav">
        <a href="#" className="nav-link" onClick={onGoToHomePage}>
          Trang chủ
        </a>
        <a href="#" className="nav-link" onClick={onOpenPrintDialog}>
          Máy in
        </a>
        <a href="#" className="nav-link">
          Báo cáo
        </a>
        <a href="#" className="nav-link">
          Hỗ trợ
        </a>
      </nav>
      <div className="profile">
        <img src="/image/user.png" alt="Profile" />
        <a
          href="#"
          className="logout"
          onClick={(e) => {
            e.preventDefault();
            onLogout();
          }}
        >
          Đăng xuất
        </a>
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/image/bk.png" alt="Logo" width="80" height="80" />
          <span className="footer-logo-text">
            HCMUT Student Smart Printing Service
          </span>
        </div>
        <div className="footer-info">
          <div className="footer-section">
            <h4>Website</h4>
            <p>HCMUT</p>
            <p>BKPay</p>
          </div>
          <div className="footer-section">
            <h4>Liên hệ</h4>
            <p>268 Lý Thường Kiệt, P.14, Q.10, TP.HCM</p>
            <p>ssp@hcmut.edu.vn</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const RecentPrints: React.FC = () => {  

  const [allDocument, setAllDocument] = React.useState([{DocumentID: null, Name: null, Format: null, Number_of_pages: null, End_time: null}])


  React.useEffect(() => {
    axios.get('http://localhost:8081/api/print/all').
    then(res => {
      setAllDocument(res.data);
    });
  }, []);

  var documents = allDocument.map(document => {
    const pages = (document.Number_of_pages && document.Number_of_pages > 30) ? 30 : document.Number_of_pages;
    return {name: document.Name, pages: pages, time: '', date: document.End_time}
  }).reverse();

  documents = documents.slice(0, 8);

  return (
    <div className="recent-prints">
      <div className="recentheader">
        <h2>Các tài liệu được in gần đây</h2>
        <a href="#" onClick={() => {
          documents = allDocument.map(document => {
            const pages = (document.Number_of_pages && document.Number_of_pages > 30) ? 30 : document.Number_of_pages;
            return {name: document.Name, pages: pages, time: '', date: document.End_time}
          })
          window.location.reload();
        }
        }>Xem tất cả</a>
      </div>
      <ul>
        {documents.map((doc, index) => (
          <li key={index} className="document-item">
            <img
              src="/image/document.svg"
              alt="Document Icon"
              className="document-icon"
            />
            <div className="document-info">
              <span className="document-name">{doc.name}</span>
              <span className="document-details">
                {doc.pages} trang • {doc.time} {doc.date}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


const ListOfPrinter: React.FC<ListOfPrinterProps> = ({ onSelectPrinter, onAddPrinter }) => {  

  const [allPrinter, setAllPrinter] = React.useState([{PrID: 0, Status: '', Model: '', Floor: '', Campus: '', Short_description: '', Building: ''}]);
  React.useEffect(() => {
    axios.get('http://localhost:8081/api/printer/all').
    then(res => {
      setAllPrinter(res.data);
    });
  }, []);

  const printers = allPrinter.map(
    (printer, index) => ({status: printer.Status, PrID: printer.PrID, name: printer.Model, features: printer.Short_description.split(";"), location: {building: printer.Building, campus: printer.Campus, floor: printer.Floor}})
  ).reverse();



  return (
    <div className="list-of-printers">
      <div className="listheader">
        <h2>Danh sách máy in</h2>
        <a href="#" onClick={(e) => { 
          e.preventDefault(); 
          onAddPrinter();

         }}>Thêm máy in</a>
      </div>
      <ul>
        {printers.map((printer, index) => (
          <li key={index} className="printers-item" onClick={() => onSelectPrinter(printer)}>
            <img
              src="/image/printer.svg"
              alt="Document Icon"
              className="document-icon"
            />
            <div className="printers-info">
              <span className="printers-name">{printer.name} - Trạng thái: {printer.status === "Available" ? "Đang hoạt động" : (printer.status === "In Use") ? "Đang In" : "Không hoạt động"}</span>
              <span className="printers-details">
                Toà {printer.location.building} - Tầng {printer.location.floor} - Cơ sở {printer.location.campus} • {printer.features[0]}; {printer.features[1]}; {printer.features[2]} 
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CurrentPrintOrder: React.FC<CurrentPrintOrderProps> = ({
  onCreatePrintOrder,
}) => {
  return (
    <div className="current-print-order">
      <h2>Thông báo</h2>
      <div className="print-order-status">
        <p>Không có gì đang được in</p>
        {/* <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onCreatePrintOrder();
          }}
        >
          Tạo lệnh in
        </a> */}
      </div>
    </div>
  );
};

const Calendar: React.FC = () => {
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <span className="calendar-title">Lịch sử in</span>
        <span className="calendar-date">10/2024 ▼</span>
      </div>
      <div className="calendar-grid">
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day, index) => (
          <div key={index} className="calendar-day-name">
            {day}
          </div>
        ))}
        {[...Array(31)].map((_, index) => (
          <div key={index} className={`calendar-day ${getDayClass(index + 1)}`}>
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

const getDayClass = (day: number): string => {
  switch (day) {
    case 2:
      return "highlight-yellow";
    case 16:
    case 17:
      return "highlight-green";
    case 20:
      return "highlight-purple";
    default:
      return "";
  }
};

const LeftMenu: React.FC = () => {

  const [allPrinter, setAllPrinter] = React.useState([{PrID: null, Model: '', Floor: '', Campus: '', Short_description: '', Building: ''}]);
  React.useEffect(() => {
    axios.get('http://localhost:8081/api/printer/all').
    then(res => {
      setAllPrinter(res.data);
    });
  }, []);  

  return (
    <div className="left-menu">
      {/* <div className="profile">
          <img src="/placeholder.svg?height=24&width=24" alt="Profile" />
          <a href="#" className="logout" onClick={onLogout}>Đăng xuất</a>
        </div> */}
      <div className="stats">
        <div className="stat-item">
          <span>Số máy in: </span>
          <span>{allPrinter.length}</span>
        </div>
        <div className="stat-item">
          <span>Số người dùng: </span>
          <span>120</span>
        </div>
        <div className="stat-item">
          <span>Số lệnh in: </span>
          <span>2500</span>
        </div>
      </div>
    </div>
  );
};

const SPSO: React.FC<SPSOProps> = () => {
  const [currentView, setCurrentView] = useState<
    "recentPrints" | "listOfPrinters"
  >("recentPrints");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
  const [newPrinter, setNewPrinter] = useState<Printer | null>(null);


  const handleOpenPrintDialog = () => {
    setCurrentView("listOfPrinters"); // Switch to the ListOfPrinter view
  };

  const handleGoToHomePage = () => {
    setCurrentView("recentPrints"); // Reset to the main page
  };

  const handleSelectPrinter = (printer: Printer) => {
    setSelectedPrinter(printer);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddPrinter = (/*printer: Printer*/) => {
    // setNewPrinter(printer);
    setIsAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
  };
  /*logout handle function */
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('http://localhost:8081/api/user/logout')
        .then(res => {
            if (res.data.Status === "Success") {
              navigate('/');
            }
            else {
                alert("error logout");
            }
    }).catch(err => console.log(err))
  };

  const handleSetView = () => {
    setCurrentView("listOfPrinters")
  }

  return (
    <div className="SPSO">
      <Header
        onOpenPrintDialog={handleOpenPrintDialog}
        onLogout={handleLogout}
        onGoToHomePage={handleGoToHomePage}
      />
      <div className="main-content">
        <LeftMenu />
        <div className="content">
          <div className="welcome">
            <h1>Ho Chi Minh City University Of Technology</h1>
            <h2>Student Smart Printing Service</h2>
          </div>
          {currentView === "recentPrints" ? (
            <RecentPrints />
          ) : (
            <ListOfPrinter
              onSelectPrinter={handleSelectPrinter}
              onAddPrinter={handleAddPrinter}
              
            />
          )}
        </div>
        <div className="right-menu">
          <CurrentPrintOrder onCreatePrintOrder={handleOpenPrintDialog} />
          <Calendar />
        </div>
      </div>
      <Footer />
      {isDialogOpen && (
        <PrinterManagementDialog
          printer={selectedPrinter}
          onClose={handleDialogClose}
          onSave={handleDialogClose}
          setCurrentView={handleSetView}
        />
      )}

      {isAddDialogOpen && (
        <AddPrinter
          // printer={newPrinter} 
          onClose={handleAddDialogClose}
          onSave={handleAddDialogClose}
        />
      )}

    </div>
  );
};

export default SPSO;
