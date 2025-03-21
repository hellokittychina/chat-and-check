
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Shield, Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";

const Privacy = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto bg-white p-8 shadow-md border-0">
            <div className="flex items-center mb-8">
              <div className="bg-interview/10 p-3 rounded-full">
                <Shield className="h-8 w-8 text-interview" />
              </div>
              <h1 className="text-3xl font-bold ml-4">{t("privacy.title")}</h1>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-500 mb-8 border-b pb-4">
                {t("privacy.last_updated")}: {new Date().toLocaleDateString(language === 'uz' ? 'uz-UZ' : 'ru-RU')}
              </p>
              
              <div className="mb-8 bg-gray-50 p-6 rounded-lg border-l-4 border-interview">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("privacy.section1_title")}</h2>
                <p className="text-gray-700 mb-3">
                  {t("privacy.section1_p1")}
                </p>
                <p className="text-gray-700">
                  {t("privacy.section1_p2")}
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-interview/10 w-8 h-8 inline-flex items-center justify-center rounded-full mr-2 text-interview font-bold">1</span>
                  {t("privacy.section2_title")}
                </h2>
                <p className="text-gray-700 mb-4 pl-10">
                  {t("privacy.section2_p1")}
                </p>
                <ul className="pl-10 space-y-2">
                  <li className="flex items-start text-gray-700">
                    <Check className="h-5 w-5 text-interview mr-2 shrink-0 mt-0.5" />
                    <span>{t("privacy.section2_bullet1")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <Check className="h-5 w-5 text-interview mr-2 shrink-0 mt-0.5" />
                    <span>{t("privacy.section2_bullet2")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <Check className="h-5 w-5 text-interview mr-2 shrink-0 mt-0.5" />
                    <span>{t("privacy.section2_bullet3")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <Check className="h-5 w-5 text-interview mr-2 shrink-0 mt-0.5" />
                    <span>{t("privacy.section2_bullet4")}</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-8 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-interview/10 w-8 h-8 inline-flex items-center justify-center rounded-full mr-2 text-interview font-bold">2</span>
                  {t("privacy.section3_title")}
                </h2>
                <p className="text-gray-700 mb-4">
                  {t("privacy.section3_p1")}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-gray-700">
                    <Check className="h-5 w-5 text-interview mr-2 shrink-0 mt-0.5" />
                    <span>{t("privacy.section3_bullet1")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <Check className="h-5 w-5 text-interview mr-2 shrink-0 mt-0.5" />
                    <span>{t("privacy.section3_bullet2")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <Check className="h-5 w-5 text-interview mr-2 shrink-0 mt-0.5" />
                    <span>{t("privacy.section3_bullet3")}</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-interview/10 w-8 h-8 inline-flex items-center justify-center rounded-full mr-2 text-interview font-bold">3</span>
                  {t("privacy.section4_title")}
                </h2>
                <p className="text-gray-700 pl-10">
                  {t("privacy.section4_p1")}
                </p>
              </div>
              
              <div className="mb-8 bg-gray-50 p-6 rounded-lg border-l-4 border-interview">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("privacy.section5_title")}</h2>
                <p className="text-gray-700">
                  {t("privacy.section5_p1")}
                </p>
                <p className="mt-4 font-bold text-interview">
                  {t("privacy.contact_email")}: support@jobuz.uz
                </p>
              </div>
              
              <div className="mt-10 pt-6 border-t">
                <Link to="/" className="text-interview hover:text-interview-dark font-medium flex items-center">
                  <ChevronRight className="mr-1 h-4 w-4" />
                  {t("common.back_to_home")}
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
