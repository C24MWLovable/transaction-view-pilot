
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RefundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RefundDialog = ({ open, onOpenChange }: RefundDialogProps) => {
  const [payer, setPayer] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleCreateRefund = () => {
    // Logic for creating the refund would go here
    console.log("Creating refund with payer:", payer, "and amount:", amount);
    onOpenChange(false);
    // Reset form
    setPayer("");
    setAmount("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kulanzzahlung an Kunden</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="payer" className="text-right">
              Kosten trägt
            </Label>
            <Select value={payer} onValueChange={setPayer}>
              <SelectTrigger id="payer" className="col-span-3">
                <SelectValue placeholder="Bitte wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="check24">check24</SelectItem>
                <SelectItem value="anbieter">Anbieter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Betrag €
            </Label>
            <Input
              id="amount"
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateRefund}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
