
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CodeVerificationForm } from "@/components/verification/CodeVerificationForm";
import { Placeholder } from "@/components/Placeholder";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/lib/store";
import { MessageCircle } from "lucide-react";

const VerifyCode = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { applicants, verifyApplicant } = useAppState();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!id) {
    return <div>Ошибка: Идентификатор заявки не найден</div>;
  }
  
  const applicant = applicants.find(a => a.id === id);
  
  if (!applicant) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Placeholder
              title="Заявка не найдена"
              description="Запрошенная заявка не существует или была удалена"
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
  
  // Если заявка уже подтверждена, перенаправляем на страницу успеха
  if (applicant.verified) {
    navigate(`/success/${id}`);
    return null;
  }
  
  const handleSubmit = (code: string) => {
    setIsSubmitting(true);
    
    try {
      const isVerified = verifyApplicant(id, code);
      
      if (isVerified) {
        // Перенаправляем на страницу успеха
        navigate(`/success/${id}`);
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      toast({
        title: "Ошибка проверки кода",
        description: "Пожалуйста, попробуйте снова позже",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
          <Card className="p-6">
            <div className="text-center mb-6">
              <div className="bg-interview-light inline-flex p-3 rounded-full mb-4">
                <MessageCircle className="h-6 w-6 text-interview" />
              </div>
              <h1 className="text-2xl font-bold">Подтвердите номер телефона</h1>
              <p className="text-gray-600 mt-1">
                На ваш номер телефона через Telegram был отправлен код подтверждения
              </p>
            </div>
            
            <CodeVerificationForm
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
            />
          </Card>
          
          <div className="mt-4 text-center">
            <Button variant="link" asChild>
              <a href="/">Вернуться на главную</a>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VerifyCode;
