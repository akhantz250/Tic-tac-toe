let currentTurn = 'X';
let isGameOver = false;
let p1Score = 0, p2Score = 0;
const X ='X'; //player one
const O ='O'; //player two
let gameBoard = [
    null, null, null,
    null, null, null,
    null, null, null];

const playerOneScore = document.querySelector('.player-one');
const playerTwoScore = document.querySelector('.player-two');
const displayEvent = document.querySelector('.display-event');
const restartBtn = document.querySelector('.reset');
displayEvent.textContent = 'Player one`s turn.';
playerOneScore.classList.toggle('active');

restartBtn.addEventListener('click', () => Gameboard.resetGame());
const tiles = Array.from(document.querySelectorAll('.square'));
tiles.sort((a,b) => a.dataset.tile - b.dataset.tile);
tiles.forEach(element => {
    element.addEventListener('click',e => {tileHandler(e)});    
});

const tileHandler = (e) =>{
    if(isGameOver) return;
    const chosenTile = e.target.dataset.tile;
    if(gameBoard[chosenTile]!=null) return;
    let currentPlayer = currentTurn === X? 'Player one':'Player two';
    e.target.textContent = currentTurn;
    gameBoard.splice( chosenTile , 1 , currentTurn );

    // console.log(`${currentTurn} chose square ${chosenTile}`);

    if(Gameboard.checkWin(currentTurn)){
        isGameOver = true;
        displayEvent.textContent = `${currentPlayer} has won the game.`;
        if(currentTurn === X){
            p1Score++;
            playerOneScore.textContent = `Player One: ${p1Score}`;
        }else{
            p2Score++;} 
            playerTwoScore.textContent = `Player Two: ${p2Score}`;
        return;
    }
    if(Gameboard.checkDraw()){
        isGameOver = true;
        displayEvent.textContent = 'Game ended in a draw.';
        return;
    } 
    currentTurn = currentTurn === X? O:X;
    playerOneScore.classList.toggle('active');
    playerTwoScore.classList.toggle('active');
    displayEvent.textContent = currentTurn === O? 'Player two\'s turn.': 'Player one\'s turn.'
};

const Gameboard = ( () => {
    const printBoard = () => {
        gameBoard.forEach(i => console.log(i));
        console.log(gameBoard);
    };

    const checkDraw = () =>{
        if(!gameBoard.includes(null)){
            return true;
        }else return false;
    };

    const wonTile = (currentPlayer,first,second,thrid) =>{
        let colour = currentPlayer === X? 'red': 'blue';
        tiles[first].classList.add(`${colour}`);
        tiles[second].classList.add(`${colour}`);
        tiles[thrid].classList.add(`${colour}`);
    };

    const checkWin = (currentPlayer) =>{
        if(gameBoard[0] === currentPlayer && gameBoard[1] === currentPlayer && gameBoard[2] === currentPlayer){
            wonTile(currentPlayer,0,1,2);
            return true;
        }else if (gameBoard[3] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[5] === currentPlayer){
            wonTile(currentPlayer,3,4,5);
            return true;
        }else if (gameBoard[6] === currentPlayer && gameBoard[7] === currentPlayer && gameBoard[8] === currentPlayer){
            wonTile(currentPlayer,6,7,8);
            return true;
        }else if (gameBoard[0] === currentPlayer && gameBoard[3] === currentPlayer && gameBoard[6] === currentPlayer){
            wonTile(currentPlayer,0,3,6);
            return true;
        }else if (gameBoard[1] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[7] === currentPlayer){
            wonTile(currentPlayer,1,4,7);
            return true;
        }else if (gameBoard[2] === currentPlayer && gameBoard[5] === currentPlayer && gameBoard[8] === currentPlayer){
            wonTile(currentPlayer,2,5,8);
            return true;
        }else if (gameBoard[0] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[8] === currentPlayer){
            wonTile(currentPlayer,0,4,8);
            return true;
        }else if (gameBoard[2] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[6] === currentPlayer){
            wonTile(currentPlayer,2,4,6);
            return true;
        }else return false;
    };

    const resetGame = () =>{
        isGameOver = false;
        currentTurn = currentTurn === X? O:X;
        gameBoard = [
            null, null, null,
            null, null, null,
            null, null, null];
        tiles.forEach(tile =>{
            tile.textContent = "";
            tile.classList.remove('blue');
            tile.classList.remove('red');
        });
        displayEvent.textContent = currentTurn === O? 'Player two\'s turn.': 'Player one\'s turn.';
        playerOneScore.classList.toggle('active');
        playerTwoScore.classList.toggle('active');

        console.log('Game reset.')
    };

    return {
        printBoard,
        checkWin,
        checkDraw,
        resetGame,
    }
})();