import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

type StatusType = 
  | "Einzug ausstehend"
  | "Erfolgreich"
  | "Eingezogen"
  | "Bezahlt"
  | "Rückerstattung ausstehend"
  | "Rückerstattet"
  | "In Auszahlung"
  | "Auszahlung am 26.05.25"
  | "Fehler";

interface PaymentItemProps {
  title: string;
  amount: string;
  status: StatusType;
  icon?: ReactNode;
  indentLevel?: number;
}

export const PaymentItem = ({
  title,
  amount,
  status,
  icon,
  indentLevel = 0
}: PaymentItemProps) => {
  const indentation = indentLevel * 24; // 24px per level of indentation
  
  return (
    <Card className={cn(
      "mb-3 p-4",
      "border border-border shadow-sm hover:shadow-md transition-shadow",
      "bg-white"
    )}
    style={{ marginLeft: `${indentation}px` }}>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          {icon && <div className="text-gray-500">{icon}</div>}
          <h3 className="font-medium text-sm">{title}</h3>
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="mt-2">
        <p className="font-semibold">{amount}</p>
      </div>
    </Card>
  );
};
