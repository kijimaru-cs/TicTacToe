<html>
    <link rel="stylesheet" href="/css/main.css">
    <script src="/js/main.js"></script>
    <head>
        <title>Tic Tac Toe</title>
    </head>
    <body>
        <div class="header">
            <center>
                <h1>Tic Tac Toe</h1>
            </center>
        </div>
        <div class="inputVariable" id="inputVariable">
            <label for="nTable">จำนวนตาราง</label><select name="selectnTable" id="nTable">
                <option value="3">3*3</option>
                <option value="4">4*4</option>
                <option value="5">5*5</option>
                <option value="6">6*6</option>
                <option value="7">7*7</option>
                <option value="8">8*8</option>
                <option value="9">9*9</option>
                <option value="10">10*10</option>
            </select>
            <label for="gameType">เลือกชนิดการเล่น</label><select name="selectGameType" id="gameType" onclick="chooseRole()">
                <option value="Player">Player</option>
                <option value="Bot">Bot</option>
            </select>
            <label for="startType" class="startType">เลือกตำแหน่ง</label>
            <select name="startGameType" class="startType" id="startType">
                <option value="X">X</option>
                <option value="O">O</option>
            </select>
            <button class="btnStart" type="button" onclick="createTable()">เริ่มเล่น</button>
        </div>
        <div class="content">
            <center>
                <div class="content2" id="content2">
                    <h2 class="turnScreen" id="turnScreen"></h2>
                </div>
                <div class="tableScreen">
                </div>
            </center>
        </div>
        <div class="endGameScreen" id="endGameScreen">
            <center>
                <h1 id="h1EndGameScreen"></h1>
                <button class="btnEndGameScreen" onclick="createTable()" >เล่นอีกครั้ง</button>
            </center>
        </div>
    </body>
</html>