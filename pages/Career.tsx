import React from 'react';
import { careerRoadmap } from '../mockData';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { FileText, Briefcase, CheckSquare, Target } from 'lucide-react';

const skillData = [
  { subject: 'Coding', A: 120, fullMark: 150 },
  { subject: 'System Design', A: 60, fullMark: 150 },
  { subject: 'Communication', A: 130, fullMark: 150 },
  { subject: 'Aptitude', A: 90, fullMark: 150 },
  { subject: 'Frameworks', A: 85, fullMark: 150 },
  { subject: 'Projects', A: 100, fullMark: 150 },
];

const Career: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Career & Placement Co-Pilot</h2>
          <p className="text-slate-500">AI-driven guidance for your dream job.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <FileText size={18} />
          Upload Resume
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Analysis */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-slate-800 mb-2 w-full text-left">Skill Radar</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="My Skills" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800 w-full">
            <strong>AI Tip:</strong> Your System Design score is low. Consider the "Scalable Architectures" elective next semester.
          </div>
        </div>

        {/* Roadmap */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Personalized Roadmap</h3>
          <div className="space-y-6">
            {careerRoadmap.map((step) => (
              <div key={step.id} className="flex items-start gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center border-2 
                    ${step.completed ? 'bg-green-100 border-green-500 text-green-600' : 'bg-white border-slate-300 text-slate-300'}
                  `}>
                    {step.completed ? <CheckSquare size={16} /> : <Target size={16} />}
                  </div>
                  {step.id !== '4' && <div className="w-0.5 h-10 bg-slate-200 mt-2"></div>}
                </div>
                <div className="pb-6">
                  <h4 className={`font-medium ${step.completed ? 'text-slate-800 line-through' : 'text-slate-800'}`}>
                    {step.title}
                  </h4>
                  <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded uppercase tracking-wider">
                    {step.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preparation Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <Briefcase size={20} />
            </div>
            <h3 className="font-semibold text-slate-800">Mock Interviews (AI)</h3>
          </div>
          <p className="text-sm text-slate-500 mb-4">Practice text-based behavioral and technical interviews with instant feedback.</p>
          <button className="w-full py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
            Start Session
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
              <FileText size={20} />
            </div>
            <h3 className="font-semibold text-slate-800">Resume Improver</h3>
          </div>
          <p className="text-sm text-slate-500 mb-4">Get line-by-line suggestions to beat the ATS and impress recruiters.</p>
          <button className="w-full py-2 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors">
            Analyze Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default Career;
