import React from 'react';
import { academicMetrics, dropoutRiskAnalysis } from '../mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AlertTriangle, BookOpen, Check } from 'lucide-react';

const Academics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Academic Monitoring</h2>
          <p className="text-slate-500">Track your performance and engagement.</p>
        </div>
      </div>

      {/* AI Risk Analysis - Supportive Wording */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <BrainCircuitIcon />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">AI Co-Pilot Insights</h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600">Support Level Needed:</span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  dropoutRiskAnalysis.level === 'Low' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {dropoutRiskAnalysis.level}
                </span>
              </div>
              <p className="text-sm text-slate-700 italic">
                "{dropoutRiskAnalysis.supportAction}"
              </p>
              <div className="mt-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Factors (Explainable AI):</h4>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                  {dropoutRiskAnalysis.factors.map((factor, idx) => (
                    <li key={idx}>{factor}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grades Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Current Grades (%)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={academicMetrics} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="subject" type="category" width={100} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="grade" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance & Engagement */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Attendance & LMS Engagement</h3>
          <div className="space-y-6">
            {academicMetrics.map((metric, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">{metric.subject}</span>
                  <span className={`${metric.attendance < 85 ? 'text-red-500 font-bold' : 'text-slate-500'}`}>
                    {metric.attendance}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${metric.attendance < 85 ? 'bg-red-500' : 'bg-teal-500'}`} 
                    style={{ width: `${metric.attendance}%` }}
                  ></div>
                </div>
                {metric.attendance < 85 && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertTriangle size={12} /> Low attendance warning
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Icon
const BrainCircuitIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
    <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
    <path d="M6 18a4 4 0 0 1-1.937-3.066" />
    <path d="M17.937 14.934A4 4 0 0 1 16 18" />
  </svg>
);

export default Academics;
