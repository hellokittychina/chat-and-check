
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BriefcaseBusiness className="h-8 w-8 text-interview" />
              <span className="ml-2 text-xl font-bold text-interview">InterviewManager</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-interview px-3 py-2 font-medium">
              Главная
            </Link>
            <Link to="/panel" className="text-gray-700 hover:text-interview px-3 py-2 font-medium">
              Управление
            </Link>
          </nav>

          <div className="hidden md:flex">
            <Button asChild>
              <Link to="/panel">Панель управления</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-6">
                  <Link 
                    to="/" 
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Главная
                  </Link>
                  <Link 
                    to="/panel" 
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Управление
                  </Link>
                  <Button 
                    className="mt-4" 
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to="/panel">Панель управления</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
