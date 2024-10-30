import drawMatchingGame from "./drawMatchingGame.js";
import games from "./games.js";

class MatchingGame{
    deck;
    openCardId;
    openPairs;
    sumOfPile;
    constructor(gameCards){
        this.deck = gameCards;
        this.openCardId = -1;
        this.openPairs = 0;  
        this.sumOfPile = this.deck.pileA.length;

        this.initalizeDeck();
    }
 
    get sumOfPile(){
        this.sumOfPile;
    }

    set sumOfPile(crdsLevel){

    }

    /*
        - shful the pail
        - draw the pile on the screen 
    */
    initalizeDeck(crdsLevel){
        //get game ref 
        const matchedGameRef = games.matchingGameRef;

        //need to clean the UI table before start
        drawMatchingGame.cleanUiGameDeck();

        for(let counter = 0; counter < this.sumOfPile; counter++){
            drawMatchingGame.drawCard(this.deck.pileA[counter],"typeA",this.onUserPick);
            drawMatchingGame.drawCard(this.deck.pileB[(this.sumOfPile-1)-counter],"typeB",this.onUserPick);
        }
    }

    onUserPick(theCardId){
        const matchedGameRef = games.matchingGameRef;
        /*
            for our Html we use the full typed id,for this function we will cut the type...
            that is useful to:
            * find when the user click on the same card by "&& (theCardId!=matchedGameRef.openCardId)"
            * and from the other hand find matches with the other option
        */
       //cardId  => argCardId
        const argCardId = theCardId.slice(0,theCardId.length-1);

        drawMatchingGame.exposeCard(theCardId);

        if(matchedGameRef.openCardId != -1){
            const prevCardId =  matchedGameRef.openCardId.slice(0, matchedGameRef.openCardId.length-1); 
            if(prevCardId == argCardId && (theCardId!=matchedGameRef.openCardId)){
                matchedGameRef.openPairs++;
                drawMatchingGame.onPair(theCardId,matchedGameRef.openCardId);
                matchedGameRef.openCardId = -1;
                matchedGameRef.isCompleted();
            }else{
                drawMatchingGame.exposeCard(theCardId);
                drawMatchingGame.exposeCard(matchedGameRef.openCardId);
                matchedGameRef.openCardId = -1;
            }
        }else{
            matchedGameRef.openCardId = theCardId;
        }
    }

    isCompleted(){
        const matchedGameRef = games.matchingGameRef;
        const progress = (matchedGameRef.openPairs/matchedGameRef.sumOfPile);
         //to precentages
        if(matchedGameRef.openPairs == matchedGameRef.sumOfPile){
            drawMatchingGame.updateProgBar(100);
            drawMatchingGame.onGameEndDialog();
            ////finesh...
        }else{
            drawMatchingGame.updateProgBar(progress*100);
            drawMatchingGame.onGameEndDialog();
        }
    }
}

export default MatchingGame;