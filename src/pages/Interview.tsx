import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppState } from "@/lib/store";
import { InterviewCard } from "@/components/interviews/InterviewCard";
import { ApplicationForm } from "@/components/interviews/ApplicationForm";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Placeholder } from "@/components/Placeholder";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Interview = () => {
  const { id } = useParams<{ id: string }>();
  const { getInterview, incrementViews } = useAppState();
  const interview = id ? getInterview(id) : undefined;
  
  useEffect(() => {
    if (id) {
      // Increment view counter when interview page is loaded
      incrementViews(id);
    }
  }, [id, incrementViews]);

  if (!id) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Placeholder
              title="Не указан ID"
              description="Пожалуйста, убедитесь, что в URL указан ID собеседования"
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Placeholder
              title="Собеседование не найдено"
              description="Возможно, оно было удалено или еще не создано"
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-4 pl-0">
            <Link to="/panel" className="flex items-center">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Назад в панель управления
            </Link>
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:order-2">
              <InterviewCard interview={interview} />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Подать заявку</h2>
              <ApplicationForm interviewId={interview.id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Interview;
