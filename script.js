const cells = document.querySelectorAll('.cell');
let currentplayer = 'X';
let gameOver = false;
const winComb = [ 
                [0,1,2] , [3,4,5] , [6,7,8],
                [0,3,6] , [1,4,7] , [2,5,8],
                [0,4,8] , [2,4,6]
]

document.getElementById('gameStatus').innerText = `Player ${currentplayer}'s Turn`;
console.log("currentplayer is " , currentplayer);

cells.forEach(cell => {
    cell.addEventListener('click', async function() {
        if (cell.innerText.trim() !== '' || gameOver) {
            return;
        }
       // console.log("printing X turn");
        cell.innerText = currentplayer;
        //console.log("line 20" , currentplayer)
        result(currentplayer);
       // currentplayer = 'O';
        //document.getElementById('gameStatus').innerText = `Player ${currentplayer}'s Turn`;
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (gameOver!= true){
          aimove();
    }
    });
});


function aimove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerText === '') {
            cells[i].innerText = currentplayer;
            let score = minimax(cells, 0, false);
            cells[i].innerText = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    if (move !== undefined) {
        cells[move].innerText = currentplayer;
        result(currentplayer);
    }
    // currentplayer = 'X';
}

function minimax(cells, depth, isMaximizing) {
    if (checkWin('O')) {
        return 1;
    } else if (checkWin('X')) {
        return -1;
    } else if (isDraw()) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerText === '') {
                cells[i].innerText = 'O';
                let score = minimax(cells, depth + 1, false);
                cells[i].innerText = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerText === '') {
                cells[i].innerText = 'X';
                let score = minimax(cells, depth + 1, true);
                cells[i].innerText = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}
        

 function checkfill(cell){
  //  console.log("checkfill entry")
    let check;
    if(cell.innerText.trim() !== '' || gameOver){
      check = false;
    }
    else {
       check = true;
    }
   // console.log(check);
    return check;
 }

 function result(player){
    if (checkWin(currentplayer)) {
        document.getElementById('gameStatus').innerText = `Player ${currentplayer} wins!`;
        gameOver = true;
    } else if (isDraw()) {
        document.getElementById('gameStatus').innerText = 'Draw!';
        gameOver = true;
    } else {
        // currentplayer = 'O';
        if(currentplayer == 'O'){
            currentplayer = 'X';
        }
        else{
        currentplayer = 'O';
        }
         document.getElementById('gameStatus').innerText = `Player ${currentplayer}'s Turn`;
        return;
       
    }
 }

 function checkWin(player) {
    return winComb.some(combination => {
        return combination.every(index => {
            return cells[index].innerText === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => cell.innerText.trim() !== '');
}