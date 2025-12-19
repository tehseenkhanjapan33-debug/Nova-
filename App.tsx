
import React from 'react';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { AuthPage, VerifyPage } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { CreateCampaign } from './pages/CreateCampaign';
import { Admin } from './pages/Admin';
import { AppProvider, useAppStore } from './store';

const Router: React.FC = () => {
  const { currentPage, user } = useAppStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'landing': return <Landing />;
      case 'login': return <AuthPage mode="login" />;
      case 'register': return <AuthPage mode="register" />;
      case 'verify': return <VerifyPage />;
      case 'dashboard': return user ? <Dashboard /> : <AuthPage mode="login" />;
      case 'create': return user ? <CreateCampaign /> : <AuthPage mode="login" />;
      case 'admin': return user?.isAdmin ? <Admin /> : <Landing />;
      default: return <Landing />;
    }
  };

  return <Layout>{renderPage()}</Layout>;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default App;
