let playerTurn = "X";
let player1 = "Georges";
let player2 = "Brad";

function updateTurnName() {
  let playerName = "";

  if (playerTurn === "X") {
    playerName = player1;
  } else {
    playerName = player2;
  }

  const turnSpan = document.querySelector(".player_turn span");
  turnSpan.textContent = playerName;
}

function changeTurn() {
  if (playerTurn === "X") {
    playerTurn = "O";
  } else {
    playerTurn = "X";
  }

  updateTurnName();
}

function slotAssignment(e) {
  const id = e.target.id;
  console.log(id);
}

const player1Input = document.querySelector("#player1");
player1Input.addEventListener("change", function (e) {
  player1 = e.target.value;
  updateTurnName();
});

const player2Input = document.querySelector("#player2");
player2Input.addEventListener("change", function (e) {
  player2 = e.target.value;
  updateTurnName();
});

const buttons = document.querySelectorAll(".grid button");
buttons.forEach(button => {
  button.addEventListener("click", slotAssignment);
});
