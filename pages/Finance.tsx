import React from 'react';
import { spendingData } from '../mockData';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, PiggyBank, AlertOctagon } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Finance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Personal Finance Coach</h2>
          <p className="text-slate-500">Manage your student budget safely.</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <div className="flex gap-3">
          <AlertOctagon className="text-blue-500 shrink-0" />
          <p className="text-sm text-blue-900">
            <strong>Educational Only:</strong> This tool is for tracking and awareness. It does not provide professional financial advice or facilitate real stock trading.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4 text-slate-500">
            <DollarSign size={20} />
            <span className="font-medium">Monthly Budget</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">$1,200.00</p>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Spent: $730</span>
              <span>Remaining: $470</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4 text-slate-500">
            <PiggyBank size={20} />
            <span className="font-medium">Savings Goal</span>
          </div>
          <p className="text-lg font-medium text-slate-800">Laptop Fund</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">$450 <span className="text-sm text-slate-400 font-normal">/ $1200</span></p>
          <p className="text-xs text-green-600 mt-2">+ $50 saved this month!</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
          <h3 className="font-semibold text-slate-800">Financial Tip</h3>
          <p className="text-sm text-slate-500 mt-2 italic">"Using student discounts on software and transport can save you up to 15% monthly."</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Expense Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs text-slate-500 mt-2">
            {spendingData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Transactions</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border-b border-slate-50">
              <div>
                <p className="font-medium text-slate-800">Campus Bookstore</p>
                <p className="text-xs text-slate-500">Education</p>
              </div>
              <span className="font-bold text-slate-800">-$45.00</span>
            </div>
            <div className="flex justify-between items-center p-3 border-b border-slate-50">
              <div>
                <p className="font-medium text-slate-800">Coffee Shop</p>
                <p className="text-xs text-slate-500">Food</p>
              </div>
              <span className="font-bold text-slate-800">-$6.50</span>
            </div>
            <div className="flex justify-between items-center p-3 border-b border-slate-50">
              <div>
                <p className="font-medium text-slate-800">Tutor Payment</p>
                <p className="text-xs text-slate-500">Income</p>
              </div>
              <span className="font-bold text-green-600">+$60.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
