import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const tabs = ['All', 'Reimbursements'];

const expenses = [
  { vendor: 'Home Depot', amount: '$347.82', date: 'Mar 20', submissionDate: 'Mar 20', spentFrom: 'Oscar Martinez ****4521', receipt: true, memo: 'Concrete mix — Sunset Heights' },
  { vendor: 'Sunbelt Rentals', amount: '$2,800.00', date: 'Mar 19', submissionDate: '—', spentFrom: 'Stanley Hudson ****7832', receipt: false, memo: 'Excavator rental — Sunset Heights' },
  { vendor: 'Ferguson Plumbing', amount: '$1,245.00', date: 'Mar 20', submissionDate: 'Mar 20', spentFrom: 'Oscar Martinez ****4521', receipt: true, memo: 'Pipe fittings — Plumbing rough-in' },
  { vendor: 'Shell Gas', amount: '$89.50', date: 'Mar 19', submissionDate: 'Mar 19', spentFrom: 'James Halpert ****9901', receipt: true, memo: 'Fleet fuel — Harbor Bridge' },
  { vendor: 'ABC Supply', amount: '$4,230.00', date: 'Mar 18', submissionDate: 'Mar 18', spentFrom: 'Oscar Martinez ****4521', receipt: true, memo: 'Roofing materials — Sunset Heights' },
];

export default function ExpensesPage() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-ramp-text mb-6">Expenses</h1>

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

      <div className="border border-ramp-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-ramp-border">
              {['Spent on', 'Amount', 'Date', 'Submission date', 'Spent from', 'Receipt', 'Memo'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ramp-border">
            {expenses.map((e, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-ramp-text">{e.vendor}</td>
                <td className="px-4 py-3 text-sm font-medium text-ramp-text">{e.amount}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{e.date}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{e.submissionDate}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{e.spentFrom}</td>
                <td className="px-4 py-3">
                  {e.receipt ? (
                    <CheckCircle size={16} className="text-emerald-500" />
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      <AlertCircle size={12} /> Missing
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 max-w-[200px] truncate">{e.memo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
