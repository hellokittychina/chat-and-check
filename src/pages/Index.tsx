import { Link } from "react-router-dom";
import { ChevronRight, Users, BarChart, Check, Briefcase, Star, Shield } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-interview-light to-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                  {t("index.hero_title")}
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-6">
                  {t("index.hero_description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-interview hover:bg-interview-dark text-white" asChild>
                    <a href="#features">{t("index.learn_more")}</a>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 bg-white p-3 rounded-lg shadow-md z-10">
                    <Users className="h-8 w-8 text-interview" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-lg shadow-md z-10">
                    <BarChart className="h-8 w-8 text-interview" />
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                    alt="Team working together" 
                    className="rounded-lg shadow-xl z-0 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section id="features" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">{t("index.features_title")}</h2>
              <p className="mt-4 text-xl text-gray-600">{t("index.features_description")}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200">
                <div className="inline-flex items-center justify-center bg-interview/10 p-3 rounded-lg mb-4">
                  <Briefcase className="h-6 w-6 text-interview" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("index.feature1_title")}</h3>
                <p className="text-gray-600">
                  {t("index.feature1_description")}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-interview mr-2 shrink-0 mt-0.5" />
                    <span>{t("index.feature1_point1")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-interview mr-2 shrink-0 mt-0.5" />
                    <span>{t("index.feature1_point2")}</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200">
                <div className="inline-flex items-center justify-center bg-interview/10 p-3 rounded-lg mb-4">
                  <Users className="h-6 w-6 text-interview" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("index.feature2_title")}</h3>
                <p className="text-gray-600">
                  {t("index.feature2_description")}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-interview mr-2 shrink-0 mt-0.5" />
                    <span>{t("index.feature2_point1")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-interview mr-2 shrink-0 mt-0.5" />
                    <span>{t("index.feature2_point2")}</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200">
                <div className="inline-flex items-center justify-center bg-interview/10 p-3 rounded-lg mb-4">
                  <BarChart className="h-6 w-6 text-interview" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("index.feature3_title")}</h3>
                <p className="text-gray-600">
                  {t("index.feature3_description")}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-interview mr-2 shrink-0 mt-0.5" />
                    <span>{t("index.feature3_point1")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-interview mr-2 shrink-0 mt-0.5" />
                    <span>{t("index.feature3_point2")}</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How it works section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">{t("index.how_it_works_title")}</h2>
              <p className="mt-4 text-xl text-gray-600">{t("index.how_it_works_description")}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="bg-interview text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">{t("index.step1_title")}</h3>
                <p className="text-gray-600">{t("index.step1_description")}</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-interview text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">{t("index.step2_title")}</h3>
                <p className="text-gray-600">{t("index.step2_description")}</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-interview text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">{t("index.step3_title")}</h3>
                <p className="text-gray-600">{t("index.step3_description")}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">{t("index.testimonials_title")}</h2>
              <p className="mt-4 text-xl text-gray-600">{t("index.testimonials_description")}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 border-0 shadow-md">
                  <div className="mb-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-interview" fill="#34a853" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{t(`index.testimonial${i}`)}"</p>
                  <div>
                    <p className="font-semibold">{t(`index.testimonial${i}_name`)}</p>
                    <p className="text-sm text-gray-500">{t(`index.testimonial${i}_position`)}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 bg-interview">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                {t("index.cta_title")}
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-white/80">
                {t("index.cta_description")}
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default Index;
