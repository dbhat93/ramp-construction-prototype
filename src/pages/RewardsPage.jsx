import { useState } from 'react';
import { DollarSign, Plus, Search } from 'lucide-react';

const supplierPrograms = [
  { name: 'Home Depot Pro Xtra', offer: '3% back on materials →' },
  { name: 'Ferguson Enterprises', offer: '2% back on plumbing & HVAC →' },
  { name: 'United Rentals', offer: '$50 credit per $1,000 rental →' },
  { name: 'Sunbelt Rentals', offer: 'Free delivery over $500 →' },
];

const giftCards = [
  { name: 'Home Depot', color: 'bg-orange-500' },
  { name: "Lowe's", color: 'bg-blue-600' },
  { name: 'AutoZone', color: 'bg-red-600' },
  { name: 'Shell', color: 'bg-yellow-500' },
];

function PartnerCard({ name, subtitle }) {
  return (
    <div className="bg-white border border-ramp-border rounded-xl p-5 hover:shadow-sm transition-shadow cursor-pointer min-w-[180px]">
      <p className="font-bold text-ramp-text text-sm mb-2">{name}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}

function GiftCard({ name, color }) {
  return (
    <div className="bg-white border border-ramp-border rounded-xl overflow-hidden hover:shadow-sm transition-shadow cursor-pointer min-w-[180px]">
      <div className={`${color} h-16 flex items-center justify-center`}>
        <span className="text-white font-bold text-sm">{name}</span>
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-500">→</p>
      </div>
    </div>
  );
}

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState('Redeem');

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-ramp-text mb-6">Rewards</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-ramp-border mb-8">
        {['Redeem', 'Offers'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-gray-900 text-ramp-text'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cashback Balance */}
      <div className="bg-white border border-ramp-border rounded-xl p-6 mb-8">
        <p className="text-sm text-gray-500 mb-1">Cashback balance</p>
        <div className="flex items-center gap-4 mb-3">
          <p className="text-4xl font-bold text-ramp-text">$6,397.96</p>
          <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
            Earning 1.5%
          </span>
        </div>
        <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
          ✨ Rewards activity
        </button>
      </div>

      {/* Save on your expenses */}
      <h2 className="text-lg font-semibold text-ramp-text mb-4">Save on your expenses</h2>
      <div className="grid grid-cols-2 gap-4 mb-10">
        {/* Pay card balance */}
        <div className="bg-white border border-ramp-border rounded-xl p-6">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <DollarSign size={20} className="text-gray-600" />
          </div>
          <h3 className="font-semibold text-ramp-text mb-2">Pay card balance</h3>
          <p className="text-sm text-gray-500 mb-4">
            Use your cashback to pay down your card statement balance of $990,441.93.
          </p>
          <button className="text-sm font-medium text-gray-700 border border-ramp-border rounded-lg px-4 py-2 hover:bg-gray-50">
            Reduce card balance
          </button>
        </div>

        {/* Pay for Plus */}
        <div className="bg-white border border-ramp-border rounded-xl p-6">
          <span className="inline-block bg-ramp-green text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full mb-4">
            Plus
          </span>
          <h3 className="font-semibold text-ramp-text mb-2">Pay for Plus</h3>
          <p className="text-sm text-gray-500 mb-4">
            Use your cashback to pay for Ramp Plus
          </p>
          <button className="text-sm font-medium text-gray-900 bg-ramp-green rounded-lg px-4 py-2 hover:bg-ramp-green-dark">
            Plus payment settings
          </button>
        </div>
      </div>

      {/* Redeem for supplier programs */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-ramp-text">Redeem for supplier programs</h2>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs"
              className="pl-9 pr-4 py-2 text-sm border border-ramp-border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {supplierPrograms.map((p) => (
            <PartnerCard key={p.name} name={p.name} subtitle={p.offer} />
          ))}
          <div className="bg-gray-50 border border-dashed border-ramp-border rounded-xl p-5 flex flex-col items-center justify-center min-w-[180px] cursor-pointer hover:bg-gray-100">
            <p className="font-bold text-gray-400 text-lg mb-1">+3 more</p>
            <p className="text-xs text-gray-400">See all supplier programs →</p>
          </div>
        </div>
      </div>

      {/* Redeem for gift cards */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-ramp-text">Redeem for gift cards</h2>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search gift cards"
              className="pl-9 pr-4 py-2 text-sm border border-ramp-border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {giftCards.map((g) => (
            <GiftCard key={g.name} name={g.name} color={g.color} />
          ))}
          <div className="bg-gray-50 border border-dashed border-ramp-border rounded-xl p-5 flex flex-col items-center justify-center min-w-[180px] cursor-pointer hover:bg-gray-100">
            <p className="font-bold text-gray-400 text-lg mb-1">+4 more</p>
            <p className="text-xs text-gray-400">See all gift cards →</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center">
        See general merchant disclaimer
      </p>
    </div>
  );
}
