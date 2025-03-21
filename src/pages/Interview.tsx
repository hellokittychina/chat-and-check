import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppState } from "@/lib/store";
import { InterviewCard } from "@/components/interviews/InterviewCard";
import { ApplicationForm } from "@/components/interviews/ApplicationForm";
import { Placeholder } from "@/components/Placeholder";
import { MessageCircle, Circle, MapPin, Briefcase, Clock, Users, CheckCircle, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";

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
  
  const locationInfo = [
    interview.city,
    interview.district,
    interview.address
  ].filter(Boolean).join(", ");

  return (
    <div className="min-h-screen bg-gradient-to-b from-interview-light/60 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-interview hover:text-interview-dark inline-flex items-center mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t("common.back_to_home")}
          </Link>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-0 mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{interview.position}</h1>
                    <Badge variant="outline" className="ml-3 bg-interview/10 text-interview border-interview/20">
                      {t("interview.active")}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-lg text-gray-700 mb-4">
                    <Briefcase className="h-5 w-5 text-interview mr-2" />
                    <span className="font-medium">{interview.company}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-interview mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{locationInfo}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-interview mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{interview.schedule}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-interview mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{t("interview.positions_available")}: 3</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-interview mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{t("interview.rating")}: {interview.rating}/5</span>
                    </div>
                  </div>
                  
                  {interview.description && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-3">{t("interview.description")}</h2>
                      <div className="text-gray-700 prose max-w-none" 
                           dangerouslySetInnerHTML={{ __html: interview.description }} />
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">{t("interview.requirements")}</h2>
                    <ul className="space-y-2">
                      {[1, 2, 3, 4].map((item) => (
                        <li key={item} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-interview mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            {t(`interview.requirement${item}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="hidden md:block">
                    <h2 className="text-xl font-semibold mb-3">{t("interview.benefits")}</h2>
                    <div className="flex flex-wrap gap-2">
                      {[
                        t("interview.benefit1"),
                        t("interview.benefit2"),
                        t("interview.benefit3"),
                        t("interview.benefit4"),
                        t("interview.benefit5")
                      ].map((benefit, index) => (
                        <Badge key={index} variant="outline" className="bg-interview/10 text-interview border-interview/20">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="md:w-64 flex-shrink-0">
                  <Card className="p-4 border-0 shadow-sm bg-interview-light/30">
                    <div className="font-semibold text-lg mb-3 text-gray-900">{t("interview.salary")}</div>
                    <div className="text-2xl font-bold text-interview mb-4">{interview.salary}</div>
                    
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center mb-2">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{t("interview.views")}: {interview.views}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>{t("interview.applied")}: {interview.applicants || 0}</span>
                      </div>
                    </div>
                  </Card>
                  
                  <div className="hidden md:block mt-4">
                    <Button className="w-full bg-interview hover:bg-interview-dark" asChild>
                      <a href="#apply-form">{t("interview.apply_now")}</a>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="md:hidden mt-6">
                <h2 className="text-xl font-semibold mb-3">{t("interview.benefits")}</h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    t("interview.benefit1"),
                    t("interview.benefit2"),
                    t("interview.benefit3"),
                    t("interview.benefit4"),
                    t("interview.benefit5")
                  ].map((benefit, index) => (
                    <Badge key={index} variant="outline" className="bg-interview/10 text-interview border-interview/20">
                      {benefit}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button className="w-full bg-interview hover:bg-interview-dark" asChild>
                    <a href="#apply-form">{t("interview.apply_now")}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div id="apply-form" className="bg-white rounded-xl shadow-md overflow-hidden border-0">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
                {t("interview.book")}
                <div className="relative ml-2">
                  <Circle fill="green" className="h-3 w-3 text-interview" />
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
                      <Circle fill="green" className="h-3 w-3 text-interview" />
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
