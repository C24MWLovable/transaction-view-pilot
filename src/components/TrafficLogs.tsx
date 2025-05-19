
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { HistoryIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TrafficLogEntry {
  id: string;
  timestamp: string;
  action: string;
  event_type: string;
  value: string;
  verification_status: string;
  verification_date: string;
  due_date: string;
  comment: string;
  billing_state: string;
  status: string;
  details: string;
}

export const TrafficLogs = () => {
  // Sample traffic log data - sorted chronologically (newest first)
  const [logs] = useState<TrafficLogEntry[]>([
    {
      id: "log-001",
      timestamp: "2025-05-19 08:12:23",
      action: "Zahlungseingang",
      event_type: "Transaktion",
      value: "€125.00",
      verification_status: "Verifiziert",
      verification_date: "2025-05-19",
      due_date: "2025-05-25",
      comment: "Kundeneinzahlung für Mietwagen",
      billing_state: "Vollständig",
      status: "Eingezogen",
      details: "Kundeneinzahlung für Mietwagen"
    },
    {
      id: "log-002",
      timestamp: "2025-05-19 08:15:45",
      action: "Versicherungsbestätigung",
      event_type: "Dokument",
      value: "€45.50",
      verification_status: "Ausstehend",
      verification_date: "2025-05-19",
      due_date: "2025-05-20",
      comment: "Versicherungszahlung bestätigt",
      billing_state: "Teilweise",
      status: "Eingezogen",
      details: "Versicherungszahlung bestätigt"
    },
    {
      id: "log-003",
      timestamp: "2025-05-19 10:30:12",
      action: "Punkte gutgeschrieben",
      event_type: "Bonus",
      value: "120 Punkte",
      verification_status: "Verifiziert",
      verification_date: "2025-05-19",
      due_date: "2025-05-19",
      comment: "Bonuspunkte für Kunde hinzugefügt",
      billing_state: "Vollständig",
      status: "In Auszahlung",
      details: "Bonuspunkte für Kunde hinzugefügt"
    },
    {
      id: "log-004",
      timestamp: "2025-05-19 14:45:30",
      action: "Vermieterzahlung geplant",
      event_type: "Planung",
      value: "€350.00",
      verification_status: "Geplant",
      verification_date: "2025-05-26",
      due_date: "2025-05-26",
      comment: "Zahlungsplan erstellt",
      billing_state: "Ausstehend",
      status: "Auszahlung am 26.05.25",
      details: "Zahlungsplan erstellt"
    },
    {
      id: "log-005",
      timestamp: "2025-05-18 09:22:15",
      action: "Mietwagenreservierung",
      event_type: "Buchung",
      value: "€480.00",
      verification_status: "Verifiziert",
      verification_date: "2025-05-18",
      due_date: "2025-05-20",
      comment: "Initiale Reservierung bestätigt",
      billing_state: "Vollständig",
      status: "Eingezogen",
      details: "Initiale Reservierung bestätigt"
    },
    {
      id: "log-006",
      timestamp: "2025-05-18 09:25:40",
      action: "Versicherungsanfrage",
      event_type: "Anforderung",
      value: "€45.50",
      verification_status: "Ausstehend",
      verification_date: "-",
      due_date: "2025-05-19",
      comment: "Versicherungsoption hinzugefügt",
      billing_state: "Ausstehend",
      status: "Einzug ausstehend",
      details: "Versicherungsoption hinzugefügt"
    },
    {
      id: "log-007",
      timestamp: "2025-05-18 11:30:55",
      action: "Punkteberechnung",
      event_type: "System",
      value: "85 Punkte",
      verification_status: "Automatisch",
      verification_date: "2025-05-18",
      due_date: "-",
      comment: "Treuepunkte kalkuliert",
      billing_state: "Automatisch",
      status: "Einzug ausstehend",
      details: "Treuepunkte kalkuliert"
    },
    {
      id: "log-008",
      timestamp: "2025-05-17 15:40:20",
      action: "Mietvertrag erstellt",
      event_type: "Dokument",
      value: "€0.00",
      verification_status: "Verifiziert",
      verification_date: "2025-05-17",
      due_date: "2025-05-17",
      comment: "Vertrag mit Standardkonditionen",
      billing_state: "Nicht zutreffend",
      status: "Einzug ausstehend",
      details: "Vertrag mit Standardkonditionen"
    },
  ]);

  // Sort logs by timestamp in descending order (newest first)
  const sortedLogs = [...logs].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const handleRestoreState = (logId: string) => {
    // This would actually restore the state in a real application
    toast.success(`Zustand von Log ${logId} wiederhergestellt`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Erweiterte Ansicht - Traffic Logs</h2>
      
      <ScrollArea className="h-[75vh] pr-4">
        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-8 top-6 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-gray-200 z-0"></div>
          
          <div className="space-y-3">
            {sortedLogs.map((log, index) => (
              <div key={log.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-8 top-6 w-2.5 h-2.5 rounded-full bg-blue-500 transform -translate-x-1 z-10"></div>
                
                <Card key={log.id} className="p-3 shadow-sm ml-14 border-l-4" style={{
                  borderLeftColor: index % 2 === 0 ? '#6366f1' : '#8b5cf6'
                }}>
                  <div className="flex flex-col space-y-2">
                    {/* Header row with timestamp and action */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-3.5 h-3.5 text-gray-400" />
                        <p className="text-xs text-gray-500">{log.timestamp}</p>
                      </div>
                      <Badge variant="outline" className="text-xs font-normal">
                        {log.event_type}
                      </Badge>
                    </div>
                    
                    {/* Main content grid */}
                    <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                      <div>
                        <p className="text-xs text-gray-500">Aktion:</p>
                        <p className="text-sm font-medium">{log.action}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Wert:</p>
                        <p className="text-sm">{log.value}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status:</p>
                        <p className="text-sm">{log.status}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Verifikation:</p>
                        <p className="text-sm">{log.verification_status}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Verifikationsdatum:</p>
                        <p className="text-sm">{log.verification_date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Fälligkeitsdatum:</p>
                        <div className="flex items-center">
                          {log.due_date !== "-" && <CalendarIcon className="w-3 h-3 mr-1 text-gray-400" />}
                          <p className="text-sm">{log.due_date}</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">Kommentar:</p>
                        <p className="text-sm">{log.comment}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Abrechnungsstatus:</p>
                        <p className="text-sm">{log.billing_state}</p>
                      </div>
                    </div>
                    
                    {/* Restore button */}
                    <div className="flex justify-end mt-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1 h-7 px-2"
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
