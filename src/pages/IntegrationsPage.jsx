const activeIntegrations = [
  {
    name: 'QuickBooks',
    description: 'Sync expenses and bills to QuickBooks automatically',
  },
  {
    name: 'Sage Intacct',
    description: 'Cloud ERP with multi-entity support. Sage Recommended Solution',
  },
  {
    name: 'Acumatica',
    description: 'Cloud ERP with construction editions and Procore integration',
  },
  {
    name: 'Foundation Software',
    description: 'Purpose-built for specialty trades. Sync payroll, job costing, and AP automatically',
  },
  {
    name: 'Jonas Construction',
    description: 'MEP trades ERP ($5M-$100M). Sync service jobs, WIP, and project costs',
  },
  {
    name: 'NetSuite',
    description: 'Enterprise ERP integration',
  },
  {
    name: 'Xero',
    description: 'Real-time accounting sync with Xero',
  },
];

const constructionErp = [
  {
    name: 'Sage 300 CRE',
    description: 'Construction-specific ERP (separate from Sage Intacct). Deep job costing, project accounting, and AIA billing.',
    badge: 'Landing October 2026',
  },
  {
    name: 'Trimble Viewpoint',
    description: "Connect project cost data with Viewpoint's construction accounting. 8,000+ clients.",
    badge: 'Landing October 2026',
  },
  {
    name: 'CMiC',
    description: 'Enterprise-grade construction ERP. Highly customizable for large GCs.',
    badge: 'Evaluating',
  },
];

const projectManagement = [
  {
    name: 'Procore',
    description: 'Sync projects, phases, and cost codes. Auto-code every transaction to the right job.',
    badge: 'Landing Q3 2026',
  },
];

const fleetTelematics = [
  {
    name: 'Samsara',
    description: 'Connect fleet data with spend. Match fuel purchases to vehicle and driver.',
    badge: 'Evaluating',
  },
  {
    name: 'Motive',
    description: 'Integrate ELD and fleet management data with Ramp spend controls.',
    badge: 'Evaluating',
  },
];

function ActiveCard({ name, description }) {
  return (
    <div className="bg-white border border-ramp-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-ramp-text">{name}</span>
        <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
          Connected
        </span>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}

function ComingCard({ name, description, badge }) {
  const badgeColor = badge === 'Evaluating'
    ? 'bg-gray-200 text-gray-600'
    : 'bg-amber-100 text-amber-700';

  return (
    <div className="bg-white/60 border border-dashed border-ramp-border rounded-xl p-5 opacity-60">
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-gray-500">{name}</span>
        <span className={`${badgeColor} text-xs font-medium px-2.5 py-1 rounded-full`}>
          {badge}
        </span>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

export default function IntegrationsPage() {
  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-ramp-text mb-8">Integrations</h1>

      {/* Active Integrations */}
      <h2 className="text-lg font-semibold text-ramp-text mb-4">Active Integrations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {activeIntegrations.map((i) => (
          <ActiveCard key={i.name} {...i} />
        ))}
      </div>

      {/* Construction ERP */}
      <h2 className="text-lg font-semibold text-ramp-text mb-4">Construction ERP</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {constructionErp.map((i) => (
          <ComingCard key={i.name} {...i} />
        ))}
      </div>

      {/* Project Management */}
      <h2 className="text-lg font-semibold text-ramp-text mb-4">Project Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {projectManagement.map((i) => (
          <ComingCard key={i.name} {...i} />
        ))}
      </div>

      {/* Fleet & Telematics */}
      <h2 className="text-lg font-semibold text-ramp-text mb-4">Fleet & Telematics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {fleetTelematics.map((i) => (
          <ComingCard key={i.name} {...i} />
        ))}
      </div>
    </div>
  );
}
