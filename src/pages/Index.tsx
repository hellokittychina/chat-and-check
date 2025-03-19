
import { Link } from "react-router-dom";
import { ChevronRight, Users, BarChart } from "lucide-react";
import { InterviewCard } from "@/components/interviews/InterviewCard";
import { useAppState } from "@/lib/store";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  const { interviews } = useAppState();
  
  // Берем только 3 последних собеседования для отображения на лендинге
  const recentInterviews = [...interviews]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Герой-секция */}
        <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                  Управляйте собеседованиями эффективно
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-6">
                  Создавайте вакансии, управляйте заявками и оптимизируйте процесс найма с нашей платформой.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-6 rounded-lg shadow-lg border relative">
                  <div className="absolute -top-4 -right-4 bg-gray-800 text-white p-2 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.7157 20.2843 5.40974 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.0799 2 8.2V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19H15" stroke="white" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 15L17 19M17 15L21 19" stroke="white" stroke-width="2" strokeLinecap="round"/>
                      <path d="M13 5V3M7 5V3M19 5V3" stroke="white" stroke-width="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Преимущества нашего сервиса</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-800 mr-2 shrink-0 mt-0.5" />
                      <span>Удобное создание и управление вакансиями</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-800 mr-2 shrink-0 mt-0.5" />
                      <span>Автоматизированный сбор заявок от кандидатов</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-800 mr-2 shrink-0 mt-0.5" />
                      <span>Интеграция с Telegram для подтверждения заявок</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-800 mr-2 shrink-0 mt-0.5" />
                      <span>Структурированное хранение данных о кандидатах</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Секция с возможностями */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Возможности платформы</h2>
              <p className="mt-4 text-xl text-gray-600">Все необходимые инструменты для эффективного процесса подбора персонала</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="inline-flex items-center justify-center bg-gray-100 p-3 rounded-lg mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.7157 20.2843 5.40974 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.0799 2 8.2V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19H15" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 5V3M7 5V3M19 5V3" stroke="currentColor" stroke-width="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Создание вакансий</h3>
                <p className="text-gray-600">
                  Удобный интерфейс для создания детальных описаний вакансий с визуальным редактором
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="inline-flex items-center justify-center bg-gray-100 p-3 rounded-lg mb-4">
                  <Users className="h-6 w-6 text-gray-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Управление кандидатами</h3>
                <p className="text-gray-600">
                  Сбор и организация данных о кандидатах на различные вакансии
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="inline-flex items-center justify-center bg-gray-100 p-3 rounded-lg mb-4">
                  <BarChart className="h-6 w-6 text-gray-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Аналитика и статистика</h3>
                <p className="text-gray-600">
                  Отслеживание эффективности вакансий и анализ потока кандидатов
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Секция с активными вакансиями */}
        {recentInterviews.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Актуальные вакансии</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentInterviews.map((interview) => (
                  <InterviewCard 
                    key={interview.id} 
                    interview={interview} 
                    showApplyButton
                  />
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* CTA-секция */}
        <section className="py-16 bg-gray-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Готовы оптимизировать процесс собеседований?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Наша платформа поможет вам сделать процесс найма более эффективным и удобным для всех участников
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default Index;
