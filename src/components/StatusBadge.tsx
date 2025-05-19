
import { ReactNode } from "react";
import { Check, X, ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = 
  | "Einzug ausstehend"
  | "Eingezogen"
  | "Rückerstattung ausstehend"
  | "Rückerstattet"
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
      bgColor = "bg-status-pending text-black";
      icon = <ArrowDown className="w-3 h-3 mr-1" />;
      break;
    case "Eingezogen":
      bgColor = "bg-status-completed text-black";
      icon = <Check className="w-3 h-3 mr-1" />;
      break;
    case "Rückerstattung ausstehend":
      bgColor = "bg-status-refund text-black";
      icon = <ArrowUp className="w-3 h-3 mr-1" />;
      break;
    case "Rückerstattet":
      bgColor = "bg-status-refunded text-black";
      icon = <Check className="w-3 h-3 mr-1" />;
      break;
    case "Fehler":
      bgColor = "bg-status-error text-white";
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
