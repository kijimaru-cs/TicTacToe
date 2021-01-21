let count = 0;
var boardGame = new Array();
let endgame = false;
let botLock = true;
let player = ["Player 1", "Player 2", "Player", " Bot"];
let playerNow = "";
//create array
function createBoard() {
  document.getElementById("inputVariable").style.display = "none";
  count = 0;
  endgame = false;
  document.getElementById("content2").style.display = "block";
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
  if (document.getElementById("gameType").value == "Player") {
    playerNow = player[0];
    document.getElementById("turnScreen").innerHTML = "Turn: " + player[0];
  } else {
    botLock = false;
    if (document.getElementById("startType").value == "O") {
      playerNow = player[3];
      document.getElementById("turnScreen").innerHTML = "Turn: " + player[3];
      bot();
    } else {
      playerNow = player[2];
      document.getElementById("turnScreen").innerHTML = "Turn: " + player[2];
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
      boardGame[i][j] = 1;
    } else {
      document.getElementById(id).innerHTML = "O";
      document.getElementById("turnScreen").innerHTML = "Turn: " + player[0];
      boardGame[i][j] = -1;
    }
    checkWinGame();
    if (playerNow == player[0]) {
      playerNow = player[1];
      document.getElementById("turnScreen").innerHTML = "Turn: " + player[1];
    } else if (playerNow == player[1]) {
      playerNow = player[0];
      document.getElementById("turnScreen").innerHTML = "Turn: " + player[0];
    } else {
      playerNow = player[3];
      document.getElementById("turnScreen").innerHTML = "Turn: " + player[3];
    }
    if (document.getElementById("gameType").value == "Bot") {
      bot();
    }
  }
}

function ClickTableBot(id) {
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
      boardGame[i][j] = 1;
    } else {
      document.getElementById(id).innerHTML = "O";
      boardGame[i][j] = -1;
    }
    checkWinGame();
    playerNow = player[2];
    document.getElementById("turnScreen").innerHTML = "Turn: " + player[2];
  }
}

function checkWinGame() {
  var number = document.getElementById("nTable").value;
  var botRole = 2;
  if (document.getElementById("startType").value == "X") {
    botRole = 1;
  }
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
        document.getElementById("h1EndGameScreen").innerHTML =
          playerNow + " Win";
        document.getElementById("inputVariable").style.display = "block";
        document.getElementById("boardGame").style.opacity = "0.3";
        document.getElementById("turnScreen").style.opacity = "0.3";
        endgame = true;
        botLock = true;
        break;
      }
    }
  }
  if (count == number * number && endgame == false) {
    document.getElementById("endGameScreen").style.display = "block";
    document.getElementById("inputVariable").style.display = "block";
    document.getElementById("h1EndGameScreen").innerHTML = "DRAW";
    document.getElementById("boardGame").style.opacity = "0.3";
    document.getElementById("turnScreen").style.opacity = "0.3";
    endgame = true;
    botLock = true;
  }
}

function createTable() {
  //clear screen
  document.getElementById("endGameScreen").style.display = "none";
  document.getElementById("turnScreen").style.opacity = "1";
  if (document.getElementById("boardGame") != null) {
    document.getElementById("boardGame").remove();
  }
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
  // initial borad
  createBoard();
}
//user choose role
function chooseRole() {
  if (document.getElementById("gameType").value == "Bot") {
    document.getElementById("startType").style.display = "inline";
    document.getElementById("startType2").style.display = "inline";
  }
  if (document.getElementById("gameType").value == "Player") {
    document.getElementById("startType").style.display = "none";
    document.getElementById("startType2").style.display = "none";
  }
}

//Create bot
function bot() {
  var freeSpace = new Array();
  var number = document.getElementById("nTable").value;
  var playerRole = document.getElementById("startType").value;
  var botRole = 1;
  if (playerRole == "X") {
    botRole = -1;
  }
  //travel in board
  for (let i = 0; i < number; i++) {
    for (let j = 0; j < number; j++) {
      if (boardGame[i][j] == 0) {
        freeSpace.push(i + "," + j);
      }
    }
  }
  //way start
  //random and start
  if (freeSpace.length == 9 && endgame == false) {
    let id = parseInt(Math.random() * 9);
    ClickTableBot(freeSpace[id]);
  }
  // choose the best way
  else if (endgame == false) {
    var bestWay = new Array();
    var freeDiagonal1 = 0;
    var countDiagonal1 = 0;
    var countDiagonal1User = 0;
    var tempDiagonal1 = "";
    var freeDiagonal2 = 0;
    var countDiagonal2 = 0;
    var countDiagonal2User = 0;
    var tempDiagonal2 = "";
    for (let i = 0; i < number; i++) {
      var freeHorizontal = 0;
      var freeVertical = 0;
      var countHorizontal = 0;
      var countVertical = 0;
      var countHorizontalUser = 0;
      var countVerticalUser = 0;
      var tempHorizontal = "";
      var tempVertical = "";
      for (let j = 0; j < number; j++) {
        //find best way of Horizontal
        if (boardGame[i][j] == botRole) {
          countHorizontal = countHorizontal + 1;
        }
        if (boardGame[i][j] == -botRole) {
          countHorizontalUser = countHorizontalUser + 1;
        }
        if (boardGame[i][j] == 0) {
          freeHorizontal = freeHorizontal + 1;
          tempHorizontal = i + "," + j;
        }
        //Find best way of vertical
        if (boardGame[j][i] == botRole) {
          countVertical = countVertical + 1;
        }
        if (boardGame[j][i] == -botRole) {
          countVerticalUser = countVerticalUser + 1;
        }
        if (boardGame[j][i] == 0) {
          freeVertical = freeVertical + 1;
          tempVertical = j + "," + i;
        }
        //Find best way of daigonal 1
        if (i == j) {
          if (boardGame[i][j] == botRole) {
            countDiagonal1 = countDiagonal1 + 1;
          }
          if (boardGame[i][j] == -botRole) {
            countDiagonal1User = countDiagonal1User + 1;
          }
          if (boardGame[i][j] == 0) {
            freeDiagonal1 = freeDiagonal1 + 1;
            tempDiagonal1 = i + "," + j;
          }
        }
        //Find the best way of diagonal 2
        if (i + j == number - 1) {
          if (boardGame[i][j] == botRole) {
            countDiagonal2 = countDiagonal2 + 1;
          }
          if (boardGame[i][j] == -botRole) {
            countDiagonal2User = countDiagonal2User + 1;
          }
          if (boardGame[i][j] == 0) {
            freeDiagonal2 = freeDiagonal2 + 1;
            tempDiagonal2 = i + "," + j;
          }
        }
      }
      if (countHorizontal == number - 1 && freeHorizontal == 1) {
        bestWay.push(tempHorizontal);
      }
      if (countVertical == number - 1 && freeVertical == 1) {
        bestWay.push(tempVertical);
      }
      if (countHorizontalUser == number - 1 && freeHorizontal == 1) {
        bestWay.push(tempHorizontal);
      }
      if (countVerticalUser == number - 1 && freeVertical == 1) {
        bestWay.push(tempVertical);
      }
    }
    if (countDiagonal1 == number - 1 && freeDiagonal1 == 1) {
      bestWay.push(tempDiagonal1);
    }
    if (countDiagonal2 == number - 1 && freeDiagonal2 == 1) {
      bestWay.push(tempDiagonal2);
    }
    if (countDiagonal1User == number - 1 && freeDiagonal1 == 1) {
      bestWay.push(tempDiagonal1);
    }
    if (countDiagonal2User == number - 1 && freeDiagonal2 == 1) {
      bestWay.push(tempDiagonal2);
    }
    // not have best way => random way
    if (bestWay.length == 0) {
      ClickTableBot(freeSpace[parseInt(Math.random() * freeSpace.length)]);
    } else {
      ClickTableBot(bestWay[parseInt(Math.random() * bestWay.length)]);
    }

    // ClickTableBot(freeSpace[id]);
  }
}
