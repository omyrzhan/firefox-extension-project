const targetUrl = "https://1xbet.kz/en/live/table-tennis/1733171-setka-cup";

const eventCss = "div.c-events__item.c-events__item_col.dashboard-champ-content__event-item";
const champCss = "div.dashboard-champ-content";
const champNameCss = "a.c-events__liga";
const mainEventCss = "div.c-events__item.c-events__item_game.c-events-item.c-events-scoreboard__wrap.c-events__item--has-no-info";
const setEventCss = "div.c-events.c-events_inner";
const moreEventbtnCss = "span.c-events__more.c-events__more_events";
const coefCss = "span.c-bets__bet";
const scoreBoardLineCss = "div.c-events-scoreboard__line";
const scoreCellAllCss = "span.c-events-scoreboard__cell";
const teamCss = "div.c-events__team";
const innerSetCss = "div.c-events__item.c-events__item_game";
const innerSetNameCss = "div.c-events__name";
const sportRighrCss = "#sports_right";
const betListCss = "div.cpn-bets-list";
const betListItemCss = "div.cpn-bets-list__item";
const betTeamsCss = "div.cpn-bet-teams.cpn-bet__teams";
const betTeamNameCss = "span.cpn-bet-team__name";
const marketLabelCss = "span.cpn-bet-market-label";
const betCoefCss = "span.cpn-bet__coef";
const totBetCoefCss = "div.cpn-total__coef";
const stakeTypeSelectCss = "span.multiselect__single";
const stakeSlelectWrapperCss = "div.multiselect__tags";
const potentialwinDivCss = "div.cpn-possible-win__layout.cpn-possible-win-layout";
const potentialwinCss = "p.cpn-text--sum";
const BtnCss = "button.cpn-btn.cpn-value-controls__btn.cpn-btn--theme-light.cpn-btn--size-m.cpn-btn--square";
const minusAriaCss = "i.cpn-btn__faicon.fa.fa-minus";
const plusAriaCss = "i.cpn-btn__faicon.fa.fa-plus";
const placeBetBtnCss = "button.cpn-btn.cpn-btns-group__btn.cpn-btn--theme-accent.cpn-btn--size-m.cpn-btn--default";
const stakeInputCss = "input.cpn-value-controls__input.cpn-value-controls__input--stake";


/**
 * Utility functions and constants for scraping and processing event data.
 * All CSS selectors and helper functions are defined here.
 */
class Event {
constructor({
player1 = "",
player2 = "",
score1player1tot = 0,
score1player2tot = 0,
score1player1set = 0,
score1player2set = 0,
score1player3set = 0,
score1player4set = 0,
score1player5set = 0,
score2player1set = 0,
score2player2set = 0,
score2player3set = 0,
score2player4set = 0,
score2player5set = 0,
maincoef1 = 0,
maincoef2 = 0,
maintotmore = 0,
maintotless = 0,
maintotal = 0,
nextSetcoef1 = 0,
nextSetcoef2 = 0,
nextSettotmore = 0,
nextSettotless = 0,
nextSettotal = 0,
nextsetcoef1 = 0,
nextsetcoef2 = 0,
nextsettotmore = 0,
nextsettotless = 0,
nextsettotal = 0,

} = {}) {
this.player1 = player1;
this.player2 = player2;
this.score1player1tot = score1player1tot;
this.score1player2tot = score1player2tot;
this.score1player1set = score1player1set;
this.score1player2set = score1player2set;
this.score1player3set = score1player3set;
this.score1player4set = score1player4set;
this.score1player5set = score1player5set;
this.score2player1set = score2player1set;
this.score2player2set = score2player2set;
this.score2player3set = score2player3set;
this.score2player4set = score2player4set;
this.score2player5set = score2player5set;
this.maincoef1 = maincoef1;
this.maincoef2 = maincoef2;
this.maintotmore = maintotmore;
this.maintotless = maintotless;
this.maintotal = maintotal;
this.nextSetcoef1 = nextSetcoef1;
this.nextSetcoef2 = nextSetcoef2;
this.nextSettotmore = nextSettotmore;
this.nextSettotless = nextSettotless;
this.nextSettotal = nextSettotal;

this.wl = [0, 0, 0, 0, 0];
this.tot = [0, 0, 0, 0, 0];
this.win = 0;
this.betset =0;
this.nextSet =1;
this.staketype = "";
this.betsum =0;
this.multiplier = 1;
this.strategy = 0; // 0 - no strategy, 1 - alt, 2 - is30, 3 - over18, 4 - under18
this.strategystat =0;
this.alt = false;
this.is30 = false;
this.updated = false;
this.createdtime = new Date().toISOString();
}
checkAltAnd30() {
// Find all non-zero values in wl
const nonZero = this.wl.map((v, i) => ({ v, i })).filter(x => x.v !== 0);

// Check alternation: true if all adjacent non-zero values alternate
// (e.g. 1,2,1,2...)
let isAlt = 1;
for (let i = 1; i < nonZero.length; i++) {
if (nonZero[i].v === nonZero[i - 1].v) {
isAlt = 0;
break;
}
}
this.alt = isAlt && nonZero.length > 1;

// Check for any sequence of 3 consecutive non-alternate non-zero values
// (e.g. 1,1,1 or 2,2,2)
let found30 = 0;
for (let i = 0; i <= this.wl.length - 3; i++) {
if (
this.wl[i] !== 0 &&
this.wl[i] === this.wl[i + 1] &&
this.wl[i] === this.wl[i + 2]
) {
found30 = 1;
break;
}
}
this.is30 = found30;
}
checkSets() {
const setScores = [
[this.score1player1set, this.score2player1set],
[this.score1player2set, this.score2player2set],
[this.score1player3set, this.score2player3set],
[this.score1player4set, this.score2player4set],
[this.score1player5set, this.score2player5set]
];
for (let i = 0; i < 5; i++) {
const s1 = parseInt(setScores[i][0], 10);

const s2 = parseInt(setScores[i][1], 10);


if (!isNaN(s1) && !isNaN(s2)) {
if (s1 > 10 && s1 - s2 > 1) {
this.wl[i] = 1;
} else if (s2 > 10 && s2 - s1 > 1) {
this.wl[i] = 2;
}

this.tot[i] = s1 + s2;
if (this.wl[i]>0) {
    this.nextSet = i + 2;
}
}
const count1 = this.wl.filter(v => v === 1).length;
const count2 = this.wl.filter(v => v === 2).length;
if (count1 === 3) {
this.win = 1;
} else if (count2 === 3) {
this.win = 2;
}
this.checkAltAnd30();
}
}
}



/**
 * Finds and clicks the main coefficient button with the given title in the provided event element.
 * @param {Element} eventElement - The DOM element representing the event.
 * @param {string} title - The title attribute to match.
 * @returns {boolean} - True if the button was found and clicked, false otherwise.
 */
function clickMainCoefByTitle(eventElement, title) {
    if (!eventElement) return false;
    const coefButtons = eventElement.querySelectorAll(coefCss);
    for (const btn of coefButtons) {
        if (btn.getAttribute('title') === title) {
            btn.click();
            return true;
        }
    }
    return false;
}

/**
 * Checks if all elements with selector "span.cpn-bet-sport-name__text" inside the given rightSideElement
 * have textContent that matches any of the provided sportNames.
 * @param {Element} rightSideElement - The DOM element to search within.
 * @param {string[]} sportNames - Array of sport names to match.
 * @returns {boolean} - True if all sport name elements match, false otherwise.
 */
function allSportNamesMatch(rightSideElement, sportNames) {
    if (!rightSideElement || !Array.isArray(sportNames)) return false;
    const sportNameElements = rightSideElement.querySelectorAll("span.cpn-bet-sport-name__text");
    const foundNames = new Set();
    for (const el of sportNameElements) {
        const text = el.textContent.trim();
        if (sportNames.includes(text)) {
            foundNames.add(text);
        } else {
            // Found an element with text not in sportNames
            return false;
        }
    }
    if (foundNames.size !== sportNames.length) {
        // Not all sportNames have a corresponding element
        return false;
    }
    return foundNames.size > 0;
}
/**
 * Finds all championship elements on the page and returns them as an array.
 * @returns {Element[]} - Array of championship DOM elements.
 */
function findChamps() {
    return Array.from(document.querySelectorAll(champCss));
}
/**
 * Finds and returns the championship element with the given name from the provided array.
 * @param {Element[]} champs - Array of championship DOM elements.
 * @param {string} name - The name of the championship to find.
 * @returns {Element|null} - The matching championship element, or null if not found.
 */
function findChampByName(champs, name) {
    if (!Array.isArray(champs) || typeof name !== 'string') return null;
    for (const champ of champs) {
        const champNameEl = champ.querySelector(champNameCss);
        if (champNameEl && champNameEl.textContent.trim() === name) {
            return champ;
        }
    }
    return null;
}
/**
 * Finds all event elements within the given championship element and returns them as an array.
 * @param {Element} champ - The championship DOM element.
 * @returns {Element[]} - Array of event DOM elements within the championship.
 */
function findEventsInChamp(champ) {
    if (!champ) return [];
    return Array.from(champ.querySelectorAll(eventCss));
}
/**
 * Finds the main event element within the given championship element.
 * @param {Element} champ - The championship DOM element.
 * @returns {Element|null} - The main event element, or null if not found.
 */
function findMainInEvent(event) {
    if (!event) return null;
    return event.querySelector(mainEventCss);
}
/**
 * Finds all set event elements within the given championship element.
 * @param {Element} champ - The championship DOM element.
 * @returns {Element[]} - Array of set event DOM elements within the championship.
 */
function findSetsInEvent(event) {
    if (!event) return null;
    return event.querySelector(setEventCss);
}
/**
 * Finds the "more" button in the given event element and clicks it if it does not have the "active" class.
 * @param {Element} eventElement - The DOM element representing the event.
 * @returns {boolean} - True if the button was found and clicked, false otherwise.
 */
function clickMore(eventElement) {
    if (!eventElement) return false;
    const moreBtn = eventElement.querySelector(moreEventbtnCss);
    if (moreBtn && !moreBtn.classList.contains("active")) {
        moreBtn.click();
        return true;
    }
    return false;
}
/**
 * Finds score lines in the given event element and returns an array of 6 pairs of integers.
 * Each pair contains [firstLineValue, secondLineValue]. If not enough data, fills with 0.
 * @param {Element} eventElement - The DOM element representing the event.
 * @returns {Array<[number, number]>} - Array of 6 pairs of integers.
 */
function getScoreLines(eventElement) {
    const result = [];
    if (!eventElement) {
        for (let i = 0; i < 6; i++) result.push([0, 0]);
        return result;
    }
    const lines = eventElement.querySelectorAll(scoreBoardLineCss);
    if (lines.length < 2) {
        for (let i = 0; i < 6; i++) result.push([0, 0]);
        return result;
    }
    const firstCells = lines[0].querySelectorAll(scoreCellAllCss);
    const secondCells = lines[1].querySelectorAll(scoreCellAllCss);
    for (let i = 0; i < 6; i++) {
        const first = firstCells[i] ? parseInt(firstCells[i].textContent.trim(), 10) || 0 : 0;
        const second = secondCells[i] ? parseInt(secondCells[i].textContent.trim(), 10) || 0 : 0;
        result.push([first, second]);
    }
    return result;
}


/**
 * Finds all inner set elements within the given detailed event element.
 * @param {Element} detEvent - The detailed event DOM element.
 * @returns {Element[]} - Array of inner set DOM elements.
 */
function findInnerSets(setEvent) {
    if (!setEvent) return [];
    return Array.from(setEvent.querySelectorAll(innerSetCss));
}
/**
 * Finds the name element within the given inner set element.
 * @param {Element} innerSet - The inner set DOM element.
 * @returns {Element|null} - The name element, or null if not found.
 */
function findInnerSetName(innerSet) {
    if (!innerSet) return null;
    return innerSet.querySelector(innerSetNameCss);
}
/**
 * Finds the team elements within the given event element.
 * @param {Element} eventElement - The DOM element representing the event.
 * @returns {Element[]} - Array of team DOM elements within the event.
 */
function findTeamsInEvent(eventElement) {
    if (!eventElement) return [];
    return Array.from(eventElement.querySelectorAll(teamCss));
}

/**
 * Finds the right side element in the document.
 * @returns {Element|null} - The right side element, or null if not found.
 */
function findRightSide() {
    return document.querySelector(sportRighrCss);
}

/**
 * Finds all bet elements within the given element, filters out those whose classList contains "non",
 * and returns an array of pairs [title, floatValue] where title is the bet's title attribute and
 * floatValue is the parsed float from the bet's text content.
 * @param {Element} element - The DOM element to search within.
 * @returns {Array<[string, number]>} - Array of [title, floatValue] pairs.
 */
function findCoefs(element) {
    if (!element) return [];
    const bets = element.querySelectorAll(coefCss);
    const result = [];
    for (const bet of bets) {
        if (!bet.className.includes("non")) {
            const title = bet.getAttribute("title") || "";
            const value = parseFloat(bet.textContent.replace(",", "."));
            result.push([title, value]);
        }
    }
    return result;
}

/**
 * Extracts data from the given eventElement and pushes it into the given eventObj.
 * Main event coefficients go to maincoef fields.
 * If set events exist, fills nextSetcoef and nextsetcoef from them.
 * Scores are filled from getScoreLines (array of 6 pairs).
 * @param {Element} eventElement - The DOM element representing the event.
 * @param {Event} eventObj - The Event object to update.
 */
function pushEventDataToEventObj(eventElement, eventObj) {
    if (!eventElement || !eventObj) return;

    // Teams
    const teams = findTeamsInEvent(eventElement);
    if (teams.length >= 2) {
        eventObj.player1 = teams[0].textContent.trim();
        eventObj.player2 = teams[1].textContent.trim();
    }

    // Main event coefficients
    const mainEvent = findMainInEvent(eventElement);
    if (mainEvent) {
        const mainCoefs = findCoefs(mainEvent);
        for (const [title, value] of mainCoefs) {
            if (title === "1") eventObj.maincoef1 = value;
            if (title === "2") eventObj.maincoef2 = value;
            if (title.toLowerCase().includes("total over")) eventObj.maintotmore = value;
            if (title.toLowerCase().includes("total under")) eventObj.maintotless = value;
            if (title.toLowerCase().includes("total")) eventObj.maintotal = value;
        }
    }

    // Set events: current and next set coefficients
    const setEvent = findSetsInEvent(eventElement);
    if (setEvent) {
        const innerSets = findInnerSets(setEvent);
        if (innerSets.length > 0) {
            // Current set
            const nextSetCoefs = findCoefs(innerSets[0]);
            for (const [title, value] of nextSetCoefs) {
                if (title === "1") eventObj.nextSetcoef1 = value;
                if (title === "2") eventObj.nextSetcoef2 = value;
                if (title.toLowerCase().includes("total over")) eventObj.nextSettotmore = value;
                if (title.toLowerCase().includes("total under")) eventObj.nextSettotless = value;
                
        }
        if (innerSets.length > 1) {
            // Next set
            const nextSetCoefs = findCoefs(innerSets[1]);
            for (const [title, value] of nextSetCoefs) {
                if (title === "1") eventObj.nextsetcoef1 = value;
                if (title === "2") eventObj.nextsetcoef2 = value;
                if (title.toLowerCase().includes("total over")) eventObj.nextsettotmore = value;
                if (title.toLowerCase().includes("total under")) eventObj.nextsettotless = value;
                if (title.toLowerCase().includes("total")) eventObj.nextsettotal = value;
            }
        }
    }

    // Scores from getScoreLines (array of 6 pairs)
    const scores = getScoreLines(eventElement);
    if (scores.length >= 6) {
        eventObj.score1player1tot = scores[0][0];
        eventObj.score1player2tot = scores[0][1];
        eventObj.score1player1set = scores[1][0];
        eventObj.score2player1set = scores[1][1];
        eventObj.score1player2set = scores[2][0];
        eventObj.score2player2set = scores[2][1];
        eventObj.score1player3set = scores[3][0];
        eventObj.score2player3set = scores[3][1];
        eventObj.score1player4set = scores[4][0];
        eventObj.score2player4set = scores[4][1];
        eventObj.score1player5set = scores[5][0];
        eventObj.score2player5set = scores[5][1];
    }

    // Update win/loss and alternation flags
    eventObj.checkSets();
}
/**
 * Merges player1 into one word and uses it as a key in localStorage.
 * If a record exists, updates its wl, alt, and is30 fields and saves.
 * If not, creates a new record with these fields and saves.
 * @param {Event} eventObj - The Event object to store.
 */
function saveEventStatsToLocalStorage(eventObj) {

    if (!eventObj || !eventObj.player1) return;
    const key = eventObj.player1.replace(/\s+/g, "");
    let record = {};
    const existing = localStorage.getItem(key);
    if (existing) {
        try {
            record = JSON.parse(existing);
        } catch {
            record = {};
        }
    }
    if (!Array.isArray(record.wl)) record.wl = [1, 0, 0, 1, 1];
    if (!Array.isArray(record.alt)) record.alt = [];
    if (!Array.isArray(record.tot)) record.tot = [];
    if (!Array.isArray(record.is30)) record.is30 = [1,1];
    record.tot.push(
        eventObj.score1player1set + eventObj.score2player1set,
        eventObj.score1player2set + eventObj.score2player2set,
        eventObj.score1player3set + eventObj.score2player3set,
        eventObj.score1player4set + eventObj.score2player4set,
        eventObj.score1player5set + eventObj.score2player5set
    );
    if (eventObj.win === 1) {
        record.wl.push(1);
    } else if (eventObj.win === 2) {
        record.wl.push(0);
    }
    
    record.alt.push(eventObj.alt);
    record.is30.push(eventObj.is30);
    localStorage.setItem(key, JSON.stringify(record));
    eventObj.updated = true;
    if (eventObj.player2) {
        const key2 = eventObj.player2.replace(/\s+/g, "");
        let record2 = {};
        const existing2 = localStorage.getItem(key2);
        if (existing2) {
            try {
                record2 = JSON.parse(existing2);
            } catch {
                record2 = {};
            }
        }
        if (!Array.isArray(record2.wl)) record2.wl = [];
        if (!Array.isArray(record2.alt)) record2.alt = [];
        if (!Array.isArray(record2.tot)) record2.tot = [];
        if (!Array.isArray(record2.is30)) record2.is30 = [];
        record2.tot.push(
            eventObj.score1player1set + eventObj.score2player1set,
            eventObj.score1player2set + eventObj.score2player2set,
            eventObj.score1player3set + eventObj.score2player3set,
            eventObj.score1player4set + eventObj.score2player4set,
            eventObj.score1player5set + eventObj.score2player5set
        );
        if (eventObj.win === 1) {
            record2.wl.push(0);
        } else if (eventObj.win === 2) {
            record2.wl.push(1);
        }
        record2.alt.push(eventObj.alt);
        record2.is30.push(eventObj.is30);
        localStorage.setItem(key2, JSON.stringify(record2));
    }
}

// Retrieves the stats record from localStorage for the given eventObj's player1.
// Returns the parsed record object, or an empty object if not found.
/**
 * @param {Event} eventObj - The Event object to retrieve stats for.
 * @returns {Object} - The stats record from localStorage, or {} if not found.
 */
function getStats1(eventObj) {
    if (!eventObj || !eventObj.player1) return {};
    const key = eventObj.player1.replace(/\s+/g, "");
    const existing = localStorage.getItem(key);
    if (existing) {
        try {
            return JSON.parse(existing);
        } catch {
            return {};
        }
    }
    return {};
}

function getStats2(eventObj) {
    if (!eventObj || !eventObj.player2) return {};
    const key = eventObj.player2.replace(/\s+/g, "");
    const existing = localStorage.getItem(key);
    if (existing) {
        try {
            return JSON.parse(existing);
        } catch {
            return {};
        }
    }
    return {};
}
/**
 * Sets eventObj.strategy based on .is30 and .alt stats for both players.
 * If the last item in any .is30 record is 1, sets strategy=2.
 * Else if any of the last 5 items in .alt is 1, sets strategy=1.
 * @param {Event} eventObj
 */
function setStrategyFromStats(eventObj) {
    if (!eventObj) return;
    const stats1 = getStats1(eventObj);
    const stats2 = getStats2(eventObj);

    let foundLastIs30 = false;
    let foundRecentAlt = false;

    // Check player1 .is30
    if (Array.isArray(stats1.is30) && stats1.is30.length > 0) {
        if (stats1.is30[stats1.is30.length - 1] === 1) {
            foundLastIs30 = true;
        }
    }
    // Check player2 .is30
    if (Array.isArray(stats2.is30) && stats2.is30.length > 0) {
        if (stats2.is30[stats2.is30.length - 1] === 1) {
            foundLastIs30 = true;
        }
    }

    // Check player1 .alt in last 5
    if (Array.isArray(stats1.alt) && stats1.alt.slice(-5).includes(1)) {
        foundRecentAlt = true;
    }
    // Check player2 .alt in last 5
    if (Array.isArray(stats2.alt) && stats2.alt.slice(-5).includes(1)) {
        foundRecentAlt = true;
    }
    function getLast6NonZero(arr) {
        if (!Array.isArray(arr)) return [];
        const nonZero = arr.filter(v => v !== 0);
        return nonZero.slice(-6);
    }
    const last6Tot1 = getLast6NonZero(stats1.tot);
    const last6Tot2 = getLast6NonZero(stats2.tot);
     
    // Only apply over/under 18 strategies if there are at least 6 recent totals for both players
    if (last6Tot1.length > 5 || last6Tot2.length > 5) {
        if (last6Tot1.every(v => v > 18) || last6Tot2.every(v => v > 18)) {
            eventObj.strategy = 3;
        } else if (last6Tot1.every(v => v < 18) || last6Tot2.every(v => v < 18)) {
            eventObj.strategy = 4;
        }
    }
    

    if (foundLastIs30) {
        eventObj.strategy = 2;
    } else if (foundRecentAlt) {
        eventObj.strategy = 1;
    }
    // Check last 6 tot values for both players
   
}
/**
 * Finds the bet list within the given rightSideElement and returns an array of bet list item elements.
 * @param {Element} rightSideElement - The DOM element to search within.
 * @returns {Element[]} - Array of bet list item DOM elements.
 */
function findBetListItems(rightSideElement) {
    if (!rightSideElement) return [];
    
    return Array.from(rightSideElement.querySelectorAll(betListItemCss));
}

/**
 * Finds and returns the market label element within the given item element.
 * @param {Element} item - The DOM element to search within.
 * @returns {Element|null} - The market label element, or null if not found.
 */
function findMarketYLabel(item) {
    if (!item) return null;
    return item.querySelector(marketLabelCss);
}
/**
 * Finds and returns the bet team name element within the given item element.
 * @param {Element} item - The DOM element to search within.
 * @returns {Element|null} - The bet team name element, or null if not found.
 */
function findBetTeamName(item) {
    if (!item) return [];
    let teams = item.querySelectorAll(betTeamNameCss);
    return Array.from(teams).map(team => team.textContent.trim());
}
/**
 * Finds the right side element, retrieves all bet list items within it,
 * and returns an array of teams for each item.
 * @returns {Array<Array<string>>} - Array of arrays, each containing team names for a bet item.
 */
function getAllBetListTeams() {
    const rightSide = findRightSide();
    if (!rightSide) return [];
    
    const items = findBetListItems(rightSide);
    if (items.length === 0) {
        
        return [];
    }
    
    return items.map(item => findBetTeamName(item));
}

/**
 * Returns the total bet coefficient from the right side betslip.
 * Sums all coefficients found in elements matching totBetCiefCss inside the right side element.
 * @returns {number} - The total bet coefficient (product of all found), or 0 if not found.
 */
function getTotalBetCoefficient() {
    const rightSide = findRightSide();
    if (!rightSide) return 0;
    const coefElements = rightSide.querySelectorAll(totBetCoefCss);
    if (coefElements.length === 0) return 0;
    let total = 1;
    for (const el of coefElements) {
        const val = parseFloat(el.textContent.replace(",", "."));
        if (!isNaN(val)) {
            total *= val;
        }
    }
    return total;
}

/**
 * Finds the right side element, locates the stake select wrapper and button,
 * clicks the button, waits 200ms, then clicks the <li> with text "Promo code" inside the wrapper.
 */
async function selectPromoCodeInRightSide() {
    const rightSide = findRightSide();
    if (!rightSide) return false;
    alert("Right side element found, looking for stake select wrapper...");
    const selectWrapper = rightSide.querySelector(stakeSlelectWrapperCss);
    if (!selectWrapper) return false;
    alert("Stake select wrapper found, looking for stake type select button...");
    const selectBtn = selectWrapper.querySelector(stakeTypeSelectCss);
    alert("Stake type select button found, clicking to open options...");
    if (!selectBtn) {alert("false of btn");return false;}
    alert("Clicking stake type select button to open options...");
    selectBtn.click();
    alert("Waiting for options to appear...");
    await new Promise(resolve => setTimeout(resolve, 200));
    const liList = selectWrapper.querySelectorAll('li');
    for (const li of liList) {
        if (li.textContent.trim() === "Promo code") {
            li.click();
            return true;
        }
    }
    return false;
}
/**
 * Finds the potential win div in the right side element and returns the float value of the potential win.
 * @returns {number} - The potential win amount as a float, or 0 if not found.
 */
function getPotentialWin() {
    const rightSide = findRightSide();
    if (!rightSide) return 0;
    const potentialWinDiv = rightSide.querySelector(potentialwinDivCss);
    if (!potentialWinDiv) return 0;
    const potentialWinEl = potentialWinDiv.querySelector(potentialwinCss);
    if (!potentialWinEl) return 0;
    const text = potentialWinEl.textContent.replace(",", ".").replace(/[^\d.]/g, "");
    const value = parseFloat(text);
    return isNaN(value) ? 0 : value;
}
/**
 * Returns the integer result of dividing potential win by total bet coefficient.
 * @returns {number} - The integer division result, or 0 if invalid.
 */
function getPotentialWinPerBet() {
    const totalBet = getTotalBetCoefficient();
    const potentialWin = getPotentialWin();
    if (totalBet === 0) return 0;
    return Math.floor(potentialWin / totalBet);
}
/**
 * Finds and returns the button element in the right side that contains a child with minusAriaCss.
 * @returns {Element|null} - The button element containing the minus aria icon, or null if not found.
 */
function findMinusButtonInRightSide() {
    const rightSide = findRightSide();
    if (!rightSide) return null;
    const buttons = rightSide.querySelectorAll(BtnCss);
    for (const btn of buttons) {
        if (btn.querySelector(minusAriaCss)) {
            return btn;
        }
    }
    return null;
}
function findPlusButtonInRightSide() {
    const rightSide = findRightSide();
    if (!rightSide) return null;
    const buttons = rightSide.querySelectorAll(BtnCss);
    for (const btn of buttons) {
        if (btn.querySelector(plusAriaCss)) {
            return btn;
        }
    }
    return null;
}


/**
 * Checks if potential win per bet is greater than 2000, clicks minus button if so,
 * waits 500ms, checks potential win per bet again, and returns the difference.
 * @returns {Promise<number>} The difference in potential win per bet after clicking minus button.
 */
async function adjustPotentialWinPerBetIfNeeded(ptw) {
    const before = getPotentialWinPerBet();
    alert("Checking potential win per bet...");
    alert(`Potential win per bet before adjustment: ${before}`);
    if (before > ptw) {
        const minusBtn = findMinusButtonInRightSide();
        if (minusBtn) {
            minusBtn.click();
            alert("Minus button clicked, waiting 500ms...");
            await new Promise(resolve => setTimeout(resolve, 500));
            alert("Checking potential win per bet again...");
            const after = getPotentialWinPerBet();
            alert(`Potential win per bet after adjustment: ${after}`);
            return before - after;
        }
    }
    return 0;
}
/**
 * Continuously clicks the minus button until potential win per bet is less than 200.
 * Waits 150ms after each click to allow the UI to update.
 * @returns {Promise<number>} - The final potential win per bet value.
 */
async function reducePotentialWinPerBetBelow200() {
    let potentialWinPerBet = getPotentialWinPerBet();
    alert(`Initial potential win per bet: ${potentialWinPerBet}`);
    const minusBtn = findMinusButtonInRightSide();
    if (!minusBtn) return potentialWinPerBet;
    while (potentialWinPerBet >= 200) {
        minusBtn.click();
        //await sleep(150);
        alert(`Potential win per bet after click: ${potentialWinPerBet}`);
        potentialWinPerBet = getPotentialWinPerBet();
    }
    return potentialWinPerBet;
}
async function red()
{
    let x = await reducePotentialWinPerBetBelow200();
    if (x < 200) {
        alert(`Potential win per bet reduced to ${x}, below 200.`);
    }
    return x;
}
function clickPlaceBetButtonInRightSide() {
    const rightSide = findRightSide();
    if (!rightSide) return false;
    const buttons = rightSide.querySelectorAll(placeBetBtnCss);
    for (const btn of buttons) {
        if (btn.textContent.trim() === "Place a bet") {
            btn.click();
            return true;
        }
    }
    return false;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function processSetkaCupEvents() {
    if (window.location.href !== targetUrl) {
        window.location.href = targetUrl;
        await sleep(200);
    }
    // 1. Find all championship elements
    const champs = findChamps();
    // 2. Find the "Setka Cup" championship
    const setkaChamp = findChampByName(champs, "Setka Cup");
    if (!setkaChamp) {
        alert("Setka Cup championship not found.");
        return;
    }
    // 3. Find all events in the championship
    const events = findEventsInChamp(setkaChamp);
    if (!events.length) {
        alert("No events found in Setka Cup.");
        return;
    }
    // 4. For each event, push data to Event object and save stats
    let minCoef = Infinity;
    let minEvent = null;
    for (const eventEl of events) {
        const eventObj = new Event();
        pushEventDataToEventObj(eventEl, eventObj);
        saveEventStatsToLocalStorage(eventObj);
        // Find main coef with title "1"
        const mainEvent = findMainInEvent(eventEl);
        if (mainEvent) {
            const coefs = findCoefs(mainEvent);
            for (const [title, value] of coefs) {
                if (title === "1" && value < minCoef) {
                    minCoef = value;
                    minEvent = eventEl;
                }
            }
        }
    }
    // 5. Click the minimal main coef "1" and reduce potential win per bet
    if (minEvent) {
        if (clickMainCoefByTitle(minEvent, "1")) {
            alert("Clicked main coef '1', now reducing potential win per bet...");
            //await sleep(200);
            alert("Clicked main coef '1', now reducing potential win per bet...");
            await reducePotentialWinPerBetBelow200();
            alert(`Potential win per bet reduced to ${y}, below 200.`);
            //clickPlaceBetButtonInRightSide();
            //alert("Bet placed successfully.");
        }
    }
}


alert("Starting the process...");

async function whenpromiseresolved(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(x);
        }, 1000);
    });
}
whenpromiseresolved("Process completed successfully.").then((result) => {
    alert(result);
});

alert("Process started, waiting for Setka Cup events...");
// Example usage of the utility functions
// Uncomment the following line to run the processSetkaCupEvents function
//processSetkaCupEvents();
//processSetkaCupEvents();
function clickMinusButtonAfterDelay(minusBtn) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (minusBtn) {
                minusBtn.click();
                resolve(true);
            } else {
                resolve(false);
            }
        }, 200);
    });
}
async function clickMinusUntilBelow200OrMax20() {
    const rightSide = findRightSide();
    if (!rightSide) return false;
    let minusBtn = findMinusButtonInRightSide();
    if (!minusBtn) return false;
    let count = 0;
    let potentialWinPerBet = getPotentialWinPerBet();
    while (potentialWinPerBet > 200 && count < 20) {
        await clickMinusButtonAfterDelay(minusBtn);
        count++;
        potentialWinPerBet = getPotentialWinPerBet();
        // Button might be replaced in DOM, re-query each time
        minusBtn = findMinusButtonInRightSide();
        if (!minusBtn) break;
    }
    return potentialWinPerBet <= 200;
}

/**
 * Clicks the "Place a bet" button after a given delay (in ms).
 * @param {number} delay - Delay in milliseconds before clicking the button.
 * @returns {Promise<boolean>} - Resolves to true if button was clicked, false otherwise.
 */
function clickPlaceBetButtonAfterDelay(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const success = clickPlaceBetButtonInRightSide();
            resolve(success);
        }, delay);
    });
}
/**
 * Waits until clickMinusUntilBelow200OrMax20() returns true, then clicks the "Place a bet" button after 400ms.
 * Catches and logs any exceptions.
 */
async function waitAndPlaceBet() {
    try {
        let success = false;
        // Poll every 300ms until clickMinusUntilBelow200OrMax20() returns true
        while (!success) {
            success = await clickMinusUntilBelow200OrMax20();
            if (!success) {
                await sleep(300);
            }
        }
        await clickPlaceBetButtonAfterDelay(40000);
    } catch (e) {
        alert("Error in waitAndPlaceBet:", e);
    }
}
waitAndPlaceBet();
/**
 * Checks if for every eventObj in the array there exists a bet list item in the right side
 * with the same player names (order-insensitive), and that there are no extra bet list items
 * without a corresponding eventObj.
 * @param {Event[]} eventObjs - Array of Event objects.
 * @returns {boolean} - True if all eventObjs have matching bet list items and vice versa.
 */
function betListMatchesEvents(eventObjs) {
    if (!Array.isArray(eventObjs)) return false;
    const eventPairs = eventObjs.map(e => {
        const p1 = (e.player1 || '').trim();
        const p2 = (e.player2 || '').trim();
        return [p1, p2].sort().join('|');
    });
    const betListTeams = getAllBetListTeams().map(teams => teams.sort().join('|'));

    // Check every eventObj has a matching bet list item
    for (const pair of eventPairs) {
        if (!betListTeams.includes(pair)) {
            return false;
        }
    }
    // Check every bet list item has a matching eventObj
    for (const pair of betListTeams) {
        if (!eventPairs.includes(pair)) {
            return false;
        }
    }
    return true;
}
/**
 * For a given event object, checks and sets strategystat based on betset and nextSet.
 * If eventObj.betset == eventObj.nextSet:
 *   - If nextSet == 1, returns eventObj.strategystat (default 0).
 *   - If wl[nextSet-1] != wl[nextSet-2], sets strategy=0 and strategystat=1.
 *   - If nextSet == 4, sets strategystat=-1.
 * Returns eventObj.strategystat.
 * @param {Event} eventObj
 * @returns {number}
 */
function handleStrategy1(eventObj,champ) {
    if (!eventObj || typeof eventObj.betset !== 'number' || typeof eventObj.nextSet !== 'number') {
        return 0;
    }
    if (eventObj.betset == eventObj.nextSet) {
        return eventObj.strategystat || 0;
    }
    if (eventObj.nextSet === 1) {
        return eventObj.strategystat || 0;
    }
    if (
        Array.isArray(eventObj.wl) &&
        eventObj.nextSet - 1 >= 0 &&
        eventObj.nextSet - 2 >= 0 &&
        eventObj.wl[eventObj.nextSet - 1] !== eventObj.wl[eventObj.nextSet - 2]
    ) {
        eventObj.strategy = 0;
        eventObj.strategystat = 1;
    }
    if (eventObj.nextSet === 4) {
        eventObj.strategystat = -1;
    }
   
    if (eventObj.betset < eventObj.nextSet) {
        if (
            Array.isArray(eventObj.wl) &&
            eventObj.nextSet - 2 >= 0
        ) {
           
                const eventElement = findEventByPlayersInChamp(champ, eventObj);
                // Use getSetCoefElements to get all coef elements for the current set
                const setCoefs = getSetCoefElements(eventElement, eventObj.nextSet);
                // Click the correct coef based on wl value
                if (eventObj.wl[eventObj.nextSet - 2] === 1) {
                    // Click coef with title "2"
                    for (const coefEl of setCoefs) {
                        if (coefEl.getAttribute('title') === "2") {
                            coefEl.click();
                            break;
                        }
                    }
                } else if (eventObj.wl[eventObj.nextSet - 2] === 2) {
                    // Click coef with title "1"
                    for (const coefEl of setCoefs) {
                        if (coefEl.getAttribute('title') === "1") {
                            coefEl.click();
                            break;
                        }
                    }
                }
            } 
            eventObj.betset = eventObj.nextSet;
        }
return eventObj.strategystat;
    }
    
    /**
     * For a given event object, handles strategy 2.
     * If eventObj.betset == eventObj.nextSet:
     *   - If not alt (eventObj.alt === false), sets strategy=0 and strategystat=2.
     *   - If nextSet == 1, returns strategystat (default 0).
     *   - If nextSet == 4, sets strategystat=-2.
     * If eventObj.betset < eventObj.nextSet:
     *   - If not alt, clicks the opposite set coef as in handleStrategy1.
     * Returns eventObj.strategystat.
     * @param {Event} eventObj
     * @param {Element} champ
     * @returns {number}
     */
    function handleStrategy2(eventObj, champ) {
        if (!eventObj || typeof eventObj.betset !== 'number' || typeof eventObj.nextSet !== 'number') {
            return 0;
        }
        if (eventObj.betset == eventObj.nextSet) {
            return 0
            }
        if (eventObj.nextSet === 1) {
                return eventObj.strategystat || 0;
            }
        if (eventObj.nextSet === 6) {
                eventObj.strategystat = -2;
            }
        
        if (eventObj.betset < eventObj.nextSet) {
            if (eventObj.alt === false && Array.isArray(eventObj.wl) && eventObj.nextSet - 2 >= 0) {
                const eventElement = findEventByPlayersInChamp(champ, eventObj);
                const setCoefs = getSetCoefElements(eventElement, eventObj.nextSet);
                if (eventObj.wl[eventObj.nextSet - 2] === 1) {
                    // Click coef with title "2"
                    for (const coefEl of setCoefs) {
                        if (coefEl.getAttribute('title') === "2") {
                            coefEl.click();
                            break;
                        }
                    }
                } else if (eventObj.wl[eventObj.nextSet - 2] === 2) {
                    // Click coef with title "1"
                    for (const coefEl of setCoefs) {
                        if (coefEl.getAttribute('title') === "1") {
                            coefEl.click();
                            break;
                        }
                    }
                }
                eventObj.betset = eventObj.nextSet;
            }
        }
        return eventObj.strategystat;
    }
/**
 * Returns an array of coefficient elements for the given set number in the event element.
 * @param {Element} eventElement - The DOM element representing the event.
 * @param {number} setNumber - The set number (1-based index).
 * @returns {Element[]} - Array of coefficient elements for the given set, or empty array if not found.
 */
function getSetCoefElements(eventElement, setNumber) {
    if (!eventElement || typeof setNumber !== 'number' || setNumber < 1) return [];
    const setEvent = findSetsInEvent(eventElement);
    if (!setEvent) return [];
    const innerSets = findInnerSets(setEvent);
    for (const innerSet of innerSets) {
        const nameEl = findInnerSetName(innerSet);
        if (nameEl && nameEl.textContent.trim().toLowerCase() === "2 set" && setNumber === 2) {
            return Array.from(innerSet.querySelectorAll(coefCss));
        }
        if (nameEl && nameEl.textContent.trim().toLowerCase() === "3 set" && setNumber === 3) {
            return Array.from(innerSet.querySelectorAll(coefCss));
        }
        if (nameEl && nameEl.textContent.trim().toLowerCase() === "4 set" && setNumber === 4) {
            return Array.from(innerSet.querySelectorAll(coefCss));
        }
        if (nameEl && nameEl.textContent.trim().toLowerCase() === "5 set" && setNumber === 5) {
            return Array.from(innerSet.querySelectorAll(coefCss));
        }
        if (nameEl && nameEl.textContent.trim().toLowerCase() === "1st set" && setNumber === 1) {
            return Array.from(innerSet.querySelectorAll(coefCss));
        }
    }
    return [];
}

/**
 * Finds the event element within the given championship element that matches the player1 and player2 names in eventObj.
 * Comparison is case-insensitive and trims whitespace. Order-insensitive.
 * @param {Element} champ - The championship DOM element.
 * @param {Event} eventObj - The Event object with player1 and player2.
 * @returns {Element|null} - The matching event element, or null if not found.
 */
function findEventByPlayersInChamp(champ, eventObj) {
    if (!champ || !eventObj || !eventObj.player1 || !eventObj.player2) return null;
    const events = findEventsInChamp(champ);
    // Normalize player names for comparison
    const p1 = (eventObj.player1 || '').trim().toLowerCase();
    const p2 = (eventObj.player2 || '').trim().toLowerCase();
    for (const eventEl of events) {
        const teams = findTeamsInEvent(eventEl);
        if (teams.length >= 2) {
            const t1 = (teams[0].textContent || '').trim().toLowerCase();
            const t2 = (teams[1].textContent || '').trim().toLowerCase();
            // Order-insensitive match
            if (
                (t1 === p1 && t2 === p2) ||
                (t1 === p2 && t2 === p1)
            ) {
                return eventEl;
            }
        }
    }
    return null;
}

/**
 * Returns the set name string for a given set number.
 * @param {number} setNumber - The set number (1-based).
 * @returns {string} - The set name as used in the UI.
 */
function getSetNameByNumber(setNumber) {
    switch (setNumber) {
        case 1: return "1st set";
        case 2: return "2 set";
        case 3: return "3 set";
        case 4: return "4 set";
        case 5: return "5 set";
        default: return "";
    }
}

/**
 * Returns an array of coefficient elements for the given set number in the event element.
 * Uses getSetNameByNumber for robust matching.
 * @param {Element} eventElement - The DOM element representing the event.
 * @param {number} setNumber - The set number (1-based index).
 * @returns {Element[]} - Array of coefficient elements for the given set, or empty array if not found.
 */
function getSetCoefElements(eventElement, setNumber) {
    if (!eventElement || typeof setNumber !== 'number' || setNumber < 1) return [];
    const setEvent = findSetsInEvent(eventElement);
    if (!setEvent) return [];
    const innerSets = findInnerSets(setEvent);
    const setName = getSetNameByNumber(setNumber).toLowerCase();
    for (const innerSet of innerSets) {
        const nameEl = findInnerSetName(innerSet);
        if (nameEl && nameEl.textContent.trim().toLowerCase() === setName) {
            return Array.from(innerSet.querySelectorAll(coefCss));
        }
    }
    return [];
}

