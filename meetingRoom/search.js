var year = document.querySelector('#year');
var moon = document.querySelector('#moon');
var day = document.querySelector('#day');
var roomNum = document.querySelector('#roomNum');
var sendBtn = document.querySelector('#send');
var message = document.querySelector('#message');
var searchList = document.querySelector('.searchList');
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
        if (dateObj == null) {
            message.innerHTML = "查無資料"
        } else {
            let count = 0;
            var str = ""
            for (i in dateObj) {
                var time = numToDate(dateObj[i].minTime) + "~" + numToDate(dateObj[i].maxTime);
                str += '<li class="text-secondary"><p class="p-2 color1"><i class="fas fa-clock"></i> ' + time + ' <i class="fas fa-user"></i> ' + dateObj[i].userName + '</p><p class="p-4">' + dateObj[i].reason + '<button data-id="' + i + '" type="button" class="btn btn-danger btn-sm">刪除</button></p></li>'
                count++;
            }
            message.innerHTML = "日期： 20" + year.value + "年" + moon.value + "月" + day.value + "日<br>會議室： " + roomNum.value + "<br>搜尋到 " + count + " 筆預約資料";
            searchList.innerHTML = str;
        }
    });

});


//數字轉換成時間字串
function numToDate(num) {
    let hNum = Math.floor(num / 2);
    let hStr = hNum + ":";
    let str = num / 2 + "";
    if (str.indexOf(".") == -1) {
        hStr = hStr + "00";
    } else {
        hStr = hStr + "30";
    }
    return hStr;
};

//remove 邏輯

searchList.addEventListener('click', (e) => {
    if (e.target.localName == "button") {
        let password = prompt("請輸入刪除密碼","");
        if(password !== "1234567"){
            alert("密碼錯誤");
            return false;
        }

        let dateRef = 'meetingRoom/' + year.value + moon.value + day.value + '/' + roomNum.value;
        database.ref(dateRef).child(e.target.dataset.id).remove()
            .then(function () {
                database.ref(dateRef).once('value', (snapshot) => {
                    let dateObj = snapshot.val();
                    let count = 0;
                    var str = ""
                    for (i in dateObj) {
                        var time = numToDate(dateObj[i].minTime) + "~" + numToDate(dateObj[i].maxTime);
                        str += '<li class="text-secondary"><p class="p-2 color1"><i class="fas fa-clock"></i> ' + time + ' <i class="fas fa-user"></i> ' + dateObj[i].userName + '</p><p class="p-4">' + dateObj[i].reason + '<button data-id="' + i + '" type="button" class="btn btn-danger btn-sm">刪除</button></p></li>'
                        count++;
                    }
                    message.innerHTML = "日期： 20" + year.value + "年" + moon.value + "月" + day.value + "日<br>會議室： " + roomNum.value + "<br>搜尋到 " + count + " 筆預約資料";
                    searchList.innerHTML = str;
                })
            });
    }
});