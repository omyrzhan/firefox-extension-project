
const targetUrl = "https://1xbet.kz/en/live/table-tennis/1733171-setka-cup";
const sportRighrCss = "#sports_right";
const betListCss = "div.cpn-bets-list";
const betListItemCss = "div.cpn-bets-list__item";
const betTeamsCss = "div.cpn-bet-teams.cpn-bet__teams";
const betTeamNameCss = "span.cpn-bet-team__name";
const marketLabelCss = "span.cpn-bet-market__label";
const betCoefCss = "div.cpn-bet__coef";
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


function extractBetData() {
    const sportRight = document.querySelector(sportRighrCss);
    
    if (!sportRight) return [];
   

    const betList = sportRight.querySelector(betListCss);
    if (!betList) return [];
 

    const items = betList.querySelectorAll(betListItemCss);
    const result = [];


    items.forEach(item => {
        // Teams
        const teamsElem = item.querySelector(betTeamsCss);
     
        const teamNames = teamsElem
            ? Array.from(teamsElem.querySelectorAll(betTeamNameCss)).map(e => e.textContent.trim()): [];

       


        // Market labels
        const marketLabels = item.querySelector(marketLabelCss).textContent.trim();
        alert(`Market labels found: ${marketLabels}`);
        // Item coef
        const itemCoefs =parseFloat( item.querySelector(betCoefCss).textContent.trim());
        if (isNaN(itemCoefs)) {
            alert("No valid coefficient found in item");
            return;
        } else {
            alert(`Coefficient found: ${itemCoefs}`);
        
        result.push({
            teams: teamNames,
            marketLabels,
            itemCoefs,
           
        });
    }
    });
    const totalCoefElem = sportRight.querySelector(totBetCoefCss);
    const totalCoef = totalCoefElem ? totalCoefElem.textContent.trim() : null;

    alert(`Total coefficient found: ${totalCoef}`);
    if (!totalCoef) {
        alert("No total coefficient found");
        return [];
    }


    return { result, totalCoef };
}
function getPotentialWinDividedByTotalCoefFromRight(sportRightElem,totalCoefNum) {
    if (!sportRightElem) {
        alert("Right side element not provided");
        return null;
    }
    const potentialWinElem = sportRightElem.querySelector(potentialwinCss);
    if (!potentialWinElem) {
        alert("Potential win element not found");
        return null;
    }
    const potentialWinText = potentialWinElem.textContent.replace(/[^\d.,]/g, '').replace(',', '.');
    const potentialWin = parseFloat(potentialWinText);
    if (isNaN(potentialWin)) {
        alert("Potential win value is not a number");
        return null;
    }

    if (isNaN(totalCoefNum) || totalCoefNum === 0) {
        alert("Total coefficient is not valid");
        return null;
    }

    return Math.floor(potentialWin / totalCoefNum);
}
function adjustBetSumToTarget(betSum, sportRightElem, totalCoefNum) {
    return new Promise(async (resolve, reject) => {
        if (!sportRightElem) return reject("sportRightElem is required");
        if (isNaN(totalCoefNum)) return reject("totalCoefNum is invalid");

        const minusBtn = sportRightElem.querySelector(`${BtnCss} ${minusAriaCss}`)?.closest("button");
        const plusBtn = sportRightElem.querySelector(`${BtnCss} ${plusAriaCss}`)?.closest("button");

        if (!minusBtn || !plusBtn) return reject("Plus or minus button not found");

        async function delay(ms) {
            return new Promise(res => setTimeout(res, ms));
        }

        let current = getPotentialWinDividedByTotalCoefFromRight(sportRightElem, totalCoefNum);

        // Decrease if above betSum + 10
        while (current > betSum - 10) {
            minusBtn.click();
            await delay(200);
            current = getPotentialWinDividedByTotalCoefFromRight(sportRightElem, totalCoefNum);
        }

        // Increase if below betSum - 10
        while (current < betSum + 10) {
            plusBtn.click();
            await delay(200);
            current = getPotentialWinDividedByTotalCoefFromRight(sportRightElem, totalCoefNum);
        }

        resolve(current);
    });

}



function placeBet(sportRightElem) {
    return new Promise((resolve, reject) => {
        if (!sportRightElem) return reject("sportRightElem is required");

        const placeBetBtn = sportRightElem.querySelector(placeBetBtnCss);
        if (!placeBetBtn) return reject("Place bet button not found");

        placeBetBtn.click();
        resolve("Bet placed successfully");
    });
}
async function adjustAndPlaceBet(betSum) {
     const sportRightElem = document.querySelector(sportRighrCss);
    
    if (!sportRightElem) throw new Error("sportRightElem is required");

    const totalCoefElem = sportRightElem.querySelector(totBetCoefCss);
    if (!totalCoefElem) throw new Error("Total coefficient element not found");

    const totalCoefText = totalCoefElem.textContent.trim().replace(',', '.');
    const totalCoefNum = parseFloat(totalCoefText);
    if (isNaN(totalCoefNum)) throw new Error("Total coefficient is not a number");

    await adjustBetSumToTarget(betSum, sportRightElem, totalCoefNum);
    await new Promise(res => setTimeout(res, 400));
    return placeBet(sportRightElem);
}

adjustAndPlaceBet(250).then(result => {
    alert(result);
});