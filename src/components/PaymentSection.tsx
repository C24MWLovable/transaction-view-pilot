
import { ReactNode } from "react";
import { User, Banknote, Car, Shield, Award } from "lucide-react";
import { PaymentItem } from "./PaymentItem";

interface SectionHeader {
  title: string;
  icon?: ReactNode;
}

export const SectionHeader = ({ title, icon }: SectionHeader) => (
  <div className="flex items-center gap-2 mb-2 mt-6 first:mt-0">
    {icon && <span className="text-gray-600">{icon}</span>}
    <h2 className="font-semibold text-lg text-gray-800">{title}</h2>
  </div>
);

export const PaymentOverview = () => {
  // Sample data - in a real app, this would come from a backend
  const customerData = {
    carRental: {
      amount: "€1.250,00",
      status: "Eingezogen" as const
    },
    insurance: {
      amount: "€320,00",
      status: "Eingezogen" as const // Same status as carRental
    },
    points: {
      amount: "€5,50",
      status: "In Auszahlung" as const
    }
  };
  
  const landlordData = {
    payment: {
      amount: "€1.570,00", 
      status: "Auszahlung am 26.05.25" as const
    }
  };
  
  return (
    <div className="space-y-4">
      {/* Customer Section */}
      <SectionHeader title="Kunde" icon={<User size={18} />} />
      <PaymentItem 
        title="Mietwagen" 
        amount={customerData.carRental.amount}
        status={customerData.carRental.status}
        icon={<Car size={18} />}
        indentLevel={1}
      />
      <PaymentItem 
        title="Versicherung" 
        amount={customerData.insurance.amount}
        status={customerData.insurance.status}
        icon={<Shield size={18} />}
        indentLevel={1}
      />
      <PaymentItem 
        title="Punkte" 
        amount={customerData.points.amount}
        status={customerData.points.status}
        icon={<Award size={18} />}
        indentLevel={1}
      />
      
      {/* Landlord Section */}
      <SectionHeader title="Vermieter" icon={<User size={18} />} />
      <PaymentItem 
        title="Zahlung" 
        amount={landlordData.payment.amount}
        status={landlordData.payment.status}
        icon={<Banknote size={18} />}
        indentLevel={1}
      />
    </div>
  );
};
