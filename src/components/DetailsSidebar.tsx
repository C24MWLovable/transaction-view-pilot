
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const DetailsSidebar = () => {
  return (
    <div className="space-y-6">
      {/* General Details */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Allgemeine Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-500">Buchungsnr.</span>
              <span className="font-medium">B-29384</span>
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
