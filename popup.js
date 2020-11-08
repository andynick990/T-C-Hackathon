'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
  let scanPageButton = document.getElementById('scanPageButton');
  let summarizeTermsButton = document.getElementById('summarizeTermsButton');
                 
    scanPageButton.addEventListener("click", function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.executeScript(
              tabs[0].id,
              {file: "scanScript.js"});
          chrome.tabs.insertCSS(
            tabs[0].id,
            {file: "injectedStyle.css"});
        })});

    summarizeTermsButton.addEventListener("click", function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: "summarizeScript.js"});
        chrome.tabs.insertCSS(
          tabs[0].id,
          {file: "injectedStyle.css"});
      })});

});
