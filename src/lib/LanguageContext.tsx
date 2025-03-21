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
    "footer.privacy_policy": "Политика конфиденциальности",
    "footer.terms_of_service": "Условия использования",
    
    // Common
    "common.back_to_home": "Вернуться на главную",
    
    // Index (Landing) page
    "index.hero_title": "Упростите процесс найма сотрудников",
    "index.hero_description": "Организуйте собеседования, управляйте кандидатами и отслеживайте результаты — всё на одной платформе",
    "index.get_started": "Начать сейчас",
    "index.learn_more": "Узнать больше",
    "index.features_title": "Все необходимые инструменты",
    "index.features_description": "Наша платформа предоставляет всё необходимое для эффективного управления процессом найма",
    "index.feature1_title": "Организация собеседований",
    "index.feature1_description": "Создавайте и управляйте собеседованиями, отслеживайте кандидатов в реальном времени",
    "index.feature1_point1": "Удобный календарь событий",
    "index.feature1_point2": "Автоматические напоминания",
    "index.feature2_title": "Управление кандидатами",
    "index.feature2_description": "Отслеживайте прогресс каждого кандидата на всех этапах отбора",
    "index.feature2_point1": "Профили кандидатов с историей",
    "index.feature2_point2": "Оценка и рейтинги",
    "index.feature3_title": "Подробная аналитика",
    "index.feature3_description": "Получайте ценные данные о процессе найма для оптимизации работы",
    "index.feature3_point1": "Аналитические отчеты",
    "index.feature3_point2": "Статистика конверсии",
    "index.how_it_works_title": "Как это работает",
    "index.how_it_works_description": "Всего три простых шага для начала работы с нашей платформой",
    "index.step1_title": "Создайте вакансию",
    "index.step1_description": "Легко создавайте вакансии с подробным описанием требований и условий",
    "index.step2_title": "Получайте отклики",
    "index.step2_description": "Кандидаты заполняют форму и подтверждают свой номер телефона",
    "index.step3_title": "Проводите собеседования",
    "index.step3_description": "Проводите встречи и выбирайте лучших кандидатов",
    "index.testimonials_title": "Отзывы клиентов",
    "index.testimonials_description": "Узнайте, что говорят о нас компании, которые уже используют нашу платформу",
    "index.testimonial1": "Благодаря jobuz мы смогли сократить время на обработку заявок кандидатов на 40%. Это стало настоящим прорывом для нашего HR-отдела.",
    "index.testimonial1_name": "Алексей Смирнов",
    "index.testimonial1_position": "HR-директор, ООО 'ТехноСтар'",
    "index.testimonial2": "Простой и удобный интерфейс платформы позволил нам легко организовать процесс найма даже для неопытных рекрутеров.",
    "index.testimonial2_name": "Елена Ковалева",
    "index.testimonial2_position": "Руководитель отдела рекрутинга, 'АльфаБизнес'",
    "index.testimonial3": "Система верификации номеров через Telegram позволила нам убедиться в серьезности намерений кандидатов и сократить количество неявок на собеседования.",
    "index.testimonial3_name": "Дмитрий Петров",
    "index.testimonial3_position": "CEO, 'Дигитал Солюшнс'",
    "index.cta_title": "Готовы улучшить процесс найма?",
    "index.cta_description": "Присоединяйтесь к сотням компаний, которые уже используют нашу платформу",
    "index.cta_button": "Начать бесплатно",
    
    // Interview page
    "interview.not_found": "Собеседование не найдено",
    "interview.not_found_description": "Возможно, оно было удалено или еще не создано",
    "interview.no_id": "Не указан ID",
    "interview.no_id_description": "Пожалуйста, убедитесь, что в URL указан ID собеседования",
    "interview.book": "Записаться на собеседование",
    "interview.hr_manager": "HR менеджер",
    "interview.active": "Активная вакансия",
    "interview.positions_available": "Доступно мест",
    "interview.rating": "Рейтинг",
    "interview.description": "Описание вакансии",
    "interview.requirements": "Требования",
    "interview.requirement1": "Высшее образование в соответствующей области",
    "interview.requirement2": "Не менее 2 лет опыта работы в аналогичной должности",
    "interview.requirement3": "Уверенное владение компьютером и профильными программами",
    "interview.requirement4": "Навыки эффективной коммуникации и работы в команде",
    "interview.benefits": "Преимущества",
    "interview.benefit1": "Официальное трудоустройство",
    "interview.benefit2": "Конкурентная зарплата",
    "interview.benefit3": "Медицинская страховка",
    "interview.benefit4": "Возможность удаленной работы",
    "interview.benefit5": "Профессиональное развитие",
    "interview.salary": "Зарплата",
    "interview.views": "Просмотры",
    "interview.applied": "Откликнулись",
    "interview.apply_now": "Откликнуться",
    
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
    "verify.error_title": "Ошибка проверки",
    "verify.error_description": "Не удалось проверить код. Пожалуйста, попробуйте снова",
    "verify.error_no_id": "Ошибка: Идентификатор заявки не найден",
    
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
    
    // Privacy page
    "privacy.title": "Политика конфиденциальности",
    "privacy.last_updated": "Последнее обновление",
    "privacy.section1_title": "Введение",
    "privacy.section1_p1": "Мы уважаем вашу конфиденциальность и стремимся защитить ваши персональные данные. Эта политика конфиденциальности объясняет, как мы собираем, используем и защищаем ваши данные при использовании нашего сервиса.",
    "privacy.section1_p2": "Используя наш сервис, вы соглашаетесь с условиями этой политики конфиденциальности. Если вы не согласны с условиями, пожалуйста, не используйте наш сервис.",
    "privacy.section2_title": "Какие данные мы собираем",
    "privacy.section2_p1": "Мы можем собирать следующие типы данных:",
    "privacy.section2_bullet1": "Персональные данные: имя, возраст, контактную информацию",
    "privacy.section2_bullet2": "Данные о вашем устройстве и интернет-соединении",
    "privacy.section2_bullet3": "Информацию о том, как вы используете наш сервис",
    "privacy.section2_bullet4": "Другую информацию, которую вы предоставляете нам",
    "privacy.section3_title": "Как мы используем ваши данные",
    "privacy.section3_p1": "Мы используем ваши данные для следующих целей:",
    "privacy.section3_bullet1": "Предоставление и поддержка нашего сервиса",
    "privacy.section3_bullet2": "Улучшение нашего сервиса и разработка новых функций",
    "privacy.section3_bullet3": "Связь с вами и ответы на ваши вопросы",
    "privacy.section4_title": "Безопасность данных",
    "privacy.section4_p1": "Мы принимаем соответствующие технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.",
    "privacy.section5_title": "Контактная информация",
    "privacy.section5_p1": "Если у вас есть вопросы или предложения по поводу нашей политики конфиденциальности, пожалуйста, свяжитесь с нами:",
    "privacy.contact_email": "Email для связи",
    
    // Terms page
    "terms.title": "Условия использования",
    "terms.last_updated": "Последнее обновление",
    "terms.section1_title": "Введение",
    "terms.section1_p1": "Добро пожаловать на платформу jobuz. Настоящие Условия использования регулируют ваш доступ и использование нашего сервиса.",
    "terms.section1_p2": "Используя наш сервис, вы соглашаетесь соблюдать настоящие Условия. Если вы не согласны с какой-либо частью условий, вы не можете использовать наш сервис.",
    "terms.section2_title": "Права и ограничения",
    "terms.section2_p1": "При использовании нашего сервиса вы обязуетесь:",
    "terms.section2_bullet1": "Не нарушать законы или права третьих лиц",
    "terms.section2_bullet2": "Не публиковать ложную или вводящую в заблуждение информацию",
    "terms.section2_bullet3": "Не пытаться получить несанкционированный доступ к системе",
    "terms.section2_bullet4": "Не использовать сервис для рассылки спама или вредоносного контента",
    "terms.section3_title": "Ответственность",
    "terms.section3_p1": "Мы не несем ответственности за какие-либо убытки или ущерб, вызванные использованием или невозможностью использования нашего сервиса.",
    "terms.section4_title": "Изменения условий",
    "terms.section4_p1": "Мы оставляем за собой право изменять эти условия в любое время. Продолжая использовать сервис после внесения изменений, вы соглашаетесь с новыми условиями.",
    "terms.section4_bullet1": "Мы уведомим вас о существенных изменениях через наш сайт",
    "terms.section4_bullet2": "Рекомендуем периодически проверять эту страницу",
    "terms.section4_bullet3": "Изменения вступают в силу сразу после публикации",
    "terms.section5_title": "Контактная информация",
    "terms.section5_p1": "Если у вас есть вопросы об этих Условиях, пожалуйста, свяжитесь с нами:",
    "terms.contact_email": "Email для связи",
    
    // Language switcher
    "language.ru": "Русский",
    "language.uz": "Узбекский"
  },
  uz: {
    // Navbar
    "nav.home": "Bosh sahifa",
    
    // Footer
    "footer.rights": "Barcha huquqlar himoyalangan.",
    "footer.privacy_policy": "Maxfiylik siyosati",
    "footer.terms_of_service": "Foydalanish shartlari",
    
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
