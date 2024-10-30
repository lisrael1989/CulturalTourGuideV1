
class DrawMatchingGame{
    constructor(){
        //initalize the dialogs
        const container = document.querySelector('body main section#gameContainer section.endGameDialog');
        container.innerHTML =  `
                <button id="playAgain" class="gameDialogBut">play again</button>
                <button id="back" class="gameDialogBut">to destination page</button>
         `;
      
    }

    cleanUiGameDeck(){
        document.querySelector('body main article#gameSection').innerHTML = '';
    }

    /*
    will add a card element to our deck UI with the matched css class according to its type
    note :
     * will build a dynamic grid while applying matched id to each HTML item according to the object send to it (to gain controll over it)
    */
    drawCard(card,cardClassType,onUserPickCallBack){
        const cardEle = document.createElement("section");
        cardEle.classList.add("cardItem");
        cardEle.classList.add(`card-${cardClassType}`);
        cardEle.id = `card-${card.id+cardClassType}`;
        cardEle.innerHTML = `<section class="card-down">
                                    <section class="card-up">
                                        <img src=${card.image}>
                                        <h3>${card.name}</h3>
                                    </section>
                             </section> 
                            `;

        cardEle.addEventListener("click",()=>{onUserPickCallBack(card.id+cardClassType)});
        document.querySelector(".matching-game").appendChild(cardEle);
    }


    exposeCard(cardId) {
        const cardUpElement = document.querySelector(`#card-${cardId} .card-up`);
        if (cardUpElement) {
            cardUpElement.classList.toggle("expose");
        }

    async updateProgBar(progPrecent){
        const progBarEle = document.querySelector('body main section#gameContainer div.progBarContainer div.progBar');
        let width = progPrecent-1;
        let id = setInterval(frame, 10);
        function frame() {
            if (width >= progPrecent) {
              clearInterval(id);
            }else {
                width++; 
                progBarEle.style.height = width + '%'; 
                progBarEle.textContent = String(width).slice(0,3) * 1  + '%';
            }
        }
    
        
    }



    onPair(card1Id,card2Id){
        const a = document.querySelector(`body main article#gameSection div.cardItem#card-${card1Id}`);
        const b = document.querySelector(`body main article#gameSection div.cardItem#card-${card2Id}`);
        const d = a.cloneNode(true);
        const c = b.cloneNode(true);
        b.replaceWith(c);
        a.replaceWith(d);
    }

    onGameEndDialog(){
        const container = document.querySelector('body main section#gameContainer section.endGameDialog');
        container.classList.toggle('expose');
    }

}

const drawMatchingGame = new DrawMatchingGame();
export default drawMatchingGame;