import { useState } from 'react';

const tabs = ['Overview', 'Drafts', 'For approval', 'For payment', 'History'];

function StatusPill({ status }) {
  const styles = {
    'Missing info': 'bg-amber-50 text-amber-700 border-amber-200',
    'Pending approval': 'bg-blue-50 text-blue-700 border-blue-200',
    'Scheduled': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Paid': 'bg-gray-100 text-gray-600 border-gray-200',
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${styles[status] || styles['Paid']}`}>
      {status}
    </span>
  );
}

const bills = [
  { vendor: 'Ferguson Enterprises', owner: 'Michael Scott', status: 'Pending approval', amount: '$12,500.00', paymentDate: 'Mar 25', dueDate: 'Mar 28', invoiceDate: 'Mar 10', invoiceNum: 'FE-2026-4412' },
  { vendor: 'United Rentals', owner: 'Michael Scott', status: 'Scheduled', amount: '$3,800.00/mo', paymentDate: 'Apr 1', dueDate: 'Apr 1', invoiceDate: 'Mar 15', invoiceNum: 'UR-88291' },
  { vendor: 'ABC Supply', owner: 'Sarah Kim', status: 'Missing info', amount: '$4,230.00', paymentDate: '—', dueDate: 'Mar 30', invoiceDate: 'Mar 12', invoiceNum: 'ABC-7721' },
  { vendor: 'SafetyFirst', owner: 'Michael Scott', status: 'Pending approval', amount: '$890.00', paymentDate: '—', dueDate: 'Mar 31', invoiceDate: 'Mar 14', invoiceNum: 'SF-0092' },
  { vendor: 'Hilti Corporation', owner: 'Sarah Kim', status: 'Paid', amount: '$2,150.00', paymentDate: 'Mar 18', dueDate: 'Mar 20', invoiceDate: 'Mar 5', invoiceNum: 'HLT-33019' },
];

export default function BillPayPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-ramp-text mb-6">Bills</h1>

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
              {['Vendor / Owner', 'Status', 'Amount', 'Payment date', 'Due date', 'Invoice date', 'Invoice #'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ramp-border">
            {bills.map((b, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-ramp-text">{b.vendor}</p>
                  <p className="text-xs text-gray-500">{b.owner}</p>
                </td>
                <td className="px-4 py-3"><StatusPill status={b.status} /></td>
                <td className="px-4 py-3 text-sm font-medium text-ramp-text">{b.amount}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{b.paymentDate}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{b.dueDate}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{b.invoiceDate}</td>
                <td className="px-4 py-3 text-sm text-gray-500 font-mono">{b.invoiceNum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
