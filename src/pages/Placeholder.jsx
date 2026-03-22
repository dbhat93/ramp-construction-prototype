import { useLocation } from 'react-router-dom';

export default function Placeholder() {
  const { pathname } = useLocation();
  const name = pathname.replace(/^\//, '').replace(/-/g, ' ').replace(/\//g, ' > ');

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <p className="text-lg font-medium text-gray-400 capitalize">{name || 'Page'}</p>
        <p className="text-sm text-gray-300 mt-1">Coming soon</p>
      </div>
    </div>
  );
}
