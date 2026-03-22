import { CreditCard } from 'lucide-react';

const people = [
  { name: 'Oscar Martinez', role: 'Field Worker', department: 'Operations', cards: 2, email: 'omartinez@acme-construction.com' },
  { name: 'Stanley Hudson', role: 'Field Worker', department: 'Operations', cards: 1, email: 'shudson@acme-construction.com' },
  { name: 'James Halpert', role: 'Equipment Operator', department: 'Operations', cards: 1, email: 'jhalpert@acme-construction.com' },
  { name: 'Michael Scott', role: 'Controller', department: 'Finance', cards: 1, email: 'mscott@acme-construction.com' },
  { name: 'Sarah Kim', role: 'Project Manager', department: 'Management', cards: 2, email: 'skim@acme-construction.com' },
];

export default function PeoplePage() {
  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-ramp-text mb-6">People</h1>

      <div className="border border-ramp-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-ramp-border">
              {['Name', 'Role', 'Department', 'Active Cards', 'Email'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ramp-border">
            {people.map((p) => (
              <tr key={p.name} className="hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-800 text-white text-[10px] font-semibold flex items-center justify-center">
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-ramp-text">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{p.role}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{p.department}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <CreditCard size={14} className="text-gray-400" />
                    {p.cards}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{p.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
