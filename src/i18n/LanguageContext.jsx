import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('global-calc-lang');
    if (savedLang && translations[savedLang]) return savedLang;
    const browserLang = navigator.language.slice(0, 2);
    if (translations[browserLang]) return browserLang;
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('global-calc-lang', language);
  }, [language]);

  const t = (key, nestedKey = null) => {
    try {
      if (nestedKey) {
        return translations[language][key][nestedKey] || translations['en'][key][nestedKey];
      }
      return translations[language][key] || translations['en'][key];
    } catch (e) {
      console.warn(`Translation key not found: ${key} ${nestedKey || ''}`);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
