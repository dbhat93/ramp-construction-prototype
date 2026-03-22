import { AlertCircle, Download, RefreshCw } from 'lucide-react';

const items = [
  { type: 'unmatched', label: '12 unmatched transactions', desc: 'Transactions without cost codes or project assignments', icon: AlertCircle, color: 'text-amber-600 bg-amber-50' },
  { type: 'missing', label: '8 missing cost codes', desc: 'Transactions auto-coded by AI — pending controller review', icon: RefreshCw, color: 'text-blue-600 bg-blue-50' },
  { type: 'export', label: '17 items ready to export', desc: 'Approved transactions ready to download as CSV for your ERP', icon: Download, color: 'text-emerald-600 bg-emerald-50' },
];

export default function AccountingPage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold text-ramp-text">Accounting</h1>
        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">37</span>
      </div>
      <p className="text-sm text-gray-500 mb-6">37 items need review</p>

      <div className="space-y-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="bg-white border border-ramp-border rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${item.color} shrink-0`}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-ramp-text">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-gray-50 border border-ramp-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-ramp-text mb-3">Export</h3>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-ramp-border rounded-lg px-4 py-2 text-sm font-medium text-ramp-text hover:bg-gray-50 transition-colors">
            <Download size={14} />
            Export to CSV
          </button>
          <button className="flex items-center gap-2 bg-white border border-ramp-border rounded-lg px-4 py-2 text-sm font-medium text-ramp-text hover:bg-gray-50 transition-colors">
            <Download size={14} />
            Export for Sage 300 CRE
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">Sage 300 CRE direct integration coming October 2026</p>
      </div>
    </div>
  );
}
