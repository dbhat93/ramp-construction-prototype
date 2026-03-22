const vendors = [
  { name: 'Home Depot', totalSpend: '$42,180', transactions: 28, terms: 'Card' },
  { name: 'Ferguson Enterprises', totalSpend: '$38,500', transactions: 12, terms: 'Net 30' },
  { name: 'United Rentals', totalSpend: '$34,200', transactions: 6, terms: 'Net 30' },
  { name: 'Sunbelt Rentals', totalSpend: '$22,800', transactions: 8, terms: 'Net 30' },
  { name: 'ABC Supply', totalSpend: '$18,690', transactions: 15, terms: 'Net 15' },
  { name: 'Hilti', totalSpend: '$8,450', transactions: 9, terms: 'Card' },
  { name: 'Shell Gas', totalSpend: '$4,320', transactions: 48, terms: 'Card' },
];

export default function VendorsPage() {
  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-ramp-text mb-6">Vendors</h1>

      <div className="border border-ramp-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-ramp-border">
              {['Vendor', 'Total Spend', 'Transactions', 'Payment Terms'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ramp-border">
            {vendors.map((v) => (
              <tr key={v.name} className="hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-3 text-sm font-medium text-ramp-text">{v.name}</td>
                <td className="px-4 py-3 text-sm font-medium text-ramp-text">{v.totalSpend}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{v.transactions}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">{v.terms}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
