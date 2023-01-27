function getApi(keywordCountry) {
    return `https://api.weatherapi.com/v1/current.json?key=ae2ade5033e9450198d64844220502&q=${keywordCountry}&aqi=no`;
}

function getData(getCountry) {
    const ajax = new XMLHttpRequest();
    const promise = new Promise((resolve, reject) => {
        ajax.onload = () => {
            if (ajax.status === 200) {
                const data = JSON.parse(ajax.responseText)
                resolve(data)
                displayDataCardHeading(data)
                displayImageCard(data)
                displayDataContent(data)
            } else {
                reject(Error("gagal menggambil data"))
            }
        };

    })

    ajax.open("GET", getApi(getCountry));
    ajax.send()

}


function catchError() {
    alert("Error")
}

function clearData() {
    const displayDataHeading = document.getElementById("card-heading");
    displayDataHeading.textContent = "";

    const displayDataImage = document.getElementById("content-img");
    displayDataImage.textContent = "";

    const displayDataCondition = document.getElementById("condition");
    displayDataCondition.textContent = "";
    
    const displayDataRegion = document.getElementById("region");
    displayDataRegion.textContent = "";

}

// function callDataObject(datas) {
//     Object.keys(datas).forEach(key => {
//         displayData(datas[key])
//         console.log(datas[key]);
//     })
//     console.log(datas.location);
// }

function displayDataCardHeading(datas) {

    const {country, localtime} = datas.location

    const createElementH2 = document.createElement("h2");
    createElementH2.textContent = country;

    const createElementP = document.createElement("p")
    createElementP.textContent = localtime;

    const cardHeading = document.getElementById("card-heading")
    cardHeading.append(createElementH2, createElementP)
    console.log(datas.location);
}

function displayImageCard(datas) {
    const createElementImage = document.createElement("img")
    createElementImage.src = datas.current.condition.icon;

    const contentImage = document.getElementById("content-img")
    contentImage.appendChild(createElementImage)
}

function displayDataContent(datas) {

    const { name, region } = datas.location;
    const { temp_f } = datas.current;
    const createElementRegionP = document.createElement("p"); 
    createElementRegionP.innerHTML = name +", " + region;
    
    const createElementConditionH2 = document.createElement("h2")
    createElementConditionH2.innerHTML = temp_f;

    const createElementConditionP = document.createElement("p")
    createElementConditionP.innerHTML = datas.current.condition.text;


    const condition = document.getElementById("condition");
    condition.append(createElementConditionH2,createElementConditionP)

    const dataregion = document.getElementById("region");
    dataregion.appendChild(createElementRegionP)

}

const inputValue = document.getElementById("inputCountry");
inputValue.addEventListener("input", (data => {
    clearData(data.target.value)
    getData(data.target.value)
}))


