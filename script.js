/* =========================================================
   НОВЫЙ ГОД 2027 — СТЕРЛИТАМАК
========================================================= */


/* =========================================================
   COUNTDOWN
========================================================= */

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const messageElement = document.getElementById("newYearMessage");


function updateCountdown() {

    /*
        Стерлитамак находится в часовом поясе UTC+5.

        Новый год наступает:
        1 января 2027 года в 00:00:00
        по местному времени.
    */

    const targetDate = new Date(
        "2027-01-01T00:00:00+05:00"
    );

    const now = new Date();

    const difference =
        targetDate.getTime() - now.getTime();


    if (difference <= 0) {

        daysElement.textContent = "000";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        messageElement.textContent =
            "🎉 С Новым 2027 годом!";

        messageElement.classList.add("visible");

        return;
    }


    const totalSeconds =
        Math.floor(difference / 1000);


    const days =
        Math.floor(totalSeconds / 86400);


    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    daysElement.textContent =
        String(days).padStart(3, "0");


    hoursElement.textContent =
        String(hours).padStart(2, "0");


    minutesElement.textContent =
        String(minutes).padStart(2, "0");


    secondsElement.textContent =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   SNOW
========================================================= */

const snowContainer =
    document.getElementById("snow");


const snowSymbols = [
    "❄",
    "❅",
    "❆",
    "•"
];


function createSnowflake() {

    const snowflake =
        document.createElement("div");

    snowflake.className =
        "snowflake";


    snowflake.textContent =
        snowSymbols[
            Math.floor(
                Math.random() *
                snowSymbols.length
            )
        ];


    const size =
        Math.random() * 12 + 7;


    const left =
        Math.random() * 100;


    const duration =
        Math.random() * 12 + 8;


    const delay =
        Math.random() * -20;


    const opacity =
        Math.random() * 0.65 + 0.25;


    snowflake.style.left =
        left + "%";


    snowflake.style.fontSize =
        size + "px";


    snowflake.style.opacity =
        opacity;


    snowflake.style.animationDuration =
        duration + "s";


    snowflake.style.animationDelay =
        delay + "s";


    snowContainer.appendChild(
        snowflake
    );
}


for (let i = 0; i < 100; i++) {
    createSnowflake();
}


/* =========================================================
   WEATHER
   Open-Meteo — без API-ключа
========================================================= */

const temperatureElement =
    document.getElementById("temperature");

const weatherDescriptionElement =
    document.getElementById(
        "weatherDescription"
    );

const weatherIconElement =
    document.getElementById(
        "weatherIcon"
    );

const weatherUpdateElement =
    document.getElementById(
        "weatherUpdate"
    );


/*
    Координаты Стерлитамака:

    latitude: 53.6246
    longitude: 55.9502
*/

const LATITUDE = 53.6246;
const LONGITUDE = 55.9502;


function getWeatherDescription(code) {

    const weatherCodes = {

        0: {
            text: "Ясно",
            icon: "☀️"
        },

        1: {
            text: "Преимущественно ясно",
            icon: "🌤️"
        },

        2: {
            text: "Переменная облачность",
            icon: "⛅"
        },

        3: {
            text: "Пасмурно",
            icon: "☁️"
        },

        45: {
            text: "Туман",
            icon: "🌫️"
        },

        48: {
            text: "Изморозь и туман",
            icon: "🌫️"
        },

        51: {
            text: "Лёгкая морось",
            icon: "🌦️"
        },

        53: {
            text: "Морось",
            icon: "🌦️"
        },

        55: {
            text: "Сильная морось",
            icon: "🌧️"
        },

        61: {
            text: "Небольшой дождь",
            icon: "🌦️"
        },

        63: {
            text: "Дождь",
            icon: "🌧️"
        },

        65: {
            text: "Сильный дождь",
            icon: "🌧️"
        },

        71: {
            text: "Небольшой снег",
            icon: "🌨️"
        },

        73: {
            text: "Снег",
            icon: "❄️"
        },

        75: {
            text: "Сильный снег",
            icon: "❄️"
        },

        77: {
            text: "Снежные зёрна",
            icon: "❄️"
        },

        80: {
            text: "Ливневый дождь",
            icon: "🌧️"
        },

        81: {
            text: "Сильный ливень",
            icon: "🌧️"
        },

        82: {
            text: "Очень сильный ливень",
            icon: "⛈️"
        },

        85: {
            text: "Снегопад",
            icon: "🌨️"
        },

        86: {
            text: "Сильный снегопад",
            icon: "❄️"
        },

        95: {
            text: "Гроза",
            icon: "⛈️"
        },

        96: {
            text: "Гроза с градом",
            icon: "⛈️"
        },

        99: {
            text: "Сильная гроза",
            icon: "⛈️"
        }

    };


    return (
        weatherCodes[code] || {
            text: "Неизвестная погода",
            icon: "🌡️"
        }
    );
}


async function loadWeather() {

    const url =
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude=" + LATITUDE +
        "&longitude=" + LONGITUDE +
        "&current=temperature_2m,weather_code" +
        "&timezone=Asia%2FYekaterinburg";


    try {

        const response =
            await fetch(url);


        if (!response.ok) {
            throw new Error(
                "Ошибка загрузки погоды"
            );
        }


        const data =
            await response.json();


        const temperature =
            Math.round(
                data.current.temperature_2m
            );


        const code =
            data.current.weather_code;


        const weather =
            getWeatherDescription(code);


        temperatureElement.textContent =
            temperature + "°";


        weatherDescriptionElement.textContent =
            weather.text;


        weatherIconElement.textContent =
            weather.icon;


        weatherUpdateElement.textContent =
            "Обновлено: " +
            new Date().toLocaleTimeString(
                "ru-RU",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


    } catch (error) {

        console.error(
            "Weather error:",
            error
        );


        temperatureElement.textContent =
            "--°";


        weatherDescriptionElement.textContent =
            "Не удалось загрузить погоду";


        weatherIconElement.textContent =
            "🌡️";


        weatherUpdateElement.textContent =
            "Проверьте подключение к интернету";
    }
}


loadWeather();


/*
    Обновляем погоду каждые 10 минут.
*/

setInterval(
    loadWeather,
    10 * 60 * 1000
);


/* =========================================================
   ПАРА МЕЛКИХ АНИМАЦИЙ
========================================================= */

const cards =
    document.querySelectorAll(
        ".time-card"
    );


cards.forEach((card) => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.style.transition =
                "transform 0.2s ease";

        }
    );

});


/* =========================================================
   КОНСОЛЬ
========================================================= */

console.log(
    "🎄 Новый год 2027 — Стерлитамак"
);

console.log(
    "❄️ Сайт успешно загружен!"
);
