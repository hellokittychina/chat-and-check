
import { useLanguage } from "@/lib/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center">
      <Globe className="h-4 w-4 mr-2 text-gray-500" />
      <Select
        value={language}
        onValueChange={(value) => setLanguage(value as "ru" | "uz")}
      >
        <SelectTrigger className="h-8 w-24 border-0 focus:ring-0 bg-transparent">
          <SelectValue placeholder={t(`language.${language}`)} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ru">{t("language.ru")}</SelectItem>
          <SelectItem value="uz">{t("language.uz")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
