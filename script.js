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
    const crxdl = new crxjs.Crxdl({
        url: `https://chrome.google.com/webstore/detail/${extensionId}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
    });
    crxdl.download(extensionId).then((downloadUrl) => {
        // Create a new anchor tag to download the extension
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = `${extensionId}.crx`;
        downloadLink.click();
        popup.style.display = 'none';
    }).catch((error) => {
        console.error(error);
    });
});