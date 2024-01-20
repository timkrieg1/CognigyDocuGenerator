const startPDF = () => {
    let doc = new docx.Document();
  
    doc.addSection({
      children: [
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: "Test Text",
            }),
          ],
        }),
      ],
    });
    docx.Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "CognigyDocumentation.docx");
    });
  };
  
  document.addEventListener("click", startPDF);
  
