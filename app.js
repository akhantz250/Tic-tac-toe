const Gameboard = ( () => {
    const X ='X'; //player one
    const O ='O'; //player two
    const gameBoard = [
        null, null, null,
        null, null, null,
        null, null, null];

    let currentTurn = X;
    let isGameOver = false;

    const displayEvent = document.querySelector('.display-event');
    displayEvent.textContent = 'Player one`s turn.';
    const tiles = Array.from(document.querySelectorAll('.square'));
    tiles.sort((a,b) => a.dataset.tile - b.dataset.tile);
    tiles.forEach(element => {
        element.addEventListener('click',e => {tileHandler(e)});    
    });
    
    const printBoard = () => {
        gameBoard.forEach(i => console.log(i));
        console.log(gameBoard);
    };

    const tileHandler = (e) =>{
        if(isGameOver) return;
        let currentPlayer = currentTurn === X? 'Player one':'Player two';
        
        e.target.textContent = currentTurn;
        const chosenTile = e.target.dataset.tile;
        gameBoard.splice( chosenTile , 1 , currentTurn );

        console.log(`${currentTurn} chose square ${chosenTile}`);

        if(checkWin(currentTurn)){
            isGameOver = true;
            displayEvent.textContent = `${currentPlayer} has won the game.`;
            return;
        }

        if(checkDraw()){
            isGameOver = true;
            displayEvent.textContent = 'Game ended in a draw.';c
            return;
        } 

        currentTurn = currentTurn === X? O:X;
        displayEvent.textContent = currentTurn === O? 'Player two\'s turn.': 'Player one\'s turn.'
    };

    const checkDraw = () =>{
        if(!gameBoard.includes(null)){
            return true;
        }else return false;
    };

    const checkWin = (currentPlayer) =>{
        if(gameBoard[0] === currentPlayer && gameBoard[1] === currentPlayer && gameBoard[2] === currentPlayer){
            return true;
        }else if (gameBoard[3] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[5] === currentPlayer){
            return true;
        }else if (gameBoard[6] === currentPlayer && gameBoard[7] === currentPlayer && gameBoard[8] === currentPlayer){
            return true;
        }else if (gameBoard[0] === currentPlayer && gameBoard[3] === currentPlayer && gameBoard[6] === currentPlayer){
            return true;
        }else if (gameBoard[1] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[7] === currentPlayer){
            return true;
        }else if (gameBoard[2] === currentPlayer && gameBoard[5] === currentPlayer && gameBoard[8] === currentPlayer){
            return true;
        }else if (gameBoard[0] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[9] === currentPlayer){
            return true;
        }else if (gameBoard[2] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[6] === currentPlayer){
            return true;
        }else return false;
    };

    const resetGame = () =>{


    };


    return {
        printBoard,
        gameBoard,
    }

})();