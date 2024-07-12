var array = [[], [], []];

const winningConditions = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

var P1 = [];
var P2 = [];

let Winner = null;

var Player1 = null;
var Player2 = null;

let id = 0;
var turn = 0;

function _$id(string) {
  return document.getElementById(string);
}
function _$class(string) {
  return document.getElementById(string);
}
function _$tag(string) {
  return document.getElementsByTagName(string);
}

for (let index = 0; index < array.length; index++) {
  _$id("tic-boxes").innerHTML += `<tr id="row-${index}">`;
  for (let i = 0; i < array.length; i++) {
    _$id(
      `row-${index}`
    ).innerHTML += `<td id="${id}" onclick="moveSign(this)" class="bg-gray-800 w-24 h-24 text-center text-white font-bold lg:text-6xl text-6xl border-2 border-black"></td>`;
    id++;
  }
  _$id("tic-boxes").innerHTML += `</tr>`;
}

function selectSign(s) {
  if (s.value == "◯") {
    Player1 = s.value;
    Player2 = "✕";
    _$id("player1-sign").innerText += ` = ${Player1}`;
    _$id("player2-sign").innerText += ` = ${Player2}`;
    _$id("one-sign-value").style.visibility = "hidden";
    _$id("two-sign-value").style.visibility = "hidden";
  } else if (s.value == "✕") {
    Player1 = s.value;
    Player2 = "◯";
    _$id("player1-sign").innerText += ` = ${Player1}`;
    _$id("player2-sign").innerText += ` = ${Player2}`;
    _$id("one-sign-value").style.visibility = "hidden";
    _$id("two-sign-value").style.visibility = "hidden";
  }
}

function moveSign(s) {
  if (
    (Player1 == null && Player2 == null) 
  ) {
    _$id("sign-warning").style.visibility = "visible";
    _$id("selectSignWarning").innerText =
      "Click sign button for select sign";
    setTimeout(() => {
      _$id("sign-warning").style.visibility = "hidden";
    }, 1000);
  }
  
  if (Player1 != null && Player2 != null) {
    if (turn % 2 == 0 && turn != 9) {
      s.innerHTML = Player1;
      chooseWinner(s);
      turn++;
      _$id(s.id).style.pointerEvents = "none";
    } else if (turn % 2 != 0 && turn != 9) {
      s.innerHTML = Player2;
      chooseWinner(s);
      turn++;
      _$id(s.id).style.pointerEvents = "none";
    }
  }
}

function isCheckWin(array1, array2) {
  let count = 0;
  for (let ele of array2) {
    if (array1.indexOf(ele) !== -1) {
      count++;
    }
  }
  return count >= 3 ? true : false;
}

function chooseWinner(s) {
  if (turn % 2 == 0 && s.innerHTML != null) {
    P1.push(parseInt(s.id));
  } else if (turn % 2 != 0 && s.innerHTML != null) {
    P2.push(parseInt(s.id));
  }
  for (let index = 0; index < winningConditions.length; index++) {
    if (turn % 2 == 0) {
      if (isCheckWin(P1, winningConditions[index]) == true) {
        Winner = Player1;
        _$id(
          "player-win"
        ).innerHTML = `<h1 class="text-2xl">Player 1 Win`;
        for (i = 0; i < 8; i++) {
          if (_$id(`${i}`).style.pointerEvents != "none") {
            _$id(`${i}`).style.pointerEvents = "none";
          }
        }
      }
    }
    if (turn % 2 != 0) {
      if (isCheckWin(P2, winningConditions[index]) == true) {
        Winner = Player2;
        _$id(
          "player-win"
        ).innerHTML = `<h1 class="text-2xl">Player 2 Win`;
        for (i = 0; i < 8; i++) {
          if (_$id(`${i}`).style.pointerEvents != "none") {
            _$id(`${i}`).style.pointerEvents = "none";
          }
        }
      }
    }
    if (turn == 8 && Winner == null) {
        _$id(
          "player-win"
        ).innerHTML = `<h1 class="text-2xl">Match Draw</h1>`;
      }
  }
}
 function resetGame() {
  window.location.reload();
}
