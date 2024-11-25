let player1 = null;
let player2 = null;

const Board = (function(doc) {
  let _playerTurn = "X";
  let _isPlaying = true;
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

  function displayWinner(winner) {
    const turnDiv = doc.querySelector(".player_turn");
    turnDiv.innerHTML = `<p>${winner} wins!</p>`;

    _isPlaying = false;
  }

  function updatePlayerTurn() {
    const turnSpan = doc.querySelector(".player_turn span");
    const playerDivs = doc.querySelectorAll(".player");

    if (_playerTurn === "X") {
      turnSpan.innerText = player1?.getName() ?? "X";
      playerDivs[0].classList.add("is_turn");
      playerDivs[1].classList.remove("is_turn");
    } else {
      turnSpan.innerText = player2?.getName() ?? "O";
      playerDivs[1].classList.add("is_turn");
      playerDivs[0].classList.remove("is_turn");
    }
  }

  function clear() {
    const turnDiv = doc.querySelector(".player_turn");
    turnDiv.innerHTML = `<span>${player1?.getName() ?? "X"}</span>'s turn!`;

    _values = ["", "", "", "", "", "", "", "", ""];

    const buttons = doc.querySelectorAll(".grid button");
    buttons.forEach(button => button.innerText = "");

    _playerTurn = "X";
    updatePlayerTurn();

    _isPlaying = true;
  }

  function changeTurn() {
    if (_playerTurn === "X") {
      _playerTurn = "O";
    } else {
      _playerTurn = "X";
    }

    updatePlayerTurn();
  }

  function checkingForWin() {
    if (!_values.find(value => value != "")) {
      // Array is clear
      return;
    }

    let winner = "";

    const row1 = _values.slice(0, 3);
    const row2 = _values.slice(3, 6);
    const row3 = _values.slice(6);

    // Horizontal options
    if (row1.join("-") === "X-X-X" || row1.join("-") === "O-O-O") {
      winner = row1[0];
    }

    if (row2.join("-") === "X-X-X" || row2.join("-") === "O-O-O") {
      winner = row2[0];
    }

    if (row3.join("-") === "X-X-X" || row3.join("-") === "O-O-O") {
      winner = row3[0];
    }

    // Vertical options
    for (let i = 0; i < 3; i++) {
      if (row1[i] === row2[i] && row2[i] === row3[i] && row2[i] !== "") {
        winner = row2[i];
      }
    }

    // Diagonal options
    if (
      (row1[0] === row2[1] && row2[1] === row3[2]) ||
      (row1[2] === row2[1] && row2[1] === row3[0])
    ) {
      winner = row2[1];
    }

    if (winner !== "") {
      displayWinner(winner === "X" ? (player1?.getName() ?? "X") : (player2?.getName() ?? "O"));
    } else {
      if (_values.find(value => value === "") === undefined) {
        // Array is full but there is no winner
        const turnDiv = doc.querySelector(".player_turn");
        turnDiv.innerHTML = `<p>Tie!</p>`;
      } else {
        changeTurn();
      }
    }
  }

  function assignSlot(slotId) {
    arrayId = slotId - 1;

    if (!_isPlaying || _values[arrayId] !== "") {
      return;
    }

    _values[arrayId] = _playerTurn;

    const docSlot = doc.getElementById(slotId);
    docSlot.innerText = _playerTurn;

    checkingForWin();
  }

  return {
    assignSlot,
    clear,
    updatePlayerTurn,
  }
})(document);

function createPlayer(playerName) {
  let _name = playerName;

  function getName() {
    return _name;
  }

  function updateName(newName) {
    _name = newName;
  }

  return {
    getName,
    updateName,
  };
}

const player1Input = document.querySelector("#player1");
player1Input.addEventListener("change", function (e) {
  if (!player1) {
    player1 = createPlayer(e.target.value);
  } else {
    player1.updateName(e.target.value);
  }

  Board.updatePlayerTurn();
});

const player2Input = document.querySelector("#player2");
player2Input.addEventListener("change", function (e) {
  if (!player2) {
    player2 = createPlayer(e.target.value);
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
