
import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock, DollarSign } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { Interview } from "@/lib/store";
import { cn } from "@/lib/utils";

interface InterviewCardProps {
  interview: Interview;
  compact?: boolean;
  showApplyButton?: boolean;
  className?: string;
}

export function InterviewCard({ 
  interview, 
  compact = false, 
  showApplyButton = false,
  className 
}: InterviewCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const {
    position,
    company,
    rating,
    salary,
    schedule,
    city,
    district,
    address,
    logo
  } = interview;
  
  const location = district ? `${city}, ${district}` : city;
  
  const logoImage = logo && !imageError ? (
    <img 
      src={logo} 
      alt={`${company} logo`} 
      className="h-12 w-12 object-contain rounded"
      onError={() => setImageError(true)}
    />
  ) : (
    <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
      <span className="text-lg font-bold text-gray-500">
        {company.charAt(0)}
      </span>
    </div>
  );
  
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            {!compact && logoImage}
            <div>
              <CardTitle className={`${compact ? 'text-lg' : 'text-xl'} font-bold`}>
                {position}
              </CardTitle>
              <div className={`${compact ? 'text-sm' : 'text-base'} text-gray-500 mt-1`}>
                {company}
              </div>
              <div className="mt-1">
                <Rating value={rating} size={compact ? "sm" : "md"} />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="space-y-2">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-gray-700">{salary}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-gray-700">{schedule}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-gray-700">
              {location}
              {!compact && address && `, ${address}`}
            </span>
          </div>
        </div>
      </CardContent>
      
      {showApplyButton && (
        <CardFooter className="pt-2">
          <Button asChild className="w-full">
            <Link to={`/interview/${interview.id}`}>
              Записаться на собеседование
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
