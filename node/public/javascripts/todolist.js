var send = document.querySelector("#send");
var content = document.querySelector("#content");
var list = document.querySelector('#list');

// save點擊新增事件
send.addEventListener('click', (e) => {
    e.preventDefault();
    let str = content.value;
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/toDoList/addList');
    xhr.setRequestHeader('Content-type', "application/json");
    var todo = JSON.stringify({ "content": str });
    xhr.send(todo);
    xhr.onload = () => {
        var originData = JSON.parse(xhr.responseText);
        var data = originData.result;
        var str = '';
        for (item in data) {
            str += '<li>' + data[item].content + '<input type="button" data-id="' + item + '" value="刪除"></li>';
        }
        list.innerHTML = str;
    }
});

//刪除點擊事件
list.addEventListener('click', (e) => {
    if (e.target.nodeName !== 'INPUT') {
        return;
    }
    var id = e.target.dataset.id;
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/toDoList/removeList');
    xhr.setRequestHeader('Content-type', "application/json");
    var todo = JSON.stringify({ 'id': id });
    xhr.send(todo);
    xhr.onload = () => {
        var respon = JSON.parse(xhr.responseText);
        var data = respon.result;
        let str = '';
        for (item in data) {
            str += '<li>' + data[item].content + '<input type="button" data-id="' + item + '" value="刪除"></li>';
        }
        list.innerHTML = str;
    };
});