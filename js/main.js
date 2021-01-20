let count = 0;
var boardGame = new Array();
//create array
function createBoard() {
  document.getElementById("inputVariable").style.display = "none";
  count = 0;
  document.getElementById("content2").style.display = "block";
  document.getElementById("turnScreen").innerHTML = "Turn: Player1";
  var number = document.getElementById("nTable").value;
  var n = parseInt(number);
  for (let i = 0; i < number; i++) {
    boardGame[i] = new Array(n);
  }
  //initial array
  for (let i = 0; i < number; i++) {
    for (let j = 0; j < number; j++) {
      boardGame[i][j] = 0;
    }
  }
}

function ClickTable(id) {
  let str = id.split(",");
  let i = parseInt(str[0]);
  let j = parseInt(str[1]);
  if (
    document.getElementById(id).innerHTML == "X" ||
    document.getElementById(id).innerHTML == "O"
  ) {
  } else {
    count = count + 1;
    if (count % 2 == 1) {
      document.getElementById(id).innerHTML = "X";
      document.getElementById("turnScreen").innerHTML = "Turn: Player2";
      boardGame[i][j] = 1;
    } else {
      document.getElementById(id).innerHTML = "O";
      document.getElementById("turnScreen").innerHTML = "Turn: Player1";
      boardGame[i][j] = -1;
    }
    checkWinGame();
  }
}

function checkWinGame() {
  var number = document.getElementById("nTable").value;
  let endgame = false;
  let checkDiagonal1 = 0;
  let checkDiagonal2 = 0;
  for (let i = 0; i < number; i++) {
    let checkHorizontal = 0;
    let checkVertical = 0;
    for (let j = 0; j < number; j++) {
      checkHorizontal = checkHorizontal + boardGame[i][j];
      checkVertical = checkVertical + boardGame[j][i];
      if (i == j) {
        checkDiagonal1 = checkDiagonal1 + boardGame[i][j];
      }
      if (i + j == number - 1) {
        checkDiagonal2 = checkDiagonal2 + boardGame[i][j];
      }
      if (
        checkHorizontal == -number ||
        checkHorizontal == number ||
        checkVertical == -number ||
        checkVertical == number ||
        checkDiagonal1 == -number ||
        checkDiagonal1 == number ||
        checkDiagonal2 == -number ||
        checkDiagonal2 == number
      ) {
        document.getElementById("endGameScreen").style.display = "block";
        if (count % 2 == 1) {
          document.getElementById("h1EndGameScreen").innerHTML = "Player 1 Win";
        } else {
          document.getElementById("h1EndGameScreen").innerHTML = "Player 2 Win";
        }
        document.getElementById("inputVariable").style.display = "block";
        document.getElementById("boardGame").style.opacity = "0.3";
        endgame = true;
        break;
      }
    }
  }
  if (count == number * number && endgame == false) {
    document.getElementById("endGameScreen").style.display = "block";
    document.getElementById("inputVariable").style.display = "block";
    document.getElementById("h1EndGameScreen").innerHTML = "DRAW";
    document.getElementById("boardGame").style.opacity = "0.3";
    endgame = true;
  }
}

function createTable() {
  //clear screen
  document.getElementById("endGameScreen").style.display = "none";
  if (document.getElementById("boardGame") != null) {
    document.getElementById("boardGame").remove();
  }
  // initial borad
  createBoard();
  //create table
  var body = document.getElementsByClassName("tableScreen")[0];
  var number = document.getElementById("nTable").value;
  var tbl = document.createElement("table");
  tbl.setAttribute("id", "boardGame");
  var tblBody = document.createElement("tbody");
  for (var i = 0; i < number; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < number; j++) {
      var cell = document.createElement("td");
      cell.setAttribute("id", i + "," + j);
      cell.setAttribute("onclick", 'ClickTable("' + i + "," + j + '")');
      var cellText = document.createTextNode(" ");
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  body.appendChild(tbl);
}
