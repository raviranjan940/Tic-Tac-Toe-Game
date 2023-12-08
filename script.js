let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector('#reset-game');
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;//playerX, PlayerO
let count = 0; //To Track Draw Status Count

// let arr= ["apple", "banana", "litchi"];
// //2D Array
// let arr2 = [["apple", "litchi"], ["potato", "mushroom"], ["pants", "shirts"]];

const winPatterns =[
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", ()=> {
    if(turnO){
      box.innerText = "O";
      box.style.color = "#079c36";
      turnO = false;
    }
    else{
      box.innerText = "X";
      box.style.color = "#880904";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if(count === 9 && !isWinner){
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const enableBoxes = () => {
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for(let box of boxes){
    box.disabled = true;
  }
};

const showResult =  (winner) => {
  msg.innerText = `🎉🎊Congratulations, 🏆Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for(pattern of winPatterns){
    let pos1Val = boxes[pattern[0]].innerText; 
    let pos2Val = boxes[pattern[1]].innerText; 
    let pos3Val = boxes[pattern[2]].innerText;
    
    if(pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){
      if(pos1Val === pos2Val && pos2Val === pos3Val){
        console.log(`${pos1Val} Won The Game :)`);
        showResult(pos1Val);
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

