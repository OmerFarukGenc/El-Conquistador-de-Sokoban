"x";
"■";
"▤";
"⧄";
const getCharFromNumber = (c) => {
    if (c == 0)
        return "_";
    else if (c == 1)
        return "#";
    else if (c == 2)
        return "@";
    else if (c == 3)
        return "$";
    else if (c == 4)
        return ".";
    else if (c == 5)
        return "X";
    else if (c == 6)
        return "@";

}

document.getElementById("reset-area").addEventListener("click", (e) => {
    window.location = window.location;
})

document.getElementById("loading-prompt").style.display = "none"

/* 
0 => non-loading
1 => loading
*/
var state = 0;


var mat = null;
var gameBoardElement = document.getElementById("game-board");

document.getElementById("level-completed-area").style.display = "none";


const renderGameBoard = (gameBoardElement, mat) => {
    gameBoardElement.innerHTML = "";
    //console.log(mat);
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[i].length; j++)
            gameBoardElement.innerHTML += getCharFromNumber(mat[i][j]);
        gameBoardElement.innerHTML += "<br>";
    }
}

const move = (mat, dirRow, dirCol) => {

    for (var i = 0; i < mat.length; i++)
        for (var j = 0; j < mat[i].length; j++) {
            if (mat[i][j] == 2) {
                if (mat[i + dirRow][j + dirCol] == 0) {
                    mat[i + dirRow][j + dirCol] = 2;
                    mat[i][j] = 0;
                } else if (mat[i + dirRow][j + dirCol] == 3) {
                    if (mat[i + dirRow + dirRow][j + dirCol + dirCol] == 0) {
                        mat[i][j] = 0;
                        mat[i + dirRow][j + dirCol] = 2;
                        mat[i + dirRow + dirRow][j + dirCol + dirCol] = 3;
                    } else if (mat[i + dirRow + dirRow][j + dirCol + dirCol] == 4) {
                        mat[i][j] = 0;
                        mat[i + dirRow][j + dirCol] = 2;
                        mat[i + dirRow + dirRow][j + dirCol + dirCol] = 5;
                    }
                } else if (mat[i + dirRow][j + dirCol] == 4) {
                    mat[i][j] = 0;
                    mat[i + dirRow][j + dirCol] = 6;

                } else if (mat[i + dirRow][j + dirCol] == 5) {
                    if (mat[i + dirRow + dirRow][j + dirCol + dirCol] == 0) {
                        mat[i][j] = 0;
                        mat[i + dirRow][j + dirCol] = 6;
                        mat[i + dirRow + dirRow][j + dirCol + dirCol] = 3;
                    }

                }


                return;
            } else if (mat[i][j] == 6) {
                if (mat[i + dirRow][j + dirCol] == 0) {
                    mat[i + dirRow][j + dirCol] = 2;
                    mat[i][j] = 4;
                } else if (mat[i + dirRow][j + dirCol] == 3) {
                    if (mat[i + dirRow + dirRow][j + dirCol + dirCol] == 0) {
                        mat[i][j] = 4;
                        mat[i + dirRow][j + dirCol] = 2;
                        mat[i + dirRow + dirRow][j + dirCol + dirCol] = 3;
                    } else if (mat[i + dirRow + dirRow][j + dirCol + dirCol] == 4) {
                        mat[i][j] = 4;
                        mat[i + dirRow][j + dirCol] = 2;
                        mat[i + dirRow + dirRow][j + dirCol + dirCol] = 5;
                    }
                } else if (mat[i + dirRow][j + dirCol] == 4) {
                    if (mat[i + dirRow + dirRow][j + dirCol + dirCol] == 0) {
                        mat[i][j] = 4;
                        mat[i + dirRow][j + dirCol] = 6;
                        mat[i + dirRow + dirRow][j + dirCol + dirCol] = 3;
                    }
                }


                return;
            }
        }

}

const up = (mat) => move(mat, -1, 0);
const down = (mat) => move(mat, 1, 0)
const left = (mat) => move(mat, 0, -1)
const right = (mat) => move(mat, 0, 1)


const isCompleted = (mat) => {
    console.log("in is complete");
    for (var i = 0; i < mat.length; i++)
        for (var j = 0; j < mat[i].length; j++)
            if (mat[i][j] == 3) {
                console.log("not completed");
                return false;
            }
    console.log("completed");
    return true;
}


const deactivateMoveOne = () => {
    document.getElementById("move-one-button").style.backgroundColor = "gray";
}

const activateMoveOne = () => {
    document.getElementById("move-one-button").style.backgroundColor = "brown";
}
deactivateMoveOne();

document.getElementById("up-arrow").addEventListener("click", (e) => {
    if (state == 1)
        return;
    if (solution && solution[0] != "u") {
        solution = null;
        deactivateMoveOne();
    }
    up(mat);
    renderGameBoard(gameBoardElement, mat);
    if (isCompleted(mat))
        document.getElementById("level-completed-area").style.display = "block";
    else
        document.getElementById("level-completed-area").style.display = "none";


})

document.getElementById("down-arrow").addEventListener("click", (e) => {
    if (state == 1)
        return;
    if (solution && solution[0] != "d") {
        solution = null;
        deactivateMoveOne();
    }
    down(mat);
    renderGameBoard(gameBoardElement, mat);
    if (isCompleted(mat))
        document.getElementById("level-completed-area").style.display = "block";
    else
        document.getElementById("level-completed-area").style.display = "none";
})

document.getElementById("left-arrow").addEventListener("click", (e) => {
    if (state == 1)
        return;
    if (solution && solution[0] != "l") {
        solution = null;
        deactivateMoveOne();
    }
    left(mat);
    renderGameBoard(gameBoardElement, mat);
    if (isCompleted(mat))
        document.getElementById("level-completed-area").style.display = "block";
    else
        document.getElementById("level-completed-area").style.display = "none";
})

document.getElementById("right-arrow").addEventListener("click", (e) => {
    if (state == 1)
        return;
    if (solution && solution[0] != "r") {
        solution = null;
        deactivateMoveOne();
    }
    right(mat);
    renderGameBoard(gameBoardElement, mat);
    if (isCompleted(mat))
        document.getElementById("level-completed-area").style.display = "block";
    else
        document.getElementById("level-completed-area").style.display = "none";
})

var solution = null;

document.getElementById("solve-all-button").addEventListener("click", (e) => {
    if (state == 1)
        return;
    state = 1
    document.getElementById("loading-prompt").style.display = "block"
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/moveOne");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");



    let data = { mat };

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status == 200) {
            res = JSON.parse(xhr.response);
            if (res.error) {
                alert("Current state of the game cannot be solved");
            } else {
                console.log(res);
                if (res.length == 1) {
                    alert("Game is already solved");
                } else {
                    solution = res.slice(1);
                    activateMoveOne();
                }
            }
            state = 0;
            document.getElementById("loading-prompt").style.display = "none"

        }
    };

    xhr.send(JSON.stringify(data));


})


document.getElementById("move-one-button").addEventListener("click", (e) => {
    if (solution == null)
        return;
    let nextMove = solution.shift();

    if (nextMove == "u") {
        up(mat);
        renderGameBoard(gameBoardElement, mat);
        if (isCompleted(mat))
            document.getElementById("level-completed-area").style.display = "block";
        else
            document.getElementById("level-completed-area").style.display = "none";
    } else if (nextMove == "d") {
        down(mat);
        renderGameBoard(gameBoardElement, mat);
        if (isCompleted(mat))
            document.getElementById("level-completed-area").style.display = "block";
        else
            document.getElementById("level-completed-area").style.display = "none";
    } else if (nextMove == "l") {
        left(mat);
        renderGameBoard(gameBoardElement, mat);
        if (isCompleted(mat))
            document.getElementById("level-completed-area").style.display = "block";
        else
            document.getElementById("level-completed-area").style.display = "none";
    } else if (nextMove == "r") {
        right(mat);
        renderGameBoard(gameBoardElement, mat);
        if (isCompleted(mat))
            document.getElementById("level-completed-area").style.display = "block";
        else
            document.getElementById("level-completed-area").style.display = "none";
    }

})


var result = 1;
const level = (new URLSearchParams(window.location.search)).get("level");
console.log(level);
if (level == null)
    result = 1;
else
    result = parseInt(level);

fetch("/api/level/" + result).then((res) =>
    res.json()
).then(json => {
    console.log(json);
    mat = json.mat;

    renderGameBoard(gameBoardElement, mat);
    /*gameBoardElement.innerHTML = "";
    for(var i = 0;i < json.mat.length;i++){
        for(var j = 0;j < json.mat[i].length;j++)
            gameBoardElement.innerHTML += getCharFromNumber(json.mat[i][j]);
        gameBoardElement.innerHTML += "<br>";
    }
    */

})