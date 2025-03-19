
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/lib/store";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";

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
  const { t } = useLanguage();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // For age field - only allow digits
    if (name === "age" && value !== "" && !/^\d+$/.test(value)) {
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
    
    if (!phone.trim()) {
      toast({
        title: "Ошибка заполнения",
        description: "Укажите номер телефона",
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
          <Label htmlFor="name">{t("form.name")}</Label>
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
          <Label htmlFor="age">{t("form.age")}</Label>
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
          <Label htmlFor="phone">{t("form.phone")}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <p className="text-sm text-gray-500">
            {t("form.phone_note")}
          </p>
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? t("form.submitting") : t("form.book")}
      </Button>
    </form>
  );
}
