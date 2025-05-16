import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
  const user = '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    user && navigate('/dashboard');
  }, [user]);

  return (
    <div className="page-wrapper">
      <div className="login-container">

        {/* Left side */}
        <div className="left-side">
          {/* Add a logo/banner here if needed */}
        </div>

        {/* Center section with tagline and title */}
        <div className="center-section">
          <span className="tagline">Manage all your tasks in one place!</span>
          <p className="title-line">Cloud-Based</p>
          <p className="title-line">Task Manager</p>
        </div>

        {/* Right side with floating circle */}
        <div className="right-side">
          <div className="dvd-circle"></div>
        </div>

      </div>
    </div>
  );
};

export default Login;
