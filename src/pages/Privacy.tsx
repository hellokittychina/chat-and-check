
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";
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
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-interview mr-3" />
              <h1 className="text-3xl font-bold">{t("privacy.title")}</h1>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-500 mb-8">
                {t("privacy.last_updated")}: {new Date().toLocaleDateString(language === 'uz' ? 'uz-UZ' : 'ru-RU')}
              </p>
              
              <h2>{t("privacy.section1_title")}</h2>
              <p>
                {t("privacy.section1_p1")}
              </p>
              <p>
                {t("privacy.section1_p2")}
              </p>
              
              <h2>{t("privacy.section2_title")}</h2>
              <p>
                {t("privacy.section2_p1")}
              </p>
              <ul>
                <li>{t("privacy.section2_bullet1")}</li>
                <li>{t("privacy.section2_bullet2")}</li>
                <li>{t("privacy.section2_bullet3")}</li>
                <li>{t("privacy.section2_bullet4")}</li>
              </ul>
              
              <h2>{t("privacy.section3_title")}</h2>
              <p>
                {t("privacy.section3_p1")}
              </p>
              <ul>
                <li>{t("privacy.section3_bullet1")}</li>
                <li>{t("privacy.section3_bullet2")}</li>
                <li>{t("privacy.section3_bullet3")}</li>
              </ul>
              
              <h2>{t("privacy.section4_title")}</h2>
              <p>
                {t("privacy.section4_p1")}
              </p>
              
              <h2>{t("privacy.section5_title")}</h2>
              <p>
                {t("privacy.section5_p1")}
              </p>
              <p>
                <strong>{t("privacy.contact_email")}</strong>: support@jobuz.uz
              </p>
              
              <div className="mt-8 pt-6 border-t">
                <Link to="/" className="text-interview hover:text-interview-dark">
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
