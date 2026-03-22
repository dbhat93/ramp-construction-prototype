import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects, transactions } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight, X, FileText, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';

function fmt(n) {
  return '$' + n.toLocaleString(undefined, { minimumFractionDigits: n % 1 ? 2 : 0 });
}

function AiCodedBadge({ status, t }) {
  if (status === 'auto')
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
        <CheckCircle size={12} /> {t('auto')}
      </span>
    );
  if (status === 'override')
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
        <RefreshCw size={12} /> {t('override')}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
      <AlertCircle size={12} /> {t('uncoded')}
    </span>
  );
}

function ReceiptBadge({ has, t }) {
  if (has)
    return (
      <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
        <CheckCircle size={14} />
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
      <AlertCircle size={12} /> {t('missing')}
    </span>
  );
}

function SlideOut({ txn, onClose, t }) {
  if (!txn) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-[420px] bg-white shadow-2xl border-l border-ramp-border animate-slide-in overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{t('transactionDetail')}</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
              <X size={18} />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-3xl font-bold text-gray-900">{fmt(txn.amount)}</p>
              <p className="text-sm text-gray-500 mt-1">{txn.vendor}</p>
            </div>

            <div className="border-t border-ramp-border pt-4 space-y-3">
              {[
                [t('date'), txn.date + ', 2026'],
                [t('employee'), txn.employee],
                [t('cardLabel'), `****${txn.cardLast4}`],
                [t('project'), txn.project],
                [t('costCode'), `${txn.costCode} - ${txn.costCodeDesc}`],
                [t('category'), txn.category],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="text-sm font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-ramp-border pt-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">{t('aiCoding')}</span>
                <AiCodedBadge status={txn.aiCoded} t={t} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{t('receipt')}</span>
                <ReceiptBadge has={txn.receipt} t={t} />
              </div>
            </div>

            {txn.receipt && (
              <div className="border-t border-ramp-border pt-4">
                <p className="text-sm text-gray-500 mb-2">{t('receipt')}</p>
                <div className="bg-gray-50 border border-ramp-border rounded-lg p-8 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <FileText size={32} className="mx-auto mb-2" />
                    <p className="text-xs">{t('receiptImage')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const project = projects.find((p) => p.id === id) || projects[0];
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [activeTab, setActiveTab] = useState('transactions');
  const pctSpent = Math.round((project.spent / project.budget) * 100);

  const tabs = [
    { key: 'transactions', label: t('transactionsTab') },
    { key: 'cost-breakdown', label: t('costBreakdownTab') },
    { key: 'team', label: t('teamTab') },
  ];

  const tableHeaders = [
    t('date'), t('employee'), t('vendor'), t('amount'), t('costCode'), t('aiCoded'), t('receipt'),
  ];

  return (
    <div className="p-8 max-w-6xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
        <Link to="/projects" className="hover:text-gray-900 transition-colors">
          {t('projects')}
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">{project.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{project.client} &middot; {project.location}</p>
        </div>
        <button
          onClick={() => navigate(`/projects/${id}/report`)}
          className="bg-ramp-green hover:bg-ramp-green-dark text-gray-900 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          {t('costReport')}
        </button>
      </div>

      {/* Budget bar */}
      <div className="bg-gray-50 border border-ramp-border rounded-xl p-5 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-gray-900">
            {fmt(project.spent)} <span className="text-gray-500 font-normal">of {fmt(project.budget)}</span>
          </span>
          <span className="font-medium text-gray-600">{pctSpent}%</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              project.statusColor === 'red' ? 'bg-red-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(pctSpent, 100)}%` }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-ramp-border mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Transaction table */}
      {activeTab === 'transactions' && (
        <div className="border border-ramp-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-ramp-border">
                {tableHeaders.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ramp-border">
              {transactions.map((txn) => (
                <tr
                  key={txn.id}
                  onClick={() => setSelectedTxn(txn)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-gray-600">{txn.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">{txn.employee}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{txn.vendor}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">{fmt(txn.amount)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {txn.costCode} - {txn.costCodeDesc}
                  </td>
                  <td className="px-4 py-3">
                    <AiCodedBadge status={txn.aiCoded} t={t} />
                  </td>
                  <td className="px-4 py-3">
                    <ReceiptBadge has={txn.receipt} t={t} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'cost-breakdown' && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium">{t('costBreakdownTab')}</p>
          <p className="text-sm mt-1">{t('costReport')}</p>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium">{t('teamTab')}</p>
          <p className="text-sm mt-1">4 team members</p>
        </div>
      )}

      <SlideOut txn={selectedTxn} onClose={() => setSelectedTxn(null)} t={t} />

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
