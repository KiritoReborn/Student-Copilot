import React, { useState } from 'react';
import { Shield, Eye, Lock, Database } from 'lucide-react';

const Settings: React.FC = () => {
  const [dataSharing, setDataSharing] = useState({
    academics: true,
    activity: true,
    location: false,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Settings & Trust</h2>
          <p className="text-slate-500">Manage your data and understand our AI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">Data & Consent Management</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800">Academic Data Analysis</p>
                <p className="text-xs text-slate-500">Allows AI to analyze grades for risk support.</p>
              </div>
              <input 
                type="checkbox" 
                checked={dataSharing.academics}
                onChange={() => setDataSharing({...dataSharing, academics: !dataSharing.academics})}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800">Activity Patterns</p>
                <p className="text-xs text-slate-500">Allows AI to suggest study/break times.</p>
              </div>
              <input 
                type="checkbox" 
                checked={dataSharing.activity}
                onChange={() => setDataSharing({...dataSharing, activity: !dataSharing.activity})}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800">Location Services</p>
                <p className="text-xs text-slate-500">For campus navigation (Not stored permanently).</p>
              </div>
              <input 
                type="checkbox" 
                checked={dataSharing.location}
                onChange={() => setDataSharing({...dataSharing, location: !dataSharing.location})}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <button className="text-red-600 text-sm font-medium hover:underline">
              Delete My Data & Opt-out
            </button>
          </div>
        </div>

        {/* AI Transparency */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <Eye className="text-purple-600" />
            <h3 className="text-lg font-semibold text-slate-800">AI Transparency Dashboard</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-800 text-sm flex items-center gap-2">
                <Database size={16} /> Why am I seeing specific job tips?
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Our algorithm matches your verified skills (from assignments & coding practice) with current job market descriptions. We do not use demographic data for these recommendations.
              </p>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-800 text-sm flex items-center gap-2">
                <Lock size={16} /> Who sees my "Risk" status?
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Only your assigned Academic Advisor and the Student Support Head. Professors do not see risk labels, only attendance metrics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
