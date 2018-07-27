
var memo = [];
if (localStorage.memo !== undefined){
    memo = JSON.parse(localStorage.memo);
}
var btnName = document.querySelector('.btnName');
var keyName = document.querySelector('.keyName');
var list = document.querySelector('.list');
showMemo();

// 點擊按鈕新增選項
btnName.addEventListener('click',function(){
    memo.push(keyName.value);
    localStorage.setItem('memo',JSON.stringify(memo));
    showMemo();
});

function showMemo () {
    var str = '';
    for (var i = 0;i < memo.length;i++){
        str += '<li data-num="' + i + '">' + memo[i] + '</li>' ;
    }
    list.innerHTML = str ;
}

// 點擊ＬＩ讓ＬＩ消失  
list.addEventListener('click',function(e){

    if (e.target.nodeName == "LI") {
        memo.splice(e.target.dataset.num,'1')
        localStorage.setItem('memo',JSON.stringify(memo));
        showMemo();
    }
});