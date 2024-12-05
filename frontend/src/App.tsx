import { useState } from 'react'
import './App.css'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import PrintDialog from './components/Print/Print'
import PrinterSelectionDialog from './components/Print2/Print2'
import PrintConfirmationDialog from './components/Print3/Print3'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import axios from 'axios';
import Role from './components/Role/Role'
import SPSO from './components/SPSO/SPSO'

interface IUSER {
  ID: number, Available_Pages: number, Email: string, Password: string, F_name: string, M_name: string, L_name: string, Role: string, LastLogin: string
}

interface IDOCUMENT {
  Name: string,
  pages: number,
  End_time: string,
  time: string,
  Format: string,
  Number_of_pages: number
}

function App() {
  const [currentPage, setCurrentPage] = useState<'role' | 'login' | 'dashboard' | 'spso'>('role');
  const [role, setRole] = useState<'student' | 'admin' | null>(null);
  const [userInfo, setUserInfo] = useState<IUSER>({ID: 0, Available_Pages: 0, Email: '', Password: '', F_name: '', M_name: '', L_name: '', Role: '', LastLogin: ''});

  const [fetchDocument, setFetchDocument] = useState<[IDOCUMENT]>([{Name: '', pages: 0, End_time: '', time: '', Format: '', Number_of_pages: 0}]);


  const handleRoleSelection = (selectedRole: 'student' | 'admin') => {
    setRole(selectedRole);
    // setCurrentPage('login');
    console.log(selectedRole);
  };

  const handleLogin = () => {
    if (role === 'student') {
      setCurrentPage('dashboard');
    } else if (role === 'admin') {
      setCurrentPage('spso');
    }
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

      {/* {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )} */}
            // const handleLogout = () => {
            //   setCurrentPage('role');
            //   setRole(null);
            // };
      function handleLogout() {

      }

      axios.get('')

      return (
        <>
          <BrowserRouter>
              <Routes>
                <Route path='/' element={<Role onSelectRole={handleRoleSelection} />} />
                {/* <Route path='/student' element={<Dashboard studentInfo={userInfo} fetchDocument={fetchDocument} setFetchDocument={setFetchDocument}/>} /> */}
                {/* <Route path='/login' element={<Login roleSelected={role} setUserInfo={setUserInfo} />} /> */}
                <Route path='/spso' element={<SPSO onLogout={handleLogout} />} />
              </Routes>
            </BrowserRouter>
        {/* {currentPage === 'role' && <Role onSelectRole={handleRoleSelection} />}
        {currentPage === 'login' && <Login />}
        {currentPage === 'dashboard' && <Dashboard onLogout={handleLogout} />}
        {currentPage === 'spso' && <SPSO onLogout={handleLogout} />} */}
        </>
       );
}

export default App;

 {/* Test UI of each components
//</> function App() {
//   return (
//     <>
//     <SPSO />
//   </>
//       );
// } */}
