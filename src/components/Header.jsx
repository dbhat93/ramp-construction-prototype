import { useRole } from '../context/RoleContext';
import { useLanguage, languages } from '../context/LanguageContext';
import { roles } from '../data';
import { ChevronDown, Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { role, setRole } = useRole();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const ref = useRef(null);
  const langRef = useRef(null);
  const current = roles[role];
  const currentLang = languages.find((l) => l.code === language);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="h-14 border-b border-ramp-border bg-white flex items-center justify-between px-6 shrink-0">
      {/* Banner */}
      <div className="flex items-center gap-3">
        <div className="bg-ramp-green/20 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
          {t('demoMode')}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Language switcher */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-2 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-gray-200"
          >
            <Globe size={16} className="text-gray-500" />
            <span className="text-sm text-gray-700">{currentLang?.flag} {currentLang?.label}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {langOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-ramp-border rounded-lg shadow-lg py-1 z-50">
              <p className="px-3 py-1.5 text-xs text-gray-400 font-medium uppercase tracking-wider">
                {t('languageLabel')}
              </p>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setLangOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    language === lang.code ? 'bg-gray-50 font-medium' : ''
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="text-gray-900">{lang.label}</span>
                  {language === lang.code && (
                    <span className="ml-auto text-ramp-green text-xs font-semibold">&#10003;</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200" />

        {/* Role switcher */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gray-800 text-white text-xs font-semibold flex items-center justify-center">
              {current.avatar}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900 leading-tight">{current.name}</p>
              <p className="text-xs text-gray-500 leading-tight">{current.title}</p>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-ramp-border rounded-lg shadow-lg py-1 z-50">
              <p className="px-3 py-1.5 text-xs text-gray-400 font-medium uppercase tracking-wider">
                {t('switchRole')}
              </p>
              {Object.entries(roles).map(([key, r]) => (
                <button
                  key={key}
                  onClick={() => {
                    setRole(key);
                    setOpen(false);
                    navigate('/');
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    role === key ? 'bg-gray-50 font-medium' : ''
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-gray-800 text-white text-[10px] font-semibold flex items-center justify-center">
                    {r.avatar}
                  </div>
                  <div className="text-left">
                    <p className="text-gray-900">{r.name}</p>
                    <p className="text-xs text-gray-500">{r.title}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
