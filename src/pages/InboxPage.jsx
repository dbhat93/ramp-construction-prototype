import { Inbox, CheckCircle, AlertCircle, Receipt } from 'lucide-react';

const items = [
  { type: 'reimbursement', label: 'Review reimbursement', person: 'Oscar Martinez', amount: '$410.15', icon: Receipt, color: 'text-blue-600 bg-blue-50' },
  { type: 'bill', label: 'Approve bill', person: 'PricewaterhouseCoopers', amount: '$15,000', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
  { type: 'receipt', label: 'Missing receipt', person: 'Stanley Hudson — Sunbelt Rentals', amount: '$2,800', icon: AlertCircle, color: 'text-amber-600 bg-amber-50' },
  { type: 'bill', label: 'Approve bill', person: 'United Rentals', amount: '$3,800', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
  { type: 'receipt', label: 'Missing receipt', person: 'Oscar Martinez — Home Depot', amount: '$347.82', icon: AlertCircle, color: 'text-amber-600 bg-amber-50' },
  { type: 'reimbursement', label: 'Review reimbursement', person: 'James Halpert', amount: '$156.00', icon: Receipt, color: 'text-blue-600 bg-blue-50' },
  { type: 'bill', label: 'Approve PO', person: 'SafetyFirst Supply', amount: '$890', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
];

export default function InboxPage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold text-ramp-text">Inbox</h1>
        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">7</span>
      </div>
      <p className="text-sm text-gray-500 mb-6">7 items need your attention</p>

      <div className="border border-ramp-border rounded-xl overflow-hidden">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${i < items.length - 1 ? 'border-b border-ramp-border' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.color}`}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-ramp-text">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.person}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-ramp-text">{item.amount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
