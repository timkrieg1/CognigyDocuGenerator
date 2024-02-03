const waitForFlowArray = () => {
  return new Promise((resolve) => {
      const interval = setInterval(() => {
          if (window.flowArray) {
              clearInterval(interval);
              resolve();
          } else {
          }
      }, 100);
  });
}



const generateFlows = async () => {
  await waitForFlowArray();
    console.log("Zweiter",flowArray);
    // Create a new Document
    const doc = new docx.Document({
      styles: {
        paragraphStyles: [
          {
            id: "Heading1",
            name: "Heading 1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 26,
              bold: true,
              color: "000000",
              font: "Calibri",
            },
            paragraph: {
              spacing: {
                before: 240,
                after: 120
              },
            },
          },
        ],
      }
    });
    const para = new docx.Paragraph({
      text: "Flows",
      style: "Heading1",
    })
    //const para = new docx.Paragraph ({children: [new docx.TextRun({text: `Heading 1`, size: 30, font: {name: "Calibri"},}),], });



    // Create Flows Table

    const rowsArray = []; //Define Array for TableRows

    //Create Headings for table and append to array
    const row = new docx.TableRow({
      children: [
        new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: `FLow Name`, size: 30, font: { name: "Calibri" }, }),], }),], }),
        new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: `Flow Id`, size: 30, font: { name: "Calibri" }, }),], }),], }),
        new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: `Description`, size: 30, font: { name: "Calibri" }, }),], }),], }),
      ],
    });
    rowsArray.push(row);

    //Create dynamic rows for table

    for (let i = 0; i < flowArray.length; i++) {
      const row = new docx.TableRow({
        children: [
          new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: flowArray[i].name, size: 22, font: { name: "Calibri" }, }),], }),], }),
          new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: flowArray[i]._id, size: 22, font: { name: "Calibri" }, }),], }),], }),
          new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text:"", size: 22, font: { name: "Calibri" }, }),], }),], }),
        ],
      });
      rowsArray.push(row);
    }

    const table = new docx.Table({
      rows: rowsArray,
    });

    // Add the table to the document
    doc.addSection({ children: [para, table] });

    // Generate the Word document and save it
    docx.Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "CognigyDocumentation.docx");
    });
  }

