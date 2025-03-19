
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ru" | "uz";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Navbar
    "nav.home": "Главная",
    
    // Footer
    "footer.rights": "Все права защищены.",
    
    // Common
    "common.back_to_home": "Вернуться на главную",
    
    // Interview page
    "interview.not_found": "Собеседование не найдено",
    "interview.not_found_description": "Возможно, оно было удалено или еще не создано",
    "interview.no_id": "Не указан ID",
    "interview.no_id_description": "Пожалуйста, убедитесь, что в URL указан ID собеседования",
    "interview.book": "Записаться на собеседование",
    "interview.hr_manager": "HR менеджер",
    
    // Application form
    "form.name": "Ваше имя*",
    "form.age": "Ваш возраст*",
    "form.phone": "Номер телефона*",
    "form.phone_note": "На этот номер будет отправлен код подтверждения",
    "form.book": "Записаться на собеседование",
    "form.submitting": "Отправка...",
    
    // Verify code page
    "verify.title": "Подтвердите номер телефона",
    "verify.description": "На ваш номер телефона через Telegram был отправлен код подтверждения",
    "verify.not_found": "Заявка не найдена",
    "verify.not_found_description": "Запрошенная заявка не существует или была удалена",
    
    // Success page
    "success.title": "Запись подтверждена!",
    "success.description": "Вы успешно записаны на собеседование",
    "success.for_position": "на должность",
    "success.waiting_call": "Ожидайте звонка по номеру:",
    "success.hr_contact": "Наш представитель свяжется с вами в ближайшее время для уточнения деталей и подтверждения времени собеседования.",
    "success.not_verified": "Заявка не подтверждена",
    "success.verify_request": "Пожалуйста, подтвердите свой номер телефона",
    "success.enter_code": "Ввести код подтверждения",
    
    // 404 page
    "404.title": "Упс! Страница не найдена",
    "404.description": "Страница, которую вы ищете, не существует или была перемещена.",
    
    // Language switcher
    "language.ru": "Русский",
    "language.uz": "Узбекский"
  },
  uz: {
    // Navbar
    "nav.home": "Bosh sahifa",
    
    // Footer
    "footer.rights": "Barcha huquqlar himoyalangan.",
    
    // Common
    "common.back_to_home": "Bosh sahifaga qaytish",
    
    // Interview page
    "interview.not_found": "Suhbat topilmadi",
    "interview.not_found_description": "Ehtimol, u oʻchirilgan yoki hali yaratilmagan",
    "interview.no_id": "ID ko'rsatilmagan",
    "interview.no_id_description": "Iltimos, URL manzilida suhbat ID si ko'rsatilganligiga ishonch hosil qiling",
    "interview.book": "Suhbatga yozilish",
    "interview.hr_manager": "HR menejer",
    
    // Application form
    "form.name": "Ismingiz*",
    "form.age": "Yoshingiz*",
    "form.phone": "Telefon raqamingiz*",
    "form.phone_note": "Ushbu raqamga tasdiqlash kodi yuboriladi",
    "form.book": "Suhbatga yozilish",
    "form.submitting": "Yuborilmoqda...",
    
    // Verify code page
    "verify.title": "Telefon raqamingizni tasdiqlang",
    "verify.description": "Telegram orqali telefon raqamingizga tasdiqlash kodi yuborildi",
    "verify.not_found": "Ariza topilmadi",
    "verify.not_found_description": "So'ralgan ariza mavjud emas yoki o'chirilgan",
    
    // Success page
    "success.title": "Ro'yxatdan o'tish tasdiqlandi!",
    "success.description": "Siz suhbatga muvaffaqiyatli yozildingiz",
    "success.for_position": "lavozimiga",
    "success.waiting_call": "Quyidagi raqamga qo'ng'iroqni kuting:",
    "success.hr_contact": "Vakilimiz tafsilotlarni aniqlash va suhbat vaqtini tasdiqlash uchun tez orada siz bilan bog'lanadi.",
    "success.not_verified": "Ariza tasdiqlanmagan",
    "success.verify_request": "Iltimos, telefon raqamingizni tasdiqlang",
    "success.enter_code": "Tasdiqlash kodini kiriting",
    
    // 404 page
    "404.title": "Afsuski! Sahifa topilmadi",
    "404.description": "Siz qidirayotgan sahifa mavjud emas yoki koʻchirilgan.",
    
    // Language switcher
    "language.ru": "Ruscha",
    "language.uz": "O'zbekcha"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const storedLanguage = localStorage.getItem("language");
    return (storedLanguage === "uz" ? "uz" : "ru") as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
