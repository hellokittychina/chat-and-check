
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/lib/store";
import { useNavigate } from "react-router-dom";

interface ApplicationFormProps {
  interviewId: string;
  onSubmit?: (data: { name: string; age: number; phone: string }) => void;
  isLoading?: boolean;
}

export function ApplicationForm({
  interviewId,
  onSubmit,
  isLoading = false,
}: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
  });
  
  const { toast } = useToast();
  const { addApplicant } = useAppState();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // For age field - only allow digits
    if (name === "age" && value !== "" && !/^\d+$/.test(value)) {
      return;
    }
    
    // For phone field - formatting and validation
    if (name === "phone") {
      // Remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, "");
      
      // Format phone number
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
    
    // Check phone format (must contain 11 digits)
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
    
    // Add the applicant to the store
    const applicant = addApplicant({
      interviewId,
      name: formData.name,
      age: parseInt(formData.age),
      phone: formData.phone,
    });
    
    // Also call the onSubmit prop if provided
    if (onSubmit) {
      onSubmit({
        name: formData.name,
        age: parseInt(formData.age),
        phone: formData.phone,
      });
    }
    
    // Navigate to verification page
    navigate(`/code/${applicant.id}`);
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
