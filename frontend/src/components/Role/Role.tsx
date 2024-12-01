import React from 'react';
import './Role.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface RoleProps {
  onSelectRole: (role: 'student' | 'admin') => void;
}

const Role: React.FC<RoleProps> = ({onSelectRole}) => {
  
  // const handleRoleSelection = (selectedRole: 'student' | 'admin') => {
  //   setRole(selectedRole);
  // };
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Chào mừng bạn đến với SSPS</h1>
        <button onClick={() => {

          onSelectRole('student');
          navigate('/login');
        }}>Sinh viên</button>
        <button onClick={() => {
          onSelectRole('admin');
          navigate('/login')
        }}>Admin</button>
      </div>
      <div className="image-container">
        <img src="image/login.png" alt="Background" />
      </div>
      <img src="image/bk.png" alt="Small Decorative" className="small-image" />
    </div>
  );
};

export default Role;

