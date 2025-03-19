
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex items-center justify-center flex-grow bg-gray-50 py-8">
        <div className="text-center max-w-lg px-4">
          <h1 className="text-6xl font-bold text-interview mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">
            {t("404.title")}
          </p>
          <p className="text-gray-500 mb-8">
            {t("404.description")}
          </p>
          <Button asChild size="lg">
            <Link to="/">{t("common.back_to_home")}</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
