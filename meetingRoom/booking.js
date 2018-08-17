var year = document.querySelector('#year');
var moon = document.querySelector('#moon');
var day = document.querySelector('#day');
var roomNum = document.querySelector('#roomNum');
var timeSTR_H = document.querySelector('#timeSTR_H');
var timeSTR_M = document.querySelector('#timeSTR_M');
var timeEND_H = document.querySelector('#timeEND_H');
var timeEND_M = document.querySelector('#timeEND_M');
var userName = document.querySelector('#userName');
var reason = document.querySelector('#reason');
var sendBtn = document.querySelector('#send');
var passwd = document.querySelector('#passwd');
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
    let startNum = (timeSTR_H.value * 2) + (timeSTR_M.value * 1);
    let endNum = (timeEND_H.value * 2) + (timeEND_M.value * 1);
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
    } else if (timeSTR_H.value == 'Choose...') {
        alert("請確實選擇每個選項");
        return false;
    } else if (timeSTR_M.value == 'Choose...') {
        alert("請確實選擇每個選項");
        return false;
    } else if (timeEND_H.value == 'Choose...') {
        alert("請確實選擇每個選項");
        return false;
    } else if (timeEND_M.value == 'Choose...') {
        alert("請確實選擇每個選項");
        return false;
    } else if (userName.value == "") {
        alert("請確實填寫使用者名稱");
        return false;
    } else if (startNum >= endNum) {
        alert("起始時間不能超過結束時間");
        return false;
    }else if (passwd.value !== "0830") {
        alert("認證碼錯誤,請輸入正確的認證碼");
        return false;
    }

    let dateRef = 'meetingRoom/' + year.value + moon.value + day.value + '/' + roomNum.value;
    database.ref(dateRef).once('value', (snapshot) => {
        dateObj = snapshot.val();
        if (dateObj == null) {
            let obj = {
                "minTime": startNum,
                "maxTime": endNum,
                "userName": userName.value,
                "reason": reason.value
            };
            database.ref(dateRef).push().set(obj);
            return alert('已成功預約');
        } 
        else {
            for (item in dateObj){
                for(let i = (dateObj[item].minTime *1 + 1);i<dateObj[item].maxTime;i++){
                    for(let ii = startNum;ii <endNum;ii++){
                        if(ii == i){
                            alert("該時段已被預約,請再選擇其他時段");
                            return false;
                        }
                    }
                }
            }
            let obj = {
                "minTime": startNum,
                "maxTime": endNum,
                "userName": userName.value,
                "reason": reason.value
            };
            database.ref(dateRef).push().set(obj);
            return alert('已成功預約');
        }
    });

});

