import { Link } from 'react-router-dom';
import { costReport, projects } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight, Download, Printer, AlertTriangle } from 'lucide-react';

function fmt(n) {
  const abs = Math.abs(n);
  if (abs >= 1000000) return (n < 0 ? '-' : '') + '$' + (abs / 1000000).toFixed(1) + 'M';
  return (n < 0 ? '-' : '') + '$' + abs.toLocaleString();
}

export default function CostReport() {
  const { t } = useLanguage();
  const project = projects[0]; // Sunset Heights

  const totals = costReport.reduce(
    (acc, r) => ({
      budget: acc.budget + r.budget,
      actual: acc.actual + r.actual,
      committed: acc.committed + r.committed,
      forecast: acc.forecast + r.forecast,
      variance: acc.variance + r.variance,
    }),
    { budget: 0, actual: 0, committed: 0, forecast: 0, variance: 0 }
  );

  const summaryCards = [
    [t('contractValue'), fmt(project.budget)],
    [t('totalSpent'), fmt(project.spent)],
    [t('remaining'), fmt(project.budget - project.spent)],
    [t('projectedFinal'), fmt(totals.forecast)],
    [t('variance'), fmt(totals.variance)],
  ];

  const tableHeaders = [
    t('costCode'), t('description'), t('budget'), t('actual'), t('committed'), t('forecast'), t('variance'),
  ];

  return (
    <div className="p-8 max-w-6xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
        <Link to="/projects" className="hover:text-gray-900 transition-colors">{t('projects')}</Link>
        <ChevronRight size={14} />
        <Link to="/projects/sunset-heights" className="hover:text-gray-900 transition-colors">
          Sunset Heights Commercial
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">{t('costReport')}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('costReport')} — Sunset Heights Commercial
        </h1>
        <div className="flex gap-2">
          <button className="border border-ramp-border text-gray-700 hover:bg-gray-50 text-sm font-medium px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5">
            <Download size={14} />
            {t('exportSage')}
          </button>
          <button className="border border-ramp-border text-gray-700 hover:bg-gray-50 text-sm font-medium px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5">
            <Download size={14} />
            {t('exportCsv')}
          </button>
          <button className="border border-ramp-border text-gray-700 hover:bg-gray-50 text-sm font-medium px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5">
            <Printer size={14} />
            {t('print')}
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {summaryCards.map(([label, value]) => (
          <div key={label} className="bg-white border border-ramp-border rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Cost code table */}
      <div className="border border-ramp-border rounded-xl overflow-hidden mb-8">
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
            {costReport.map((row) => {
              const isOver = row.variance < 0;
              const isClose = !isOver && row.variance / row.budget < 0.05 && row.code !== '-';
              return (
                <tr key={row.code} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">{row.code}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">{row.description}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{fmt(row.budget)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">{fmt(row.actual)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{fmt(row.committed)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">{fmt(row.forecast)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm font-medium ${
                        isOver
                          ? 'text-red-600'
                          : isClose
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {fmt(row.variance)}{' '}
                      {isOver ? (
                        <span className="text-red-500">&#9888;</span>
                      ) : (
                        <span className="text-emerald-500">&#10003;</span>
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}
            {/* Totals row */}
            <tr className="bg-gray-50 font-semibold">
              <td className="px-4 py-3 text-sm" />
              <td className="px-4 py-3 text-sm text-gray-900">{t('total')}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{fmt(totals.budget)}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{fmt(totals.actual)}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{fmt(totals.committed)}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{fmt(totals.forecast)}</td>
              <td className="px-4 py-3 text-sm text-emerald-600">{fmt(totals.variance)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cash Position card */}
      <div className="border border-ramp-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('cashPosition')}</h3>
        <div className="grid grid-cols-3 gap-6 mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">{t('budgetRemaining')}</p>
            <p className="text-xl font-bold text-gray-900">$912,000</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">{t('burnRate')}</p>
            <p className="text-xl font-bold text-gray-900">$186K/week</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">{t('projectedCompletionDate')}</p>
            <p className="text-xl font-bold text-gray-900">May 2026</p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
          <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800">
            {t('thermalWarning')}
          </p>
        </div>
      </div>
    </div>
  );
}
