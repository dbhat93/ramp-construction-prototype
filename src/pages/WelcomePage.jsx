import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, CreditCard, FolderOpen, Receipt, ShieldCheck, Globe, Fuel, Wrench } from 'lucide-react';

const personas = {
  controller: {
    greeting: { en: 'Welcome back', es: 'Bienvenido', pt: 'Bem-vindo', zh: '欢迎回来', pl: 'Witaj ponownie' },
    name: 'Michael Scott',
    role: 'Controller',
    company: 'Dunder Mifflin Construction',
    avatar: 'MS',
    bio: {
      en: 'Oversees financial operations across all active projects. Responsible for budget tracking, spend compliance, monthly close, and ERP sync.',
      es: 'Supervisa las operaciones financieras en todos los proyectos activos. Responsable del seguimiento presupuestario, cumplimiento de gastos, cierre mensual y sincronización ERP.',
    },
    stats: [
      { label: { en: 'Active Projects', es: 'Proyectos Activos' }, value: '4', icon: FolderOpen },
      { label: { en: 'Total Budget', es: 'Presupuesto Total' }, value: '$9.59M', icon: ShieldCheck },
      { label: { en: 'Cards Issued', es: 'Tarjetas Emitidas' }, value: '12', icon: CreditCard },
      { label: { en: 'Pending Reviews', es: 'Revisiones Pendientes' }, value: '37', icon: Receipt },
    ],
    focus: {
      en: ['Budget health & overrun alerts', 'AI-coded transaction review', 'Cost report accuracy', 'ERP sync & monthly close'],
      es: ['Salud presupuestaria y alertas', 'Revisión de transacciones IA', 'Precisión de informes de costos', 'Sincronización ERP y cierre mensual'],
    },
    team: [
      { name: 'Dwight Schrute', role: 'Project Manager', avatar: 'DS' },
      { name: 'Oscar Martinez', role: 'Field Worker', avatar: 'OM' },
      { name: 'Stanley Hudson', role: 'Field Worker', avatar: 'SH' },
      { name: 'James Halpert', role: 'Equipment Operator', avatar: 'JH' },
    ],
  },
  fieldWorker: {
    greeting: { en: 'Welcome back', es: 'Bienvenido', pt: 'Bem-vindo', zh: '欢迎回来', pl: 'Witaj ponownie' },
    name: 'Oscar Martinez',
    role: 'Field Worker',
    company: 'Dunder Mifflin Construction',
    avatar: 'OM',
    bio: {
      en: 'On-site field worker assigned to Sunset Heights and Harbor Bridge projects. Handles material purchases, receipt capture via SMS, and equipment rentals.',
      es: 'Trabajador de campo asignado a los proyectos Sunset Heights y Harbor Bridge. Maneja compras de materiales, captura de recibos por SMS y alquiler de equipos.',
    },
    stats: [
      { label: { en: 'Assigned Projects', es: 'Proyectos Asignados' }, value: '2', icon: FolderOpen },
      { label: { en: 'Card', es: 'Tarjeta' }, value: '****7743', icon: CreditCard },
      { label: { en: 'This Month', es: 'Este Mes' }, value: '$6,822', icon: Receipt },
      { label: { en: 'Preferred Language', es: 'Idioma Preferido' }, value: '🇪🇸 Español', icon: Globe },
    ],
    focus: {
      en: ['Submit receipts via SMS or photo', 'View card balance & limits', 'Check project assignments', 'Track purchase history'],
      es: ['Enviar recibos por SMS o foto', 'Ver saldo y límites de tarjeta', 'Verificar asignaciones de proyecto', 'Rastrear historial de compras'],
    },
    team: [
      { name: 'Michael Scott', role: 'Controller', avatar: 'MS' },
      { name: 'Dwight Schrute', role: 'Project Manager', avatar: 'DS' },
      { name: 'Stanley Hudson', role: 'Field Worker', avatar: 'SH' },
      { name: 'James Halpert', role: 'Equipment Operator', avatar: 'JH' },
    ],
  },
};

export default function WelcomePage() {
  const { role } = useRole();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const p = personas[role];
  const lang = language === 'en' || !p.bio[language] ? 'en' : language;

  const getLabel = (obj) => (typeof obj === 'object' ? obj[lang] || obj.en : obj);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero greeting */}
      <div className="mb-8">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-full bg-gray-800 text-white text-lg font-semibold flex items-center justify-center shrink-0 mt-1">
            {p.avatar}
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">{getLabel(p.greeting)},</p>
            <h1 className="text-3xl text-gray-900" style={{ fontWeight: 300 }}>{p.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{p.role} · {p.company}</p>
            <p className="text-gray-500 text-sm leading-relaxed mt-3 max-w-xl">
              {getLabel(p.bio)}
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {p.stats.map((s, i) => (
          <div
            key={i}
            className="bg-white border border-ramp-border rounded-xl px-5 py-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-2 mb-3">
              <s.icon size={15} className="text-gray-400" />
              <p className="text-xs text-gray-500 font-medium">{getLabel(s.label)}</p>
            </div>
            <p className="text-xl font-semibold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Daily focus */}
        <div className="bg-white border border-ramp-border rounded-xl px-6 py-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            {lang === 'es' ? 'Enfoque Diario' : 'Daily Focus'}
          </h3>
          <ul className="space-y-3.5">
            {(getLabel(p.focus) || p.focus.en).map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-ramp-green mt-0.5 text-[10px]">●</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Team */}
        <div className="bg-white border border-ramp-border rounded-xl px-6 py-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            {lang === 'es' ? 'Equipo del Proyecto' : 'Project Team'}
          </h3>
          <div className="space-y-4">
            {p.team.map((t, i) => (
              <div key={i} className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold flex items-center justify-center">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
      >
        {lang === 'es' ? 'Ir a Proyectos' : 'Go to Projects'}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
