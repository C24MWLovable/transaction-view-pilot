import { ReactNode } from "react";
import { User, Banknote, Car, Shield, Award } from "lucide-react";
import { PaymentItem } from "./PaymentItem";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { TrafficLogEntry } from "./TrafficLogs";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      amount: "171,50 €",
      status: "Eingezogen" as const
    },
    insurance: {
      amount: "26,40 €",
      status: "Eingezogen" as const // Same status as carRental
    },
    points: {
      amount: "€5,50",
      status: "In Auszahlung" as const
    }
  };
  
  const landlordData = {
    payment: {
      amount: "171,50 €", 
      status: "Auszahlung am 26.05.25" as const
    }
  };
  
  const [showCarLogs, setShowCarLogs] = useState(false);
  const [showVendorLogs, setShowVendorLogs] = useState(false);

  // Die Logs werden aus TrafficLogs übernommen (hier Dummy-Daten, in echt ggf. aus Context/Props)
  const logs: TrafficLogEntry[] = [
    { id: "log-013", event_type: "Refund", data: "customer_actual", value: "121,50 €", verification_date: "2025-05-27 12:00:00", due_date: "2025-05-26 17:47:56", comment: "Rückzahlung", status: "Erfolgreich", changed_by: "System", use_case: null },
    { id: "log-006", event_type: "Bank Transfer", data: "customer_actual", value: "-5,50 €", verification_date: "2025-05-18 15:45:56", due_date: "2025-05-18 15:45:56", comment: "Punkte Auszahlung", status: "Erfolreich", changed_by: "System", use_case: null },
    { id: "log-003", event_type: "Capture", data: "customer_actual", value: "-197,90 €", verification_date: "2025-05-18 15:45:56", due_date: "2025-05-18 15:45:56", comment: "PayPal Einzug", status: "Erfolgreich", changed_by: "System", use_case: null },
    { id: "log-002", event_type: "Booking", data: "customer_target", value: "26,40 €", verification_date: "2025-05-17 15:40:20", due_date: "2025-05-17 15:40:20", comment: "Buchung Allianz", status: "Erfolgreich", changed_by: "System", use_case: null },
    { id: "log-001", event_type: "Booking", data: "customer_target", value: "171,50 €", verification_date: "2025-05-17 15:40:20", due_date: "2025-05-17 15:40:20", comment: "Buchung Mietwagen", status: "Erfolgreich", changed_by: "System", use_case: null },
    { id: "log-012", event_type: "Cancel Fee", data: "customer_target", value: "50,00 €", verification_date: null, due_date: "2025-05-26 17:32:56", comment: "Stornierungsgebühren ändern", status: "Erfolgreich", changed_by: "luis.kriechbaum", use_case: "Stornierungsgebühren ändern" },
    { id: "log-011", event_type: "Cancel Fee", data: "customer_target", value: "-171,50 €", verification_date: null, due_date: "2025-05-26 17:32:56", comment: "Stornierungsgebühren ändern", status: "Erfolgreich", changed_by: "luis.kriechbaum", use_case: "Stornierungsgebühren ändern" },
    { id: "log-014", event_type: "Cancel Fee", data: "customer_target", value: "171,50 €", verification_date: null, due_date: "2025-05-26 16:02:56", comment: "Mietwagen Cancel", status: "Voided", changed_by: "System", use_case: null },
    { id: "log-010", event_type: "Cancel", data: "customer_target", value: "-171,50 €", verification_date: null, due_date: "2025-05-26 16:02:56", comment: "Mietwagen Cancel", status: "Voided", changed_by: "System", use_case: null },
    // Vendor logs
    { id: "log-009", event_type: "Cancel", data: "vendor_target", value: "171,50 €", verification_date: null, due_date: "2025-05-26 16:02:56", comment: "Allianz Transfer", status: "Ausstehend", changed_by: "System", use_case: null },
    { id: "log-007", event_type: "Booking", data: "vendor_actual", value: "26,40 €", verification_date: "2025-05-18 16:02:56", due_date: "2025-05-18 16:02:56", comment: "Allianz Transfer", status: "Erfolreich", changed_by: "System", use_case: null },
    { id: "log-008", event_type: "Points Use", data: "vendor_target", value: "5,50 €", verification_date: "2025-05-18 15:45:56", due_date: "2025-05-18 15:45:56", comment: "Punkte Verwendung", status: "Erfolgreich", changed_by: "System", use_case: null },
    { id: "log-005", event_type: "Booking", data: "vendor_target", value: "-26,40 €", verification_date: "2025-05-18 16:00:56", due_date: "2025-05-18 16:00:56", comment: "Allianz Transfer", status: "Erfolgreich", changed_by: "System", use_case: null },
    { id: "log-004", event_type: "Booking", data: "vendor_target", value: "-171,50 €", verification_date: null, due_date: "2025-05-26 15:45:56", comment: "Mietwagen Transfer", status: "Voided", changed_by: "System", use_case: null },
  ];

  const carLogs = logs.filter(l => l.data === "customer_target" || l.data === "customer_actual").sort((a, b) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime());
  const vendorLogs = logs.filter(l => l.data === "vendor_target" || l.data === "vendor_actual").sort((a, b) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime());

  // Zeilenfarbe je nach Status
  const getRowBg = (status: string) => {
    if (status === "Erfolgreich" || status === "Erfolreich") return "bg-green-100";
    if (status === "Voided") return "bg-gray-100";
    if (status === "Ausstehend") return "bg-yellow-50";
    return "";
  };

  return (
    <>
      <Dialog open={showCarLogs} onOpenChange={setShowCarLogs}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Kunden-Transaktionen</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[500px]">
            <ul className="divide-y divide-gray-200">
              {carLogs.map(log => (
                <li key={log.id} className={`py-2 px-4 text-xs ${getRowBg(log.status)}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{log.event_type}</span>
                    <span className={log.value.trim().startsWith('-') ? 'text-red-600' : 'text-green-600'}>{log.value}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 mt-1">
                    <span>Fällig: {log.due_date.replace(":00", "")}</span>
                    <span>Verif.: {log.verification_date ? log.verification_date.replace(":00", "") : 'n.n.'}</span>
                  </div>
                  <div className="text-gray-400 mt-1">{log.comment}</div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <Dialog open={showVendorLogs} onOpenChange={setShowVendorLogs}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Vermieter-Transaktionen</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[500px]">
            <ul className="divide-y divide-gray-200">
              {vendorLogs.map(log => (
                <li key={log.id} className={`py-2 px-4 text-xs ${getRowBg(log.status)}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{log.event_type}</span>
                    <span className={log.value.trim().startsWith('-') ? 'text-red-600' : 'text-green-600'}>{log.value}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 mt-1">
                    <span>Fällig: {log.due_date.replace(":00", "")}</span>
                    <span>Verif.: {log.verification_date ? log.verification_date.replace(":00", "") : 'n.n.'}</span>
                  </div>
                  <div className="text-gray-400 mt-1">{log.comment}</div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <div className="space-y-4">
        {/* Customer Section */}
        <SectionHeader title="Kunde" icon={<User size={18} />} />
        <div onClick={() => setShowCarLogs(true)} className="cursor-pointer">
          <PaymentItem 
            title="Mietwagen" 
            amount={customerData.carRental.amount}
            status={customerData.carRental.status}
            icon={<Car size={18} />}
            indentLevel={1}
          />
        </div>
        <div onClick={() => setShowCarLogs(true)} className="cursor-pointer">
          <PaymentItem 
            title="Versicherung" 
            amount={customerData.insurance.amount}
            status={customerData.insurance.status}
            icon={<Shield size={18} />}
            indentLevel={1}
          />
        </div>
        <div onClick={() => setShowCarLogs(true)} className="cursor-pointer">
          <PaymentItem 
            title="Punkte" 
            amount={customerData.points.amount}
            status={customerData.points.status}
            icon={<Award size={18} />}
            indentLevel={1}
          />
        </div>
        {/* Landlord Section */}
        <SectionHeader title="Vermieter" icon={<User size={18} />} />
        <div onClick={() => setShowVendorLogs(true)} className="cursor-pointer">
          <PaymentItem 
            title="Zahlung" 
            amount={landlordData.payment.amount}
            status={landlordData.payment.status}
            icon={<Banknote size={18} />}
            indentLevel={1}
          />
        </div>
      </div>
    </>
  );
};
