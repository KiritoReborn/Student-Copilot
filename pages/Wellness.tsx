import React, { useState, useEffect } from 'react';
import { Heart, Smile, Frown, Meh, Wind, Info, Sparkles, Calendar, Book, Droplets, Moon, Battery, Video, Clock } from 'lucide-react';
import { getJournalingResponse, analyzeHolisticWellbeing } from '../services/gemini';
import { db, counselors } from '../services/database';
import { Appointment } from '../types';

const Wellness: React.FC = () => {
  // Global Data State
  const [holisticAnalysis, setHolisticAnalysis] = useState<{ status: string; advice: string; color: string } | null>(null);
  
  // Check-in State
  const [mood, setMood] = useState<number>(3);
  const [sleep, setSleep] = useState<number>(7);
  const [social, setSocial] = useState<number>(50);
  const [checkinComplete, setCheckinComplete] = useState(false);

  // Journaling State
  const [journalEntry, setJournalEntry] = useState('');
  const [journalResponse, setJournalResponse] = useState('');
  const [isJournaling, setIsJournaling] = useState(false);

  // Counseling State
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedCounselor, setSelectedCounselor] = useState<string | null>(null);

  useEffect(() => {
    // On load, fetch global data and run AI analysis
    const loadGlobalWellbeing = async () => {
      const data = db.getStudentHolisticData();
      const analysis = await analyzeHolisticWellbeing(data);
      setHolisticAnalysis(analysis);
      setAppointments(db.getAppointments());
    };
    loadGlobalWellbeing();
  }, []);

  const handleCheckin = () => {
    db.addWellnessLog({
      date: new Date().toISOString(),
      mood,
      sleepHours: sleep,
      socialBattery: social,
      waterIntake: 0
    });
    setCheckinComplete(true);
  };

  const handleJournalSubmit = async () => {
    if (!journalEntry.trim()) return;
    setIsJournaling(true);
    const response = await getJournalingResponse(journalEntry);
    setJournalResponse(response);
    setIsJournaling(false);
  };

  const handleBookAppointment = (counselorId: string, slot: string) => {
    const appt = db.bookAppointment(counselorId, slot);
    setAppointments([...appointments, appt]);
    setSelectedCounselor(null);
    alert(`Appointment Confirmed! Check your email for the Google Meet link.`);
  };

  const getColorClass = (color?: string) => {
    switch(color) {
      case 'green': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'yellow': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'orange': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'red': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Student Well-being Center</h2>
          <p className="text-slate-500">Holistic support powered by your data.</p>
        </div>
      </div>

       {/* AI Global Analysis Banner */}
       {holisticAnalysis ? (
        <div className={`p-6 rounded-xl border flex items-start gap-4 animate-fade-in ${getColorClass(holisticAnalysis.color)}`}>
          <div className="p-3 bg-white rounded-full shadow-sm shrink-0">
            <Sparkles className="text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg">Current Status: {holisticAnalysis.status}</h3>
              <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 bg-white/50 rounded-full font-bold">
                AI Detected based on Grades + Sleep + Activity
              </span>
            </div>
            <p className="text-sm font-medium opacity-90 leading-relaxed">
              "{holisticAnalysis.advice}"
            </p>
          </div>
        </div>
       ) : (
         <div className="h-24 bg-slate-100 rounded-xl animate-pulse"></div>
       )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Smart Check-in */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <Battery className="text-blue-500" /> Daily Check-in
            </h3>
            {checkinComplete && <span className="text-green-600 text-sm font-bold flex items-center gap-1"><Sparkles size={14}/> Saved</span>}
          </div>

          {!checkinComplete ? (
            <div className="space-y-6">
              {/* Mood */}
              <div>
                <label className="text-sm text-slate-500 mb-3 block">How are you feeling?</label>
                <div className="flex justify-between gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      onClick={() => setMood(val)}
                      className={`flex-1 p-3 rounded-lg border transition-all ${mood === val ? 'bg-blue-50 border-blue-500 text-blue-600 ring-2 ring-blue-100' : 'border-slate-100 hover:bg-slate-50'}`}
                    >
                       {val === 1 ? <Frown size={24} className="mx-auto" /> : 
                        val === 2 ? <Meh size={24} className="mx-auto" /> : 
                        val === 3 ? <Meh size={24} className="mx-auto" /> : 
                        val === 4 ? <Smile size={24} className="mx-auto" /> : 
                        <Heart size={24} className="mx-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sleep Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-slate-500 flex items-center gap-2"><Moon size={16} /> Last Night's Sleep</label>
                  <span className="font-bold text-blue-600">{sleep} hrs</span>
                </div>
                <input 
                  type="range" min="0" max="12" step="0.5" 
                  value={sleep} onChange={(e) => setSleep(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

               {/* Social Battery */}
               <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-slate-500 flex items-center gap-2"><Battery size={16} /> Social Battery</label>
                  <span className="font-bold text-blue-600">{social}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" 
                  value={social} onChange={(e) => setSocial(parseInt(e.target.value))}
                  className="w-full accent-green-500 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <button 
                onClick={handleCheckin}
                className="w-full py-3 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
              >
                Log Day
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smile className="text-green-600" size={32} />
              </div>
              <h4 className="font-bold text-slate-800">Check-in Complete!</h4>
              <p className="text-slate-500 text-sm mt-1">Your data helps us personalize your support.</p>
              <button onClick={() => setCheckinComplete(false)} className="mt-4 text-blue-600 text-sm hover:underline">Edit Entry</button>
            </div>
          )}
        </div>

        {/* AI Journal */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Book className="text-purple-600" />
            <h3 className="font-semibold text-slate-800">AI Reflective Journal</h3>
          </div>
          
          <div className="flex-1 space-y-4">
            {!journalResponse ? (
              <>
                <textarea 
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="Write whatever is on your mind. I'm here to listen without judgment..."
                  className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <button 
                  onClick={handleJournalSubmit}
                  disabled={isJournaling || !journalEntry}
                  className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50"
                >
                  {isJournaling ? 'Reflecting...' : 'Reflect with AI'}
                </button>
              </>
            ) : (
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 animate-fade-in">
                <p className="text-purple-900 text-sm leading-relaxed italic">"{journalResponse}"</p>
                <button 
                  onClick={() => { setJournalResponse(''); setJournalEntry(''); }}
                  className="mt-3 text-xs text-purple-700 font-bold hover:underline"
                >
                  New Entry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Counseling & Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Appointments Panel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Video className="text-teal-600" /> Virtual Counseling
              </h3>
           </div>

           {/* List of Counselors */}
           <div className="space-y-4">
              {counselors.map(c => (
                <div key={c.id} className="flex flex-col md:flex-row items-center gap-4 p-4 border border-slate-100 rounded-xl hover:border-blue-200 transition-colors">
                  <img src={c.avatar} className="w-14 h-14 rounded-full" alt={c.name} />
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="font-bold text-slate-800">{c.name}</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">{c.specialty}</p>
                  </div>
                  
                  {selectedCounselor === c.id ? (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {c.availableSlots.map(slot => (
                        <button 
                          key={slot}
                          onClick={() => handleBookAppointment(c.id, slot)}
                          className="px-3 py-1 bg-teal-600 text-white text-xs rounded-full hover:bg-teal-700"
                        >
                          Book {slot}
                        </button>
                      ))}
                      <button onClick={() => setSelectedCounselor(null)} className="text-xs text-slate-400">Cancel</button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setSelectedCounselor(c.id)}
                      className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium"
                    >
                      View Availability
                    </button>
                  )}
                </div>
              ))}
           </div>

           {/* Upcoming Appointments */}
           {appointments.length > 0 && (
             <div className="mt-8">
               <h4 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">Your Upcoming Sessions</h4>
               <div className="space-y-2">
                 {appointments.map(appt => (
                   <div key={appt.id} className="flex items-center justify-between p-3 bg-teal-50 border border-teal-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-full text-teal-600"><Calendar size={16} /></div>
                        <div>
                          <p className="text-sm font-bold text-teal-900">{appt.time} - {appt.date}</p>
                          <p className="text-xs text-teal-700">Virtual Session via Google Meet</p>
                        </div>
                      </div>
                      <a 
                        href={appt.meetLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-white text-teal-700 text-xs font-bold rounded shadow-sm hover:bg-teal-50 border border-teal-100"
                      >
                        Join Call
                      </a>
                   </div>
                 ))}
               </div>
             </div>
           )}
        </div>

        {/* Quick Tools */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
          <h3 className="font-semibold text-slate-800">Quick Tools</h3>
          
          <div className="p-4 bg-sky-50 rounded-xl border border-sky-100">
            <div className="flex items-center gap-2 mb-2 text-sky-800">
              <Wind size={20} />
              <span className="font-bold">4-7-8 Breathing</span>
            </div>
            <p className="text-xs text-sky-700 mb-3">
              Inhale for 4s, hold for 7s, exhale for 8s. Reduces anxiety immediately.
            </p>
            <button className="w-full py-2 bg-white text-sky-600 border border-sky-200 rounded-lg text-sm font-bold hover:bg-sky-50">
              Start Guide
            </button>
          </div>

          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-2 mb-2 text-indigo-800">
              <Clock size={20} />
              <span className="font-bold">Focus Timer</span>
            </div>
            <p className="text-xs text-indigo-700 mb-3">
              25 minutes of work, 5 minutes of rest (Pomodoro).
            </p>
            <button className="w-full py-2 bg-white text-indigo-600 border border-indigo-200 rounded-lg text-sm font-bold hover:bg-indigo-50">
              Open Timer
            </button>
          </div>
          
           {/* Disclaimer */}
          <div className="mt-4 flex gap-2 items-start opacity-70">
            <Info className="text-slate-400 shrink-0" size={14} />
            <p className="text-[10px] text-slate-500">
              If you are in immediate danger, please call emergency services or the campus helpline at 555-0199 immediately.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Wellness;
