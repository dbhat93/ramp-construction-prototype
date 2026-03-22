import { FolderSync, Bot, BarChart3 } from 'lucide-react';

const valueProps = [
  {
    icon: FolderSync,
    title: 'Sync Project Data',
    description: 'Import projects, phases, and cost codes directly from Procore. No manual setup.',
  },
  {
    icon: Bot,
    title: 'Auto-Code Purchases',
    description: 'When a card is swiped, Ramp AI matches the vendor and amount to the correct Procore project and cost code.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Cost Tracking',
    description: 'See spend flow into Procore\'s budget module in real-time. No more month-end surprises.',
  },
];

export default function ProcorePartnershipPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-16 pt-8">
        <h1 className="text-5xl font-bold text-ramp-text mb-4">Ramp + Procore</h1>
        <p className="text-xl text-gray-500 mb-6">Auto-Code Every Transaction to Your Project</p>
        <span className="inline-block bg-ramp-green text-gray-900 text-sm font-semibold px-4 py-1.5 rounded-full">
          Coming Q3 2026
        </span>
      </div>

      {/* Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {valueProps.map((prop) => (
          <div key={prop.title} className="bg-white border border-ramp-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-ramp-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <prop.icon size={24} className="text-gray-900" strokeWidth={1.8} />
            </div>
            <h3 className="text-lg font-semibold text-ramp-text mb-2">{prop.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{prop.description}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center border-t border-ramp-border pt-12">
        <p className="text-gray-500 mb-4">Interested? Talk to your Ramp account manager.</p>
        <button
          disabled
          className="bg-gray-200 text-gray-400 px-6 py-2.5 rounded-lg text-sm font-medium cursor-not-allowed"
        >
          Request Early Access
        </button>
      </div>
    </div>
  );
}
