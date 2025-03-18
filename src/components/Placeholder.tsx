
import { BriefcaseBusiness, Loader2 } from "lucide-react";

interface PlaceholderProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  loading?: boolean;
}

export function Placeholder({
  icon,
  title,
  description,
  loading = false,
}: PlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="rounded-full bg-gray-100 p-4 mb-4">
        {loading ? (
          <Loader2 className="h-8 w-8 text-interview animate-spin" />
        ) : (
          icon || <BriefcaseBusiness className="h-8 w-8 text-interview" />
        )}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {description && <p className="text-gray-500">{description}</p>}
    </div>
  );
}
