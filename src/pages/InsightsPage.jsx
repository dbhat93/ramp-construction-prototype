import { useState } from 'react';

const tabs = ['Spending', 'Compliance', 'Process'];

const spendingByPerson = [
  { name: 'Oscar Martinez', amount: '$18,420' },
  { name: 'Stanley Hudson', amount: '$14,890' },
  { name: 'Michael Scott', amount: '$12,310' },
];

const spendingByCategory = [
  { name: 'Materials', amount: '$142K' },
  { name: 'Equipment Rental', amount: '$98K' },
  { name: 'Subcontractors', amount: '$67K' },
];

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState('Spending');

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-ramp-text mb-6">Reporting</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-ramp-border mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-gray-900 text-ramp-text'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-ramp-border rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Total company spending</p>
          <p className="text-2xl font-bold text-ramp-text">$690K</p>
          <p className="text-xs text-gray-400 mt-1">This month across all projects</p>
        </div>
        <div className="bg-white border border-ramp-border rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-3">Spending by person</p>
          <div className="space-y-2">
            {spendingByPerson.map((p) => (
              <div key={p.name} className="flex justify-between text-sm">
                <span className="text-gray-700">{p.name}</span>
                <span className="font-medium text-ramp-text">{p.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-ramp-border rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-3">Spending by category</p>
          <div className="space-y-2">
            {spendingByCategory.map((c) => (
              <div key={c.name} className="flex justify-between text-sm">
                <span className="text-gray-700">{c.name}</span>
                <span className="font-medium text-ramp-text">{c.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
