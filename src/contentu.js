const olimpurl = "https://olimpbet.kz/index.php?page=line&action=2&sel[]=8321500";
const olimplangCss ="div.lang";
const coefIssueCss = "span.googleStatIssue";
const coefTitleCss = "span.googleStatIssueName";
const coefValueaCss = "span#googleStatKef";
function getTrsData() {
    
    const trs = document.querySelectorAll('tr.hi');
    const trsdata = [];
    alert("TRS count: " + trs.length);
    trs.forEach(tr => {
        time = extractTimeFromTr(tr);
        const players = extractPlayersFromTr(tr);
        const sibling = tr.nextElementSibling;
// Skip if no sibling
        if (sibling && sibling.tagName === 'TR') {
            //const coefs = extractCoefficientsFromTr(sibling);
            trsdata.push({
                time: time ? time : null,
                players: players ? players : null,
                //coefs:coefs  ? coefs : [],

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
    if (parts[1].endsWith("Single bets Only")) {
        parts[1] = parts[1].replace(/Single bets Only$/, "").trim();
    }
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
            if (message && message.type === "SET_BET") {
                const { player1, player2, time, coefTitle } = message;
                // Convert time string to Date if needed
                let betTime = time;
                if (typeof time === "string") {
                    betTime = new Date(time);
                }
                const result = findAndClickCoef(player1, player2, betTime, coefTitle);
                sendResponse({ status: result ? "CLICKED" : "NOT_FOUND" });
                return;
            }  });
    }
function extractCoefficientsFromTr(tr) {
    if (!tr) return [];
    const coefPairs = [];
    // If coefTitle starts with "Tot", handle two values (U and O) inside the issue
    const titleElem = tr.querySelector(coefTitleCss);
    if (titleElem && titleElem.textContent.trim().startsWith("Tot")) {
        // Find both U and O values inside the issue
        const valueElems = issue.querySelectorAll(coefValueaCss);
        if (valueElems.length >= 2) {
            coefPairs.push({ title: titleElem.textContent.trim() + " U", value: valueElems[0].textContent.trim() });
            coefPairs.push({ title: titleElem.textContent.trim() + " O", value: valueElems[1].textContent.trim() });
        }
        return coefPairs;
    }
    // Find all coef issue elements in the tr
    const coefIssues = tr.querySelectorAll(coefIssueCss);
    coefIssues.forEach(issue => {
        const titleElem = issue.querySelector(coefTitleCss);
        const valueElem = issue.querySelector(coefValueaCss);
        if (!titleElem || !valueElem) return;
        
    if (titleElem && titleElem.textContent.trim().startsWith("Tot")) {
        // Find both U and O values inside the issue
        const valueElems = issue.querySelectorAll(coefValueaCss);
        if (valueElems.length >= 2) {
            coefPairs.push({ title: titleElem.textContent.trim() + " U", value: valueElems[0].textContent.trim() });
            coefPairs.push({ title: titleElem.textContent.trim() + " O", value: valueElems[1].textContent.trim() });
        }
       
    }else{
        let title = titleElem.textContent.trim();
        let value = valueElem.textContent.trim();
        // If title starts with "Tot", create two pairs: one with "U", one with "O"
       
            coefPairs.push({ title, value });
        }
    });
    return coefPairs;
}
function goOlimp() {
    if (window.location.hostname.endsWith("olimpbet.kz")) {
        if (window.location.href !== olimpurl) {
            window.location.href = olimpurl;
        }
        const trsdata = getTrsData();
        if (trsdata.length > 0) {
            let trtemp = trsdata[2];
            let player1 = trtemp.players.player1;
            let player2 = trtemp.players.player2;
            alert(`Player 1: ${player1}, Player 2: ${player2}`);
            let time = trtemp.time;
            let coefTitle = "1";
            if (findAndClickCoef(player1, player2, time, coefTitle)) {
                alert(`Clicked coefficient for ${player1} vs ${player2} at ${time} with title "${coefTitle}"`);
            } else {
                alert(`Coefficient for ${player1} vs ${player2} at ${time} with title "${coefTitle}" not found`);
            }
           





        }
    }
}
function findAndClickCoef(player1, player2, time, coefTitle) {
    const trs = document.querySelectorAll('tr.hi');
    for (const tr of trs) {
        const players = extractPlayersFromTr(tr);
        const trTime = extractTimeFromTr(tr);
        if (
            players &&
            players.player1 === player1 &&
            players.player2 === player2 &&
            trTime &&
            Math.abs(trTime.getTime() - time.getTime()) < 60000 // allow 1 min difference
        ) {
            const sibling = tr.nextElementSibling;
            if (sibling && sibling.tagName === 'TR') {
                const coefIssues = sibling.querySelectorAll("span.googleStatIssue");
                for (const issue of coefIssues) {
                    const titleElem = issue.querySelector("span.googleStatIssueName");
                    if (titleElem && titleElem.textContent.trim().toLowerCase().startsWith("tot")) {
                        // coefTitle must end with " U" or " O"
                        const valueElems = issue.querySelectorAll("span#googleStatKef");
                        if (valueElems.length >= 2) {
                            if (coefTitle.endsWith(" U")) {
                                valueElems[0].click();
                                return true;
                            } else if (coefTitle.endsWith(" O")) {
                                valueElems[1].click();
                                return true;
                            }
                        }
                        return false;
                    }
                    if (titleElem && titleElem.textContent.trim() === coefTitle)
                         {   let valueElem = issue.querySelector("span#googleStatKef");
                        if (valueElem) {
                            valueElem =valueElem.parentElement
                            valueElem.click();
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

const targetlineurl ="https://1xbet.kz/en/line/table-tennis/1733171-setka-cup";
const eventCss = "div.c-events__item.c-events__item_col.dashboard-champ-content__event-item";
const  eventTimeCss = "div.c-events__time-info";
const  playerNameCss = "span.c-events__team";
const mainBetCss = "span.c-bets__bet.c-bets__bet_coef.c-bets__bet_sm";


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
function filterEventsByTrsData(eventData, trsData) {
    // Helper to split names into lowercase words
    function nameWords(name) {
        return name.toLowerCase().split(/\s+/);
    }

    // Helper to check if two names match (at least one word coincides, order can be reversed)
    function namesMatch(eventName, trsName) {
        const eventWords = nameWords(eventName);
        const trsWords = nameWords(trsName);
        return trsWords.some(w => eventWords.includes(w));
    }

    // Helper to check if event matches trs item
    function eventMatches(event, item) {
        // Check player1 and player2 (allow reverse order)
        const p1Match = namesMatch(event.player1, item.players[0]) && namesMatch(event.player2, item.players[1]);
        const p2Match = namesMatch(event.player1, item.players[1]) && namesMatch(event.player2, item.players[0]);
        // Check time difference
        const timeDiff = Math.abs(event.time - item.time) / 60000;
        return (p1Match || p2Match) && timeDiff <= 10;
    }

    return eventData.filter(event =>
        trsData.some(item => eventMatches(event, item))
    );
}

async function setBet(trsData) {
    let allEvents = getEventData();
    allEvents = filterEventsByTrsData(allEvents, trsData);

    const filtered = allEvents
        .filter(ev => (
            (ev.mainBet1 > 1.4 && ev.mainBet1 < 1.65) ||
            (ev.mainBet2 > 1.4 && ev.mainBet2 < 1.65)
        )).sort((a, b) => a.time - b.time);

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

    for (let ev of selected) {
        let mainBet = (ev.mainBet1 > 1.4 && ev.mainBet1 < 1.65) ? 1 : 2;
        findAndClickEvent(ev.time, ev.player1, ev.player2, mainBet);
        await new Promise(res => setTimeout(res, 400));
    }
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
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message && message.type === "olimptrsdata" && Array.isArray(message.trsdata)) {
        setBetAndRespond(message.trsdata);
    }
});

// Helper: run setBet and respond to background.js
async function setBetAndRespond(trsdata) {
    const selectedEvents = await setBet(trsdata); // Modify setBet to return selected events
    browser.runtime.sendMessage({
        type: "SELECTED_EVENTS_FROM_1XBET",
        selectedEvents
    });
}
