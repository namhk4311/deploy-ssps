import { useState } from 'react'
import './App.css'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Role from './components/Role/Role'
import SPSO from './components/SPSO/SPSO'

function App() {
  const [currentPage, setCurrentPage] = useState<'role' | 'login' | 'dashboard' | 'spso'>('role');
  const [role, setRole] = useState<'student' | 'admin' | null>(null);

  const handleRoleSelection = (selectedRole: 'student' | 'admin') => {
    setRole(selectedRole);
    setCurrentPage('login');
  };

  const handleLogin = () => {
    if (role === 'student') {
      setCurrentPage('dashboard');
    } else if (role === 'admin') {
      setCurrentPage('spso');
    }
  };

  const handleLogout = () => {
    setCurrentPage('role');
    setRole(null);
  };

  return (
    <>
      {currentPage === 'role' && <Role onSelectRole={handleRoleSelection} />}
      {currentPage === 'login' && <Login onLogin={handleLogin} />}
      {currentPage === 'dashboard' && <Dashboard onLogout={handleLogout} />}
      {currentPage === 'spso' && <SPSO onLogout={handleLogout} />}
    </>
  );
}

export default App;

// Test UI of each components
// function App() {
//   return (
//     <>
//     <SPSO />
//   </>
//       );
// }
