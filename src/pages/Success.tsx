
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Placeholder } from "@/components/Placeholder";
import { useAppState } from "@/lib/store";
import { CheckCircle, Phone } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const Success = () => {
  const { id } = useParams<{ id: string }>();
  const { applicants, interviews } = useAppState();
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<number>(10);
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);
  
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
              title={t("verify.not_found")}
              description={t("verify.not_found_description")}
            />
            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link to="/">{t("common.back_to_home")}</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!applicant.verified) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Placeholder
              title={t("success.not_verified")}
              description={t("success.verify_request")}
            />
            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link to={`/code/${id}`}>{t("success.enter_code")}</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const interview = interviews.find(i => i.id === applicant.interviewId);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg">
          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 animate-pulse-slow"></div>
                </div>
                <CheckCircle className="h-16 w-16 text-green-500 relative" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">{t("success.title")}</h1>
            
            <p className="text-gray-600 mb-6">
              {t("success.description")}
              {interview && <> {t("success.for_position")} <strong>{interview.position}</strong></>}.
              {t("success.waiting_call")}
            </p>
            
            <div className="inline-flex items-center justify-center bg-gray-100 px-4 py-2 rounded-full mb-6">
              <Phone className="h-5 w-5 text-interview mr-2" />
              <span className="font-semibold">{applicant.phone}</span>
            </div>
            
            <p className="text-gray-500 text-sm mb-6">
              {t("success.hr_contact")}
            </p>
            
            <Button asChild className="w-full">
              <Link to="/">{t("common.back_to_home")}{timeLeft > 0 && ` (${timeLeft}с)`}</Link>
            </Button>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Success;
