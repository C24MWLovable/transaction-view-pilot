
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HistoryIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TrafficLogEntry {
  id: string;
  timestamp: string;
  action: string;
  status: string;
  details: string;
}

export const TrafficLogs = () => {
  // Sample traffic log data
  const [logs] = useState<TrafficLogEntry[]>([
    {
      id: "log-001",
      timestamp: "2025-05-19 08:12:23",
      action: "Zahlungseingang",
      status: "Eingezogen",
      details: "Kundeneinzahlung für Mietwagen"
    },
    {
      id: "log-002",
      timestamp: "2025-05-19 08:15:45",
      action: "Versicherungsbestätigung",
      status: "Eingezogen",
      details: "Versicherungszahlung bestätigt"
    },
    {
      id: "log-003",
      timestamp: "2025-05-19 10:30:12",
      action: "Punkte gutgeschrieben",
      status: "In Auszahlung",
      details: "Bonuspunkte für Kunde hinzugefügt"
    },
    {
      id: "log-004",
      timestamp: "2025-05-19 14:45:30",
      action: "Vermieterzahlung geplant",
      status: "Auszahlung am 26.05.25",
      details: "Zahlungsplan erstellt"
    },
    {
      id: "log-005",
      timestamp: "2025-05-18 09:22:15",
      action: "Mietwagenreservierung",
      status: "Eingezogen",
      details: "Initiale Reservierung bestätigt"
    },
    {
      id: "log-006",
      timestamp: "2025-05-18 09:25:40",
      action: "Versicherungsanfrage",
      status: "Einzug ausstehend",
      details: "Versicherungsoption hinzugefügt"
    },
    {
      id: "log-007",
      timestamp: "2025-05-18 11:30:55",
      action: "Punkteberechnung",
      status: "Einzug ausstehend",
      details: "Treuepunkte kalkuliert"
    },
    {
      id: "log-008",
      timestamp: "2025-05-17 15:40:20",
      action: "Mietvertrag erstellt",
      status: "Einzug ausstehend",
      details: "Vertrag mit Standardkonditionen"
    },
  ]);

  const handleRestoreState = (logId: string) => {
    // This would actually restore the state in a real application
    toast.success(`Zustand von Log ${logId} wiederhergestellt`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Erweiterte Ansicht - Traffic Logs</h2>
      
      <ScrollArea className="h-[70vh] pr-4">
        <div className="space-y-4">
          {logs.map((log) => (
            <Card key={log.id} className="p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">{log.timestamp}</p>
                  <h3 className="font-medium">{log.action}</h3>
                  <p className="text-sm mt-1">{log.details}</p>
                  <p className="text-xs mt-2 inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100">
                    Status: {log.status}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleRestoreState(log.id)}
                >
                  <HistoryIcon className="w-3 h-3" />
                  <span>Wiederherstellen</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
