import React from 'react';
import './Role.css';

interface RoleProps {
  onSelectRole: (role: 'student' | 'admin') => void;
}

const Role: React.FC<RoleProps> = ({ onSelectRole }) => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Chào mừng bạn đến với SSPS</h1>
        <button onClick={() => onSelectRole('student')}>Sinh viên</button>
        <button onClick={() => onSelectRole('admin')}>Admin</button>
      </div>
      <div className="image-container">
        <img src="image/login.png" alt="Background" />
      </div>
      <img src="image/bk.png" alt="Small Decorative" className="small-image" />
    </div>
  );
};

export default Role;

