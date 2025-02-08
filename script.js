// Get the DOM elements
const downloadButton = document.getElementById('download-button');
const cancelButton = document.getElementById('cancel-button');
const popup = document.getElementById('popup');
const extensionIdInput = document.getElementById('extension-id');

// Hide the popup by default
popup.style.display = 'block'; // Show the popup by default

// Hide the popup when the user clicks the "Cancel" button
cancelButton.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Handle the download when the user clicks the "Download Extension" button
downloadButton.addEventListener('click', () => {
  const extensionId = extensionIdInput.value.trim();
  const url = `https://chrome.google.com/webstore/detail/${extensionId}`;

  // Create a new blob to hold the extension's manifest
  const manifest = {
    "manifest_version": 2,
    "name": "Extension Installer",
    "version": "1.0",
    "description": "A simple extension to install other extensions",
    "background": {
      "scripts": ["background.js"],
      "persistent": false
    },
    "permissions": ["activeTab"]
  };

  const backgroundScript = `
    chrome.runtime.onInstalled.addListener(function() {
      chrome.tabs.create({ url: '${url}' });
    });
  `;

  const blob = new Blob([JSON.stringify(manifest)], {type: "application/json"});
  const backgroundBlob = new Blob([backgroundScript], {type: "application/javascript"});

  // Create a new zip file to hold the extension
  const zip = new JSZip();
  zip.file("manifest.json", blob);
  zip.file("background.js", backgroundBlob);

  // Generate the zip file as a blob
  zip.generateAsync({type: "blob"}).then(function (blob) {
    // Create a new anchor tag to download the zip file
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${extensionId}.crx`;
    downloadLink.click();
    popup.style.display = 'none';
  });
});
