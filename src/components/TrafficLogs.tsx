import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HistoryIcon, CalendarIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { StatusBadge } from "./StatusBadge";

export interface TrafficLogEntry {
  id: string;
  event_type: string;
  data: string;
  value: string;
  verification_date: string | null;
  due_date: string;
  comment: string;
  status: string;
  changed_by: string;
  use_case: string | null;
}

export const TrafficLogs = () => {
  // Sample traffic log data - sorted chronologically (newest first)
  const [logs] = useState<TrafficLogEntry[]>([
    {
      id: "log-013",
      event_type: "Refund",
      data: "customer_actual",
      value: "121,50 €",
      verification_date: "2025-05-27 12:00:00",
      due_date: "2025-05-26 17:47:56",
      comment: "Rückzahlung",
      status: "Erfolgreich",
      changed_by: "System",
      use_case: null
    },
    {
      id: "log-012",
      event_type: "Cancel Fee",
      data: "customer_target",
      value: "50,00 €",
      verification_date: null,
      due_date: "2025-05-26 17:32:56",
      comment: "Stornierungsgebühren ändern",
      status: "Erfolgreich",
      changed_by: "luis.kriechbaum",
      use_case: "Stornierungsgebühren ändern"
    },
    {
      id: "log-011",
      event_type: "Cancel Fee",
      data: "customer_target",
      value: "-171,50 €",
      verification_date: null,
      due_date: "2025-05-26 17:32:56",
      comment: "Stornierungsgebühren ändern",
      status: "Erfolgreich",
      changed_by: "luis.kriechbaum",
      use_case: "Stornierungsgebühren ändern"
    },
    {
      id: "log-014",
      event_type: "Cancel Fee",
      data: "customer_target",
      value: "171,50 €",
      verification_date: null,
      due_date: "2025-05-26 16:02:56",
      comment: "Mietwagen Cancel",
      status: "Voided",
      changed_by: "System",
      use_case: null
    },
    {
      id: "log-010",
      event_type: "Cancel",
      data: "customer_target",
      value: "-171,50 €",
      verification_date: null,
      due_date: "2025-05-26 16:02:56",
      comment: "Mietwagen Cancel",
      status: "Voided",
      changed_by: "System",
      use_case: null
    },
    {
      id: "log-009",
      event_type: "Cancel",
      data: "vendor_target",
      value: "171,50 €",
      verification_date: null,
      due_date: "2025-05-26 16:02:56",
      comment: "Allianz Transfer",
      status: "Ausstehend",
      changed_by: "System",
      use_case: null
    },
    {
      id: "log-007",
      event_type: "Booking",
      data: "vendor_actual",
      value: "26,40 €",
      verification_date: "2025-05-18 16:02:56",
      due_date: "2025-05-18 16:02:56",
      comment: "Allianz Transfer",
      status: "Erfolreich",
      changed_by: "System",
      use_case: null
    },
    {
      id: "log-008",
      event_type: "Points Use",
      data: "vendor_target",
      value: "5,50 €",
      verification_date: "2025-05-18 15:45:56",
      due_date: "2025-05-18 15:45:56",
      comment: "Punkte Verwendung",
      status: "Erfolgreich",
      changed_by: "System",
      use_case: null
    },
    {
      id: "log-005",
      event_type: "Booking",
      data: "vendor_target",
      value: "-26,40 €",
      verification_date: "2025-05-18 16:00:56",
      due_date: "2025-05-18 16:00:56",
      comment: "Allianz Transfer",
      status: "Erfolgreich",
      changed_by: "System",
      use_case: null
    },
    {
      id: "log-004",
      event_type: "Booking",
      data: "vendor_target",
      value: "-171,50 €",
      verification_date: null,
      due_date: "2025-05-26 15:45:56",
      comment: "Mietwagen Transfer",
      status: "Voided",
      changed_by: "System",
      use_case: null
    },
    {
      id: "log-003",
      event_type: "Capture",
      data: "customer_actual",
      value: "-197,90 €",
      verification_date: "2025-05-18 15:45:56",
      due_date: "2025-05-18 15:45:56",
      comment: "PayPal Einzug",
      status: "Erfolgreich",
      changed_by: "System",
      use_case: null
    },
    {
      id: "log-002",
      event_type: "Booking",
      data: "customer_target",
      value: "26,40 €",
      verification_date: "2025-05-17 15:40:20",
      due_date: "2025-05-17 15:40:20",
      comment: "Buchung Allianz",
      status: "Erfolgreich",
      changed_by: "System",
      use_case: null
    },
    {
      id: "log-001",
      event_type: "Booking",
      data: "customer_target",
      value: "171,50 €",
      verification_date: "2025-05-17 15:40:20",
      due_date: "2025-05-17 15:40:20",
      comment: "Buchung Mietwagen",
      status: "Erfolgreich",
      changed_by: "System",
      use_case: null
    },
  ]);

  // Function to get the border color based on data
  const getBorderColor = (data: string) => {
    switch(data) {
      case "customer_target":
        return "#6366f1"; // Indigo (dunkler)
      case "customer_actual":
        return "#a5b4fc"; // Indigo (heller)
      case "vendor_target":
        return "#10b981"; // Grün (dunkler)
      case "vendor_actual":
        return "#6ee7b7"; // Grün (heller)
      default:
        return "#6366f1";
    }
  };
  
  // Function to format data display (removing plural 's')
  const formatData = (data: string) => {
    return data.replace('_', ' ').replace(/s$/, '');
  };

  // Hilfsfunktion zum Formatieren von Datum/Zeit ohne Sekunden
  const formatDateTime = (dateTime: string) => {
    // Erwartetes Format: 'YYYY-MM-DD HH:mm:ss'
    const [date, time] = dateTime.split(' ');
    if (!time) return dateTime;
    const [hh, mm] = time.split(':');
    return `${date} ${hh}:${mm}`;
  };

  const handleRestoreState = (logId: string) => {
    // This would actually restore the state in a real application
    toast.success(`Zustand von Log ${logId} wiederhergestellt`);
  };

  const [changedByFilter, setChangedByFilter] = useState<string>("");

  // Alle unique changed_by Werte für Dropdown
  const changedByOptions = useMemo(() => {
    const set = new Set(logs.map(l => l.changed_by).filter(Boolean));
    return Array.from(set);
  }, [logs]);

  // Filtered logs
  const filteredLogs = changedByFilter
    ? logs.filter(l => l.changed_by === changedByFilter)
    : logs;

  // Sortiere die gefilterten Logs nach due_date absteigend
  const sortedLogs = [...filteredLogs].sort((a, b) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime());

  // Gruppieren nach use_case und due_date (wie bisher, aber mit sortedLogs)
  const groupedLogs: { groupKey: string, use_case: string, due_date: string, logs: TrafficLogEntry[] }[] = [];
  const singleLogs: TrafficLogEntry[] = [];
  const logsCopy = [...sortedLogs];

  while (logsCopy.length > 0) {
    const log = logsCopy.shift();
    if (log && log.use_case && log.due_date) {
      const group = [log];
      for (let i = logsCopy.length - 1; i >= 0; i--) {
        if (logsCopy[i].use_case === log.use_case && logsCopy[i].due_date === log.due_date) {
          group.push(logsCopy[i]);
          logsCopy.splice(i, 1);
        }
      }
      // Sortiere die Gruppe nach due_date absteigend
      group.sort((a, b) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime());
      groupedLogs.push({ groupKey: `${log.use_case}-${log.due_date}`, use_case: log.use_case, due_date: log.due_date, logs: group });
    } else if (log) {
      singleLogs.push(log);
    }
  }

  // Hilfsfunktion für Value-Color
  const getValueColor = (value: string) => {
    // Entferne Whitespaces und prüfe auf '-'
    return value.trim().startsWith('-') ? 'text-red-600' : 'text-green-600';
  };

  // Erzeuge ein Mapping von groupKey zu Gruppe für schnellen Zugriff
  const groupMap = new Map(groupedLogs.map(g => [g.groupKey, g]));
  const usedGroupKeys = new Set();
  const renderOrder: (TrafficLogEntry | { groupKey: string, use_case: string, due_date: string, logs: TrafficLogEntry[] })[] = [];
  for (const log of sortedLogs) {
    if (log.use_case && log.due_date) {
      const groupKey = `${log.use_case}-${log.due_date}`;
      if (!usedGroupKeys.has(groupKey)) {
        const group = groupMap.get(groupKey);
        if (group) {
          renderOrder.push(group);
          usedGroupKeys.add(groupKey);
        }
      }
    } else {
      renderOrder.push(log);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Traffic Logs</h2>
        <div>
          <label className="mr-2 text-sm text-gray-600">Changed by</label>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={changedByFilter}
            onChange={e => setChangedByFilter(e.target.value)}
          >
            <option value="">Alle</option>
            {changedByOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      <ScrollArea className="h-[75vh] pr-4">
        <div className="relative">
          {/* Timeline vertical line entfernt */}
          <div className="space-y-2.5">
            {renderOrder.map(item =>
              'logs' in item ? (
                <div key={item.groupKey} className="border-2 border-blue-300 rounded-md p-2 mb-4 bg-blue-50 relative">
                  <div className="text-xs font-semibold text-blue-700 mb-2 relative z-10">Use Case: {item.use_case}</div>
                  <div className="space-y-2.5">
                    {item.logs.map((log) => (
                      <div key={log.id} className="relative">
                        <Card
                          key={log.id}
                          className="p-2.5 shadow-sm border-l-4 w-full min-h-[160px]"
                          style={{ borderLeftColor: getBorderColor(log.data) }}
                        >
                          <div className="flex flex-col space-y-1.5">
                            <div className="flex justify-between items-center">
                              <div className="font-semibold text-sm capitalize">
                                {formatData(log.data)}
                              </div>
                              <div>
                                <div className={
                                  log.status === "Ausstehend"
                                    ? "px-2 py-1 bg-[#F7ECB5] text-xs font-medium rounded-full"
                                    : log.status === "Voided"
                                      ? "px-2 py-1 bg-white text-xs font-medium rounded-full border border-gray-300"
                                      : "px-2 py-1 bg-[#DBF3B7] text-xs font-medium rounded-full"
                                }>
                                  {log.status}
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-x-4 gap-y-1.5">
                              <div>
                                <p className="text-xs text-gray-500">Event Type:</p>
                                <p className="text-sm font-medium">{log.event_type}</p>
                                <p className="text-xs text-gray-500 mt-1">Wert:</p>
                                <p className={`text-sm ${getValueColor(log.value)}`}>{log.value}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Fälligkeitsdatum:</p>
                                <p className="text-sm">{formatDateTime(log.due_date)}</p>
                                <p className="text-xs text-gray-500 mt-1">Verifikationsdatum:</p>
                                <p className="text-sm">{log.verification_date ? formatDateTime(log.verification_date) : 'n.n.'}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Kommentar:</p>
                                <p className="text-sm">{log.comment}</p>
                                <p className="text-xs text-gray-400 mt-1">Geändert durch: {log.changed_by}</p>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1 h-6 px-2"
                                onClick={() => handleRestoreState(log.id)}
                              >
                                <HistoryIcon className="w-3 h-3" />
                                <span className="text-xs">Rückgängig</span>
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div key={item.id} className="relative">
                  <Card
                    key={item.id}
                    className="p-2.5 shadow-sm border-l-4 min-h-[160px]"
                    style={{ borderLeftColor: getBorderColor(item.data) }}
                  >
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex justify-between items-center">
                        <div className="font-semibold text-sm capitalize">
                          {formatData(item.data)}
                        </div>
                        <div>
                          <div className={
                            item.status === "Ausstehend"
                              ? "px-2 py-1 bg-[#F7ECB5] text-xs font-medium rounded-full"
                              : item.status === "Voided"
                                ? "px-2 py-1 bg-white text-xs font-medium rounded-full border border-gray-300"
                                : "px-2 py-1 bg-[#DBF3B7] text-xs font-medium rounded-full"
                          }>
                            {item.status}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-x-4 gap-y-1.5">
                        <div>
                          <p className="text-xs text-gray-500">Event Type:</p>
                          <p className="text-sm font-medium">{item.event_type}</p>
                          <p className="text-xs text-gray-500 mt-1">Wert:</p>
                          <p className={`text-sm ${getValueColor(item.value)}`}>{item.value}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Fälligkeitsdatum:</p>
                          <p className="text-sm">{formatDateTime(item.due_date)}</p>
                          <p className="text-xs text-gray-500 mt-1">Verifikationsdatum:</p>
                          <p className="text-sm">{item.verification_date ? formatDateTime(item.verification_date) : 'n.n.'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Kommentar:</p>
                          <p className="text-sm">{item.comment}</p>
                          <p className="text-xs text-gray-400 mt-1">Geändert durch: {item.changed_by}</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 h-6 px-2"
                          onClick={() => handleRestoreState(item.id)}
                        >
                          <HistoryIcon className="w-3 h-3" />
                          <span className="text-xs">Rückgängig</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
