import React from 'react';
import { Home, BookOpen, Heart, Briefcase, Settings, Users, AlertTriangle, LogOut, Repeat, GraduationCap, DollarSign, Code } from 'lucide-react';
import { useUser } from './UserContext';

interface SidebarProps {
  currentPage: string;
  setPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setPage }) => {
  const { role, switchRole, user } = useUser();

  const studentLinks = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'academics', icon: GraduationCap, label: 'Academics' },
    { id: 'career', icon: Briefcase, label: 'Career Co-Pilot' },
    { id: 'coding', icon: Code, label: 'DSA & Tech' },
    { id: 'finance', icon: DollarSign, label: 'Finance' },
    { id: 'wellness', icon: Heart, label: 'Wellbeing' },
    { id: 'community', icon: Users, label: 'Community' },
  ];

  const facultyLinks = [
    { id: 'faculty-dashboard', icon: Home, label: 'Overview' },
    { id: 'students', icon: Users, label: 'My Students' },
    { id: 'risk-monitor', icon: AlertTriangle, label: 'Risk Monitor' },
    { id: 'academics', icon: BookOpen, label: 'Course Mgmt' },
  ];

  const links = role === 'student' ? studentLinks : facultyLinks;

  return (
    <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-screen sticky top-0 transition-all duration-300 z-50">
      <div className="p-4 lg:p-6">
        {/* Logo Area */}
        <div className="flex items-center gap-3 mb-8 text-blue-600">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/20">
            <GraduationCap size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight hidden lg:block text-slate-800">
            Co-Pilot <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full ml-1 uppercase">{role}</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;

            return (
              <button
                key={link.id}
                onClick={() => setPage(link.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group
                  ${isActive
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                <Icon size={20} className={isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'} />
                <span className="hidden lg:block">{link.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 hidden lg:block" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 lg:p-6 border-t border-slate-100">

        {/* Role Switcher (For Demo) */}
        <button
          onClick={switchRole}
          className="w-full flex items-center gap-3 px-4 py-3 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-xl font-medium transition-colors mb-2"
        >
          <Repeat size={20} />
          <span className="hidden lg:block text-sm">Switch Role (Demo)</span>
        </button>

        <button
            onClick={() => setPage('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentPage === 'settings' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
        >
          <Settings size={20} />
          <span className="hidden lg:block">Settings</span>
        </button>

        {/* User Profile Mini */}
        <div className="mt-4 hidden lg:flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 truncate capitalize">{role}</p>
          </div>
          <button className="text-slate-400 hover:text-red-500 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
