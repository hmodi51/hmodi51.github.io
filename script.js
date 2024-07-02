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
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (gameOver!= true){
          aimove();
    }
    });
});


function aimove(){
    currentplayer = 'O';
        let randomint;
        document.getElementById('gameStatus').innerText = `Player ${currentplayer}'s Turn`;
         randomint  = Math.floor(Math.random() * 9);
       //  console.log("random int is " , randomint);
        while(!checkfill(cells[randomint])){
       //     console.log("random int is " , randomint);
         randomint = Math.floor(Math.random() * 9);
        }
       // console.log("int is" ,  randomint);
        randomcell = cells[randomint];
        randomcell.innerText = currentplayer;
        result(currentplayer);
        currentplayer= 'X';
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
        return;
        //document.getElementById('gameStatus').innerText = `Player ${currentplayer}'s Turn`;
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