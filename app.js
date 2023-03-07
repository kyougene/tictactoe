const Gameboard = (()=> {
    let gameboard = ['', '', '', '', '', '', '', '', ''];

    const render = () => {
        let boardHTML = '';
        gameboard.forEach((square, index)=>{
            boardHTML += `<div class='square' id='square-${index}'>${square}</div> `;
        })
        document.querySelector("#gameboard").innerHTML = boardHTML; 
    }

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }

    const getGameboard = () => gameboard;


    return {
        render,
        update,
        getGameboard
    }
})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector('#player1').value, 'X'), 
            createPlayer(document.querySelector('#player2').value, 'O')
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            addEventListener('click', handleClick); 
        })
    }

    const handleClick = (e) => {
        let index = parseInt(e.target.id.split('-')[1]);
        if (Gameboard.getGameboard()[index] !== '') {
            return;
        }

        Gameboard.update(index, players[currentPlayerIndex].mark); 
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const restart = () => {
        for (let i = 0; i < 9; i++){
            Gameboard.update(i, '');
        }
        Gameboard.render();
    }


    return {
        start,
        handleClick,
        restart
    }
})()


const startButton = document.querySelector('#start-game');
const resetButton = document.querySelector('#reset-game');

startButton.addEventListener('click', ()=> {
    Game.start();
})

resetButton.addEventListener('click', ()=> {
    Game.restart();
})