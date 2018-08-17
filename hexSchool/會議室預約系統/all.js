
var weight = document.querySelector('#weight');
var height = document.querySelector('#height');
var countBtn = document.querySelector('#countBtn');
var ulList = document.querySelector('.list');


countBtn.addEventListener("click",function(){
    var bmiNum = weight.value / ((height.value/100) * (height.value/100));
    var el = document.createElement("li");
    var aLink = document.createElement('a');
    aLink.setAttribute('href',"#");
    aLink.textContent = "刪除";
    var bmiStandard;
    if (bmiNum < 18.5) {
        bmiStandard = ["color0","體重過輕"];
    }else if (bmiNum >= 18.5 && bmiNum < 24){
        bmiStandard = ["color1","正常範圍"];
    }else if (bmiNum >= 24 && bmiNum < 27){
        bmiStandard = ["color2","過重"];
    }else if (bmiNum >= 27 && bmiNum < 30){
        bmiStandard = ["color3","輕度肥胖"];
    }else if (bmiNum >= 30 && bmiNum < 35){
        bmiStandard = ["color4","中度肥胖"];
    }else {
        bmiStandard = ["color5","重度肥胖"];
    }
    el.textContent = "體重:"+ weight.value +" 身高:"+ height.value +",你的BMI值是 : " + bmiNum.toFixed(2) + " 屬於 " + bmiStandard[1];
    el.setAttribute('class',bmiStandard[0]);
    el.appendChild(aLink);
    ulList.appendChild(el);
});

//  點擊刪除LI元件
ulList.addEventListener('click',function(e){
    // console.log(e.target.parentElement);
    
    if(e.target.nodeName == "A"){
        e.preventDefault();
        e.target.parentElement.style.display = "none";
    }
});