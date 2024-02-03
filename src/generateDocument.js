const generateDocument = async () => {
    // Create a new Document
    window.sectionsArray = []
    const generateOption = "both"
    const apiKey = "7a7892bdd5ec25bd520345e1fc880bf1f9d630a70b3e9338d378432baad54ed860e8a310aa3d8fde8f6b76d249b7048dd20f22f12bffcead958d2c5703d6edb4"
    const projectId = "659c039ec2074af8879c561c"

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

    if(generateOption == "flows") {
        generateFlows(apiKey, projectId)
    } else {
        generateFlows(apiKey, projectId);
        await waitForFlowArray();
        generateNodes();
    }
    await waitForFlowArray();
    console.log(sectionsArray)

    // Add the sections to the document
    doc.addSection({ children: sectionsArray });

    // Generate the Word document and save it
    docx.Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "CognigyDocumentation.docx");
    });

}

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

  let button = document.getElementById("btn");
button.addEventListener("click", generateDocument);