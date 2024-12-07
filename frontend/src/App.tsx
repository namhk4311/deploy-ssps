import { useState } from 'react'
import './App.css'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
// import PrintDialog from './components/Print/Print'
// import PrinterSelectionDialog from './components/Print2/Print2'
// import PrintConfirmationDialog from './components/Print3/Print3'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Role from './components/Role/Role'
import SPSO from './components/SPSO/SPSO'

function App() {
  const [role, setRole] = useState<'student' | 'admin' | null>(null);

  const handleRoleSelection = (selectedRole: 'student' | 'admin') => {
    setRole(selectedRole);
    // setCurrentPage('login');
    console.log(selectedRole);
  };


      return (
        <>
          <BrowserRouter>
              <Routes>
                <Route path='/' element={<Role onSelectRole={handleRoleSelection} />} />
                <Route path='/student' element={<Dashboard />} />
                <Route path='/login' element={<Login roleSelected={role} />} />
                <Route path='/spso' element={<SPSO />} />
              </Routes>
            </BrowserRouter>
        </>
       );
}

export default App;

