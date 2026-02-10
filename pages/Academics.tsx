import React from 'react';
import { currentUser, riskAssessments } from '../mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AlertTriangle, TrendingUp } from 'lucide-react';

const Academics: React.FC = () => {
  const risk = riskAssessments[currentUser.id];

  // Mock data derived for the chart since we don't have granular grade history in the new schema yet
  const academicMetrics = [
    { subject: 'CS101', grade: 92, attendance: 98 },
    { subject: 'CS202', grade: 88, attendance: 95 },
    { subject: 'Math 201', grade: 78, attendance: 85 },
    { subject: 'Ethics', grade: 95, attendance: 100 },
  ];

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
          <div className="p-3 bg-white rounded-full shadow-sm text-blue-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">AI Co-Pilot Insights</h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600">Support Level Needed:</span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  risk?.overallRisk === 'Low' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {risk?.overallRisk || 'Unknown'}
                </span>
              </div>
              <p className="text-sm text-slate-700 italic">
                "{risk?.details || 'No data available.'}"
              </p>
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

export default Academics;
