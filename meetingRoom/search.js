var year = document.querySelector('#year');
var moon = document.querySelector('#moon');
var day = document.querySelector('#day');
var roomNum = document.querySelector('#roomNum');
var sendBtn = document.querySelector('#send');
var message = document.querySelector('#message');
var config = {
    apiKey: "AIzaSyA51URP4GCaISanXYdhDolbTyWihmsdrcY",
    authDomain: "project-0815.firebaseapp.com",
    databaseURL: "https://project-0815.firebaseio.com",
    projectId: "project-0815",
    storageBucket: "project-0815.appspot.com",
    messagingSenderId: "982301188795"
};
firebase.initializeApp(config);
var database = firebase.database();


sendBtn.addEventListener('click', (e) => {
    if (year.value == 'Choose...') {
        alert("請確實選擇每個選項");
        return false;
    } else if (moon.value == 'Choose...') {
        alert("請確實選擇每個選項");
        return false;
    } else if (day.value == 'Choose...') {
        alert("請確實選擇每個選項");
        return false;
    } else if (roomNum.value == 'Choose...') {
        alert("請確實選擇每個選項");
        return false;
    }
    let dateRef = 'meetingRoom/' + year.value + moon.value + day.value + '/' + roomNum.value;
    database.ref(dateRef).once('value', (snapshot) => {
        let dateObj = snapshot.val()
        if(dateObj == null){
            message.innerHTML = "查無資料"
        }else{
            let count = 0;
            let str = ""
            for(i in dateObj){
                
                count++;
            }
            message.innerHTML = "日期： 20" + year.value + "年" + moon.value + "月" + day.value + "日<br>會議室： " + roomNum.value + "<br>搜尋到 " + count + " 筆預約資料";
        
        }
    });

});

