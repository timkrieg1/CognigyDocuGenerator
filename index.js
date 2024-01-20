const startPDF = () => {
    let doc = new docx.Document();
  
    doc.addSection({
      children: [
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: "Hi",
            }),
          ],
        }),
      ],
    });
    docx.Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "firstdoc.docx");
    });
  };
  
  document.addEventListener("click", startPDF);
  