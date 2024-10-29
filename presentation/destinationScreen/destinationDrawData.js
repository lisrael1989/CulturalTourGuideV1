class DestinationDrawData {
  constructor(destinationObj,onGameCallBack) {
    //link to the game navigation but
    const theGameBut = document.querySelector('main button#activateGame');
    theGameBut.addEventListener("click",onGameCallBack);

    const mainContainer = document.querySelector("#destinationContent");
    const ele = document.createElement("div");
    ele.innerHTML = `<h3>working with the obj ${destinationObj}</h3>`;
    mainContainer.appendChild(ele);
  }

  // methods to create elements from data drawn from JSON
  createDataElement(key, val) {

    const dataElementDiv = document.createElement("div");
    // set the div id to the corresponding key
    dataElementDiv.setAttribute("id", key);

    const hElement = document.createElement("h3");
    const dataContent = document.createElement("div");

    hElement.textContent = `${key}`;
    dataContent.textContent = `${val}`;

    // append h3 and content to the div
    dataElementDiv.appendChild(hElement); 
    dataElementDiv.appendChild(dataContent);

    // append div to main element
    mainContainer.appendChild(dataElementDiv);
  }
}

export default DestinationDrawData;
