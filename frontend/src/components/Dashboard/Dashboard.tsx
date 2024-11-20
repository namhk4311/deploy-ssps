import React from 'react';
import { useState } from 'react'
import './Dashboard.css';
import PrintDialog from '../Print/Print';
import PrinterSelectionDialog from '../Print2/Print2';
import PrintConfirmationDialog from '../Print3/Print3';

interface DashboardProps {
  onLogout: () => void;
}

interface Printer {
  name: string;
  features: string[];
  location: string;
}

interface HeaderProps {
  onOpenPrintDialog: () => void;
}

interface CurrentPrintOrderProps {
  onCreatePrintOrder: () => void; 
}


const Header: React.FC<HeaderProps> = ({ onOpenPrintDialog }) => {
  return (
    <header className="header">
      <nav className="nav">
        <a href="#" className="nav-link active">Trang chủ</a>
        <a href="#" className="nav-link" onClick={onOpenPrintDialog}>In tài liệu</a>
        <a href="#" className="nav-link">Thêm số trang</a>
      </nav>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="image/bk.png" alt="Logo" width="62" height="60" />
          <span className="footer-logo-text">HCMUT Student Smart Printing Service</span>
        </div>
        <div className="footer-info">
          <div className="footer-section">
            <h4>Website</h4>
            <p>HCMUT</p>
            <p>BKPay</p>
          </div>
          <div className="footer-section">
            <h4>Liên hệ</h4>
            <p><span className="icon">📍</span> 268 Lý Thường Kiệt, P.14, Q.10, TP.HCM</p>
            <p><span className="icon">✉️</span> ssp@hcmut.edu.vn</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const RecentPrints: React.FC = () => {
  const documents = [
    { name: 'Document_A.docx', pages: 12, time: '15:00 PM', date: '22/10/2023' },
    { name: 'Document_A.docx', pages: 12, time: '15:00 PM', date: '22/10/2023' },
    { name: 'Document_A.docx', pages: 12, time: '15:00 PM', date: '22/10/2023' },
    { name: 'Document_A.docx', pages: 12, time: '15:00 PM', date: '22/10/2023' },
  ];

  return (
    <div className="recent-prints">
      <div className="header">
        <h2>Đã in gần đây</h2>
        <a href="#">Xem tất cả</a>
      </div>
      <ul>
        {documents.map((doc, index) => (
          <li key={index} className="document-item">
            <img src="image/user.png" alt="Document Icon" className="document-icon" />
            <div className="document-info">
              <span className="document-name">{doc.name}</span>
              <span className="document-details">{doc.pages} trang • {doc.time} {doc.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CurrentPrintOrder: React.FC<CurrentPrintOrderProps> = ({ onCreatePrintOrder }) => {
  return (
    <div className="current-print-order">
      <h2>Lệnh in hiện tại</h2>
      <div className="print-order-status">
        <p>Không có gì đang được in</p>
        <a href="#" onClick={(e) => {
          e.preventDefault(); 
          onCreatePrintOrder();
        }}>
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
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="calendar-day-name">{day}</div>
        ))}
        {[...Array(31)].map((_, index) => (
          <div key={index} className={`calendar-day ${getDayClass(index + 1)}`}>{index + 1}</div>
        ))}
      </div>
    </div>
  );
};

const getDayClass = (day: number): string => {
  switch (day) {
    case 2:
      return 'highlight-yellow';
    case 16:
    case 17:
      return 'highlight-green';
    case 20:
      return 'highlight-purple';
    default:
      return '';
  }
};

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [currentDialog, setCurrentDialog] = useState<'none' | 'print' | 'printer-selection' | 'print-confirmation'>(
    'none'
  );

  const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);

  const handleOpenPrintDialog = () => {
    setCurrentDialog('print');
  };

  const handleCloseDialog = () => {
    setCurrentDialog('none');
  };

  const handleContinueToPrinterSelection = () => {
    setCurrentDialog('printer-selection');
  };

  const handleBackToPrintDialog = () => {
    setCurrentDialog('print');
  };

  const handleContinueToPrintConfirmation = () => {
    setCurrentDialog('print-confirmation');
  };

  const handleSelectPrinter = (printer: Printer) => {
    setSelectedPrinter(printer); 
    setCurrentDialog('print-confirmation'); 
  };

  const handleBackToPrinterSelection = () => {
    setCurrentDialog('printer-selection');
  };


  return (
    <div className="dashboard">
      <Header onOpenPrintDialog={handleOpenPrintDialog} />
      <div className="main-content">
        <div className="left-menu">
          <div className="profile">
            <img src="image/user.png" alt="Profile" />
            <a href="#" className="logout" onClick={onLogout}>Đăng xuất</a>
          </div>
          <div className="stats">
            <div className="stat-item">
              <span>Số dư còn lại: </span>
              <span>8848</span>
            </div>
            <div className="stat-item">
              <span>Số lệnh in: </span>
              <span>19</span>
            </div>
            <div className="stat-item">
              <span>Số trang đã in: </span>
              <span>150</span>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="welcome">
            <h1>Ho Chi Minh City University Of Technology</h1>
            <h2>Student Smart Printing Service</h2>
          </div>
          <RecentPrints />
        </div>
        <div className="right-menu">
        <CurrentPrintOrder onCreatePrintOrder={handleOpenPrintDialog} />
          <Calendar />
        </div>
      </div>
      <Footer />
      {currentDialog === 'print' && (
        <PrintDialog onClose={handleCloseDialog} onContinue={handleContinueToPrinterSelection} />
      )}
      {currentDialog === 'printer-selection' && (
        <PrinterSelectionDialog
          onBack={handleBackToPrintDialog}
          onClose={handleCloseDialog}
          onContinue={handleContinueToPrintConfirmation}
          onSelectPrinter={handleSelectPrinter}
        />
      )}
      {currentDialog === 'print-confirmation' && (
        <PrintConfirmationDialog 
        selectedPrinter={selectedPrinter}
        onBack={handleBackToPrinterSelection} 
        onClose={handleCloseDialog} 
        onChangePrinter={handleBackToPrinterSelection} 
        />
      )}
    </div>
  );
};

export default Dashboard;

