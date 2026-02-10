import React, { useState } from 'react';
import { initialProblems, leaderboard, availableBadges, currentUser } from '../mockData';
import { Terminal, Code, Trophy, Flame, Lock, Unlock, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Coding: React.FC = () => {
  const [problems, setProblems] = useState(initialProblems);
  const [xp, setXp] = useState(currentUser.xp);
  const [streak, setStreak] = useState(12);

  const handleSolve = (id: string) => {
    setProblems(problems.map(p => {
      if (p.id === id && !p.solved) {
        // Award XP logic
        const xpGain = p.difficulty === 'Easy' ? 10 : p.difficulty === 'Medium' ? 20 : 50;
        setXp(prev => prev + xpGain);
        setStreak(prev => prev + 1); // Mock streak increment
        return { ...p, solved: true };
      }
      return p;
    }));
  };

  const topicStrength = [
    { topic: 'Arrays', score: 90 },
    { topic: 'Trees', score: 65 },
    { topic: 'DP', score: 40 },
    { topic: 'Graphs', score: 55 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">DSA & Coding Practice</h2>
          <p className="text-slate-500">Gamified tracking to master algorithms.</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
            <Trophy size={18} />
            {xp} XP
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <Code size={18} />
              <span className="text-sm font-medium">Problems Solved</span>
            </div>
            <p className="text-4xl font-bold">{problems.filter(p => p.solved).length}</p>
            <div className="mt-4 flex gap-2">
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                {problems.filter(p => p.solved && p.difficulty === 'Easy').length} Easy
              </span>
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                {problems.filter(p => p.solved && p.difficulty === 'Medium').length} Med
              </span>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute -bottom-4 -right-4 text-slate-700 opacity-20">
            <Terminal size={120} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-2 text-orange-500">
            <Flame size={18} />
            <span className="text-sm font-medium">Current Streak</span>
          </div>
          <p className="text-4xl font-bold text-slate-800">{streak} <span className="text-lg font-normal text-slate-500">Days</span></p>
          <p className="text-sm text-slate-400 mt-2">Daily Goal: Solve 1 more to keep it!</p>
        </div>

        {/* Leaderboard */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <div className="flex items-center gap-2 mb-4 text-purple-600">
            <Trophy size={18} />
            <span className="text-sm font-medium">Class Leaderboard</span>
          </div>
          <div className="space-y-3">
            {[...leaderboard].sort((a,b) => b.xp - a.xp).map((user, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <span className={`w-5 text-center font-bold ${idx === 0 ? 'text-yellow-500' : 'text-slate-400'}`}>{idx + 1}</span>
                        <img src={user.avatar} className="w-6 h-6 rounded-full" alt="av" />
                        <span className={user.name === currentUser.name ? 'font-bold text-slate-900' : 'text-slate-600'}>
                            {user.name}
                        </span>
                    </div>
                    <span className="font-mono text-slate-500">{user.xp} XP</span>
                </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Problems */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Daily Challenges</h3>
          <div className="space-y-3">
            {problems.map((prob) => (
              <div key={prob.id} className={`flex items-center justify-between p-4 rounded-lg border transition-all ${prob.solved ? 'bg-green-50 border-green-100' : 'bg-white border-slate-100 hover:border-blue-200'}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <p className={`font-medium ${prob.solved ? 'text-green-800' : 'text-slate-800'}`}>{prob.title}</p>
                    {prob.solved && <CheckCircle size={16} className="text-green-600" />}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">{prob.topic}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium 
                      ${prob.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
                        prob.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {prob.difficulty}
                    </span>
                  </div>
                </div>
                {!prob.solved ? (
                    <button 
                        onClick={() => handleSolve(prob.id)}
                        className="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Solve
                    </button>
                ) : (
                    <span className="text-sm font-bold text-green-600 px-4">+XP</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Achievements</h3>
          <div className="grid grid-cols-2 gap-3">
            {availableBadges.map((badge) => (
                <div key={badge.id} className={`p-3 rounded-xl border text-center flex flex-col items-center gap-2 ${badge.unlocked ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                        <p className="text-xs font-bold text-slate-800">{badge.name}</p>
                        <p className="text-[10px] text-slate-500 leading-tight mt-1">{badge.description}</p>
                    </div>
                    {!badge.unlocked && <Lock size={12} className="text-slate-400" />}
                </div>
            ))}
          </div>
        </div>
      </div>
      
        {/* Strength Analysis Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Topic Strength Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicStrength} layout="vertical">
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="topic" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="score" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
    </div>
  );
};

export default Coding;
