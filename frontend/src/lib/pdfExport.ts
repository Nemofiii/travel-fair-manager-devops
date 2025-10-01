import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { TravelRecord } from "./storage";

export const exportMonthlyRecordsToPDF = (records: TravelRecord[], month: string) => {
  const doc = new jsPDF();
  
  // Format month for display
  const [year, monthNum] = month.split("-");
  const monthName = new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  
  // Add title
  doc.setFontSize(18);
  doc.text(`Travel Records - ${monthName}`, 14, 20);
  
  // Calculate totals
  const totalDistance = records.reduce((sum, r) => sum + r.distance, 0);
  const totalPetrol = records.reduce((sum, r) => sum + r.petrolAmount, 0);
  const totalFare = records.reduce((sum, r) => sum + r.totalFare, 0);
  
  // Prepare table data
  const tableData = records.map((record) => [
    new Date(record.date).toLocaleDateString(),
    record.customerName,
    record.distance.toFixed(2),
    record.petrolAmount.toFixed(2),
    record.totalFare.toFixed(2),
  ]);
  
  // Add totals row
  tableData.push([
    "TOTAL",
    "",
    totalDistance.toFixed(2),
    totalPetrol.toFixed(2),
    totalFare.toFixed(2),
  ]);
  
  // Create table
  autoTable(doc, {
    startY: 30,
    head: [["Date", "Customer", "Distance (km)", "Petrol (L)", "Fare ($)"]],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: [33, 99, 232], // Primary blue
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    footStyles: {
      fillColor: [249, 115, 22], // Accent orange
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    foot: [["TOTAL", "", totalDistance.toFixed(2), totalPetrol.toFixed(2), totalFare.toFixed(2)]],
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });
  
  // Save the PDF
  doc.save(`travel-records-${month}.pdf`);
};
