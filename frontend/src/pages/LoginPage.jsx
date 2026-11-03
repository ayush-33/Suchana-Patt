import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export function LoginPage() {
  const [email, setEmail] = useState('candidate.demo@suchanapatt.in');
  const [password, setPassword] = useState('demo12345');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [demoLoggedIn, setDemoLoggedIn] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setDemoLoggedIn(true);
      setTimeout(() => {
        navigate('/latest-jobs');
      }, 1600);
    }
  };

  const breadcrumbs = [{ label: 'Sign In', to: '/login' }];

  return (
    <div className="page-container main-content login-page-wrapper">
      <Breadcrumbs items={breadcrumbs} />

      <div className="login-page-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo-circle">
              <FileText size={24} />
            </div>
            <h1 className="login-title">Sign In to Suchana Patt</h1>
            <p className="login-subtitle">
              Access your personalized job alerts, saved applications, and exam trackers.
            </p>
          </div>

          <div className="demo-account-notice">
            <strong>Frontend Demo Mode:</strong> You can test validation or click <em>Sign In</em> using pre-filled demo credentials. No external authentication backend is contacted.
          </div>

          {demoLoggedIn ? (
            <div
              style={{
                backgroundColor: '#dcfce7',
                border: '1px solid #86efac',
                padding: 16,
                borderRadius: 8,
                textAlign: 'center',
                color: '#15803d'
              }}
            >
              <CheckCircle2 size={32} style={{ margin: '0 auto 8px auto' }} />
              <div style={{ fontWeight: 700, fontSize: 15 }}>Sign In Successful (Demo)</div>
              <p style={{ fontSize: 13, marginTop: 4 }}>
                Redirecting to Latest Jobs portal...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="login-form-group">
                <label className="login-label" htmlFor="login-email">
                  Email Address
                </label>
                <div className="login-input-wrapper">
                  <input
                    id="login-email"
                    type="email"
                    className={`login-input ${errors.email ? 'error' : ''}`}
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {errors.email && <div className="login-error-msg">{errors.email}</div>}
              </div>

              {/* Password */}
              <div className="login-form-group">
                <label className="login-label" htmlFor="login-password">
                  Password
                </label>
                <div className="login-input-wrapper">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    className={`login-input ${errors.password ? 'error' : ''}`}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <div className="login-error-msg">{errors.password}</div>}
              </div>

              {/* Remember me & Forgot Password */}
              <div className="login-row-remember">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="login-forgot-btn"
                  onClick={() => setShowForgotPasswordModal(true)}
                >
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="btn-login-submit">
                Sign In to Account
              </button>
            </form>
          )}

          <div className="login-footer-links">
            <span>Don't have an account yet? </span>
            <button
              type="button"
              className="login-register-link"
              onClick={() => alert('Candidate registration will be enabled when the backend auth API is deployed.')}
            >
              Create Demo Account
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Demo Dialog */}
      {showForgotPasswordModal && (
        <div
          className="confirmation-modal-backdrop"
          onClick={() => setShowForgotPasswordModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="forgot-modal-title"
        >
          <div
            className="confirmation-modal-box login-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="forgot-modal-title" style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: '#073b82' }}>
              Password Reset Notice
            </h3>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, marginBottom: 16 }}>
              This is a frontend demonstration build. Password reset emails and OTP verification will be active once the backend mail service is connected.
            </p>
            <button
              type="button"
              className="btn-view-details"
              style={{ width: '100%', justifyContent: 'center', minHeight: 40 }}
              onClick={() => setShowForgotPasswordModal(false)}
            >
              Understood, Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
