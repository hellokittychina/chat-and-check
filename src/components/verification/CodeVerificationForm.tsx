
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { toast } = useToast();
  
  // Инициализация рефов для инпутов
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);
  
  const handleChange = (index: number, value: string) => {
    // Разрешаем только цифры
    if (value !== "" && !/^\d+$/.test(value)) {
      return;
    }
    
    const newCode = [...code];
    // Берем только последний символ, если вставлено больше
    newCode[index] = value.slice(-1);
    setCode(newCode);
    
    // Перемещаем фокус на следующее поле, если введен символ
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Перемещаем фокус на предыдущее поле при нажатии Backspace, если текущее поле пусто
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    
    // Проверяем, что вставленный текст - только цифры и не длиннее максимальной длины
    if (!/^\d+$/.test(pastedData) || pastedData.length > length) {
      toast({
        title: "Некорректный формат",
        description: "Код должен состоять только из цифр",
        variant: "destructive",
      });
      return;
    }
    
    // Заполняем все поля вставленными данными
    const newCode = [...code];
    for (let i = 0; i < Math.min(pastedData.length, length); i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);
    
    // Фокусируемся на последнем заполненном поле
    if (pastedData.length < length) {
      inputRefs.current[pastedData.length]?.focus();
    } else {
      // Если все поля заполнены, снимаем фокус с последнего поля
      inputRefs.current[length - 1]?.blur();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем, что все поля заполнены
    if (code.some(digit => digit === "")) {
      toast({
        title: "Заполните все поля",
        description: "Код должен содержать 5 цифр",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(code.join(""));
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center mb-4">
        <div className="flex space-x-2">
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
                "w-12 h-14 text-center text-2xl font-bold border rounded-md",
                "focus:outline-none focus:ring-2 focus:ring-interview",
                "transition-all duration-200"
              )}
              disabled={isLoading}
              autoFocus={index === 0}
            />
          ))}
        </div>
      </div>
      
      <p className="text-center text-gray-500 text-sm">
        Введите 5-значный код, который был отправлен на ваш телефон через Telegram
      </p>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Проверка..." : "Подтвердить"}
      </Button>
    </form>
  );
}
