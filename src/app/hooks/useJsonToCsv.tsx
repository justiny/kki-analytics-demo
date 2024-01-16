'use client';
import { jsonToCSV } from 'react-papaparse';

export const useJsonToCsv = () => {
  const convertToCsv = (data: any, fileName: string) => {
    // Convert table data to CSV string
    const csv = jsonToCSV(data);

    // Create a Blob for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });

    // Create a link element, trigger a download, then remove the element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName; // Name the download file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return convertToCsv;
};
