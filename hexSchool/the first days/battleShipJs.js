var view = {
    displayMessage : function (msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        var cell = document.getElementById (location);
        cell.setAttribute ("class","hit");
    },
    displayMiss: function(location) {
        var cell = document.getElementById (location);
        cell.setAttribute ("class","miss");
    }
};
var model={
    repeat:[],
    boardSize:7,
    numShips:3,
    shipLength:3,
    shipsSunk:0,
    ships : [
    { locations : [],hits : ["","",""]},
    { locations : [],hits : ["","",""]},
    { locations : [],hits : ["","",""]}],

    fire: function(guess) {
        for (var i = 0;i< this.numShips ;i++){
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)){
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;
    },
    isSunk : function(ship) {
        for (var i = 0;i< this.shipLength;i++){
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },
    generateShipLocations : function () {
        var locations;
        for (var i = 0;i < this.numShips ; i++){
            do {
                locations = this.generateShip();
            }while (this.collision(locations));
            this.ships[i].locations = locations ;
        }
    },
    generateShip : function () {
        var direction = Math.floor(Math.random() * 2) ;
        var row , col;
        
        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else {
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }
        var newShipLocations = [];
        for (var i = 0 ; i < this.shipLength ; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },
    collision : function (locations) {
        for (var i = 0; i < this.numShips ; i++) {
            var ship = model.ships[i];
            for (var j = 0; j < locations.length ; j++) {
                if (ship.locations.indexOf(locations[j]) >=0) {
                    return true;
                }
            }
        }
        return false;
    },

};
function parseGuess (guess) {
    if (guess === null || guess.length !== 2) {
        alert("oops, please enter two number on the board.");
    } else {
        var one = guess.charAt(0);
        var two = guess.charAt(1);
        if ( isNaN(guess)){
            alert("oops,that isn't on the board.");
        }else if (one < 0 || one >= model.boardSize || two < 0 || two >=model.boardSize ){
            alert ("oops, that's off the board!");
        } else {
            return guess;
        }
    }
    return null;
};
var controller = {
    guesses : 0 ,
    processGuess : function (guess) {
        var location = parseGuess (guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my ships, in " + this.guesses + " guesses.");
            }
        }
    }
};

function init (){
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton ;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    model.generateShipLocations();
    var fireItem = document.getElementsByTagName("td");
    for (var i = 0;i < fireItem.length; i++) {
    fireItem[i].onclick = handleItem;
    }
};

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}
function handleItem () {
    model.repeat.push(this.id);
    controller.processGuess(this.id);
}

function handleFireButton () {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    if (model.repeat.indexOf(guess)>=0) {
        alert ("你的數字重複了喔!");
        return false;
    }
    model.repeat.push(guess);
    controller.processGuess(guess);
    guessInput.value = "";
};
window.onload = init;