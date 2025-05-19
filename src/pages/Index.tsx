
import { PaymentOverview } from "@/components/PaymentSection";
import { DetailsSidebar } from "@/components/DetailsSidebar";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-bold text-gray-800">Zahlungsübersicht</h1>
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        <div className="flex gap-8">
          {/* Payment Overview Section (2/3 width) */}
          <div className="w-2/3">
            <PaymentOverview />
          </div>
          
          {/* Separator */}
          <Separator orientation="vertical" className="h-auto" />
          
          {/* Details and Actions Section (1/3 width) */}
          <div className="w-1/3">
            <DetailsSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
