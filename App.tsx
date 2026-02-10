import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import Academics from './pages/Academics';
import Wellness from './pages/Wellness';
import Career from './pages/Career';
import Coding from './pages/Coding';
import Community from './pages/Community';
import Finance from './pages/Finance';
import Settings from './pages/Settings';
import { UserProvider, useUser } from './components/UserContext';

const MainApp = () => {
  const { role } = useUser();
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    // Shared Routes
    if (currentPage === 'settings') return <Settings />;

    // Student Routes
    if (role === 'student') {
      switch (currentPage) {
        case 'dashboard': return <StudentDashboard />;
        case 'academics': return <Academics />;
        case 'wellness': return <Wellness />;
        case 'career': return <Career />;
        case 'coding': return <Coding />;
        case 'community': return <Community />;
        case 'finance': return <Finance />;
        default: return <StudentDashboard />;
      }
    }

    // Faculty Routes
    if (role === 'faculty') {
      switch (currentPage) {
        case 'faculty-dashboard': return <FacultyDashboard />;
        case 'risk-monitor': return <FacultyDashboard />; // Temporary route
        case 'students': return <FacultyDashboard />; // Temporary route
        case 'academics': return <FacultyDashboard />; // Temporary route
        default: return <FacultyDashboard />;
      }
    }

    return <div>Page not found</div>;
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar currentPage={currentPage} setPage={setCurrentPage} />
      <main className="flex-1 overflow-y-auto h-screen relative">
         {/* Top Header Area (Search, etc.) - Could be extracted */}
         <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-8 py-4 flex items-center justify-between border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 capitalize">
              {currentPage.replace('-', ' ')}
            </h2>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex relative group">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-4 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
                />
              </div>
            </div>
         </header>

         <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
            {renderPage()}
         </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}

export default App;
