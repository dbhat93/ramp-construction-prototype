import { useState, useEffect } from 'react';
import { CheckCircle, Smartphone, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const messagesByLang = {
  en: [
    { from: 'ramp', text: '\ud83d\udcb3 $347.82 at Home Depot. Reply with project # or tap to code.', delay: 0 },
    { from: 'user', text: '4521', delay: 1200 },
    { from: 'ramp', text: 'Got it! Project: Sunset Heights (#4521). Cost code?', delay: 2200 },
    { from: 'user', text: 'concrete', delay: 3400 },
    { from: 'ramp', text: '\u2705 Coded to 03300 - Concrete. Send receipt photo to complete.', delay: 4400 },
    { from: 'user', text: '\ud83d\udcf7 [Receipt photo]', isImage: true, delay: 5800 },
    { from: 'ramp', text: '\u2705 Receipt captured. All set!', delay: 6800 },
  ],
  es: [
    { from: 'ramp', text: '\ud83d\udcb3 $347.82 en Home Depot. Responde con # de proyecto o toca para codificar.', delay: 0 },
    { from: 'user', text: '4521', delay: 1200 },
    { from: 'ramp', text: '\u00a1Entendido! Proyecto: Sunset Heights (#4521). \u00bfC\u00f3digo de costo?', delay: 2200 },
    { from: 'user', text: 'concreto', delay: 3400 },
    { from: 'ramp', text: '\u2705 Codificado a 03300 - Concreto. Env\u00eda foto del recibo para completar.', delay: 4400 },
    { from: 'user', text: '\ud83d\udcf7 [Foto del recibo]', isImage: true, delay: 5800 },
    { from: 'ramp', text: '\u2705 Recibo capturado. \u00a1Listo!', delay: 6800 },
  ],
  pt: [
    { from: 'ramp', text: '\ud83d\udcb3 $347.82 na Home Depot. Responda com # do projeto ou toque para codificar.', delay: 0 },
    { from: 'user', text: '4521', delay: 1200 },
    { from: 'ramp', text: 'Entendido! Projeto: Sunset Heights (#4521). C\u00f3digo de custo?', delay: 2200 },
    { from: 'user', text: 'concreto', delay: 3400 },
    { from: 'ramp', text: '\u2705 Codificado para 03300 - Concreto. Envie foto do recibo para completar.', delay: 4400 },
    { from: 'user', text: '\ud83d\udcf7 [Foto do recibo]', isImage: true, delay: 5800 },
    { from: 'ramp', text: '\u2705 Recibo capturado. Pronto!', delay: 6800 },
  ],
  zh: [
    { from: 'ramp', text: '\ud83d\udcb3 $347.82 \u5728Home Depot\u3002\u56de\u590d\u9879\u76ee\u53f7\u6216\u70b9\u51fb\u7f16\u7801\u3002', delay: 0 },
    { from: 'user', text: '4521', delay: 1200 },
    { from: 'ramp', text: '\u6536\u5230\uff01\u9879\u76ee\uff1aSunset Heights (#4521)\u3002\u6210\u672c\u4ee3\u7801\uff1f', delay: 2200 },
    { from: 'user', text: '\u6df7\u51dd\u571f', delay: 3400 },
    { from: 'ramp', text: '\u2705 \u7f16\u7801\u4e3a 03300 - \u6df7\u51dd\u571f\u3002\u53d1\u9001\u6536\u636e\u7167\u7247\u4ee5\u5b8c\u6210\u3002', delay: 4400 },
    { from: 'user', text: '\ud83d\udcf7 [\u6536\u636e\u7167\u7247]', isImage: true, delay: 5800 },
    { from: 'ramp', text: '\u2705 \u6536\u636e\u5df2\u6355\u83b7\u3002\u5b8c\u6210\uff01', delay: 6800 },
  ],
  pl: [
    { from: 'ramp', text: '\ud83d\udcb3 $347.82 w Home Depot. Odpowiedz numerem projektu lub dotknij aby zakodowa\u0107.', delay: 0 },
    { from: 'user', text: '4521', delay: 1200 },
    { from: 'ramp', text: 'Rozumiem! Projekt: Sunset Heights (#4521). Kod kosztu?', delay: 2200 },
    { from: 'user', text: 'beton', delay: 3400 },
    { from: 'ramp', text: '\u2705 Zakodowane jako 03300 - Beton. Wy\u015blij zdj\u0119cie paragonu aby zako\u0144czy\u0107.', delay: 4400 },
    { from: 'user', text: '\ud83d\udcf7 [Zdj\u0119cie paragonu]', isImage: true, delay: 5800 },
    { from: 'ramp', text: '\u2705 Paragon przechwycony. Gotowe!', delay: 6800 },
  ],
};

function ChatBubble({ msg, visible }) {
  if (!visible) return null;
  const isRamp = msg.from === 'ramp';
  return (
    <div className={`flex ${isRamp ? 'justify-start' : 'justify-end'} animate-fade-up`}>
      <div
        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isRamp
            ? 'bg-gray-100 text-gray-900 rounded-bl-md'
            : 'bg-emerald-500 text-white rounded-br-md'
        } ${msg.isImage ? 'bg-emerald-500/90' : ''}`}
      >
        {msg.isImage ? (
          <div className="flex items-center gap-2">
            <div className="w-16 h-20 bg-white/20 rounded-lg flex items-center justify-center text-white/70 text-xs">
              IMG
            </div>
            <span>{msg.text.replace(/\ud83d\udcf7 /, '')}</span>
          </div>
        ) : (
          msg.text
        )}
      </div>
    </div>
  );
}

export default function SmsFlow() {
  const { language, t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const messages = messagesByLang[language] || messagesByLang.en;

  useEffect(() => {
    setVisibleCount(0);
    setShowResult(false);
    const timers = messages.map((msg, i) =>
      setTimeout(() => setVisibleCount(i + 1), msg.delay)
    );
    const resultTimer = setTimeout(() => setShowResult(true), 7500);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(resultTimer);
    };
  }, [language, animKey]);

  const restart = () => {
    setVisibleCount(0);
    setShowResult(false);
    setAnimKey((k) => k + 1);
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('smsReceiptFlow')}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {t('smsSubtitle')}
          </p>
        </div>
        <button
          onClick={restart}
          className="bg-ramp-green hover:bg-ramp-green-dark text-gray-900 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          {t('replayDemo')}
        </button>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Phone mockup - left 2 cols */}
        <div className="col-span-2">
          <div className="bg-gray-900 rounded-[2.5rem] p-3 max-w-[340px] mx-auto shadow-2xl">
            <div className="bg-white rounded-[2rem] overflow-hidden">
              {/* Phone status bar */}
              <div className="bg-gray-900 text-white px-6 py-2 flex justify-between items-center text-xs">
                <span>9:41</span>
                <div className="w-20 h-5 bg-gray-800 rounded-full" />
                <span>100%</span>
              </div>
              {/* Chat header */}
              <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-ramp-green flex items-center justify-center">
                  <Smartphone size={14} className="text-gray-900" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Ramp</p>
                  <p className="text-[10px] text-gray-400">SMS</p>
                </div>
              </div>
              {/* Messages */}
              <div className="p-4 space-y-3 min-h-[420px] bg-white">
                {messages.map((msg, i) => (
                  <ChatBubble key={`${animKey}-${i}`} msg={msg} visible={i < visibleCount} />
                ))}
              </div>
              {/* Input bar */}
              <div className="border-t border-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-xs text-gray-400">
                  Text Message
                </div>
                <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">&uarr;</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time result - right 3 cols */}
        <div className="col-span-3">
          <div className="border border-ramp-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap size={18} className="text-ramp-green" />
              {t('realTimeCoding')}
            </h2>

            {showResult ? (
              <div className="animate-fade-up space-y-4">
                {/* Transaction card */}
                <div className="border border-ramp-border rounded-xl p-5 bg-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">$347.82</p>
                      <p className="text-sm text-gray-500 mt-0.5">Home Depot &middot; Mar 20, 2026</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle size={12} /> Coded
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      ['AI Confidence', '98%'],
                      ['Employee', 'Oscar Martinez'],
                      ['Project', 'Sunset Heights Commercial'],
                      ['Card', '****7743'],
                      ['Cost Code', '03300 - Concrete'],
                      ['Category', 'Materials'],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                        <p className="text-sm font-medium text-gray-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status badges */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                    <CheckCircle size={20} className="text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-medium text-emerald-700">{t('receiptCaptured')}</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                    <CheckCircle size={20} className="text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-medium text-emerald-700">{t('aiCostCoded')}</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                    <CheckCircle size={20} className="text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-medium text-emerald-700">{t('autoApproved')}</p>
                    <p className="text-[10px] text-emerald-600 mt-0.5">{t('underThreshold')}</p>
                  </div>
                </div>

                {/* Insight */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                  <p className="font-medium mb-1">{t('howItWorks')}</p>
                  <p className="text-blue-700 text-xs leading-relaxed">
                    Ramp sends an SMS when a card is swiped. The field worker replies with a project
                    number and cost code keyword. AI matches it to the correct CSI code, captures the
                    receipt photo, and auto-approves if under the set threshold. No app download required.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                <div className="text-center">
                  <div className="animate-pulse mb-2">
                    <Smartphone size={32} className="mx-auto" />
                  </div>
                  <p className="text-sm">{t('waitingSms')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
