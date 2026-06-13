import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OnboardingFlow from './components/OnboardingFlow';
import AppOnboarding from './components/AppOnboarding';
import LoginScreen from './components/LoginScreen';

// Import Pages
import Dashboard from './pages/Dashboard';
import LiveTracking from './pages/LiveTracking';
import AnimalManagement from './pages/AnimalManagement';
import DeviceManagement from './pages/DeviceManagement';
import HealthMonitoring from './pages/HealthMonitoring';
import AlertsCenter from './pages/AlertsCenter';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import SettingsPage from './pages/Settings';

// Import Mock Initial Data
import { 
  mockAnimals as initialAnimals, 
  mockAlerts as initialAlerts, 
  mockVaccines as initialVaccines, 
  GEOFENCE_RADIUS_METERS 
} from './data/mockHerd';

export default function App() {
  // auth flow: 'onboarding' → 'login' → 'app'
  const [authState, setAuthState] = useState(() => {
    const isLoggedIn = localStorage.getItem('smHerd_isLoggedIn') === 'true';
    if (isLoggedIn) return 'app';
    const onboarded = localStorage.getItem('smHerd_onboarded') === 'true';
    if (onboarded) return 'login';
    return 'onboarding';
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [animals, setAnimals] = useState(initialAnimals);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [vaccines, setVaccines] = useState(initialVaccines);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [geofenceRadius, setGeofenceRadius] = useState(GEOFENCE_RADIUS_METERS);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('smHerd_theme') === 'dark';
  });

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('smHerd_theme', 'dark');
      if (meta) meta.setAttribute('content', '#0f172a');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('smHerd_theme', 'light');
      if (meta) meta.setAttribute('content', '#ffffff');
    }
  }, [darkMode]);

  // Handlers
  const handleRegisterAnimal = (newAnimal) => {
    setAnimals([newAnimal, ...animals]);
    setSelectedAnimal(newAnimal);
    setActiveTab('tracking');
  };

  const handleResolveAlert = (alertId) => {
    setAlerts(alerts.map(alt => alt.id === alertId ? { ...alt, resolved: true } : alt));
  };

  const handleOnboardingFinish = () => {
    localStorage.setItem('smHerd_onboarded', 'true');
    setAuthState('login');
  };

  const handleLogin = () => {
    localStorage.setItem('smHerd_isLoggedIn', 'true');
    setAuthState('app');
  };

  const handleLogout = () => {
    localStorage.removeItem('smHerd_isLoggedIn');
    setAuthState('login');
  };

  const activeAlertCount = alerts.filter(alt => !alt.resolved).length;

  // ── Onboarding / Login gates ─────────────────────────────────
  if (authState === 'onboarding') {
    return <AppOnboarding onFinish={handleOnboardingFinish} />;
  }
  if (authState === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // ── Main App ─────────────────────────────────────────────────────────
  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            animals={animals}
            alerts={alerts}
            vaccines={vaccines}
            selectedAnimal={selectedAnimal}
            onSelectAnimal={(animal) => {
              setSelectedAnimal(animal);
              setActiveTab('tracking');
            }}
            geofenceRadius={geofenceRadius}
            setActiveTab={setActiveTab}
            darkMode={darkMode}
          />
        );
      case 'tracking':
        return (
          <LiveTracking 
            animals={animals}
            selectedAnimal={selectedAnimal}
            onSelectAnimal={setSelectedAnimal}
            geofenceRadius={geofenceRadius}
            onRadiusChange={setGeofenceRadius}
            darkMode={darkMode}
          />
        );
      case 'animals':
        return (
          <AnimalManagement 
            animals={animals}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
          />
        );
      case 'devices':
        return <DeviceManagement />;
      case 'health':
        return <HealthMonitoring animals={animals} />;
      case 'alerts':
        return (
          <AlertsCenter 
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
          />
        );
      case 'analytics':
        return <Analytics />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return (
          <SettingsPage 
            geofenceRadius={geofenceRadius}
            onRadiusChange={setGeofenceRadius}
          />
        );
      default:
        return <div className="p-6 text-slate-500 font-bold">Page Not Found</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans relative bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false);
        }} 
        alertCount={activeAlertCount} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onLogout={handleLogout}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(prev => !prev)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          activeTab={activeTab} 
          onOpenOnboarding={() => setIsOnboardingOpen(true)} 
          animalCount={animals.length} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-hidden bg-slate-50 dark:bg-slate-950">
          {renderActivePage()}
        </main>
      </div>

      <OnboardingFlow 
        isOpen={isOnboardingOpen} 
        onClose={() => setIsOnboardingOpen(false)} 
        onRegister={handleRegisterAnimal} 
      />
    </div>
  );
}
