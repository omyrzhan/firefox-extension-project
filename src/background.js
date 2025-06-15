const fetch = require('node-fetch');

const sites = {
    '1xbet': 'https://1xbet.kz',
    'olimpbet': 'https://olimpbet.kz'
};

let latestOlimpTrsData = null;

// Listen for messages from content scripts
browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    // Store TRS data from olimpbet.kz
    if (msg.type === "OLIMP_TRS_DATA") {
        latestOlimpTrsData = msg.data;
        // Forward to all 1xbet.kz tabs
        browser.tabs.query({ url: "*://*.1xbet.kz/*" }).then(tabs => {
            for (const tab of tabs) {
                browser.tabs.sendMessage(tab.id, { type: "olimptrsdata", trsdata: latestOlimpTrsData });
            }
        });
        sendResponse({ status: "FORWARDED_TO_1XBET" });
        return true;
    }
    // Receive selected events from 1xbet.kz
    if (msg.type === "SELECTED_EVENTS_FROM_1XBET") {
        console.log("Selected events from 1xbet.kz:", msg.selectedEvents);
        sendResponse({ status: "RECEIVED" });
        return true;
    }
});

// Periodically ask olimpbet.kz to collect TRS data
setInterval(() => {
    browser.tabs.query({ url: "*://*.olimpbet.kz/*" }).then(tabs => {
        for (const tab of tabs) {
            browser.tabs.sendMessage(tab.id, { type: "COLLECT_OLIMP_TRS_DATA" });
        }
    });
}, 5 * 60 * 1000); // every 5 minutes

// Optionally, trigger once on startup
browser.tabs.query({ url: "*://*.olimpbet.kz/*" }).then(tabs => {
    for (const tab of tabs) {
        browser.tabs.sendMessage(tab.id, { type: "COLLECT_OLIMP_TRS_DATA" });
    }
});