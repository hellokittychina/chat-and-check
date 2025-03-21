
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CodeVerificationForm } from "@/components/verification/CodeVerificationForm";
import { Placeholder } from "@/components/Placeholder";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/lib/store";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const VerifyCode = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { applicants, verifyApplicant } = useAppState();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!id) {
    return <div>{t("verify.error_no_id")}</div>;
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
              <Button asChild className="bg-telegram hover:bg-telegram-dark">
                <Link to="/">{t("common.back_to_home")}</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // If the application is already verified, redirect to success page
  if (applicant.verified) {
    navigate(`/success/${id}`);
    return null;
  }
  
  const handleSubmit = (code: string) => {
    setIsSubmitting(true);
    
    try {
      const isVerified = verifyApplicant(id, code);
      
      if (isVerified) {
        // Redirect to success page
        navigate(`/success/${id}`);
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      toast({
        title: t("verify.error_title"),
        description: t("verify.error_description"),
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-telegram-light/60 to-white">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
          <Card className="p-6 shadow-lg border-0">
            <div className="text-center mb-6">
              <div className="bg-telegram-light inline-flex p-3 rounded-full mb-4">
                <MessageCircle className="h-6 w-6 text-telegram" />
              </div>
              <h1 className="text-2xl font-bold">{t("verify.title")}</h1>
              <p className="text-gray-600 mt-1">
                {t("verify.description")}
              </p>
            </div>
            
            <CodeVerificationForm
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
            />
          </Card>
          
          <div className="mt-4 text-center">
            <Button variant="link" asChild className="text-telegram">
              <Link to="/">{t("common.back_to_home")}</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VerifyCode;
