let count = 0;
let boardGame = new Array();
//create array
function createBoard() {
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
  count = count + 1;
  if (count % 2 == 1) {
    document.getElementById(id).innerHTML = "X";
  } else {
    document.getElementById(id).innerHTML = "O";
  }
}

function createTable() {
  //clear screen
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
