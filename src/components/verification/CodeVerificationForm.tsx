
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { BrandTelegram, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface CodeVerificationFormProps {
  onSubmit: (code: string) => void;
  isLoading?: boolean;
  length?: number;
}

export function CodeVerificationForm({
  onSubmit,
  isLoading = false,
  length = 5,
}: CodeVerificationFormProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Animation for input highlight
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % length);
    }, 1500);
    
    return () => clearInterval(interval);
  }, [length]);
  
  // Initialize refs for inputs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);
  
  const handleChange = (index: number, value: string) => {
    // Allow only digits
    if (value !== "" && !/^\d+$/.test(value)) {
      return;
    }
    
    const newCode = [...code];
    // Take only the last character if more was pasted
    newCode[index] = value.slice(-1);
    setCode(newCode);
    
    // Move focus to next field if a character was entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move focus to previous field when Backspace is pressed if current field is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    
    // Check that the pasted text is only digits and not longer than maximum length
    if (!/^\d+$/.test(pastedData) || pastedData.length > length) {
      toast({
        title: t("verify.invalid_format"),
        description: t("verify.digits_only"),
        variant: "destructive",
      });
      return;
    }
    
    // Fill all fields with the pasted data
    const newCode = [...code];
    for (let i = 0; i < Math.min(pastedData.length, length); i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);
    
    // Focus on the last filled field
    if (pastedData.length < length) {
      inputRefs.current[pastedData.length]?.focus();
    } else {
      // If all fields are filled, blur the last field
      inputRefs.current[length - 1]?.blur();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check that all fields are filled
    if (code.some(digit => digit === "")) {
      toast({
        title: t("verify.fill_all"),
        description: t("verify.code_length_requirement"),
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(code.join(""));
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="telegram-verification mb-6">
          <div className="telegram-pulse w-16 h-16"></div>
          <div className="telegram-pulse w-14 h-14" style={{ animationDelay: "0.5s" }}></div>
          <div className="z-10 bg-white p-3 rounded-full shadow-md relative">
            <BrandTelegram size={36} className="text-interview" />
            <Sparkles 
              className="absolute -top-2 -right-1 text-interview animate-sparkle" 
              size={16} 
            />
            <Sparkles 
              className="absolute -bottom-1 -left-2 text-interview animate-sparkle" 
              size={14}
              style={{ animationDelay: "0.7s" }}
            />
          </div>
        </div>
        
        <div className="flex space-x-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={cn(
                "w-12 h-14 text-center text-2xl font-bold border-2 rounded-md",
                "focus:outline-none focus:ring-2 focus:ring-interview focus:border-transparent",
                "transition-all duration-200",
                highlightedIndex === index && !digit 
                  ? "border-interview animate-pulse" 
                  : "border-gray-200"
              )}
              disabled={isLoading}
              autoFocus={index === 0}
            />
          ))}
        </div>
      </div>
      
      <p className="text-center text-gray-500 text-sm">
        {t("verify.enter_code")}
      </p>
      
      <Button type="submit" className="w-full bg-interview hover:bg-interview-dark" disabled={isLoading}>
        {isLoading ? t("verify.verifying") : t("verify.confirm")}
      </Button>
      
      <div className="text-center text-xs text-gray-400 mt-4">
        <p>PhoneVerified™ by Telegram LLC</p>
      </div>
    </form>
  );
}
