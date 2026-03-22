import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider } from './context/RoleContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import CommandPalette from './components/CommandPalette';
import ProjectsDashboard from './pages/ProjectsDashboard';
import ProjectDetail from './pages/ProjectDetail';
import CostReport from './pages/CostReport';
import SmsFlow from './pages/SmsFlow';
import Cards from './pages/Cards';
import Placeholder from './pages/Placeholder';
import InboxPage from './pages/InboxPage';
import InsightsPage from './pages/InsightsPage';
import ExpensesPage from './pages/ExpensesPage';
import BillPayPage from './pages/BillPayPage';
import SpendProgramsPage from './pages/SpendProgramsPage';
import PeoplePage from './pages/PeoplePage';
import VendorsPage from './pages/VendorsPage';
import AccountingPage from './pages/AccountingPage';
import RewardsPage from './pages/RewardsPage';
import IntegrationsPage from './pages/IntegrationsPage';
import ProcorePartnershipPage from './pages/ProcorePartnershipPage';
import WelcomePage from './pages/WelcomePage';

export default function App() {
  return (
    <RoleProvider>
    <LanguageProvider>
      <HashRouter>
        <CommandPalette />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/projects" element={<ProjectsDashboard />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/projects/:id/report" element={<CostReport />} />
            <Route path="/sms-flow" element={<SmsFlow />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/bill-pay" element={<BillPayPage />} />
            <Route path="/spend-programs" element={<SpendProgramsPage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/vendors" element={<VendorsPage />} />
            <Route path="/accounting" element={<AccountingPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/procore-partnership" element={<ProcorePartnershipPage />} />
            {/* Placeholder routes */}
            {/* Search is handled by Cmd+K CommandPalette */}
            <Route path="/my-ramp/*" element={<Placeholder />} />
            <Route path="/procurement" element={<Placeholder />} />
            <Route path="/settings" element={<Placeholder />} />
          </Route>
        </Routes>
      </HashRouter>
    </LanguageProvider>
    </RoleProvider>
  );
}
