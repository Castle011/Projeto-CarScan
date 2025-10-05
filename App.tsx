
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

// Screens
import Dashboard from './screens/Dashboard';
import VehicleList from './screens/VehicleList';
import VehicleDetails from './screens/VehicleDetails';
import VehicleForm from './screens/VehicleForm';
import ChecklistForm from './screens/ChecklistForm';
import ChecklistHistory from './screens/ChecklistHistory';
import ChecklistDetails from './screens/ChecklistDetails';
import Settings from './screens/Settings';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AccountScreen from './screens/AccountScreen';

const MainApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/vehicle/new" element={<VehicleForm />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/vehicle/edit/:id" element={<VehicleForm />} />
          <Route path="/checklist/new/:vehicleId" element={<ChecklistForm />} />
          <Route path="/checklist/edit/:id" element={<ChecklistForm />} />
          <Route path="/checklists" element={<ChecklistHistory />} />
          <Route path="/checklist/:id" element={<ChecklistDetails />} />
          <Route path="/account" element={<AccountScreen />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/*" element={<MainApp />} />
            </Route>
          </Routes>
        </AppProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;