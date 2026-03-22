import { useNavigate } from 'react-router-dom';
import { projects } from '../data';
import { useRole } from '../context/RoleContext';
import { useLanguage, translateStatus } from '../context/LanguageContext';
import { HardHat, DollarSign, Camera, AlertTriangle, Info, X, Plus, Globe, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

function fmt(n) {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return '$' + Math.round(n / 1000) + 'K';
  return '$' + n.toLocaleString();
}

function StatusPill({ status, color, language }) {
  const colors = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
  };
  const translated = translateStatus(status, language);
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${colors[color]}`}>
      {translated}
    </span>
  );
}

/* ─── Tooltip ─── */
function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg z-50 pointer-events-none leading-relaxed">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-900" />
        </span>
      )}
    </span>
  );
}

/* ─── Receipt Drill-Down ─── */
const missingReceipts = [
  { project: 'Sunset Heights', person: 'Oscar Martinez', amount: '$347.82', vendor: 'Home Depot', date: 'Mar 20' },
  { project: 'Sunset Heights', person: 'Stanley Hudson', amount: '$2,800', vendor: 'Sunbelt Rentals', date: 'Mar 19' },
  { project: 'Harbor Bridge', person: 'James Halpert', amount: '$156', vendor: 'Shell Gas', date: 'Mar 18' },
  { project: 'Harbor Bridge', person: 'Oscar Martinez', amount: '$89', vendor: 'AutoZone', date: 'Mar 17' },
  { project: 'Sunset Heights', person: 'Stanley Hudson', amount: '$1,245', vendor: 'Ferguson', date: 'Mar 16' },
  { project: 'Metro Line', person: 'Oscar Martinez', amount: '$430', vendor: 'Home Depot', date: 'Mar 15' },
];

/* ─── Stat Card ─── */
function StatCard({ icon: Icon, label, value, iconColor, tooltip, expandable, expandContent }) {
  const [expanded, setExpanded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) { if (ref.current && !ref.current.contains(e.target)) setExpanded(false); }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => expandable && setExpanded(!expanded)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={`bg-white border rounded-xl p-5 w-full text-left transition-all hover:shadow-md hover:border-gray-300 cursor-pointer ${expanded ? 'border-blue-400 shadow-md' : 'border-ramp-border'}`}
      >
        <div className="flex items-center gap-3 mb-1">
          <div className={`p-2 rounded-lg ${iconColor}`}>
            <Icon size={18} strokeWidth={2} />
          </div>
          <div className="flex items-center gap-1.5">
            <p className="text-sm text-gray-500 font-medium">{label}</p>
            <Tooltip text={tooltip}>
              <Info size={13} className="text-gray-400 hover:text-gray-600 cursor-help" />
            </Tooltip>
          </div>
        </div>
        <p className="text-2xl font-bold text-ramp-text mt-2">{value}</p>
        {expandable && (
          <p className="text-[10px] text-gray-400 mt-1">{expanded ? 'Click to close' : 'Click for details'}</p>
        )}
      </button>

      {expanded && expandContent && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-ramp-border rounded-xl shadow-xl z-40 p-4 animate-fade-up">
          {expandContent}
        </div>
      )}
    </div>
  );
}

/* ─── Role-specific one-liners (keyed for i18n) ─── */
const oneLinerKeys = {
  controller: {
    'sunset-heights': 'sunsetController',
    'harbor-bridge': 'harborController',
    'metro-line': 'metroController',
    'riverside-elementary': 'riversideController',
  },
  fieldWorker: {
    'sunset-heights': 'sunsetField',
    'harbor-bridge': 'harborField',
    'metro-line': 'metroField',
    'riverside-elementary': 'riversideField',
  },
};

/* ─── Project-level AI insights (controller only) ─── */
const projectInsights = {
  'sunset-heights': {
    text: 'Concrete costs 12% above market. Switch to Ferguson supplier #4412 to save ~$28K remaining.',
    type: 'cost',
  },
  'harbor-bridge': {
    text: 'At current burn, budget exhausts at 82% completion. Renegotiate steel PO or cut scope on Phase 3.',
    type: 'cost',
  },
  'metro-line': {
    text: '3 equipment rentals overlap next week — consolidate into 1 PO to save $4,200 in mobilization fees.',
    type: 'time',
  },
  'riverside-elementary': {
    text: '5% under budget — release $55K contingency to accelerate punch list and close 2 weeks early.',
    type: 'time',
  },
};

function ProjectCard({ project, onClick, role, language, t }) {
  const pctSpent = Math.round((project.spent / project.budget) * 100);
  const oneLinerKey = oneLinerKeys[role]?.[project.id];
  const oneLiner = oneLinerKey ? t(oneLinerKey) : null;
  const insight = role === 'controller' ? projectInsights[project.id] : null;
  return (
    <button
      onClick={onClick}
      className="bg-white border border-ramp-border rounded-xl p-5 text-left hover:shadow-md hover:border-gray-300 transition-all group w-full"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-ramp-text group-hover:text-gray-700 text-base">
            {project.name}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">{project.client}</p>
        </div>
        <StatusPill status={project.status} color={project.statusColor} language={language} />
      </div>

      {/* Role-specific one-liner */}
      {oneLiner && (
        <p className="text-xs text-gray-600 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 mb-3 leading-relaxed">
          {oneLiner}
        </p>
      )}

      {/* AI Project Intelligence (controller only) */}
      {insight && (
        <div className={`flex items-start gap-2 text-xs rounded-lg px-3 py-2 mb-3 leading-relaxed ${
          insight.type === 'cost'
            ? 'bg-amber-50 border border-amber-200 text-amber-800'
            : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
        }`}>
          <Sparkles size={13} className="shrink-0 mt-0.5" />
          <span>{insight.text}</span>
        </div>
      )}

      {/* Budget bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>{fmt(project.spent)} spent</span>
          <span>{fmt(project.budget)} budget</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              project.statusColor === 'red'
                ? 'bg-red-500'
                : project.statusColor === 'blue'
                ? 'bg-blue-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(pctSpent, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">{pctSpent}% of budget used</p>
      </div>

      {/* Completion */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-500">Completion</div>
          <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-400 rounded-full"
              style={{ width: `${project.percentComplete}%` }}
            />
          </div>
          <span className="text-xs font-medium text-gray-700">{project.percentComplete}%</span>
        </div>
        <span className="text-xs text-gray-400">{project.location}</span>
      </div>
    </button>
  );
}

/* ─── Create New Project Modal ─── */
function NewProjectModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-ramp-border">
          <h2 className="text-lg font-semibold text-ramp-text">Create New Project</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Name <span className="text-red-500">*</span></label>
            <input type="text" placeholder="e.g. Riverside Office Tower" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50 focus:border-ramp-green" />
          </div>

          {/* Project Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Code</label>
            <input type="text" defaultValue="PRJ-2026-009" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50 focus:border-ramp-green bg-gray-50" />
            <p className="text-xs text-gray-400 mt-1">Auto-generated. You can edit this.</p>
          </div>

          {/* Client / Owner */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Client / Owner</label>
            <input type="text" placeholder="e.g. Westfield Development Corp" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50 focus:border-ramp-green" />
          </div>

          {/* Contract Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contract Type</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50 focus:border-ramp-green">
              <option>Select type...</option>
              <option>Lump Sum</option>
              <option>Cost Plus</option>
              <option>GMP</option>
              <option>Time &amp; Materials</option>
              <option>Unit Price</option>
            </select>
          </div>

          {/* Contract Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contract Value</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-sm text-gray-400">$</span>
              <input type="text" placeholder="0.00" className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50 focus:border-ramp-green" />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50 focus:border-ramp-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Estimated Completion</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50 focus:border-ramp-green" />
            </div>
          </div>

          {/* Project Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Address</label>
            <input type="text" placeholder="e.g. 1234 Main St, Los Angeles, CA 90001" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50 focus:border-ramp-green" />
          </div>

          {/* Assigned Team */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Assigned Team</label>
            <select multiple className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-ramp-green/50">
              <option>Oscar Martinez</option>
              <option>Stanley Hudson</option>
              <option>James Halpert</option>
              <option>Michael Scott</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">Hold Cmd to select multiple</p>
          </div>

          {/* Cost Code Template */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Cost Code Template</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50 focus:border-ramp-green">
              <option>Standard CSI MasterFormat</option>
              <option>Residential</option>
              <option>Heavy Civil</option>
              <option>Custom</option>
            </select>
          </div>

          {/* Budget Allocation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget Allocation</label>
            <div className="flex gap-3">
              <label className="flex-1 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-ramp-green transition-colors flex items-center gap-2">
                <input type="radio" name="budget" defaultChecked className="accent-ramp-green" />
                <span className="text-sm">Auto-distribute from contract value</span>
              </label>
              <label className="flex-1 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-ramp-green transition-colors flex items-center gap-2">
                <input type="radio" name="budget" className="accent-ramp-green" />
                <span className="text-sm">Manual entry</span>
              </label>
            </div>
          </div>

          {/* Default Approval Threshold */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Default Approval Threshold</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-sm text-gray-400">$</span>
              <input type="text" defaultValue="500" className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50 focus:border-ramp-green" />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
            <textarea rows={3} placeholder="Any additional project notes..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ramp-green/50 focus:border-ramp-green resize-none" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-ramp-border">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="bg-ramp-green hover:bg-ramp-green-dark text-gray-900 font-semibold text-sm px-4 py-2 rounded-lg transition-colors">
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ─── */
export default function ProjectsDashboard() {
  const navigate = useNavigate();
  const { role } = useRole();
  const { language, t } = useLanguage();
  const [showNewProject, setShowNewProject] = useState(false);

  // Field workers only see their assigned projects
  const assignedProjects = ['sunset-heights', 'harbor-bridge'];
  const visibleProjects = role === 'fieldWorker'
    ? projects.filter((p) => assignedProjects.includes(p.id))
    : projects;

  const activeCount = visibleProjects.length;
  const overBudgetCount = visibleProjects.filter((p) => p.statusColor === 'red').length;

  /* Receipt drill-down content */
  const receiptDrillDown = (
    <div>
      <p className="text-sm font-medium text-ramp-text mb-3">6 receipts missing across 2 projects:</p>
      <div className="space-y-2">
        {missingReceipts.map((r, i) => (
          <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-100 last:border-0">
            <div>
              <span className="text-gray-500">{r.project}:</span>{' '}
              <span className="font-medium text-ramp-text">{r.person}</span>{' '}
              <span className="text-gray-500">— {r.amount} {r.vendor} ({r.date})</span>
            </div>
            <button className="text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg transition-colors">
              Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  /* Over Budget drill-down content */
  const overBudgetDrillDown = (
    <div>
      <p className="text-sm font-semibold text-ramp-text mb-1">Harbor Bridge Rehab</p>
      <p className="text-sm text-gray-600 mb-1">78% spent at 65% completion</p>
      <p className="text-sm text-gray-600 mb-2">Projected overrun: $52,000 (5.8%)</p>
      <p className="text-sm text-gray-500 mb-3">Top overrun categories: 07000 Thermal &amp; Moisture (+$17K), 03000 Concrete (+$8K)</p>
      <button
        onClick={() => navigate('/projects/harbor-bridge')}
        className="bg-ramp-green hover:bg-ramp-green-dark text-gray-900 font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors"
      >
        {t('viewProject')}
      </button>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Field worker language banner */}
      {role === 'fieldWorker' && (
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-center gap-2 text-sm text-blue-800">
          <Globe size={16} className="text-blue-600 shrink-0" />
          <span>{t('languageBanner')}</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-ramp-text">{t('projects')}</h1>
        <button
          onClick={() => setShowNewProject(true)}
          className="bg-ramp-green hover:bg-ramp-green-dark text-gray-900 font-semibold text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          {t('newProject')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={HardHat}
          label={t('activeProjects')}
          value={activeCount + 4}
          iconColor="bg-blue-50 text-blue-600"
          tooltip={t('tipActiveProjects')}
          expandable
          expandContent={
            <div>
              <p className="text-sm font-medium text-ramp-text mb-3">{t('projectsByStatus')}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500" /> {t('onTrack')}</div>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500" /> {t('underBudget')}</div>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500" /> {t('overBudget')}</div>
                  <span className="font-medium">1</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                {t('addedThisQuarter')}
              </div>
            </div>
          }
        />
        <StatCard
          icon={DollarSign}
          label={t('monthlySpend')}
          value="$342K"
          iconColor="bg-emerald-50 text-emerald-600"
          tooltip={t('tipMonthlySpend')}
          expandable
          expandContent={
            <div>
              <p className="text-sm font-medium text-ramp-text mb-3">{t('spendBreakdown')}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t('cardTransactions')}</span>
                  <span className="font-medium">$218K</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t('billPayVendors')}</span>
                  <span className="font-medium">$89K</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t('reimbursements')}</span>
                  <span className="font-medium">$35K</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{t('vsLastMonth')}</span>
                  <span className="text-red-600 font-medium">↑ 14.8%</span>
                </div>
              </div>
            </div>
          }
        />
        <StatCard
          icon={Camera}
          label={t('receiptRate')}
          value="94%"
          iconColor="bg-purple-50 text-purple-600"
          tooltip="Percentage of transactions with matched receipts. Target: 100%"
          expandable
          expandContent={receiptDrillDown}
        />
        <StatCard
          icon={AlertTriangle}
          label={t('overBudget')}
          value={overBudgetCount}
          iconColor="bg-red-50 text-red-600"
          tooltip="Projects where actual spend exceeds pro-rated budget based on completion %"
          expandable
          expandContent={overBudgetDrillDown}
        />
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-2 gap-4">
        {visibleProjects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            role={role}
            language={language}
            t={t}
            onClick={() => navigate(`/projects/${p.id}`)}
          />
        ))}
      </div>

      {showNewProject && <NewProjectModal onClose={() => setShowNewProject(false)} />}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
