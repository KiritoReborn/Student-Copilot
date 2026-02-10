import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Academics from './pages/Academics';
import Career from './pages/Career';
import Coding from './pages/Coding';
import Community from './pages/Community';
import Finance from './pages/Finance';
import Wellness from './pages/Wellness';
import Settings from './pages/Settings';
import AiAssistant from './pages/AiAssistant';
import { Menu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'ai-assistant': return <AiAssistant />;
      case 'academics': return <Academics />;
      case 'career': return <Career />;
      case 'coding': return <Coding />;
      case 'community': return <Community />;
      case 'finance': return <Finance />;
      case 'wellness': return <Wellness />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm z-10">
          <h1 className="font-bold text-slate-800">Student Life Co-Pilot</h1>
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-600">
            <Menu size={24} />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
