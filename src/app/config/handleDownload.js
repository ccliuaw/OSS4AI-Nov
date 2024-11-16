import { jsPDF } from 'jspdf';

export const handleDownload = (coverLetter, filetype = "text") => {
  if (filetype === "text") {
    const blob = new Blob([coverLetter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover-letter.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else if (filetype === 'pdf') {
    const doc = new jsPDF();
    
    // Set font to Times New Roman
    doc.setFont('times', 'normal');
    
    // Set font size to 12pt
    doc.setFontSize(12);
    
    // Split text into lines that fit within page width
    // Using 190 as width to leave margins (page width is 210)
    const splitText = doc.splitTextToSize(coverLetter, 190);
    
    // Add the text to the PDF
    // Starting at x:10, y:10 to leave margins
    doc.text(splitText, 10, 10);
    
    // Save the PDF
    doc.save('cover-letter.pdf');
  }
};
