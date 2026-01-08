import React, { useState } from 'react';
import { Login } from '../components/comman/Login/Login';
import { Signup } from '../components/comman/Signup/Signup';
import MainApp from './Main';

type AuthPage = 'login' | 'signup' | 'app';

const AppRouter: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AuthPage>('login');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('app');
  };

  const handleSwitchToSignup = () => {
    setCurrentPage('signup');
  };

  const handleSwitchToLogin = () => {
    setCurrentPage('login');
  };

  const handleSignupSuccess = () => {
    setCurrentPage('login');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  if (!isAuthenticated) {
    return (
      <>
        {currentPage === 'login' && (
          <Login
            onSwitchToSignup={handleSwitchToSignup}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        {currentPage === 'signup' && (
          <Signup
            onSwitchToLogin={handleSwitchToLogin}
            onSignupSuccess={handleSignupSuccess}
          />
        )}
      </>
    );
  }

  return <MainApp onLogout={handleLogout} />;
};

export default AppRouter;
