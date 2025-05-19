
import { ReactNode } from "react";
import { Check, X, ArrowUp, ArrowDown, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = 
  | "Einzug ausstehend"
  | "Eingezogen"
  | "Rückerstattung ausstehend"
  | "Rückerstattet"
  | "In Auszahlung"
  | "Auszahlung am 26.05.25"
  | "Fehler";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  let bgColor = "";
  let icon: ReactNode = null;
  
  switch (status) {
    case "Einzug ausstehend":
      bgColor = "bg-[#F7ECB5] text-black"; // Yellow
      icon = <ArrowDown className="w-3 h-3 mr-1" />;
      break;
    case "Eingezogen":
      bgColor = "bg-[#DBF3B7] text-black"; // Green
      icon = <Check className="w-3 h-3 mr-1" />;
      break;
    case "Rückerstattung ausstehend":
      bgColor = "bg-[#F7ECB5] text-black"; // Yellow
      icon = <ArrowUp className="w-3 h-3 mr-1" />;
      break;
    case "Rückerstattet":
      bgColor = "bg-[#DBF3B7] text-black"; // Green
      icon = <Check className="w-3 h-3 mr-1" />;
      break;
    case "In Auszahlung":
      bgColor = "bg-[#F7ECB5] text-black"; // Yellow
      icon = <Clock className="w-3 h-3 mr-1" />;
      break;
    case "Auszahlung am 26.05.25":
      bgColor = "bg-[#F7ECB5] text-black"; // Yellow
      icon = <Clock className="w-3 h-3 mr-1" />;
      break;
    case "Fehler":
      bgColor = "bg-[#FEE5D9] text-black"; // Red
      icon = <X className="w-3 h-3 mr-1" />;
      break;
    default:
      bgColor = "bg-muted";
  }
  
  return (
    <Badge variant="outline" className={cn("px-2 py-1 flex items-center gap-1", bgColor, className)}>
      {icon}
      <span className="text-xs font-medium">{status}</span>
    </Badge>
  );
};
