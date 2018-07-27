var data = ["agadf","fdfasdfda","fdsfasfasd","fdasfdasaewr","rewrewfsdafd","afagadagaa","app","apple","aap","a","ap","cloe","sdfodakof","ddewedewwda"];
var smart = [];
var show = "";

function search (value) {
    smart = [];
    show = "";
    var push = 0
    for (var i = 0 ;i < data.length ;i++) {
        var numb = 0 ;
        for (var j = 0 ; j < value.length ; j++) {
            if (value.charAt(j) === data[i].charAt(j)) {
                numb++;
            }
        }
        if (numb === value.length) {
            smart[push] = data[i];
            push++;
        }
    }
    for (var i = 0 ;i < smart.length ; i++) {
        show = show + smart[i] + " , ";
        }

};






window.onload = function () {
    var text = document.getElementById("monkey");
    var massage = document.getElementById("love");
    text.onkeypress = function (e) {
        var infor = text.value;
        if (e.keyCode === 13) {
            search(infor);
            massage.innerHTML = show;
            monkey.value = "";
            return false;
        }
    };
};



