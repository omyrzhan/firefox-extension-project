class EventLive {
  constructor() {
    this.player1 = "";
this.player2 = "";
this.score1 = [0,0,0,0,0];
this.score2 = [0,0,0,0,0];

this.maincoef1 = 0;
this.maincoef2 = 0;
this.maintotmore = 0;
this.maintotless = 0;
this.maintotal = 0;
this.nextSetcoef1 = 0;
this.nextSetcoef2 = 0;
this.nextSettotmore = 0;
this.nextSettotless = 0;
this.nextSettotal = 0;
this.nextSet =1;
this.wl = [0, 0, 0, 0, 0];
this.tot = [0, 0, 0, 0, 0];
this.win = 0;
this.betset =0;

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

  CheckAlt() {
    // Find all non-zero values in wl
    const nonZero = this.wl.filter((x) => x !== 0);
    
    if (nonZero.length >1) {
        // Check alternation: true if all adjacent non-zero values alternate
        // (e.g. 1,2,1,2...)
        let isAlt = 1;
        for (let i = 1; i < nonZero.length; i++) {
            if (nonZero[i] === nonZero[i - 1]) {
            isAlt = 0;
            break;
            }
        }
        this.alt = isAlt;
        let check30 = 1;
        for (let i = 1; i < nonZero.length; i++) {
            if (nonZero[i] != nonZero[i - 1]) {
            check30 = 0;
            break;
            }
        }
        this.is30 = check30; ;

        }
        
        
  }
  checkEvent() {
    for (let i = 0; i < this.score1.length; i++) {
      const s1 = this.score1[i];
      const s2 = this.score2[i];
      if (s1 > 10 && s1 - s2 > 1) {
        this.wl[i] = 1;
        this.nextSet = i + 2;

      } else if (s2 > 10 && s2 - s1 > 1) {
        this.wl[i] = 2;
        this.nextSet = i + 2;
      }
     
    }
    const count1 = this.wl.filter(x => x === 1).length;
    const count2 = this.wl.filter(x => x === 2).length;
    if (count1 === 3) {
      this.win = 1;
    } else if (count2 === 3) {
      this.win = 2;
    }
    
  this.CheckAlt();  




  }


}

/* ev1= new EventLive();
ev1.player1 = "Player 1";
ev1.player2 = "Player 2";
ev1.score1 = [11, 6, 11, 5, 0];
ev1.score2 = [9, 11, 5,11, 0];
ev1.checkEvent();
alert(ev1.wl);
alert(ev1.alt);
alert(ev1.is30);
alert(ev1.win); */

