
const loadAllCharts = (apiKey, projectId, prodUrl) => {
    console.log("API Key:", apiKey);
    console.log("Project ID:", projectId);

    //API Request to get all Charts in a Project
    let url = prodUrl + "projects/" + projectId + "/graph/?api_key=" + apiKey
    console.log("URL:", url);


    async function fetchData() {
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
    fetchData();
};





//let button = document.getElementById("#btn");
//button.addEventListener("click", () => loadAllCharts(apiKey, projectId));