const targetlineurl ="https://1xbet.kz/en/line/table-tennis/1733171-setka-cup";
const eventCss = "div.c-events__item.c-events__item_col.dashboard-champ-content__event-item";
const  eventTimeCss = "div.c-events__time-info";
const  playerNameCss = "span.c-events__team";
const mainBetCss = "span.c-bets__bet.c-bets__bet_coef.c-bets__bet_sm";
const olimpurl = "https://olimpbet.kz/index.php?page=line&action=2&sel[]=8321500";
const olimplangCss ="div.lang";

function parseEventTime(eventTimeElement) {
    if (!eventTimeElement) return null;
    const text = eventTimeElement.textContent.trim();
    // Match format "11/06 09:45"
    const match = text.match(/^(\d{2})\/(\d{2}) (\d{2}):(\d{2})$/);
    if (!match) return null;
    const [, day, month, hour, minute] = match;
    const now = new Date();
    let year = now.getFullYear();
    // If event is in the past, assume it's for next year
    const eventDate = new Date(year, parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));

    return eventDate;
}

function clickOlimpLangIfOlimpbet() {
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

function reloadIfNotTargetUrl() {
    if (!window.location.hostname.endsWith("1xbet.kz")) {
        return;
    }
   
    if (window.location.href !== targetlineurl) {
        window.location.href = targetlineurl;
}
    const ligaLinks = document.querySelectorAll("a.c-events__liga");
    if (ligaLinks.length > 1) {
        window.location.reload();
        return;
    }


}
function getEventData() {
    const events = document.querySelectorAll(eventCss);
    const eventData = [];
   
    events.forEach(event => {
        const timeElement = event.querySelector(eventTimeCss);
       
        const player1Element = event.querySelector(playerNameCss);
       
        const player2Element = player1Element.nextElementSibling;
        const mainBetElements = event.querySelectorAll(mainBetCss);

        if (timeElement && player1Element && player2Element && mainBetElements.length > 0) {

            const mainBet1Elements = Array.from(mainBetElements).filter(el => el.getAttribute('title') === "1");
            const mainBet2Elements = Array.from(mainBetElements).filter(el => el.getAttribute('title') === "2");
            const mainBet1Element = mainBet1Elements.length === 1 ? mainBet1Elements[0] : null;
            const mainBet2Element = mainBet2Elements.length === 1 ? mainBet2Elements[0] : null;
            
            const eventTime = parseEventTime(timeElement);
           
            if (eventTime && mainBet1Element && mainBet2Element) {
                eventData.push({
                    time: eventTime,
                    player1: player1Element.textContent.trim(),
                    player2: player2Element.textContent.trim(),
                    mainBet1: parseFloat(mainBet1Element.textContent.trim()),
                    mainBet2: parseFloat(mainBet2Element.textContent.trim())
                });
                // alert(time, player1,player2,mainBet1,mainBet2); // Remove or comment out incorrect alert
            }
        }
    });

    return eventData;
}
function findAndClickEvent(targetTime, targetPlayer1, targetPlayer2, mainBet) {
    const events = document.querySelectorAll(eventCss);

    for (const event of events) {
        const timeElement = event.querySelector(eventTimeCss);
        const player1Element = event.querySelector(playerNameCss);
       
        const player2Element = player1Element ? player1Element.nextElementSibling : null;
        const mainBetElements = event.querySelectorAll(mainBetCss);

        if (timeElement && player1Element && player2Element && mainBetElements.length > 0) {
            const eventTime = parseEventTime(timeElement);
            const player1 = player1Element.textContent.trim();
            const player2 = player2Element.textContent.trim();

            if (
                eventTime &&
                eventTime.getTime() === targetTime.getTime() &&
                player1 === targetPlayer1 &&
                player2 === targetPlayer2
            ) {
                const betElement = Array.from(mainBetElements).find(
                    el => el.getAttribute('title') === String(mainBet)
                );
                if (betElement) {
                    betElement.click();
                    return true;
                }
            }
        }
    }
    return false;
}
async function geteventdata() {
    const allEvents = getEventData();
    const now = new Date();

    // Filter events: at least one mainBet >1.4 and <1.65, and first event not later than 50 minutes from now
    const filtered = allEvents
        .filter(ev => (
            (ev.mainBet1 > 1.4 && ev.mainBet1 < 1.65) ||
            (ev.mainBet2 > 1.4 && ev.mainBet2 < 1.65)
        )).sort((a, b) => a.time - b.time);
alert("Events found: " + filtered.length);
    // Find 3 events with time difference >60 and <70 minutes between each
    let selected = [];
    for (let i = 0; i < filtered.length-2; i++) {
        for (let j = i + 1; j < filtered.length-1; j++) {
            const diff1 = Math.abs((filtered[j].time - filtered[i].time) / 60000);
            if (diff1 > 60 && diff1 < 90) {
                for (let k = j + 1; k < filtered.length; k++) {
                    const diff2 = Math.abs((filtered[k].time - filtered[j].time) / 60000);
                    if (diff2 > 60 && diff2 < 90) {
                        selected = [filtered[i], filtered[j], filtered[k]];
                        break;
                    }
                }
                if (selected.length === 3) break;
            }
        }
        if (selected.length === 3) break;
    }

    if (selected.length !== 3) {
        alert("Could not find 3 suitable events");
        return;
    }

    // Click all mainbets with delay 400ms between clicks
    for (let ev of selected) {
        // Click mainBet1 if in range, else mainBet2
        let mainBet = (ev.mainBet1 > 1.4 && ev.mainBet1 < 1.65) ? 1 : 2;
        findAndClickEvent(ev.time, ev.player1, ev.player2, mainBet);
        await new Promise(res => setTimeout(res, 400));
    }
}
alert("begin");
/* reloadIfNotTargetUrl();
 if (window.location.hostname.endsWith("1xbet.kz")) {
        geteventdata().then(() => {
    alert("Events processed successfully");
}).catch(err => {
    console.error("Error processing events:", err);
    alert("Error processing events: " + err.message);
});
    } */
   clickOlimpLangIfOlimpbet();




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
/* browser.runtime.sendMessage({ type: "REQUEST_OLIMP_DATA" })
    .then(response => {
        if (response && response.data) {
            // Use the received data
            console.log("Received data from olimpbet.kz:", response.data);
        }
    }); */
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
    listenForCollectTrsDataMessage();