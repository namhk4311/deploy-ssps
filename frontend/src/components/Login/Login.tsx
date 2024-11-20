import React from 'react';
import './Login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Chào mừng bạn đến với SSPS</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }}>
          <div className="input-group">
            <label htmlFor="username">Tài khoản</label>
            <input type="email" id="username" placeholder="Hãy nhập email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mật khẩu</label>
            <input type="password" id="password" placeholder="Hãy nhập mật khẩu" />
          </div>
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
      <div className="image-container">
        <img src="image/login.png" alt="Background" />
      </div>
      <img src="image/bk.png" alt="Small Decorative" className="small-image"/>
    </div>
  );
};

export default Login;

