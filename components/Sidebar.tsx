import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Wallet, 
  HeartPulse, 
  Settings, 
  LogOut,
  Users,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ai-assistant', label: 'AI Co-Pilot', icon: Sparkles },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'career', label: 'Career Co-Pilot', icon: Briefcase },
    { id: 'coding', label: 'DSA & Coding', icon: Code2 },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'finance', label: 'Finance Coach', icon: Wallet },
    { id: 'wellness', label: 'Well-being', icon: HeartPulse },
    { id: 'settings', label: 'Settings & Trust', icon: Settings },
  ];

  const handleNav = (id: string) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col h-full
      `}>
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              Co
            </span>
            Student Life
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${activeTab === item.id 
                      ? 'bg-blue-600 text-white font-medium shadow-lg shadow-blue-900/50' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                  `}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
          <div className="mt-4 px-4 text-xs text-slate-500 text-center">
            v1.0.0 • Institution Licensed
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
