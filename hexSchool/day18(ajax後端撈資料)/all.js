
document.querySelector(".send").addEventListener("click", sendBtn, true);
function sendBtn() {
    var account = document.querySelector('#account').value;
    var password = document.querySelector('#password').value;
    var myData = {
        email : account,
        password : password
    };
    
    var xhr = new XMLHttpRequest();
    xhr.open('post','https://hexschool-tutorial.herokuapp.com/api/signup',true);
    xhr.setRequestHeader('Content-type','application/json');
    xhr.send(JSON.stringify(myData));
    xhr.onload = function() {
        var result = JSON.parse(xhr.responseText);
        alert(result.message);
        
    }


}