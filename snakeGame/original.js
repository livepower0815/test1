var body = document.querySelector("body");
var snake = document.querySelector("#snake").firstElementChild;

for (let i = 0; i < snake.childElementCount; i++) {
    for (let j = 0; j < snake.children[i].childElementCount; j++) {
        snake.children[i].children[j].id = j + "_" + i;
    }

}
// 蛇體資料
var snakeBody = {
    start: ["5_0", "4_0", "3_0", "2_0", "1_0", "0_0"],
    dir: 51,
    time: 100,
    randomPoint: Math.floor(Math.random() * 30) + "_" + Math.floor(Math.random() * 50)
};

//init data
for (let i = 0; i < snakeBody.start.length; i++) {
    toggleClass(document.getElementById(snakeBody.start[i]))
}
document.getElementById(snakeBody.randomPoint).classList = "black";
//隨機產點function
function newRandom() {
    newPoint = Math.floor(Math.random() * 30) + "_" + Math.floor(Math.random() * 50);
    for (let i = 0; i < snakeBody.start.length; i++) {
        if (snakeBody.start[i] == newPoint) newRandom();
    }
    return newPoint;
}


// 移動邏輯
var h = setInterval(move, snakeBody.time)

function move() {
    // 往右邏輯
    if (snakeBody.dir == 51) {
        let sx = snakeBody.start[0].split("_")[0];
        let sy = snakeBody.start[0].split("_")[1];
        toggleClass(document.getElementById(snakeBody.start[snakeBody.start.length - 1]));
        let tail = snakeBody.start.pop();
        if (sx == "29") {
            sx = "0";
        } else {
            sx = Number(sx) + 1
        };
        let newBlock = sx + "_" + sy;
        death(newBlock);
        if (newBlock == snakeBody.randomPoint) {
            toggleClass(document.getElementById(tail));
            snakeBody.start.push(tail);
            snakeBody.start.unshift(newBlock);
            snakeBody.randomPoint = newRandom();
            document.getElementById(snakeBody.randomPoint).classList = "black";
        } else {
            toggleClass(document.getElementById(newBlock));
            snakeBody.start.unshift(newBlock);
        }
    }
    //向上邏輯
    else if (snakeBody.dir == 53) {
        let sx = snakeBody.start[0].split("_")[0];
        let sy = snakeBody.start[0].split("_")[1];
        toggleClass(document.getElementById(snakeBody.start[snakeBody.start.length - 1]));
        let tail = snakeBody.start.pop();
        if (sy == "0") {
            sy = "49";
        } else {
            sy = Number(sy) - 1
        };
        let newBlock = sx + "_" + sy;
        death(newBlock);
        if (newBlock == snakeBody.randomPoint) {
            toggleClass(document.getElementById(tail));
            snakeBody.start.push(tail);
            snakeBody.start.unshift(newBlock);
            snakeBody.randomPoint = newRandom();
            document.getElementById(snakeBody.randomPoint).classList = "black";
        } else {
            toggleClass(document.getElementById(newBlock));
            snakeBody.start.unshift(newBlock);
        }
    }
    //向左邏輯
    else if (snakeBody.dir == 49) {
        let sx = snakeBody.start[0].split("_")[0];
        let sy = snakeBody.start[0].split("_")[1];
        toggleClass(document.getElementById(snakeBody.start[snakeBody.start.length - 1]));
        let tail = snakeBody.start.pop();
        if (sx == "0") {
            sx = "29";
        } else {
            sx = Number(sx) - 1
        };
        let newBlock = sx + "_" + sy;
        death(newBlock);
        if (newBlock == snakeBody.randomPoint) {
            toggleClass(document.getElementById(tail));
            snakeBody.start.push(tail);
            snakeBody.start.unshift(newBlock);
            snakeBody.randomPoint = newRandom();
            document.getElementById(snakeBody.randomPoint).classList = "black";
        } else {
            toggleClass(document.getElementById(newBlock));
            snakeBody.start.unshift(newBlock);
        }
    }
    //向下邏輯
    else if (snakeBody.dir == 50) {
        let sx = snakeBody.start[0].split("_")[0];
        let sy = snakeBody.start[0].split("_")[1];
        toggleClass(document.getElementById(snakeBody.start[snakeBody.start.length - 1]));
        let tail = snakeBody.start.pop();
        if (sy == "49") {
            sy = "0";
        } else {
            sy = Number(sy) + 1
        };
        let newBlock = sx + "_" + sy;
        death(newBlock);
        if (newBlock == snakeBody.randomPoint) {
            toggleClass(document.getElementById(tail));
            snakeBody.start.push(tail);
            snakeBody.start.unshift(newBlock);
            snakeBody.randomPoint = newRandom();
            document.getElementById(snakeBody.randomPoint).classList = "black";
        } else {
            toggleClass(document.getElementById(newBlock));
            snakeBody.start.unshift(newBlock);
        }
    }
}








// 撞到身體死亡function 
function death(p) {
    for (let i = 0; i < snakeBody.start.length; i++) {
        if (p == snakeBody.start[i]) {
            clearInterval(h);
        }
    }
}





function toggleClass(e) {
    if (e.classList == "black") {
        e.classList = "";
    } else {
        e.classList = "black";
    }
}
// 移動按鍵監聽
body.addEventListener("keypress", function (e) {
    if (e.keyCode == 51) {
        if (snakeBody.dir == 49) return;
        snakeBody.dir = e.keyCode + "";
    } else if (e.keyCode == 53) {
        if (snakeBody.dir == 50) return;
        snakeBody.dir = e.keyCode + "";
    } else if (e.keyCode == 49) {
        if (snakeBody.dir == 51) return;
        snakeBody.dir = e.keyCode + "";
    } else if (e.keyCode == 50) {
        if (snakeBody.dir == 53) return;
        snakeBody.dir = e.keyCode + "";
    }
}, false)