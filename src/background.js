const fetch = require('node-fetch');

const sites = {
    '1xbet': 'https://1xbet.kz',
    'olimpbet': 'https://olimpbet.kz'
};

let olimpData = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchData') {
        const site = request.site;
        if (sites[site]) {
            fetchDataFromSite(sites[site])
                .then(data => sendResponse({ success: true, data }))
                .catch(error => sendResponse({ success: false, error: error.message }));
            return true; // Indicates that the response will be sent asynchronously
        }
    }
    if (request.type === "OLIMP_DATA") {
        olimpData = request.payload;
        // Optionally, notify tabs on 1xbet.kz that new data is available
    }
    if (request.type === "REQUEST_OLIMP_DATA") {
        sendResponse({ data: olimpData });
    }
});

async function fetchDataFromSite(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.text();
    return data; // You can parse this data as needed
}