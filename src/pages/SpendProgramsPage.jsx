import { ChevronRight } from 'lucide-react';

const programs = [
  { name: 'Job Site Materials', type: 'Expenses & benefits', limit: '$5,000/week', members: 8, activeCards: 4 },
  { name: 'Equipment Rental', type: 'Procurement', limit: 'Per PO approval', members: 3, activeCards: 2 },
  { name: 'Fuel & Auto', type: 'Expenses & benefits', limit: '$75/day', members: 12, activeCards: 6 },
  { name: 'Safety Equipment', type: 'Expenses & benefits', limit: '$500/quarter', members: 15, activeCards: 5 },
  { name: 'Subcontractor Payments', type: 'Procurement', limit: 'Per invoice', members: 2, activeCards: 0 },
];

export default function SpendProgramsPage() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-ramp-text mb-6">Spend programs</h1>

      <div className="space-y-3">
        {programs.map((p) => (
          <div
            key={p.name}
            className="bg-white border border-ramp-border rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer flex items-center justify-between"
          >
            <div>
              <h3 className="text-sm font-semibold text-ramp-text">{p.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{p.type} &middot; {p.limit}</p>
              <p className="text-xs text-gray-400 mt-1">{p.members} members &middot; {p.activeCards} active cards</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs font-medium text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                See all
              </button>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
