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
 
class Event {
constructor({
player1 = "",
player2 = "",


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


} = {}) {
this.player1 = player1;
this.player2 = player2;
this.score1 = [0,0,0,0,0];
this.score2 = [0,0,0,0,0];

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
this.set =1;
this.staketype = "";
this.betsum =0;
this.multiplier = 1;
this.strategy = 0; // 0 - no strategy, 1 - alt, 2 - is30, 3 - over18, 4 - under18
this.strategystat =0;
this.alt = 0;
this.is30 = 0;
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
    this.set = i + 2;
}
}
const count1 = this.wl.filter(v => v === 1).length;
const count2 = this.wl.filter(v => v === 2).length;
if (count1 === 3) {
this.win = 1;
} else if (count2 === 3) {
this.win = 2;
}

}
this.checkAltAnd30();
}
}

function clickMoreBtnIfNotActive(eventElement) {
    const moreBtn = eventElement.querySelector(moreEventbtnCss);
    if (moreBtn && !moreBtn.classList.contains('active')) {
        moreBtn.click();
    }
}

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
   
    const r1 =[];
    const r2 =[];
    if (!eventElement) {
        for (let i = 0; i < 6; i++) {r1.push(0);r2.push(0);}
        return [r1,r2];
    }
    alert("srcond");
    const lines = eventElement.querySelectorAll(scoreBoardLineCss);
    if (lines.length < 2) {
        for (let i = 0; i < 6; i++) {r1.push(0);r2.push(0);}
        return [r1,r2];
    }
    alert("srcond");
    const firstCells = lines[0].querySelectorAll(scoreCellAllCss);
    const secondCells = lines[1].querySelectorAll(scoreCellAllCss);
    alert("srcond");
    for (let i = 0; i < 6; i++) {
        const first = firstCells[i] ? parseInt(firstCells[i].textContent.trim(), 10) || 0 : 0;
        const second = secondCells[i] ? parseInt(secondCells[i].textContent.trim(), 10) || 0 : 0;
        r1.push(first);
        r2.push(second);
    }
    return [r1,r2];
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

let champs =findChamps();

let setkachamp = findChampByName(champs,"Setka Cup");
let events = findEventsInChamp(setkachamp);
alert("first");
events.forEach( ev=>{
    const lines = getScoreLines(ev);
    alert(lines[0]);
})
