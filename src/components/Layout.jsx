import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Procore Partnership Announcement Banner */}
      <div className="bg-ramp-green text-gray-900 text-center py-2 px-4 text-sm font-medium shrink-0">
        <span>🏗️ New: Ramp partners with Procore to bring auto-coding to construction projects. </span>
        <Link to="/procore-partnership" className="underline font-semibold hover:opacity-80">
          Learn more →
        </Link>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-white min-w-0">
            <div className="min-w-[900px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
