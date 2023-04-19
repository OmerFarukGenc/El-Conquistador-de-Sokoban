var query = require('cli-interact').getYesNo;
const debug = require("debug")("sokoban");

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

const printMatToString = (m) => {
    var s = "";
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++)
            s += getCharFromNumber(m[i][j]);
        s += "\n";
    }
    return s;
}

const matClone = (mat) => {
    const result = [];
    for (var i = 0; i < mat.length; i++) {
        result.push([]);
        for (var j = 0; j < mat[i].length; j++)
            result[i].push(mat[i][j]);
    }

    return result;
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

const isCompleted = (mat) => {
    for (var i = 0; i < mat.length; i++)
        for (var j = 0; j < mat[i].length; j++)
            if (mat[i][j] == 3)
                return false;
    return true;
}

const up = (mat) => move(mat, -1, 0);
const down = (mat) => move(mat, 1, 0)
const left = (mat) => move(mat, 0, -1)
const right = (mat) => move(mat, 0, 1)

const compareMat = (mat1, mat2) => {
    for (let i = 0; i < mat1.length; i++)
        for (let j = 0; j < mat1[i].length; j++)
            if (mat1[i][j] != mat2[i][j])
                return false;
    return true;
}

const isVisited = (m, visited) => {
    for (let i = 0; i < visited.length; i++)
        if (compareMat(m, visited[i])) 
            return true;

    //console.log("visited false");
    //debug(visited);
    //debug(m);
    return false;
}



const DFS = (mat) => {
    var result = "";
    const visited = [];
    const movementStack =[];
    let currentMoves = [];
    //visited.push(mat);
    let currentId = 0;
    const history = []; //[[id,parent]];
    const stack = [];
    let key = false;
    stack.push(mat);
    var currentMat = null;

    while (stack.length != 0) {
        key = false;
        //console.log("IN BFS");
        //console.log(queue.length);

        currentMat = stack.pop();
        currentMoves.push(movementStack.pop());
        visited.push(currentMat);


        /*for (let i = 0; i < visited.length; i++)
            console.log(printMatToString(visited[i]));
        var answer = query('Is it true');*/
        //result += printMatToString(currentMat);
        //console.log(result);
        //console.log(visited.length);

        if (isCompleted(currentMat)) {
            var result = currentMoves;/*
            for (let i = 0; i < visited.length; i++)
                result += printMatToString(visited[i]);*/
            return result;
        } else {
            let upMat = matClone(currentMat);
            up(upMat);
            if (!isVisited(upMat, visited)){
                stack.push(upMat);
                movementStack.push("u");
                key=true;
            }

            let downMat = matClone(currentMat);
            down(downMat);
            if (!isVisited(downMat, visited)){
                stack.push(downMat);
                movementStack.push("d");
                key=true;

            }

            let leftMat = matClone(currentMat);
            left(leftMat);
            if (!isVisited(leftMat, visited)) {
                stack.push(leftMat);
                movementStack.push("l");
                key=true;

            }

            let rightMat = matClone(currentMat);
            right(rightMat);
            if (!isVisited(rightMat, visited)){
                stack.push(rightMat);
                movementStack.push("r");
                key=true;

            }
        }

        if(!key)
            currentMoves.pop();
    }
    return {error:"error"};
}

const getNextMove = (mat) => {
    return DFS(mat);
}


module.exports = getNextMove;