import React, { useEffect, useState } from 'react';
import { currentUser, dropoutRiskAnalysis } from '../mockData';
import { TrendingUp, AlertCircle, CheckCircle, Activity, BrainCircuit, Sparkles, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { getQuickInsight } from '../services/gemini';

const Dashboard: React.FC = () => {
  const [dailyTip, setDailyTip] = useState<string>('');
  const [loadingTip, setLoadingTip] = useState(true);

  useEffect(() => {
    const fetchTip = async () => {
      const tip = await getQuickInsight();
      setDailyTip(tip);
      setLoadingTip(false);
    };
    fetchTip();
  }, []);

  const riskColor = dropoutRiskAnalysis.level === 'Low' ? 'text-green-600' : 'text-amber-600';
  const riskBg = dropoutRiskAnalysis.level === 'Low' ? 'bg-green-100' : 'bg-amber-100';

  const mockActivityData = [
    { day: 'M', hours: 4 },
    { day: 'T', hours: 6 },
    { day: 'W', hours: 5 },
    { day: 'T', hours: 8 },
    { day: 'F', hours: 3 },
    { day: 'S', hours: 2 },
    { day: 'S', hours: 4 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Welcome back, {currentUser.name} 👋</h2>
          <p className="text-slate-500 mt-1">Here is your daily snapshot. You are on track for a great semester.</p>
        </div>
        <div className="flex items-center gap-3">
           {/* Quick AI Tip Widget */}
           <div className="hidden lg:flex items-center gap-3 bg-gradient-to-r from-violet-50 to-fuchsia-50 px-4 py-2 rounded-lg border border-violet-100 max-w-md">
              <div className="p-1.5 bg-white rounded-full text-violet-600 shadow-sm shrink-0">
                  <Zap size={16} fill="currentColor" />
              </div>
              <div>
                  <p className="text-[10px] font-bold text-violet-800 uppercase tracking-wide">Daily AI Insight</p>
                  <p className="text-xs text-slate-700 italic truncate">
                      {loadingTip ? "Generating..." : `"${dailyTip}"`}
                  </p>
              </div>
           </div>

          <div className="text-right hidden md:block border-l pl-4 border-slate-100">
            <p className="text-sm font-medium text-slate-900">{currentUser.major}</p>
            <p className="text-xs text-slate-500">{currentUser.university}</p>
          </div>
          <img src={currentUser.avatar} alt="Profile" className="w-12 h-12 rounded-full border-2 border-slate-200" />
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Support/Risk Indicator */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-lg ${riskBg}`}>
              <Activity className={riskColor} size={24} />
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${riskBg} ${riskColor}`}>
              {dropoutRiskAnalysis.level} Support Needed
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Academic Health</h3>
          <p className="text-slate-800 text-lg font-semibold mt-1">Stable & Strong</p>
          <p className="text-xs text-slate-400 mt-2">Based on attendance & grades</p>
        </div>

        {/* Placement Readiness */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-600">
              Score: 72/100
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Placement Readiness</h3>
          <p className="text-slate-800 text-lg font-semibold mt-1">Intermediate</p>
          <p className="text-xs text-slate-400 mt-2">Resume optimization suggested</p>
        </div>

        {/* DSA Progress */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-purple-100">
              <BrainCircuit className="text-purple-600" size={24} />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-purple-100 text-purple-600">
              12 Day Streak
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Coding Practice</h3>
          <p className="text-slate-800 text-lg font-semibold mt-1">145 Problems</p>
          <p className="text-xs text-slate-400 mt-2">Top topic: Arrays (90%)</p>
        </div>

        {/* Wellness Check */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-teal-100">
              <CheckCircle className="text-teal-600" size={24} />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-teal-100 text-teal-600">
              Last check: Today
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Mental Well-being</h3>
          <p className="text-slate-800 text-lg font-semibold mt-1">Feeling Good</p>
          <p className="text-xs text-slate-400 mt-2">Keep up the sleep schedule</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Study Activity Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Weekly Study Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockActivityData}>
                <Line type="monotone" dataKey="hours" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Co-Pilot Suggestions</h3>
          <div className="space-y-3">
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex gap-3">
              <AlertCircle className="text-amber-500 shrink-0" size={20} />
              <div>
                <p className="text-sm font-medium text-amber-900">Linear Algebra</p>
                <p className="text-xs text-amber-700">Attendance dropped below 85%. Review lecture notes.</p>
              </div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex gap-3">
              <TrendingUp className="text-blue-500 shrink-0" size={20} />
              <div>
                <p className="text-sm font-medium text-blue-900">Career Fair Prep</p>
                <p className="text-xs text-blue-700">Update resume with new "System Design" skills.</p>
              </div>
            </div>
            <div className="p-3 bg-teal-50 border border-teal-100 rounded-lg flex gap-3">
              <Activity className="text-teal-500 shrink-0" size={20} />
              <div>
                <p className="text-sm font-medium text-teal-900">Budget Alert</p>
                <p className="text-xs text-teal-700">You're 80% through your "Food" budget for the month.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
