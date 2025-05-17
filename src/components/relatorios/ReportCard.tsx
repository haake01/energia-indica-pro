
import React from "react";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription
} from "@/components/ui/card";

export interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badges: string[];
  onDownload: () => void;
}

const ReportCard = ({ title, description, icon, badges, onDownload }: ReportCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {icon}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
          </div>
          <div className="flex gap-2">
            {badges.map((badge, index) => (
              <Badge key={index} variant="outline">{badge}</Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <CardDescription className="text-sm text-gray-600 h-12">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 flex justify-end">
        <Button onClick={onDownload} variant="default" size="sm" className="gap-2">
          <Download size={16} />
          <span>Baixar</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
