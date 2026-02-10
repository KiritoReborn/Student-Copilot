import React, { useState } from 'react';
import { useUser } from '../components/UserContext';
import { currentUser, riskAssessments } from '../mockData';
import {
  GraduationCap, TrendingUp, Code, ArrowRight, Activity,
  Smile, Meh, Frown, Wallet, MoreHorizontal, Briefcase,
  CheckSquare, Calendar, MapPin, Video
} from 'lucide-react';
import { getWellnessSupport } from '../services/gemini';

const StudentDashboard: React.FC = () => {
  const { user } = useUser();
  const [wellnessResponse, setWellnessResponse] = useState<string | null>(null);
  const [moodLoading, setMoodLoading] = useState(false);

  const handleMoodCheck = async (mood: string) => {
    setMoodLoading(true);
    const response = await getWellnessSupport(mood);
    setWellnessResponse(response);
    setMoodLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Good morning, {user.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-500 text-sm mt-1">Let's see how your journey is going today.</p>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                Semester 2
            </span>
            <span className="text-xs font-semibold px-3 py-1 bg-purple-50 text-purple-600 rounded-full border border-purple-100">
                Computer Science
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6">

        {/* 1. Academic Health (Larger card) */}
        <div className="col-span-1 md:col-span-2 xl:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl transition-all group-hover:bg-blue-600/10"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <GraduationCap size={24} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Academic Health</h2>
                <p className="text-slate-500 text-xs">Based on real-time performance</p>
              </div>
            </div>
            <button className="mt-3 md:mt-0 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
              View Transcript <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Stat 1 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between h-full">
              <span className="text-slate-500 text-sm font-medium mb-2">Overall GPA</span>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-800">3.8</span>
                <span className="text-emerald-500 text-sm font-medium mb-1.5 flex items-center">
                  <TrendingUp size={14} className="mr-1" /> +0.2
                </span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }}></div>
              </div>
              <p className="text-xs text-slate-400 mt-2">Excellent standing</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between h-full">
              <span className="text-slate-500 text-sm font-medium mb-2">Semester Progress</span>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-800">85%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-blue-600 mt-2 font-medium">Keep it up, you're on track!</p>
            </div>

            {/* Action/Upcoming */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col h-full">
              <span className="text-slate-500 text-sm font-medium mb-3">Next Major Deadline</span>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Code size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Algorithms Project</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Due in 3 days</p>
                </div>
              </div>
              <button className="mt-auto w-full py-1.5 text-xs font-medium text-slate-500 hover:text-blue-600 border border-slate-200 hover:border-blue-600 rounded-lg transition-all">
                See details
              </button>
            </div>
          </div>
        </div>

        {/* 2. Mental Well-being Check-in */}
        <div className="col-span-1 md:col-span-1 xl:col-span-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100 shadow-sm flex flex-col justify-center text-center">
          {!wellnessResponse ? (
            <>
                <div className="w-12 h-12 bg-white rounded-full mx-auto flex items-center justify-center text-indigo-500 mb-4 shadow-sm">
                    <Activity size={24} />
                </div>
                <h2 className="text-lg font-semibold text-slate-800 mb-1">How are you feeling?</h2>
                <p className="text-slate-500 text-sm mb-6">Take a moment to check in with yourself.</p>

                {moodLoading ? (
                    <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <div className="flex justify-center gap-3">
                        <button onClick={() => handleMoodCheck('Happy')} className="flex flex-col items-center gap-2 group">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 flex items-center justify-center transition-all shadow-sm group-hover:-translate-y-1">
                            <Smile className="text-slate-400 group-hover:text-emerald-600" />
                        </div>
                        <span className="text-xs font-medium text-slate-500 group-hover:text-emerald-600">Great</span>
                        </button>
                        <button onClick={() => handleMoodCheck('Neutral')} className="flex flex-col items-center gap-2 group">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 flex items-center justify-center transition-all shadow-sm group-hover:-translate-y-1">
                            <Meh className="text-slate-400 group-hover:text-blue-600" />
                        </div>
                        <span className="text-xs font-medium text-slate-500 group-hover:text-blue-600">Okay</span>
                        </button>
                        <button onClick={() => handleMoodCheck('Sad')} className="flex flex-col items-center gap-2 group">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 hover:border-orange-400 hover:bg-orange-50 flex items-center justify-center transition-all shadow-sm group-hover:-translate-y-1">
                            <Frown className="text-slate-400 group-hover:text-orange-600" />
                        </div>
                        <span className="text-xs font-medium text-slate-500 group-hover:text-orange-600">Stressed</span>
                        </button>
                    </div>
                )}
                <a href="#" className="mt-6 text-xs text-indigo-500 font-medium hover:underline">View wellness resources</a>
            </>
          ) : (
             <div className="animate-fade-in">
                <div className="w-12 h-12 bg-indigo-100 rounded-full mx-auto flex items-center justify-center text-indigo-600 mb-4">
                    <Activity size={24} />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Thank you for sharing</h3>
                <p className="text-sm text-slate-600 italic mb-4">"{wellnessResponse}"</p>
                <button
                    onClick={() => setWellnessResponse(null)}
                    className="text-xs font-bold text-indigo-600 hover:underline"
                >
                    Close
                </button>
             </div>
          )}
        </div>

        {/* 3. Finance Snapshot */}
        <div className="col-span-1 md:col-span-1 xl:col-span-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <Wallet size={20} />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">Finance</h2>
            </div>
            <button className="text-slate-400 hover:text-blue-600 transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="space-y-6 flex-1">
            <div>
              <p className="text-sm text-slate-500 mb-1">Weekly Budget Remaining</p>
              <h3 className="text-3xl font-bold text-slate-800">$124.50</h3>
              <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between text-xs mt-2 text-slate-400">
                <span>Spent: $175.50</span>
                <span>Total: $300.00</span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                    Lib
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">Book Fee</span>
                    <span className="text-xs text-slate-500">Due Tomorrow</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-800">$25.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Career Readiness */}
        <div className="col-span-1 md:col-span-1 xl:col-span-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <Briefcase size={20} />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">Career Readiness</h2>
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-purple-50 text-purple-600 rounded-md">Intermediate</span>
          </div>
          <p className="text-sm text-slate-500 mb-4">Complete these tasks to level up your profile for internships.</p>
          <div className="space-y-3 flex-1">
            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition-colors cursor-pointer group">
              <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500" />
              <div className="flex-1">
                <span className="text-sm font-medium text-slate-700 line-through decoration-slate-400 decoration-2 opacity-60">Update LinkedIn Profile</span>
              </div>
            </label>
            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition-colors cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500" />
              <div className="flex-1">
                <span className="text-sm font-medium text-slate-700">Upload new Resume</span>
                <p className="text-xs text-slate-500 mt-1">Suggested for Fall Career Fair</p>
              </div>
            </label>
          </div>
        </div>

        {/* 5. Upcoming Schedule */}
        <div className="col-span-1 md:col-span-2 xl:col-span-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Upcoming</h2>
            <a href="#" className="text-sm text-blue-600 font-medium hover:underline">View Calendar</a>
          </div>
          <div className="space-y-4">
            {/* Event 1 */}
            <div className="flex gap-4 group">
              <div className="flex flex-col items-center justify-center w-12 h-14 bg-slate-100 rounded-xl shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <span className="text-xs font-semibold text-slate-500 group-hover:text-blue-600/70">OCT</span>
                <span className="text-lg font-bold text-slate-800 group-hover:text-blue-600">24</span>
              </div>
              <div className="flex-1 py-1">
                <h4 className="text-sm font-semibold text-slate-800 mb-1">Study Group: Data Structures</h4>
                <div className="flex items-center text-xs text-slate-500 gap-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> 2:00 PM</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> Library 304</span>
                </div>
              </div>
            </div>
            {/* Event 2 */}
            <div className="flex gap-4 group">
              <div className="flex flex-col items-center justify-center w-12 h-14 bg-slate-100 rounded-xl shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <span className="text-xs font-semibold text-slate-500 group-hover:text-blue-600/70">OCT</span>
                <span className="text-lg font-bold text-slate-800 group-hover:text-blue-600">25</span>
              </div>
              <div className="flex-1 py-1">
                <h4 className="text-sm font-semibold text-slate-800 mb-1">Career Fair Prep Workshop</h4>
                <div className="flex items-center text-xs text-slate-500 gap-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> 11:00 AM</span>
                  <span className="flex items-center gap-1"><Video size={14} /> Zoom</span>
                </div>
              </div>
            </div>
            {/* Event 3 */}
            <div className="flex gap-4 group">
              <div className="flex flex-col items-center justify-center w-12 h-14 bg-slate-100 rounded-xl shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <span className="text-xs font-semibold text-slate-500 group-hover:text-blue-600/70">OCT</span>
                <span className="text-lg font-bold text-slate-800 group-hover:text-blue-600">28</span>
              </div>
              <div className="flex-1 py-1">
                <h4 className="text-sm font-semibold text-slate-800 mb-1">Mid-term: Web Development</h4>
                <div className="flex items-center text-xs text-slate-500 gap-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> 9:00 AM</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> Hall B</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Bottom Banner */}
        <div className="col-span-1 md:col-span-2 xl:col-span-12 relative overflow-hidden rounded-2xl h-48 group">
          <img
            alt="Students studying together"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600&h=400"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40 p-8 flex flex-col justify-center items-start">
            <span className="inline-block px-3 py-1 bg-blue-600/90 text-white text-xs font-semibold rounded-lg mb-3 backdrop-blur-sm">New Resource</span>
            <h2 className="text-2xl font-bold text-white mb-2 max-w-lg">Unlock your potential with free mentorship</h2>
            <p className="text-slate-200 mb-6 max-w-lg text-sm">Connect with alumni in your field for guidance, resume reviews, and interview prep.</p>
            <button className="bg-white text-slate-900 hover:bg-slate-100 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center gap-2">
              Find a Mentor <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
