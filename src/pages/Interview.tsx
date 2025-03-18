
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppState } from "@/lib/store";
import { InterviewCard } from "@/components/interviews/InterviewCard";
import { ApplicationForm } from "@/components/interviews/ApplicationForm";
import { Placeholder } from "@/components/Placeholder";
import { BriefcaseBusiness } from "lucide-react";

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
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Placeholder
            title="Не указан ID"
            description="Пожалуйста, убедитесь, что в URL указан ID собеседования"
          />
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Placeholder
            title="Собеседование не найдено"
            description="Возможно, оно было удалено или еще не создано"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-interview-light/50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex items-center justify-center mb-6">
          <BriefcaseBusiness className="h-7 w-7 text-interview mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">InterviewManager</h1>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border mb-8">
            <div className="p-6">
              <InterviewCard interview={interview} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden border">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Подать заявку на собеседование</h2>
              <ApplicationForm interviewId={interview.id} />
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} InterviewManager. Все права защищены.
        </div>
      </div>
    </div>
  );
};

export default Interview;
