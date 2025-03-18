
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export interface Interview {
  id: string;
  position: string;
  company: string;
  rating: number;
  salary: string;
  schedule: string;
  city: string;
  district: string;
  address: string;
  description: string;
  logo?: string;
  createdAt: Date;
}

export interface Applicant {
  id: string;
  interviewId: string;
  name: string;
  age: number;
  phone: string;
  telegramCode: string;
  verified: boolean;
  createdAt: Date;
}

interface AppState {
  interviews: Interview[];
  applicants: Applicant[];
  addInterview: (interview: Omit<Interview, 'id' | 'createdAt'>) => void;
  updateInterview: (id: string, interview: Partial<Interview>) => void;
  deleteInterview: (id: string) => void;
  getInterview: (id: string) => Interview | undefined;
  addApplicant: (applicant: Omit<Applicant, 'id' | 'createdAt' | 'verified' | 'telegramCode'>) => Applicant;
  verifyApplicant: (id: string, code: string) => boolean;
}

const AppContext = createContext<AppState | undefined>(undefined);

// Демо данные для примера
const sampleInterviews: Interview[] = [
  {
    id: "demo1",
    position: "Frontend Developer",
    company: "Tech Solutions",
    rating: 4,
    salary: "120,000 - 150,000 ₽",
    schedule: "Полный день",
    city: "Москва",
    district: "Центральный",
    address: "ул. Ленина, 15",
    description: "<p>Мы ищем опытного Frontend разработчика со знанием React.</p>",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: "demo2",
    position: "UX/UI Designer",
    company: "Creative Studio",
    rating: 5,
    salary: "130,000 - 170,000 ₽",
    schedule: "Гибкий график",
    city: "Санкт-Петербург",
    district: "Петроградский",
    address: "Невский пр., 25",
    description: "<p>Требуется креативный дизайнер для создания пользовательских интерфейсов.</p>",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [interviews, setInterviews] = useState<Interview[]>(sampleInterviews);
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  // Имитация загрузки данных
  useEffect(() => {
    try {
      const savedInterviews = localStorage.getItem('interviews');
      const savedApplicants = localStorage.getItem('applicants');
      
      if (savedInterviews) {
        const parsed = JSON.parse(savedInterviews);
        setInterviews(parsed.map((i: any) => ({
          ...i,
          createdAt: new Date(i.createdAt)
        })));
      }
      
      if (savedApplicants) {
        const parsed = JSON.parse(savedApplicants);
        setApplicants(parsed.map((a: any) => ({
          ...a,
          createdAt: new Date(a.createdAt)
        })));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
  }, []);

  // Сохранение данных при изменении
  useEffect(() => {
    try {
      localStorage.setItem('interviews', JSON.stringify(interviews));
      localStorage.setItem('applicants', JSON.stringify(applicants));
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
    }
  }, [interviews, applicants]);

  const addInterview = (interview: Omit<Interview, 'id' | 'createdAt'>) => {
    const newInterview: Interview = {
      ...interview,
      id: Math.random().toString(36).substring(2, 10),
      createdAt: new Date()
    };
    
    setInterviews(prev => [...prev, newInterview]);
    toast({
      title: "Собеседование создано",
      description: `Вакансия "${interview.position}" добавлена`
    });
    
    return newInterview;
  };

  const updateInterview = (id: string, interviewData: Partial<Interview>) => {
    setInterviews(prev => 
      prev.map(interview => 
        interview.id === id ? { ...interview, ...interviewData } : interview
      )
    );
    
    toast({
      title: "Собеседование обновлено",
      description: "Данные успешно сохранены"
    });
  };

  const deleteInterview = (id: string) => {
    const interview = interviews.find(i => i.id === id);
    
    setInterviews(prev => prev.filter(interview => interview.id !== id));
    setApplicants(prev => prev.filter(applicant => applicant.interviewId !== id));
    
    if (interview) {
      toast({
        title: "Собеседование удалено",
        description: `Вакансия "${interview.position}" удалена`
      });
    }
  };

  const getInterview = (id: string) => {
    return interviews.find(interview => interview.id === id);
  };

  const addApplicant = (applicantData: Omit<Applicant, 'id' | 'createdAt' | 'verified' | 'telegramCode'>) => {
    // Генерируем 5-значный код подтверждения
    const telegramCode = Math.floor(10000 + Math.random() * 90000).toString();
    
    const newApplicant: Applicant = {
      ...applicantData,
      id: Math.random().toString(36).substring(2, 10),
      telegramCode,
      verified: false,
      createdAt: new Date()
    };
    
    setApplicants(prev => [...prev, newApplicant]);
    
    return newApplicant;
  };

  const verifyApplicant = (id: string, code: string) => {
    const applicant = applicants.find(a => a.id === id);
    
    if (!applicant) {
      toast({
        title: "Ошибка проверки",
        description: "Заявка не найдена",
        variant: "destructive"
      });
      return false;
    }
    
    if (applicant.telegramCode === code) {
      setApplicants(prev => 
        prev.map(a => 
          a.id === id ? { ...a, verified: true } : a
        )
      );
      
      toast({
        title: "Код подтвержден",
        description: "Ваша заявка принята"
      });
      
      return true;
    }
    
    toast({
      title: "Неверный код",
      description: "Пожалуйста, проверьте код и попробуйте снова",
      variant: "destructive"
    });
    
    return false;
  };

  return (
    <AppContext.Provider 
      value={{ 
        interviews, 
        applicants, 
        addInterview, 
        updateInterview, 
        deleteInterview, 
        getInterview, 
        addApplicant, 
        verifyApplicant 
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context;
};
