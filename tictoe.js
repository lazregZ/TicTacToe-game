const Gameboard =( () =>{
    const board=document.getElementById("board")
    const boardCreation = ()=>{
        for(i=0; i<9; i++){
            let divs = document.createElement("div")
            divs.setAttribute("class","square")
            divs.setAttribute("id",`${i}`)
            divs.addEventListener("click", Game.setmark)
            board.appendChild(divs)
    }
    
}
return {boardCreation
}

})()


const CreatePlayer = (name,mark)=>{
    return{name,mark}
}


const Game =( ()=>{

    const restart = () => {
        let players = ["player1", "player2"];
        for (let player of players) {
          document.getElementById(player).innerHTML = "";
        }
      
        let divs = document.querySelectorAll(".square");
        for (let div of divs) {
          div.innerHTML = "";
        }
        const res = document.querySelector('#result')
        res.innerHTML = ""
      };
      
    const gameover = ()=>{
        const divs = document.querySelectorAll('.square')
        divs.forEach((div) => div.removeEventListener('click', Game.setmark))

    }
    let players
    let currentPlayer
    let haststarted= false
    const start= ()=>{
        if (haststarted){
            return
        } 
        currentPlayer = 0
        players=
        [CreatePlayer(document.getElementById("player1").value, "X"),
        CreatePlayer (document.getElementById("player2").value, "O")];
        Gameboard.boardCreation()
        haststarted= true
    }
   const setmark =(event)=>{
    let currentDiv = event.target
    if (currentDiv.innerHTML==""){
        currentDiv.innerHTML = players[currentPlayer].mark
        if (win(players[currentPlayer])){
            const res = document.querySelector('#result')
            res.innerHTML = `Player ${players[currentPlayer].name} has won!`
            gameover()
        }
        else if (draw()){
                    const res = document.querySelector('#result')
                    res.innerHTML = `the game is draw!`
                    gameover()
                }
        else{
            if (currentPlayer== 0) {
                currentPlayer=1;
              } else {
                currentPlayer=0;
              }
        }
    
    
    }
    

   }
    return {start, setmark, restart
    }
}
)()

function draw() {
    let test= false
    const divs = Array.from(document.querySelectorAll('.square'));
    if(divs.every((div)=> div.innerHTML!="")
    ){
        test= true
    }
return test}

function win(player) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    const divs = Array.from(document.querySelectorAll('.square'));
    const divsMark = divs
      .filter((div) => div.innerHTML === player.mark)
      .map((div) => div.getAttribute('id'));
  
    return winningCombinations.some((combination) =>
      combination.every((num) => divsMark.includes(num.toString()))
    );
  }
  

const startButton= document.querySelector("#start-game");
startButton.addEventListener("click", (event)=>{
    event.preventDefault()
    let jouer1 = document.getElementById("player1")
    let jouer2 = document.getElementById("player2")
    if (jouer1.value!== "" && jouer2.value !== ""){
        Game.start()
    }
   })
const restartButton = document.querySelector('#restart-game')
restartButton.addEventListener('click', () => Game.restart)