
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";

export const DetailsSidebar = () => {
  return (
    <div className="space-y-6">
      {/* General Details */}
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Allgemeine Details</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-500">Buchungsnummer</span>
              <span className="font-medium">3251160928</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-500">Booking-ID-Hash</span>
              <span className="font-medium">4pg8oi7y7b6rtsoai3</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-500">Zahlungsvorgang-ID-Hash</span>
              <span className="font-medium text-xs break-all">pp__gFBt9WfXkgUPA_NfeNM9w8cXGKDx</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-500">Datum</span>
              <span className="font-medium">12.05.2025</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-500">Kunde</span>
              <span className="font-medium">Max Mustermann</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-500">Status</span>
              <span className="font-medium">In Bearbeitung</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div>
        <h3 className="font-semibold mb-3 text-sm text-gray-600">Schnelle Aktionen</h3>
        <div className="grid gap-2">
          <Button className="justify-start" variant="secondary">Zahlung bestätigen</Button>
          <Button className="justify-start" variant="secondary">Rückerstattung starten</Button>
          <Button className="justify-start" variant="secondary">Nachricht senden</Button>
          <Button className="justify-start" variant="outline">Details exportieren</Button>
        </div>
      </div>
    </div>
  );
};
