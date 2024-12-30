import { jsPDF } from "jspdf";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportReports({ articles }) {
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Payout Report", 10, 10);
    articles.forEach((article, index) => {
      doc.text(
        `${index + 1}. ${article.title} - ${article.author}`,
        10,
        20 + index * 10
      );
    });
    doc.save("PayoutReport.pdf");
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(
      articles.map((article) => ({
        Title: article.title,
        Author: article.author,
        Date: article.date,
        Type: article.type,
        Source: article.source,
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "PayoutReport.csv");
  };

  const exportToGoogleSheets = () => {
    const ws = XLSX.utils.json_to_sheet(
      articles.map((article) => ({
        Title: article.title,
        Author: article.author,
        Date: article.date,
        Type: article.type,
        Source: article.source,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PayoutReport");
    XLSX.writeFile(wb, "PayoutReport.xlsx");
  };

  return (
    <div className="export-buttons">
      <button onClick={exportToPDF}>Export to PDF</button>
      <button onClick={exportToCSV}>Export to CSV</button>
      <button onClick={exportToGoogleSheets}>Export to Google Sheets</button>
    </div>
  );
}

export default ExportReports;
