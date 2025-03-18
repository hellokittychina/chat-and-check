
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ApplicationFormProps {
  onSubmit: (data: { name: string; age: number; phone: string }) => void;
  isLoading?: boolean;
}

export function ApplicationForm({
  onSubmit,
  isLoading = false,
}: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
  });
  
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Для поля возраста - разрешаем только цифры
    if (name === "age" && value !== "" && !/^\d+$/.test(value)) {
      return;
    }
    
    // Для поля телефона - форматирование и валидация
    if (name === "phone") {
      // Удаляем все нецифровые символы
      const digitsOnly = value.replace(/\D/g, "");
      
      // Форматируем номер телефона
      let formattedPhone = "";
      if (digitsOnly.length > 0) {
        formattedPhone = "+7 ";
        if (digitsOnly.length > 1) {
          formattedPhone += `(${digitsOnly.substring(1, Math.min(4, digitsOnly.length))}`;
        }
        if (digitsOnly.length > 4) {
          formattedPhone += `) ${digitsOnly.substring(4, Math.min(7, digitsOnly.length))}`;
        }
        if (digitsOnly.length > 7) {
          formattedPhone += `-${digitsOnly.substring(7, Math.min(9, digitsOnly.length))}`;
        }
        if (digitsOnly.length > 9) {
          formattedPhone += `-${digitsOnly.substring(9, Math.min(11, digitsOnly.length))}`;
        }
      }
      
      setFormData((prev) => ({ ...prev, [name]: formattedPhone }));
      return;
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const validateForm = () => {
    const { name, age, phone } = formData;
    
    if (!name.trim()) {
      toast({
        title: "Ошибка заполнения",
        description: "Укажите ваше имя",
        variant: "destructive",
      });
      return false;
    }
    
    if (!age.trim() || parseInt(age) < 16 || parseInt(age) > 100) {
      toast({
        title: "Ошибка заполнения",
        description: "Укажите корректный возраст (от 16 до 100 лет)",
        variant: "destructive",
      });
      return false;
    }
    
    // Проверяем формат телефона (должен содержать 11 цифр)
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length !== 11) {
      toast({
        title: "Ошибка заполнения",
        description: "Укажите корректный номер телефона",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit({
      name: formData.name,
      age: parseInt(formData.age),
      phone: formData.phone,
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Ваше имя*</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Иван Иванов"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">Ваш возраст*</Label>
          <Input
            id="age"
            name="age"
            type="text"
            inputMode="numeric"
            value={formData.age}
            onChange={handleChange}
            required
            placeholder="25"
            maxLength={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Номер телефона*</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+7 (___) ___-__-__"
          />
          <p className="text-sm text-gray-500">
            На этот номер будет отправлен код подтверждения
          </p>
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Отправка..." : "Записаться на собеседование"}
      </Button>
    </form>
  );
}
