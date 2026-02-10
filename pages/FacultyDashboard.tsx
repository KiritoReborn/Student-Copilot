import React, { useEffect, useState } from 'react';
import { useUser } from '../components/UserContext';
import { getAtRiskStudents } from '../services/facultyService';
import { Student, RiskAssessment } from '../types/schema';
import {
  Users, TrendingUp, AlertTriangle, Search, Bell,
  MoreVertical, Calendar, CheckCircle, Mail, Video
} from 'lucide-react';

const FacultyDashboard: React.FC = () => {
  const { user } = useUser();
  const [atRiskStudents, setAtRiskStudents] = useState<{ student: Student; assessment: RiskAssessment }[]>([]);

  useEffect(() => {
    const data = getAtRiskStudents();
    setAtRiskStudents(data);
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back, {user.name}. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600">
             <Search size={20} />
           </button>
           <button className="relative p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600">
             <Bell size={20} />
             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
           </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Students */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users size={64} className="text-blue-600" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Active Students</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold text-slate-900">142</h3>
            <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded flex items-center">
              <TrendingUp size={12} className="mr-1" /> +4.2%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 mt-4 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '85%' }}></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">85% attendance rate this week</p>
        </div>

        {/* Engagement Index */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp size={64} className="text-purple-600" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Engagement Index</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold text-slate-900">8.4<span className="text-lg text-slate-400 font-normal">/10</span></h3>
            <span className="text-purple-600 text-xs font-bold bg-purple-50 px-2 py-1 rounded">High</span>
          </div>
          <div className="flex gap-1 mt-4">
             {[1,2,3,4,5].map(i => (
                 <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 4 ? 'bg-purple-500' : 'bg-slate-200'}`}></div>
             ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">Top quartile for department</p>
        </div>

        {/* Support Opportunities */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group cursor-pointer hover:border-blue-400 transition-colors">
          <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <AlertTriangle size={64} className="text-amber-500" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Support Opportunities</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold text-slate-900">{atRiskStudents.length}</h3>
            <span className="text-amber-600 text-xs font-bold bg-amber-50 px-2 py-1 rounded">Actionable</span>
          </div>
          <p className="text-sm text-slate-400 mt-4 leading-relaxed">
             Students showing early signs of needing a check-in.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Risk Monitor Table (Large) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
                <h3 className="font-bold text-slate-900 text-lg">Student Risk Monitor</h3>
                <p className="text-xs text-slate-500">AI-detected early warning signals</p>
            </div>
            <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
          </div>

          <div className="divide-y divide-slate-100">
            {atRiskStudents.length > 0 ? (
                atRiskStudents.map(({ student, assessment }) => (
                    <div key={student.id} className="p-6 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <img src={student.avatar} className="w-12 h-12 rounded-full object-cover border border-slate-200" alt={student.name} />
                                <div>
                                    <h4 className="font-bold text-slate-900">{student.name}</h4>
                                    <p className="text-xs text-slate-500">{student.major} • Year {student.year}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(assessment.overallRisk)}`}>
                                {assessment.overallRisk} Risk
                            </span>
                        </div>

                        <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle size={14} className="text-amber-500" />
                                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">AI Analysis</span>
                            </div>
                            <p className="text-sm text-slate-600 italic">"{assessment.details}"</p>
                        </div>

                        <div className="mt-4 flex gap-3">
                            <button className="flex-1 py-2 px-4 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-blue-600 flex items-center justify-center gap-2 transition-colors">
                                <Mail size={16} /> Email Student
                            </button>
                            <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors">
                                <Video size={16} /> Schedule Meeting
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-12 text-center text-slate-500">
                    <CheckCircle size={48} className="mx-auto text-green-500 mb-4 opacity-50" />
                    <p>No at-risk students detected. Great job!</p>
                </div>
            )}
          </div>
        </div>

        {/* Sidebar: Upcoming & Tasks */}
        <div className="space-y-6">
             {/* Upcoming Classes */}
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-4">Today's Schedule</h3>
                <div className="space-y-4">
                    <div className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                        <div className="w-12 flex flex-col items-center justify-center bg-blue-50 text-blue-600 rounded-lg shrink-0">
                            <span className="text-xs font-bold uppercase">Oct</span>
                            <span className="text-lg font-bold">24</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">CS101: Intro to CS</h4>
                            <p className="text-xs text-slate-500 mt-0.5">10:00 AM • Lecture Hall B</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                        <div className="w-12 flex flex-col items-center justify-center bg-purple-50 text-purple-600 rounded-lg shrink-0">
                            <span className="text-xs font-bold uppercase">Oct</span>
                            <span className="text-lg font-bold">24</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">CS202: Algorithms</h4>
                            <p className="text-xs text-slate-500 mt-0.5">2:00 PM • Lab 304</p>
                        </div>
                    </div>
                </div>
             </div>

             {/* Privacy Box */}
             <div className="bg-slate-900 rounded-xl shadow-lg p-6 relative overflow-hidden text-white">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>

                <h3 className="font-bold text-lg mb-2 relative z-10">Anonymous Box</h3>
                <div className="flex items-baseline gap-2 mb-4 relative z-10">
                    <span className="text-3xl font-bold">3</span>
                    <span className="text-sm text-slate-400">New messages</span>
                </div>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed relative z-10">
                    Students can ask questions or share concerns without revealing their identity.
                </p>
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors relative z-10">
                    View Inbox
                </button>
             </div>
        </div>

      </div>
    </div>
  );
};

export default FacultyDashboard;
