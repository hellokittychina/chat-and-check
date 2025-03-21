
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/lib/store";
import { LanguageProvider } from "@/lib/LanguageContext";

import Index from "./pages/Index";
import Panel from "./pages/Panel";
import Interview from "./pages/Interview";
import VerifyCode from "./pages/VerifyCode";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import WebApp from "./pages/WebApp";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/panel" element={<Panel />} />
              <Route path="/interview/:id" element={<Interview />} />
              <Route path="/code/:id" element={<VerifyCode />} />
              <Route path="/success/:id" element={<Success />} />
              <Route path="/webapp" element={<WebApp />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
