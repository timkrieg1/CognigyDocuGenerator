const generateFlows = async (apiKey, projectId, prodUrl) => {

    let url = prodUrl + "projects/" + projectId + "/graph/?api_key=" + apiKey
    console.log("URL:", url);

    fetchData(url, projectId);
    await waitForFlowArray();

    const para = new docx.Paragraph({
        text: "Flows",
        style: "Heading1",
    })
    window.sectionsArray.push(para)
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

    for (let i = 0; i < window.flowArray.length; i++) {
        const row = new docx.TableRow({
            children: [
                new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: flowArray[i].name, size: 22, font: { name: "Calibri" }, }),], }),], }),
                new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: flowArray[i]._id, size: 22, font: { name: "Calibri" }, }),], }),], }),
                new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: "", size: 22, font: { name: "Calibri" }, }),], }),], }),
            ],
        });
        rowsArray.push(row);
    }

    const table = new docx.Table({
        rows: rowsArray,
    });
    window.sectionsArray.push(table)

}


async function fetchData(url, projectId) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        console.log("Response Code:", response.status)
        console.log("Response status:", response.statusText)

        if (!(response.ok && response.status === 200)) {
            alert("Something went wrong! API Response Code: " + response.status)
        }
        else {
            const data = await response.json();
            const unfilteredObj = data[projectId]["resources"]

            let letFlowArray = []

            for (let i = 0; i < unfilteredObj.length; i++) {
                if (unfilteredObj[i].type === "flow") {
                    letFlowArray.push(unfilteredObj[i]);
                }
            }
            window.flowArray = letFlowArray
        }
    } catch (error) {
        console.log(error);
    }
}