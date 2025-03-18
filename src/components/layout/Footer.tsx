
import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <BriefcaseBusiness className="h-6 w-6 text-interview" />
            <span className="ml-2 text-lg font-semibold text-interview">InterviewManager</span>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-interview">
              Главная
            </Link>
            <Link to="/panel" className="text-gray-600 hover:text-interview">
              Управление
            </Link>
          </div>
          
          <div className="mt-4 md:mt-0 text-sm text-gray-500">
            © {new Date().getFullYear()} InterviewManager. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
}
