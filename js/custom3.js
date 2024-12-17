let temp = document.querySelector("#temp"),
    place = document.querySelector("#place"),
    wind = document.querySelector("#wind"),
    des = document.querySelector("#des"),
    iconBox = document.querySelector("#icon"),
    loc = document.querySelector("#loc"),
    loc2 = document.querySelector("#loc2"),
    locat = document.querySelector(".locat"),
    seoul = document.querySelector(".seoul"),
    tokyo = document.querySelector(".tokyo"),
    london = document.querySelector(".london"),
    paris = document.querySelector(".paris");

let cityname = "seoul";
const API_key = config.apikey;
let statecode = "";
let countrycode = "seoul";
let limit = "";

seoul.addEventListener("click", function () {
    cityname = "seoul";
    // console.log("서울");
    getweather();
    loc.innerHTML = ``;
});
tokyo.addEventListener("click", function () {
    cityname = "tokyo";
    getweather();
    loc.innerHTML = ``;
});
london.addEventListener("click", function () {
    cityname = "london";
    getweather();
    loc.innerHTML = ``;
});
paris.addEventListener("click", function () {
    cityname = "paris";
    getweather();
    loc.innerHTML = ``;
});

locat.addEventListener("click", function () {
    getlot();
});

const getlot = async () => {
    let response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${statecode},${countrycode}&limit=${limit}&appid=${API_key}`
    );
    let data2 = await response.json();
    console.log(data2);
    loc.innerHTML = `<span>현재위치</span>
    <p id="loc1">위도: ${data2[0].lat}</p>
    <p id="loc2">경도: ${data2[0].lon}</p>`;
};
const getweather = async () => {
    let response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_key}&lang=kr&units=metric`
    );
    let data = await response.json();
    console.log(data);

    temp.textContent = data.main.temp;
    place.textContent = cityname;
    wind.textContent = data.wind.speed;
    des.textContent = data.weather[0].description;

    //아이콘
    icon = data.weather[0].icon;
    // console.log(icon);
    iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    // console.log(iconUrl);
    iconBox.setAttribute("src", iconUrl);

    //내가 원하는 이미지 넣기
    // let sun;
    // if (icon == "01d") {
    //     sun = "img/sunny.png";
    // } else if (icon == "02d") {
    //     sun = "img/suncliud.png";
    // } else {
    //     sun = "https://cdn-icons-png.flaticon.com/512/1164/1164944.png";
    // }
    // imgWrap.src = sun;
};
function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        log = position.coords.longitude;
        console.log("위도", lat);
        console.log("경도", log);
    });
}
getweather();
