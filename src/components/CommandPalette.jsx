import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  Search,
  HardHat,
  Building2,
  MessageSquare,
  CreditCard,
  BarChart3,
  Gift,
  Puzzle,
  Handshake,
  FileText,
  User,
} from 'lucide-react';

const pages = [
  { name: 'Home', path: '/', icon: User, keywords: ['home', 'welcome', 'persona', 'profile', 'inicio'] },
  { name: 'Projects Dashboard', path: '/projects', icon: HardHat, keywords: ['projects', 'dashboard', 'proyectos'] },
  { name: 'Sunset Heights Commercial', path: '/projects/sunset-heights', icon: Building2, keywords: ['sunset', 'heights', 'commercial', 'project detail', 'transactions'] },
  { name: 'Harbor Bridge Rehab', path: '/projects/harbor-bridge', icon: Building2, keywords: ['harbor', 'bridge', 'rehab', 'over budget'] },
  { name: 'Metro Line Extension', path: '/projects/metro-line', icon: Building2, keywords: ['metro', 'line', 'extension'] },
  { name: 'Riverside Elementary', path: '/projects/riverside-elementary', icon: Building2, keywords: ['riverside', 'elementary', 'renovation', 'school'] },
  { name: 'Cost Report — Sunset Heights', path: '/projects/sunset-heights/report', icon: FileText, keywords: ['cost', 'report', 'budget', 'csi', 'variance', 'informe'] },
  { name: 'SMS Receipt Flow', path: '/sms-flow', icon: MessageSquare, keywords: ['sms', 'receipt', 'text', 'message', 'oscar', 'español', 'spanish', 'flujo'] },
  { name: 'Cards', path: '/cards', icon: CreditCard, keywords: ['cards', 'issue', 'physical', 'virtual', 'tarjetas'] },
  { name: 'Rewards', path: '/rewards', icon: Gift, keywords: ['rewards', 'cashback', 'supplier', 'home depot', 'ferguson'] },
  { name: 'Integrations', path: '/integrations', icon: Puzzle, keywords: ['integrations', 'sage', 'viewpoint', 'procore', 'erp', 'quickbooks'] },
  { name: 'Procore Partnership', path: '/procore-partnership', icon: Handshake, keywords: ['procore', 'partnership', 'auto-code'] },
  { name: 'Reporting', path: '/insights', icon: BarChart3, keywords: ['insights', 'reporting', 'analytics'] },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const inputRef = useRef(null);

  const filtered = query
    ? pages.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.path.toLowerCase().includes(q) ||
          p.keywords.some((k) => k.includes(q))
        );
      })
    : pages;

  const handleKeyDown = useCallback(
    (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (page) => {
    navigate(page.path);
    setOpen(false);
    setQuery('');
  };

  const handlePaletteKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex]);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-[560px] max-h-[420px] flex flex-col overflow-hidden border border-gray-200"
        onKeyDown={handlePaletteKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPages')}
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
          />
          <kbd className="text-[10px] text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-gray-400">
              {t('noResults')}
            </div>
          ) : (
            filtered.map((page, i) => {
              const Icon = page.icon;
              return (
                <button
                  key={page.path}
                  onClick={() => handleSelect(page)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                    i === selectedIndex ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${i === selectedIndex ? 'bg-ramp-green/20 text-gray-900' : 'bg-gray-100 text-gray-500'}`}>
                    <Icon size={16} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{page.name}</p>
                    <p className="text-xs text-gray-400 truncate">{page.path}</p>
                  </div>
                  {i === selectedIndex && (
                    <kbd className="text-[10px] text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 font-mono shrink-0">
                      ↵
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-2.5 border-t border-gray-100 flex items-center gap-4 text-[10px] text-gray-400">
          <span className="flex items-center gap-1">
            <kbd className="border border-gray-200 rounded px-1 py-0.5 font-mono">↑↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="border border-gray-200 rounded px-1 py-0.5 font-mono">↵</kbd> open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="border border-gray-200 rounded px-1 py-0.5 font-mono">esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}
