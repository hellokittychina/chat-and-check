
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InterviewCard } from "@/components/interviews/InterviewCard";
import { ApplicationForm } from "@/components/interviews/ApplicationForm";
import { Placeholder } from "@/components/Placeholder";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/lib/store";
import { Info } from "lucide-react";

const Interview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { interviews, getInterview, addApplicant } = useAppState();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!id) {
    return <div>Ошибка: Идентификатор собеседования не найден</div>;
  }
  
  const interview = getInterview(id);
  
  if (!interview) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Placeholder
              title="Собеседование не найдено"
              description="Запрошенное собеседование не существует или было удалено"
            />
            <div className="flex justify-center mt-8">
              <Button asChild>
                <a href="/">Вернуться на главную</a>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleSubmit = (formData: { name: string; age: number; phone: string }) => {
    setIsSubmitting(true);
    
    try {
      const applicant = addApplicant({
        interviewId: id,
        ...formData
      });
      
      toast({
        title: "Заявка отправлена",
        description: "Пожалуйста, введите код подтверждения, который придет в Telegram"
      });
      
      // Перенаправляем на страницу подтверждения кода
      navigate(`/code/${applicant.id}`);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Ошибка отправки заявки",
        description: "Пожалуйста, попробуйте снова позже",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-6">Запись на собеседование</h1>
              
              <Card className="p-6 mb-6">
                <div className="mb-4">
                  <InterviewCard interview={interview} />
                </div>
                
                <Separator className="my-4" />
                
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Описание вакансии</h3>
                  <div 
                    className="text-gray-700 prose"
                    dangerouslySetInnerHTML={{ __html: interview.description }}
                  />
                </div>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Заполните анкету</h2>
                
                <div className="flex items-start bg-blue-50 p-3 rounded-md mb-6">
                  <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" />
                  <p className="text-sm text-blue-700">
                    После отправки заявки вам потребуется подтвердить номер телефона с помощью кода, который придет в Telegram
                  </p>
                </div>
                
                <ApplicationForm
                  onSubmit={handleSubmit}
                  isLoading={isSubmitting}
                />
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Interview;
