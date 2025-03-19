
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppState } from "@/lib/store";
import { InterviewCard } from "@/components/interviews/InterviewCard";
import { ApplicationForm } from "@/components/interviews/ApplicationForm";
import { Placeholder } from "@/components/Placeholder";
import { Circle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/LanguageContext";

const Interview = () => {
  const { id } = useParams<{ id: string }>();
  const { getInterview, incrementViews } = useAppState();
  const { t } = useLanguage();
  const interview = id ? getInterview(id) : undefined;
  
  const hrName = useMemo(() => {
    const hrNames = ["Анна Кравец", "Елена Иванова", "Мария Петрова"];
    const nameIndex = id ? 
      Math.abs(id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % hrNames.length : 
      0;
    return hrNames[nameIndex];
  }, [id]);
  
  useEffect(() => {
    if (id) {
      incrementViews(id);
    }
  }, [id, incrementViews]);

  const pulseClass = "absolute bottom-0 right-0 animate-pulse bg-green-500 rounded-full h-3 w-3 border border-white";

  if (!id) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Placeholder
            title={t("interview.no_id")}
            description={t("interview.no_id_description")}
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
            title={t("interview.not_found")}
            description={t("interview.not_found_description")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-interview-light to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border mb-8">
            <div className="p-6">
              <InterviewCard interview={interview} showHRInfo={true} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden border">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
                {t("interview.book")}
                <div className="relative ml-2">
                  <Circle fill="green" className="h-3 w-3 text-green-500" />
                  <span className={pulseClass}></span>
                </div>
              </h2>
              <ApplicationForm interviewId={interview.id} />
              
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center">
                  <div className="relative">
                    <Avatar className="h-16 w-16 border-2 border-interview">
                      <AvatarImage src="https://source.unsplash.com/featured/?woman,office,business" alt={hrName} />
                      <AvatarFallback>{hrName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0">
                      <Circle fill="green" className="h-3 w-3 text-green-500" />
                      <span className={pulseClass}></span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{hrName}</h3>
                    <p className="text-gray-600">{t("interview.hr_manager")} {interview.company}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} jobuz. {t("footer.rights")}
        </div>
      </div>
    </div>
  );
};

export default Interview;
