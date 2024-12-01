import React, { useState } from "react";
import "./SPSO.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SPSOProps {
  onLogout: () => void;
}

interface Printer {
  name: string;
  features: string[];
  location: string;
}

interface HeaderProps {
  onOpenPrintDialog: () => void;
  onLogout: () => void;
  onToggleMenu: () => void;
  onGoToHomePage: () => void; 
}

interface CurrentPrintOrderProps {
  onCreatePrintOrder: () => void;
}

interface RecentPrintsProps {
  isMenuOpen: boolean;
}

interface ListOfPrinterProps {
  isMenuOpen: boolean;
}

interface LeftMenuProps {
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onOpenPrintDialog,
  onLogout,
  onToggleMenu,
  onGoToHomePage,
}) => {
  return (
    <header className="header">
      <div className="hamburger" onClick={onToggleMenu}>
        ☰
      </div>

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

const RecentPrints: React.FC<RecentPrintsProps> = ({ isMenuOpen }) => {
  const documents = [
    {
      name: "Document_A.docx",
      pages: 12,
      time: "15:00 PM",
      date: "22/10/2023",
    },
    {
      name: "Document_A.docx",
      pages: 12,
      time: "15:00 PM",
      date: "22/10/2023",
    },
    {
      name: "Document_A.docx",
      pages: 12,
      time: "15:00 PM",
      date: "22/10/2023",
    },
    // {
    //   name: "Document_A.docx",
    //   pages: 12,
    //   time: "15:00 PM",
    //   date: "22/10/2023",
    // },
    
  ];

  return (
    <div className={`recent-prints ${!isMenuOpen ? "narrow" : ""}`}>
      <div className="recentheader">
        <h2>Máy in được sử dụng gần đây</h2>
        <a href="#">Xem tất cả</a>
      </div>
      <ul>
        {documents.map((doc, index) => (
          <li key={index} className="document-item">
            <img
              src="/placeholder.svg?height=24&width=24"
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

const ListOfPrinter: React.FC<ListOfPrinterProps> = ({ isMenuOpen }) => {
  const printers = [
    {
      name: "Máy in A",
      location: "Tầng 2 - Tòa B4",
      features: ["1 mặt", "2 mặt", "In trắng đen", "A3"],
    },
    {
      name: "Máy in B",
      location: "Tầng 2 - Tòa B4",
      features: ["1 mặt", "2 mặt", "In trắng đen", "A4"],
    }
  ];

  return (
    <div className={`list-of-printers ${!isMenuOpen ? "narrow" : ""}`}>
      <div className="listheader">
        <h2>Danh sách máy in</h2>
        <a href="#">Xem tất cả</a>
      </div>
      <ul>
        {printers.map((printer, index) => (
          <li key={index} className="printers-item">
            <img
              src="/placeholder.svg?height=24&width=24"
              alt="Document Icon"
              className="document-icon"
            />
            <div className="printers-info">
              <span className="printers-name">{printer.name}</span>
              <span className="printers-details">
                {printer.location} trang • {printer.features}
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
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onCreatePrintOrder();
          }}
        >
          Tạo lệnh in
        </a>
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

const LeftMenu: React.FC<LeftMenuProps> = ({ isMenuOpen }) => {
  if (!isMenuOpen) return null; // Return null if the menu is not open

  return (
    <div className="left-menu">
      {/* Uncomment and update profile section if needed */}
      {/* <div className="profile">
          <img src="/placeholder.svg?height=24&width=24" alt="Profile" />
          <a href="#" className="logout" onClick={onLogout}>Đăng xuất</a>
        </div> */}
      <div className="stats">
        <div className="stat-item">
          <span>Số máy in: </span>
          <span>6</span>
        </div>
        <div className="stat-item">
          <span>Số người dùng: </span>
          <span>1200</span>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenPrintDialog = () => {
    setCurrentView("listOfPrinters"); // Switch to the ListOfPrinter view
  };

  const handleGoToHomePage = () => {
    setCurrentView("recentPrints"); // Reset to the main page
  };


  const navigate = useNavigate();

  /*logout handle function */
  const handleLogout = () => {
    axios.get('http://localhost:8081/api/user/logout')
        .then(res => {
            if (res.data.Status === "Success") {
              navigate('/');
            }
            else {
                alert("error");
            }
        }).catch(err => console.log(err))
  };

  return (
    <div className="SPSO">
      <Header
        onOpenPrintDialog={handleOpenPrintDialog}
        onLogout={handleLogout}
        onToggleMenu={toggleMenu}
        onGoToHomePage={handleGoToHomePage}
      />
      <div className="main-content">
        <LeftMenu isMenuOpen={isMenuOpen} />
        <div className="content">
          <div className={`welcome ${!isMenuOpen ? "narrow" : ""}`}>
            <h1>Ho Chi Minh City University Of Technology</h1>
            <h2>Student Smart Printing Service</h2>
          </div>
          {currentView === "recentPrints" ? (
            <RecentPrints isMenuOpen={isMenuOpen} />
          ) : (
            <ListOfPrinter isMenuOpen={isMenuOpen} />
          )}
        </div>
        <div className="right-menu">
          <CurrentPrintOrder onCreatePrintOrder={handleOpenPrintDialog} />
          <Calendar />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SPSO;
