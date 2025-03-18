
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Interview } from "@/lib/store";
import { Rating } from "@/components/ui/rating";

interface InterviewMobileFormProps {
  initialData?: Partial<Interview>;
  onSubmit: (data: Omit<Interview, "id" | "createdAt" | "views">) => void;
  isLoading?: boolean;
}

export function InterviewMobileForm({
  initialData,
  onSubmit,
  isLoading = false,
}: InterviewMobileFormProps) {
  const [formData, setFormData] = useState<Omit<Interview, "id" | "createdAt" | "views">>({
    position: initialData?.position || "",
    company: initialData?.company || "",
    rating: initialData?.rating || 3,
    salary: initialData?.salary || "",
    schedule: initialData?.schedule || "",
    city: initialData?.city || "",
    district: initialData?.district || "",
    address: initialData?.address || "",
    description: initialData?.description || "",
    logo: initialData?.logo,
  });
  
  const [logoPreview, setLogoPreview] = useState<string | undefined>(initialData?.logo);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      alert("Пожалуйста, загрузите изображение");
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setLogoPreview(result);
      setFormData((prev) => ({ ...prev, logo: result }));
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      description: formData.description || "<p>Описание вакансии</p>"
    });
  };
  
  const removeLogoImage = () => {
    setLogoPreview(undefined);
    setFormData((prev) => ({ ...prev, logo: undefined }));
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="position">Должность*</Label>
          <Input
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            placeholder="Frontend Developer"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company">Компания*</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            placeholder="Tech Solutions"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="salary">Зарплата*</Label>
          <Input
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            placeholder="10,000,000 - 15,000,000 сум"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="schedule">График работы*</Label>
          <Input
            id="schedule"
            name="schedule"
            value={formData.schedule}
            onChange={handleChange}
            required
            placeholder="Полный день"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Рейтинг вакансии</Label>
          <Rating
            value={formData.rating}
            onChange={handleRatingChange}
            size="md"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">Город*</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            placeholder="Ташкент"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="district">Район</Label>
          <Input
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="Чиланзар"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Адрес*</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="ул. Навои, 10"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Логотип компании</Label>
          <div className="flex items-start space-x-4">
            <div className="flex flex-col space-y-2 flex-1">
              <Input
                id="logo"
                name="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full"
              />
              {logoPreview && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={removeLogoImage}
                >
                  Удалить изображение
                </Button>
              )}
            </div>
            
            {logoPreview && (
              <div className="h-16 w-16 border rounded p-1 flex-shrink-0">
                <img
                  src={logoPreview}
                  alt="Предпросмотр логотипа"
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Описание вакансии</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Опишите должностные обязанности, требования, условия работы..."
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Создание..." : "Создать собеседование"}
      </Button>
    </form>
  );
}
