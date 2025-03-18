
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Interview } from "@/lib/store";
import { Rating } from "@/components/ui/rating";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface InterviewFormProps {
  initialData?: Partial<Interview>;
  onSubmit: (data: Omit<Interview, "id" | "createdAt">) => void;
  isLoading?: boolean;
}

export function InterviewForm({
  initialData,
  onSubmit,
  isLoading = false,
}: InterviewFormProps) {
  const [formData, setFormData] = useState<Omit<Interview, "id" | "createdAt">>({
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
    views: initialData?.views || 0
  });
  
  const [logoPreview, setLogoPreview] = useState<string | undefined>(initialData?.logo);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };
  
  const handleDescriptionChange = (content: string) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Проверка, что файл - изображение
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
    onSubmit(formData);
  };
  
  const removeLogoImage = () => {
    setLogoPreview(undefined);
    setFormData((prev) => ({ ...prev, logo: undefined }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="position">Должность*</Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              placeholder="Например, Frontend Developer"
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
              placeholder="Название компании"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salary">Зарплата*</Label>
            <Input
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              placeholder="Например, 100,000 - 150,000 ₽"
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
              placeholder="Например, Полный день, Гибкий график"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Рейтинг вакансии</Label>
          <Rating
            value={formData.rating}
            onChange={handleRatingChange}
            size="lg"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Город*</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Например, Москва"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="district">Район</Label>
            <Input
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="Например, Центральный"
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
              placeholder="Например, ул. Ленина, 10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Логотип компании</Label>
          <div className="flex items-start space-x-4">
            <div className="flex flex-col space-y-2">
              <Input
                id="logo"
                name="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                ref={fileInputRef}
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
              <div className="h-24 w-24 border rounded p-1">
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
          <Label htmlFor="description">Описание вакансии*</Label>
          <div className="wysiwyg-editor">
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={handleDescriptionChange}
              modules={modules}
              placeholder="Опишите должностные обязанности, требования, условия работы..."
            />
          </div>
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Сохранение..." : initialData?.id ? "Сохранить изменения" : "Создать собеседование"}
      </Button>
    </form>
  );
}
