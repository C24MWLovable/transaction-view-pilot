
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { RefundDialog } from "@/components/RefundDialog";

export const DetailsSidebar = () => {
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  
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
              <span className="text-gray-500">Kunde</span>
              <span className="font-medium">Max Mustermann</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-500">Storniert?</span>
              <span className="font-medium">Nein</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div>
        <h3 className="font-semibold mb-3 text-sm text-gray-600">Schnelle Aktionen</h3>
        <div className="grid gap-2">
          <Button 
            className="justify-start" 
            variant="secondary"
            onClick={() => setIsRefundDialogOpen(true)}
          >
            Kulanzzahlung an Kunden
          </Button>
          <Button className="justify-start" variant="secondary">Chargeback beantworten</Button>
          <Button className="justify-start" variant="secondary">Stornierungsgebühren ändern</Button>
          <Button className="justify-start" variant="secondary">Preis Differenz eintragen</Button>
          <Button className="justify-start" variant="secondary">Rückzahlung anstoßen</Button>
          <Button className="justify-start" variant="secondary">Vermieter Transfer Datum bearbeiten</Button>
        </div>
      </div>
      
      <RefundDialog 
        open={isRefundDialogOpen} 
        onOpenChange={setIsRefundDialogOpen}
      />
    </div>
  );
};
