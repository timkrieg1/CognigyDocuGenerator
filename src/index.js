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
      saveAs(blob, "FlowDocu.docx");
    });
  };
  
  let button = document.getElementById("#btn")
  button.addEventListener("click", startPDF);
  
