import { useState } from 'react'
import './App.css'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import PrintDialog from './components/Print/Print'
import PrinterSelectionDialog from './components/Print2/Print2'
import PrintConfirmationDialog from './components/Print3/Print3'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  );
}

// Test UI of each components
// function App() {
//   return (
//     <>
//     <PrinterSelectionDialog />
//   </>
//       );
// }

export default App;