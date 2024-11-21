let player1 = null;
let player2 = null;

const Board = (function(doc) {
  let _playerTurn = "X";
  let _values = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ];

  function updatePlayerTurn() {
    const turnSpan = doc.querySelector(".player_turn span");

    if (_playerTurn === "X") {
      turnSpan.innerText = player1?.getName() ?? "X";
    } else {
      turnSpan.innerText = player2?.getName() ?? "O";
    }
  }

  function clear() {
    _values = ["", "", "", "", "", "", "", "", ""];

    const buttons = doc.querySelectorAll(".grid button");
    buttons.forEach(button => button.innerText = "");

    _playerTurn = "X";
    updatePlayerTurn();
  }

  function changeTurn() {
    if (_playerTurn === "X") {
      _playerTurn = "O";
    } else {
      _playerTurn = "X";
    }

    updatePlayerTurn();
  }

  function assignSlot(slotId) {
    arrayId = slotId - 1;

    if (_values[arrayId] !== "") {
      return;
    }

    _values[arrayId] = _playerTurn;

    const docSlot = doc.getElementById(slotId);
    docSlot.innerText = _playerTurn;

    changeTurn();
  }

  return {
    assignSlot,
    clear,
    updatePlayerTurn,
  }
})(document);

function createPlayer(playerSymbol, playerName) {
  let _name = playerName;
  let symbol = playerSymbol;
  let score = 0;

  function getName() {
    return _name;
  }

  function updateName(newName) {
    _name = newName;
  }

  return {
    getName,
    symbol,
    score,
    updateName,
  };
}

const player1Input = document.querySelector("#player1");
player1Input.addEventListener("change", function (e) {
  if (!player1) {
    player1 = createPlayer("X", e.target.value);
  } else {
    player1.updateName(e.target.value);
  }

  Board.updatePlayerTurn();
});

const player2Input = document.querySelector("#player2");
player2Input.addEventListener("change", function (e) {
  if (!player2) {
    player2 = createPlayer("O", e.target.value);
  } else {
    player2.updateName(e.target.value);
  }

  Board.updatePlayerTurn();
});

const buttons = document.querySelectorAll(".grid button");
buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    Board.assignSlot(e.target.id);
  });
});

const clearBoardButton = document.getElementById("clear_board_button");
clearBoardButton.addEventListener("click", Board.clear);
