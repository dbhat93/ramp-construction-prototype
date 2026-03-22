import { cards, projects as allProjects } from '../data';
import { useLanguage, languages } from '../context/LanguageContext';
import { CreditCard, Plus, X } from 'lucide-react';
import { useState } from 'react';

function fmt(n) {
  return '$' + n.toLocaleString();
}

function IssueCardModal({ onClose, t }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-[520px] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-ramp-border">
          <h2 className="text-lg font-semibold text-gray-900">{t('issueCard')}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Employee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('employeeLabel')}</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50 focus:border-ramp-green">
              <option>Select employee...</option>
              <option>Oscar Martinez</option>
              <option>Stanley Hudson</option>
              <option>James Halpert</option>
              <option>Michael Scott</option>
            </select>
          </div>

          {/* Card type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('cardType')}</label>
            <div className="flex gap-3">
              <label className="flex-1 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-ramp-green transition-colors flex items-center gap-2">
                <input type="radio" name="type" defaultChecked className="accent-ramp-green" />
                <span className="text-sm">{t('physical')}</span>
              </label>
              <label className="flex-1 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-ramp-green transition-colors flex items-center gap-2">
                <input type="radio" name="type" className="accent-ramp-green" />
                <span className="text-sm">{t('virtual')}</span>
              </label>
            </div>
          </div>

          {/* Assign to projects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('assignToProjects')}
            </label>
            <select
              multiple
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-ramp-green/50"
            >
              {allProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">{t('holdCmdMultiple')}</p>
          </div>

          {/* Category restrictions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('categoryRestrictions')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Fuel', 'Materials', 'Equipment', 'Safety', 'Subcontractors', 'All'].map((cat) => (
                <label
                  key={cat}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer hover:border-ramp-green transition-colors flex items-center gap-2"
                >
                  <input type="checkbox" className="accent-ramp-green" />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Preferred Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('preferredLanguage')}
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50 focus:border-ramp-green">
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              {t('preferredLanguageHelp')}
            </p>
          </div>

          {/* Limits */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('perTransactionLimit')}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-sm text-gray-400">$</span>
                <input
                  type="text"
                  defaultValue="500"
                  className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('dailyLimit')}</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-sm text-gray-400">$</span>
                <input
                  type="text"
                  defaultValue="2,000"
                  className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50"
                />
              </div>
            </div>
          </div>

          {/* Approval threshold */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('approvalRequiredAbove')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-sm text-gray-400">$</span>
              <input
                type="text"
                defaultValue="500"
                className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50"
              />
            </div>
          </div>

          {/* Auto-code toggle */}
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-700">{t('autoCodeToProject')}</p>
              <p className="text-xs text-gray-400">
                {t('autoCodeHelp')}
              </p>
            </div>
            <div className="w-10 h-6 bg-ramp-green rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-ramp-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {t('cancel')}
          </button>
          <button
            onClick={onClose}
            className="bg-ramp-green hover:bg-ramp-green-dark text-gray-900 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            {t('issueCard')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Cards() {
  const [showModal, setShowModal] = useState(false);
  const { t } = useLanguage();

  const tableHeaders = [
    t('cardHolder'), t('cardType'), t('projectsCol'), t('categoryLimitCol'),
    t('perTxnLimit'), t('dailyLimitCol'), t('statusLabel'),
  ];

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{t('cards')}</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-ramp-green hover:bg-ramp-green-dark text-gray-900 font-semibold text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          {t('issueNewCard')}
        </button>
      </div>

      {/* Cards table */}
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
            {cards.map((card) => (
              <tr key={card.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{card.holder}</p>
                      <p className="text-xs text-gray-400">****{card.last4}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{card.type}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{card.projects.join(', ')}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{card.categoryLimit}</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                  {fmt(card.perTxnLimit)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                  {fmt(card.dailyLimit)}
                </td>
                <td className="px-4 py-3">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {card.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <IssueCardModal onClose={() => setShowModal(false)} t={t} />}
    </div>
  );
}
