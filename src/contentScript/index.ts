const Validator = require("wallet-validator");

/*global chrome*/
// If your extension doesn't need a content script, just leave this file empty

// This is an example of a script that will run on every page. This can alter pages
// Don't forget to change `matches` in manifest.json if you want to only change specific webpages

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export function printAllPageLinks() {
  const ethScriptEl = document.createElement("script");
  ethScriptEl.innerHTML = `
  function connectSirkiWallet () {
    if (window.ethereum) {
      window.ethereum.enable().then((accounts) => {
        console.log(accounts[0]);
        const spanAddress = document.createElement("span");
        spanAddress.setAttribute("id", "span-wallet-address");
        spanAddress.setAttribute("hidden", true);
        const textnode = document.createTextNode(accounts[0]);
        spanAddress.appendChild(textnode);
        document.body.appendChild(spanAddress);
      });
    } else {
      alert("Can't find the wallet");
    }
  }
  connectSirkiWallet();
  `;
  document.body.appendChild(ethScriptEl);
}

const connect = async () => {
  printAllPageLinks();
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // window.ethereum
  console.log("*****************");
  console.log(request.url);
  if (request.url === "detect") {
    let contentHtml = document.body.outerHTML;
    let strippedHtml = contentHtml.replace(/<[^>]+>/g, " ");
    const htmlArray = strippedHtml.split(" ");
    let addressArray = [];
    for (let i = 0; i < htmlArray.length; i++) {
      if (Validator.validate(htmlArray[i], "ETH")) {
        addressArray.push(htmlArray[i]);
      }
    }
    sendResponse(addressArray);
  }
  else if (request.url === "connect") {
    connect();
  }
});
