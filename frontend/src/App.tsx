import { useState } from 'react'
import './App.css'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import PrintDialog from './components/Print/Print'
import PrinterSelectionDialog from './components/Print2/Print2'
import PrintConfirmationDialog from './components/Print3/Print3'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // const handleLogout = () => {
  //   axios.get('http://localhost:8081/logout')
  //       .then(res => {
  //           if (res.data.Status === "Success") {
  //             navigate('/login');
  //           }
  //           else {
  //               alert("error");
  //           }
  //       }).catch(err => console.log(err))
  // };

  return (
    <>
      {/* {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )} */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard /*onLogout={handleLogout}*/ />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
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