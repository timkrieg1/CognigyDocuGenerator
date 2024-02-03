

function executeScripts() {
    const apiKey = "d94286b1fa24988f5697466858ab76ca887e7dc3075091823c959ed97810a4c8c3f22bd771d91a5ae969085b70564c9337fa8c7344b4eb2921f1b01303f4ff96"
    const projectId = "63ef4244d211013ccedb3239"
    const prodUrl = "https://api.eu.prod.cai.allianz.net/new/v2.0/"
    loadAllCharts(apiKey, projectId, prodUrl);
    waitForFlowArray();
    generateFlows();
}

let button = document.getElementById("btn");
button.addEventListener("click", executeScripts);