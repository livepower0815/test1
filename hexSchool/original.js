var canv = document.querySelector("#canvas");
var c = canv.getContext('2d');
c.beginPath();
c.moveTo(100,100);
c.lineTo(200,200);
c.lineTo(0,200);
c.fillStyle = "green"
c.fill();
c.closePath();
c.stroke();

// navigator.geolocation.getCurrentPosition(function(pos){
//     let latitude = pos.coords.latitude;
//     let longitude = pos.coords.longitude;
//     alert("Your postion: "+latitude+", "+longitude);
    
// })

