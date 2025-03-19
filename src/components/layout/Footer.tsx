
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.7157 20.2843 5.40974 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.0799 2 8.2V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19H15" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 15L17 19M17 15L21 19" stroke="currentColor" stroke-width="2" strokeLinecap="round"/>
              <path d="M13 5V3M7 5V3M19 5V3" stroke="currentColor" stroke-width="2" strokeLinecap="round"/>
            </svg>
            <span className="ml-2 text-lg font-semibold text-gray-800">jobuz</span>
          </div>
          
          <div className="mt-4 md:mt-0 text-sm text-gray-500">
            © {new Date().getFullYear()} jobuz. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
}
