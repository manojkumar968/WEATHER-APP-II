var key = 0;

var form = document.querySelector('#form')
form.addEventListener('submit', subfun)
function subfun() {
    event.preventDefault();
    var city = document.querySelector('#inp').value
    var gmap_canvas = document.querySelector('#gmap_canvas')
    //                                                          map url
    gmap_canvas.src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`

//                                                               weather data url
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=439d7e7d98e4deb5a95d557a8d79d02e`
    fetch(url).then(function (res) {
        return res.json()
    }).then(function (res) {
        printdata(res, key)
        printlowerdiv(res)
        // console.log(Object.values(res.list[0].dt_txt).join('').split(' ')[1])
    })
        .catch(function (err) {
            console.log(err)
        })
}

var weekday = ['Sun', 'Mon', 'Tue', 'Wes', 'Thu', 'Fri', 'Sat']
var d = new Date()
let Today = d.getDay()

function printdata(res, i) {
    // console.log(res)
    //                               data fetch form res
    let cityname = res.city.name;
    let iconU = res.list[i].weather[0].icon
    let uperTem = Math.ceil(Number(res.list[i].main.temp_max) - 273)
    let degC = '°C';
    let lowerTem = Math.ceil(Number(res.list[i].main.temp_min) - 273) + '°'
    let Wind = Math.ceil(Number(res.list[i].wind.speed)) + ' KMPH'
    let Humidity = res.list[i].main.humidity + '%'
    let weatherCon = res.list[i].weather[0].description
    let currentWeekD = weekday[Today]
    let currentDate = Object.values(res.list[i].dt_txt).join('').split(' ')[0].split('-')[2]
    // console.log( typeof currentDate)
    // console.log(currentDate)

    //                                                page upper left div design


    var hcityN = document.querySelector('#hcityN')
    hcityN.innerText = cityname;

    var iUImg = document.querySelector('#iUImg')
    iUImg.src = 'http://openweathermap.org/img/wn/' + iconU + '@2x.png';

    var degVH4 = document.querySelector('#degVH4')
    degVH4.innerText = uperTem;

    var degSP = document.querySelector('#degSP')
    degSP.innerText = degC;

    var degULP = document.querySelector('#degULP')
    degULP.innerText = uperTem + '°';

    var degLP = document.querySelector('#degLP')
    degLP.innerText = lowerTem;

    var WP = document.querySelector('#WP')
    WP.innerText = 'Wind: ' + Wind;

    var DP = document.querySelector('#DP')
    DP.innerText = 'Humidity: ' + Humidity;

    var weatCP = document.querySelector('#weatCP')
    weatCP.innerText = weatherCon;

    var dayUP = document.querySelector('#dayUP')
    dayUP.innerText = currentWeekD + ' ' + currentDate;

}


var d = new Date()
let day = d.getDay()
// console.log(day)  


//                                                             lower 5 box



function printlowerdiv(res) {
    var zeroindextime = Object.values(res.list[0].dt_txt).join('').split(' ')[1]

    var lowCont = document.querySelector('#lowCont')
    lowCont.innerHTML = null;
    // console.log('zeroindextime',zeroindextime)
    // console.log('printlower')
    for (let x = 0; x < 40; x++) {

        if (Object.values(res.list[x].dt_txt).join('').split(' ')[1] == zeroindextime) {
            // console.log('abc', x)

            //                                                           fetch data res
            let iconU = res.list[x].weather[0].icon
            let uperTem = Math.ceil(Number(res.list[x].main.temp_max) - 273)
            let degC = '°C';
            let lowerTem = Math.ceil(Number(res.list[x].main.temp_min) - 273) + '°'
            let Wind = Math.ceil(Number(res.list[x].wind.speed)) + ' KMPH'
            let Humidity = res.list[x].main.humidity + '%'
            let weatherCon = res.list[x].weather[0].description
            let currentWeekD = weekday[Today]
            let currentDate = Object.values(res.list[x].dt_txt).join('').split(' ')[0].split('-')[2]



            //                                                                   apply fetch data for lower 5 box
            var lowCont = document.querySelector('#lowCont')
            // lowCont.innerHTML = null;
            // console.log(lowCont)
            var onedaydiv = document.createElement('div')
            onedaydiv.setAttribute('class', 'onedaydiv')
            onedaydiv.addEventListener('click', function () {
                changeuperdata(res, x)
            })
            lowCont.append(onedaydiv)

            var divforday = document.createElement('div')
            // console.log( divforday)
            onedaydiv.append(divforday)
            var pforday = document.createElement('p')
            pforday.innerText = weekday[Today] + ' ' + currentDate;
            divforday.append(pforday)

            var divforicon = document.createElement('div')
            onedaydiv.append(divforicon)
            var imgforicon = document.createElement('img')
            imgforicon.src = 'http://openweathermap.org/img/wn/' + iconU + '@2x.png';
            divforicon.append(imgforicon)

            var divforupertemp = document.createElement('div')
            onedaydiv.append(divforupertemp)
            var pforuppertemp = document.createElement('p')
            pforuppertemp.innerText = uperTem + '°'
            divforupertemp.append(pforuppertemp)

            var divforlowertemp = document.createElement('div')
            onedaydiv.append(divforlowertemp)
            var pforlowertemp = document.createElement('p')
            pforlowertemp.innerText = lowerTem
            divforlowertemp.append(pforlowertemp)



        }


    }
}

function changeuperdata(res, x) {
    printdata(res, x)
}