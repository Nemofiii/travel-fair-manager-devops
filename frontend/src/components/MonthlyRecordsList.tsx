import { useState, useEffect } from "react";
import { Download, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAvailableMonths, getRecordsByMonth, deleteRecord, TravelRecord } from "@/lib/storage";
import { exportMonthlyRecordsToPDF } from "@/lib/pdfExport";
import { toast } from "@/hooks/use-toast";

interface MonthlyRecordsListProps {
  refresh?: number;
}

export const MonthlyRecordsList = ({ refresh }: MonthlyRecordsListProps) => {
  const [months, setMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [records, setRecords] = useState<TravelRecord[]>([]);

  useEffect(() => {
    loadMonths();
  }, [refresh]);

  useEffect(() => {
    if (selectedMonth) {
      loadRecords(selectedMonth);
    }
  }, [selectedMonth, refresh]);

  const loadMonths = async () => {
    try {
      const availableMonths = await getAvailableMonths();
      setMonths(availableMonths);
      if (availableMonths.length > 0 && !selectedMonth) {
        setSelectedMonth(availableMonths[0]);
      }
    } catch (error) {
      console.error('Failed to load months:', error);
      toast({
        title: "Error",
        description: "Failed to load months",
        variant: "destructive",
      });
    }
  };

  const loadRecords = async (month: string) => {
    try {
      const monthRecords = await getRecordsByMonth(month);
      setRecords(monthRecords);
    } catch (error) {
      console.error('Failed to load records:', error);
      toast({
        title: "Error",
        description: "Failed to load records",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRecord(id);
      await loadRecords(selectedMonth);
      toast({
        title: "Deleted",
        description: "Record deleted successfully",
      });
    } catch (error) {
      console.error('Failed to delete record:', error);
      toast({
        title: "Error",
        description: "Failed to delete record",
        variant: "destructive",
      });
    }
  };

  const handleExportPDF = () => {
    if (records.length === 0) {
      toast({
        title: "No records",
        description: "No records to export for this month",
        variant: "destructive",
      });
      return;
    }
    exportMonthlyRecordsToPDF(records, selectedMonth);
    toast({
      title: "Success!",
      description: "PDF downloaded successfully",
    });
  };

  const formatMonthDisplay = (month: string) => {
    const [year, monthNum] = month.split("-");
    return new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  const totals = {
    distance: records.reduce((sum, r) => sum + r.distance, 0),
    petrol: records.reduce((sum, r) => sum + r.petrolAmount, 0),
    fare: records.reduce((sum, r) => sum + r.totalFare, 0),
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {formatMonthDisplay(month)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleExportPDF} variant="outline" className="w-full sm:w-auto">
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {records.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No records for this month
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            {records.map((record) => (
              <Card key={record._id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-lg">{record.customerName}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(record._id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(record.date).toLocaleDateString()}
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-sm pt-2">
                        <div>
                          <p className="text-muted-foreground">Distance</p>
                          <p className="font-medium">{record.distance.toFixed(2)} km</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Petrol</p>
                          <p className="font-medium">{record.petrolAmount.toFixed(2)} L</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Fare</p>
                          <p className="font-medium">${record.totalFare.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle>Monthly Totals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm opacity-90">Total Distance</p>
                  <p className="text-2xl font-bold">{totals.distance.toFixed(2)} km</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Total Petrol</p>
                  <p className="text-2xl font-bold">{totals.petrol.toFixed(2)} L</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Total Fare</p>
                  <p className="text-2xl font-bold">${totals.fare.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
