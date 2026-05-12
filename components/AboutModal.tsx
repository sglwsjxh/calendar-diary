import React from 'react';
import { X, Calendar } from 'lucide-react';
import { t } from '../utils/i18n';
import { getAppVersion } from '../utils/version';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [appVersion, setAppVersion] = React.useState<string>('');

  React.useEffect(() => {
    setIsVisible(true);
    (async () => {
      const v = await getAppVersion();
      setAppVersion(v);
    })();
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-200"
      style={{
        backgroundColor: isVisible ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)',
        opacity: isVisible ? 1 : 0
      }}
    >
      <div 
        className="bg-white w-[420px] rounded-lg shadow-2xl overflow-hidden flex flex-col transition-all duration-200 ease-out"
        style={{
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          opacity: isVisible ? 1 : 0
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-100 to-stone-50 px-5 py-4 border-b border-stone-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <Calendar size={24} className="text-stone-700" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-stone-800">{t('appTitle')}</h2>
              <p className="text-xs text-stone-500">{appVersion ? `v${appVersion}` : ''}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-stone-400 hover:text-stone-600 transition-colors"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-stone-700 mb-2">{t('aboutApp')}</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('appDescription')}
            </p>
          </div>

          {/* Version Info */}
          <div className="bg-stone-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-stone-500">{t('version')}</span>
              <span className="font-mono text-stone-700">{appVersion || ''}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-stone-500">{t('platform')}</span>
              <span className="font-mono text-stone-700">
                {window.electronAPI ? 'Electron' : 'Web'}
              </span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-stone-400 pt-2 border-t border-stone-100">
            <div>© 2025 sglwsjxh. {t('allRightsReserved')}</div>
            <div className="mt-1 text-stone-300">https://github.com/sglwsjxh/calendar-diary/</div>
            <div className="mt-1 text-stone-300">Licensed under CC BY-NC 4.0</div>
          </div>
        </div>
      </div>
    </div>
  );
};
