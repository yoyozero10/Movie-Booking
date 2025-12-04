import { Globe } from 'lucide-react';
import { useLocale } from '../lib/LocaleContext';
import { Language } from '../lib/i18n';

export function LanguageSwitcher() {
    const { language, setLanguage } = useLocale();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'vi' : 'en');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            title={language === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'}
        >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium uppercase">{language}</span>
        </button>
    );
}
