import React from 'react';
import './GoogleLoginButton.css';

const GoogleLoginButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button className="google-login-btn" onClick={onClick}>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Gmail_Icon_%282013-2020%29.svg"
      alt="Google logo"
      className="google-login-btn__icon"
    />
    <span className="google-login-btn__text">Continue with Google</span>
  </button>
);

export default GoogleLoginButton;