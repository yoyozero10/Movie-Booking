import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from './i18n';
import { Currency } from './currency';

interface LocaleContextType {
    language: Language;
    currency: Currency;
    setLanguage: (lang: Language) => void;
    setCurrency: (curr: Currency) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved as Language) || 'en';
    });

    const [currency, setCurrencyState] = useState<Currency>(() => {
        const saved = localStorage.getItem('currency');
        return (saved as Currency) || 'VND';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        // Auto-switch currency based on language
        if (lang === 'vi') {
            setCurrency('VND');
        } else {
            setCurrency('USD');
        }
    };

    const setCurrency = (curr: Currency) => {
        setCurrencyState(curr);
        localStorage.setItem('currency', curr);
    };

    return (
        <LocaleContext.Provider value={{ language, currency, setLanguage, setCurrency }}>
            {children}
        </LocaleContext.Provider>
    );
};

export const useLocale = () => {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within LocaleProvider');
    }
    return context;
};
