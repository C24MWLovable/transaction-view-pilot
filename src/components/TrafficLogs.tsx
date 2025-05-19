import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HistoryIcon, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { StatusBadge } from "./StatusBadge";

interface TrafficLogEntry {
  id: string;
  timestamp: string;
  event_type: string;
  data: string;
  value: string;
  verification_date: string;
  due_date: string;
  comment: string;
  status: string;
}

export const TrafficLogs = () => {
  // Sample traffic log data - sorted chronologically (newest first)
  const [logs] = useState<TrafficLogEntry[]>([
    {
      id: "log-001",
      timestamp: "2025-05-19 08:12:23",
      event_type: "Zahlungseingang",
      data: "customer_actual",
      value: "€125.00",
      verification_date: "2025-05-19",
      due_date: "2025-05-25",
      comment: "Kundeneinzahlung für Mietwagen",
      status: "Ausstehend"
    },
    {
      id: "log-002",
      timestamp: "2025-05-19 08:15:45",
      event_type: "Versicherungsbestätigung",
      data: "customer_target",
      value: "€45.50",
      verification_date: "2025-05-19",
      due_date: "2025-05-20",
      comment: "Versicherungszahlung bestätigt",
      status: "Erfolgreich"
    },
    {
      id: "log-003",
      timestamp: "2025-05-19 10:30:12",
      event_type: "Punkte gutgeschrieben",
      data: "vendor_actual",
      value: "120 Punkte",
      verification_date: "2025-05-19",
      due_date: "2025-05-19",
      comment: "Bonuspunkte für Kunde hinzugefügt",
      status: "Erfolgreich"
    },
    {
      id: "log-004",
      timestamp: "2025-05-19 14:45:30",
      event_type: "Vermieterzahlung geplant",
      data: "vendor_target",
      value: "€350.00",
      verification_date: "2025-05-26",
      due_date: "2025-05-26",
      comment: "Zahlungsplan erstellt",
      status: "Erfolgreich"
    },
    {
      id: "log-005",
      timestamp: "2025-05-18 09:22:15",
      event_type: "Mietwagenreservierung",
      data: "customer_target",
      value: "€480.00",
      verification_date: "2025-05-18",
      due_date: "2025-05-20",
      comment: "Initiale Reservierung bestätigt",
      status: "Erfolgreich"
    },
    {
      id: "log-006",
      timestamp: "2025-05-18 09:25:40",
      event_type: "Versicherungsanfrage",
      data: "customer_actual",
      value: "€45.50",
      verification_date: "-",
      due_date: "2025-05-19",
      comment: "Versicherungsoption hinzugefügt",
      status: "Erfolgreich"
    },
    {
      id: "log-002",
      timestamp: "2025-05-17 15:45:55",
      event_type: "Capture",
      data: "customer_actual",
      value: "120,69 €",
      verification_date: "2025-05-18",
      due_date: "2025-05-18",
      comment: "PayPal Einzug",
      status: "Erfolgreich"
    },
    {
      id: "log-001",
      timestamp: "2025-05-17 15:40:20",
      event_type: "Booking",
      data: "customer_target",
      value: "120,69 €",
      verification_date: "2025-05-17",
      due_date: "2025-05-17",
      comment: "Buchung",
      status: "Erfolgreich"
    },
  ]);

  // Sort logs by timestamp in descending order (newest first)
  const sortedLogs = [...logs].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Function to get the border color based on data
  const getBorderColor = (data: string) => {
    switch(data) {
      case "customer_target":
        return "#6366f1"; // Indigo
      case "customer_actual":
        return "#8b5cf6"; // Purple
      case "vendor_target":
        return "#10b981"; // Green
      case "vendor_actual":
        return "#06b6d4"; // Cyan
      default:
        return "#6366f1";
    }
  };
  
  // Function to format data display (removing plural 's')
  const formatData = (data: string) => {
    return data.replace('_', ' ').replace(/s$/, '');
  };

  const handleRestoreState = (logId: string) => {
    // This would actually restore the state in a real application
    toast.success(`Zustand von Log ${logId} wiederhergestellt`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Traffic Logs</h2>
      
      <ScrollArea className="h-[75vh] pr-4">
        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-8 top-6 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-gray-200 z-0"></div>
          
          <div className="space-y-2.5">
            {sortedLogs.map((log, index) => (
              <div key={log.id} className="relative">
                {/* Timeline dot - now centered vertically relative to the card */}
                <div className="absolute left-8 top-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 transform -translate-x-1 -translate-y-1/2 z-10"></div>
                
                <Card 
                  key={log.id} 
                  className="p-2.5 shadow-sm ml-14 border-l-4" 
                  style={{ borderLeftColor: getBorderColor(log.data) }}
                >
                  <div className="flex flex-col space-y-1.5">
                    {/* Header row with log type and status */}
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-sm capitalize">
                        {formatData(log.data)}
                      </div>
                      
                      <div>
                        {index === 0 ? (
                          <div className="px-2 py-1 bg-[#F7ECB5] text-xs font-medium rounded-full">
                            Ausstehend
                          </div>
                        ) : (
                          <div className="px-2 py-1 bg-[#DBF3B7] text-xs font-medium rounded-full">
                            Erfolgreich
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Main content grid - restructured as requested */}
                    <div className="grid grid-cols-3 gap-x-4 gap-y-1.5">
                      {/* Column 1: Action and Value */}
                      <div>
                        <p className="text-xs text-gray-500">Event Type:</p>
                        <p className="text-sm font-medium">{log.event_type}</p>
                        <p className="text-xs text-gray-500 mt-1">Wert:</p>
                        <p className="text-sm">{log.value}</p>
                      </div>

                      {/* Column 2: Verification Date and Due Date */}
                      <div>
                        <p className="text-xs text-gray-500">Verifikationsdatum:</p>
                        <p className="text-sm">{log.verification_date}</p>
                        <p className="text-xs text-gray-500 mt-1">Fälligkeitsdatum:</p>
                        <div className="flex items-center">
                          {log.due_date !== "-" && <CalendarIcon className="w-3 h-3 mr-1 text-gray-400" />}
                          <p className="text-sm">{log.due_date}</p>
                        </div>
                      </div>

                      {/* Column 3: Comment */}
                      <div>
                        <p className="text-xs text-gray-500">Kommentar:</p>
                        <p className="text-sm">{log.comment}</p>
                      </div>
                    </div>
                    
                    {/* Restore button */}
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1 h-6 px-2"
                        onClick={() => handleRestoreState(log.id)}
                      >
                        <HistoryIcon className="w-3 h-3" />
                        <span className="text-xs">Wiederherstellen</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
