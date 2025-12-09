
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Dashboard from './pages/Dashboard';
import UnitList from './pages/UnitList';
import UnitDetails from './pages/UnitDetails';
import ManageClasses from './pages/ManageClasses';
import CalendarView from './pages/CalendarView';
import Settings from './pages/Settings';
import { AppProvider } from './context/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-900 flex">
          <Sidebar />
          
          <main className="flex-1 md:ml-64 w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/units" element={<UnitList />} />
              <Route path="/units/:unitId" element={<UnitDetails />} />
              <Route path="/manage-classes" element={<ManageClasses />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <MobileNav />
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
