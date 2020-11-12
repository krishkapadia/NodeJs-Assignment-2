console.log("Digital Clock");
function displayClock() {
    var time = new Date();
    var hr = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    var tmp ="AM";
    if(hr>12){
        tmp = "PM";
    }
    if(hr>12){
        hr = hr - 12;
    }
    if(hr == 0){
        hr = 12;
    }
    console.clear();
    console.log(hr,":",min,":",sec,tmp);
}
setInterval(() => {
    displayClock();  
}, 1000);
