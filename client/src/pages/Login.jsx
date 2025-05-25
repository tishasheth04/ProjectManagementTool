import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Textbox from '../components/Textbox';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({ mode: 'onChange' });

  const submitHandler = async (data) => {
    console.log("submit", data);

    // Simulated fake login
    const fakeUser = {
      name: "Test User",
      email: data.email,
    };

    dispatch(setCredentials(fakeUser));
    navigate('/dashboard');
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="page-wrapper font-noto">
      <div className="login-container">
        {/* Left Side */}
        <div className="left-side">
          <div className="text-section">
            <h1 className="title-line">Cloud-Based</h1>
            <h1 className="title-line">Task Manager</h1>
            <span className="tagline">Manage all your tasks in one place!</span>
          </div>
          <div className="circle-container">
            <div className="dvd-circle"></div>
          </div>
        </div>

        {/* Right Side */}
        <div className="right-side">
          <p className="streamline-text">
            Streamline your workflow with our intuitive task management solution.
          </p>

          <form onSubmit={handleSubmit(submitHandler)} className="form-container">
            <div className="form-header">
              <p className="welcome-text">Welcome back!</p>
              <p className="subtext">Sign in to continue your productivity journey</p>
            </div>

            <Textbox
              placeholder="email@example.com"
              type="email"
              name="email"
              label="Email Address"
              classNames="input-field"
              register={register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              error={isSubmitted && errors.email?.message}
            />

            <Textbox
              placeholder="••••••••"
              type="password"
              name="password"
              label="Password"
              classNames="input-field"
              register={register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                },
                validate: value => value.trim() !== "" || "Password cannot be empty"
              })}
              error={isSubmitted && errors.password?.message}
            />

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="submit-button">Sign In</button>

            <p className="signup-text">
              Don’t have an account? <a href="#" className="signup-link">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
