 
const olimpurl = "https://olimpbet.kz/index.php?page=line&action=2&sel[]=8321500";
const olimplangCss ="div.lang";
function getTrsData() {
    
    const trs = document.querySelectorAll('tr.hi');
    const trsdata = [];
    alert("TRS count: " + trs.length);
    trs.forEach(tr => {
        time = extractTimeFromTr(tr);
        const players = extractPlayersFromTr(tr);
        const sibling = tr.nextElementSibling;
        if (sibling && sibling.tagName === 'TR') {
            trsdata.push({
                time: time ? time : null,
                players: players ? players : null,
            });
        }
    });
    return trsdata;
}
function extractTimeFromTr(tr) {
    if (!tr) return null;
    const td = tr.querySelector('td');
    if (!td) return null;
    const match = td.textContent.match(/(\d{2}):(\d{2})/);
    if (!match) return null;
    const [, hour, minute] = match;
    const now = new Date();
    // Use today's date with extracted hour and minute
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hour), parseInt(minute));
}
function extractPlayersFromTr(tr) {
    if (!tr) return null;
    const tds = tr.querySelectorAll('td');
    if (tds.length < 2) return null;
    const secondTd = tds[1];
    const font = secondTd.querySelector('font.m');
    if (!font) return null;
    const text = font.textContent.trim();
    const parts = text.split(' - ');
    if (parts.length !== 2) return null;
    return {
        player1: parts[0].trim(),
        player2: parts[1].trim()
    };
}
function collectAndSendTrsData() {
        const trsData = getTrsData();
        browser.runtime.sendMessage({
            type: "OLIMP_TRS_DATA",
            data: trsData
        }).then(response => {
            console.log("TRS data sent to background.js, response:", response);
        }).catch(err => {
            console.error("Error sending TRS data to background.js:", err);
        });
    }
function listenForCollectTrsDataMessage() {
        browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message && message.type === "COLLECT_OLIMP_TRS_DATA") {
                collectAndSendTrsData();
                sendResponse({ status: "OK" });
            }
        });
    }
    function getCoefficientsFromTr(tr) {
        if (!tr) return [];
        
        const sibling = tr.nextElementSibling;
        if (!sibling || sibling.tagName !== 'TR') return [];
        // Find all spans with class 'bet_sel koefs' inside the sibling tr
        const coefSpans = sibling.querySelectorAll('span.bet_sel.koefs');
        const coefficients = [];
        coefSpans.forEach(span => {
            // Try to get the value from <span id="googleStatKef"> inside <b class="value_js">
            const valueSpan = span.querySelector('b.value_js > span#googleStatKef');
            if (valueSpan) {
                const val = valueSpan.textContent.trim();
                if (val) coefficients.push(val);
            }
        });
        return coefficients;
    }
function goOlimp() {
    if (window.location.hostname.endsWith("olimpbet.kz")) {
        if (window.location.href !== olimpurl) {
            window.location.href = olimpurl;
        }
        const trsdata = getTrsData();
        if (trsdata.length > 0) {
            alert("TRS Data: " + JSON.stringify(trsdata));
        }
    }
}
goOlimp();