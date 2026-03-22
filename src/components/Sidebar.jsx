import { NavLink } from 'react-router-dom';
import {
  Search,
  Inbox,
  Sparkles,
  LayoutDashboard,
  Receipt,
  PieChart,
  ShoppingCart,
  CreditCard,
  BookOpen,
  Users,
  Building2,
  HardHat,
  Settings,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Wallet,
  Plane,
  Puzzle,
  BarChart3,
  Gift,
} from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { useState } from 'react';

const RampLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="#1a1a1a" />
    <path d="M7 19L14 9L21 19" stroke="#c8e600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function NavItem({ to, icon: Icon, label, badge, isNew, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
        }`
      }
    >
      <Icon size={18} strokeWidth={1.8} />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="bg-gray-200 text-gray-700 text-xs font-medium px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      {isNew && (
        <span className="bg-ramp-green text-gray-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide">
          New
        </span>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  const { role } = useRole();
  const [myRampOpen, setMyRampOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const isController = role === 'controller';

  return (
    <aside className="w-56 bg-ramp-sidebar border-r border-ramp-border flex flex-col h-screen shrink-0">
      {/* Logo */}
      <div className="px-4 pt-5 pb-4 flex items-center gap-2.5">
        <RampLogo />
        <span className="font-semibold text-base text-gray-900 tracking-tight">ramp</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        <button
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-white/60 hover:text-gray-900 transition-colors w-full"
        >
          <Search size={18} strokeWidth={1.8} />
          <span className="flex-1 text-left">Search</span>
          <kbd className="text-[10px] text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 font-mono">⌘K</kbd>
        </button>
        <NavItem to="/inbox" icon={Inbox} label="Inbox" badge="7" />
        {/* Insights expandable */}
        <button
          onClick={() => setInsightsOpen(!insightsOpen)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-white/60 hover:text-gray-900 transition-colors w-full"
        >
          <Sparkles size={18} strokeWidth={1.8} />
          <span className="flex-1 text-left">Insights</span>
          {insightsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {insightsOpen && (
          <div className="ml-7 space-y-0.5">
            <NavItem to="/insights" icon={BarChart3} label="Reporting" />
            <NavItem to="/rewards" icon={Gift} label="Rewards" />
          </div>
        )}

        {/* My Ramp expandable */}
        <button
          onClick={() => setMyRampOpen(!myRampOpen)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-white/60 hover:text-gray-900 transition-colors w-full"
        >
          <LayoutDashboard size={18} strokeWidth={1.8} />
          <span className="flex-1 text-left">My Ramp</span>
          {myRampOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {myRampOpen && (
          <div className="ml-7 space-y-0.5">
            <NavItem to="/my-ramp/overview" icon={LayoutDashboard} label="Overview" />
            <NavItem to="/my-ramp/expenses" icon={Receipt} label="Expenses" />
            <NavItem to="/my-ramp/travel" icon={Plane} label="Travel" />
          </div>
        )}

        <NavItem to="/expenses" icon={Receipt} label="Expenses" />
        <NavItem to="/spend-programs" icon={PieChart} label="Spend programs" />
        <NavItem to="/procurement" icon={ShoppingCart} label="Procurement" />
        <NavItem to="/bill-pay" icon={Wallet} label="Bill Pay" />

        {isController && (
          <NavItem to="/accounting" icon={BookOpen} label="Accounting" badge="37" />
        )}
        {isController && <NavItem to="/people" icon={Users} label="People" />}
        {isController && <NavItem to="/vendors" icon={Building2} label="Vendors" />}
        {isController && <NavItem to="/integrations" icon={Puzzle} label="Integrations" />}

        <NavItem to="/projects" icon={HardHat} label="Projects" isNew />
        <NavItem to="/cards" icon={CreditCard} label="Cards" />
        <NavItem to="/sms-flow" icon={MessageSquare} label="SMS Flow" />
      </nav>

      {/* Settings at bottom */}
      {isController && (
        <div className="px-3 pb-4 pt-2 border-t border-ramp-border">
          <NavItem to="/settings" icon={Settings} label="Settings" />
        </div>
      )}
    </aside>
  );
}
