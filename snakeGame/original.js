alert("點擊改變方向 \n或按鍵 A,S,D,W \n     ....宏宇留")
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
    dir: 100,
    time: 120,
    randomPoint:"",
};

//init data
function resetGame(){
    for (let y = 0; y < snake.childElementCount;y++){
        for(let x = 0;x< snake.children[y].childElementCount; x++){
            const id = y + "_" + x;
            let element = snake.children[y].children[x];         
            if(element.className == 'black'){
                element.className = "";
            }
        }
    }
    snakeBody.start = ["5_0", "4_0", "3_0", "2_0", "1_0", "0_0"];
    snakeBody.dir = 100;
    snakeBody.randomPoint = newRandom();
    for (let i = 0; i < snakeBody.start.length; i++) {
        toggleClass(document.getElementById(snakeBody.start[i]));
    }
}

resetGame();

//隨機產點function
function newRandom() {
    let newPoint = Math.floor(Math.random() * 30) + "_" + Math.floor(Math.random() * 50);
    for (let i = 0; i < snakeBody.start.length; i++) {
        if (snakeBody.start[i] == newPoint) newRandom();
    }
    toggleClass(document.getElementById(newPoint));
    return newPoint;
}


// 移動邏輯
var h = setInterval(move, snakeBody.time)

function move() {
    // 往右邏輯
    if (snakeBody.dir == 100) {
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
        } else {
            toggleClass(document.getElementById(newBlock));
            snakeBody.start.unshift(newBlock);
        }
    }
    //向上邏輯
    else if (snakeBody.dir == 119) {
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
        } else {
            toggleClass(document.getElementById(newBlock));
            snakeBody.start.unshift(newBlock);
        }
    }
    //向左邏輯
    else if (snakeBody.dir == 97) {
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
        } else {
            toggleClass(document.getElementById(newBlock));
            snakeBody.start.unshift(newBlock);
        }
    }
    //向下邏輯
    else if (snakeBody.dir == 115) {
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
            alert('撞到尾巴嘍！');
            setTimeout(() => {
                alert('按下確定重新開始');
                resetGame();
                h = setInterval(move, snakeBody.time);
            }, 1000);
        }
    }
}




//轉換class
function toggleClass(e) {
    if (e.classList == "black") {
        e.classList = "";
    } else {
        e.classList = "black";
    }
}
// 移動按鍵監聽
body.addEventListener("keypress", function (e) {
    if (e.keyCode == 100) {
        if (snakeBody.dir == 97) return;
        snakeBody.dir = e.keyCode + "";
    } else if (e.keyCode == 119) {
        if (snakeBody.dir == 115) return;
        snakeBody.dir = e.keyCode + "";
    } else if (e.keyCode == 97) {
        if (snakeBody.dir == 100) return;
        snakeBody.dir = e.keyCode + "";
    } else if (e.keyCode == 115) {
        if (snakeBody.dir == 119) return;
        snakeBody.dir = e.keyCode + "";
    }
}, false)

//計算元素於視窗位址
function countClientXY(e){
    let x = 0,y=0;
    while(e.offsetParent != null) {
        x += e.offsetLeft;
        y += e.offsetTop;
        e = e.offsetParent;
    }
    return {x,y}
}



body.addEventListener('click', function (e) {
    let sx = countClientXY(document.getElementById(snakeBody.start[0])).x + 6;
    let sy = countClientXY(document.getElementById(snakeBody.start[0])).y + 6;
    let tx = e.clientX;
    let ty = e.clientY;
    
    if (snakeBody.dir == 97 ||snakeBody.dir ==100) {
        if(sy>ty){
            snakeBody.dir = 119;
        }else if(sy<ty){
            snakeBody.dir = 115;
        }
    }else if (snakeBody.dir == 115 ||snakeBody.dir ==119) {
        if(sx>tx){
            snakeBody.dir = 97;
        }else if(sx<tx){
            snakeBody.dir = 100;
        }
    }
}, false)