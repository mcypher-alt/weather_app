"use strict"
const api_key = "61d4df0869ac6b4461a4d39f5b3255c9"
const input = document.querySelector(".inputCity");
const result = document.querySelector('.result');

async function fetchUrlWeather() {
    const cityName = input.value.trim();
    if (!cityName) {
        result.textContent = "🌍 Введите название города!";
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;
        try {
        const response = await fetch(url);
        if(!response.ok) throw new Error("Город не найден!");
        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const city = data.name;

        result.innerHTML = `
            🌍 Город: ${city}<br>
            🌡️ Температура: ${temperature}°C<br>
            🤔 Ощущается как: ${feelsLike}°C<br>
            🌥️ Погода: ${description}<br>
            💧 Влажность: ${humidity}%<br>
            💨 Ветер: ${windSpeed} м/с`;
    } catch {
        result.textContent = "❌ Город не найден!";
    }
}


input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        result.innerHTML = "...Загрузка"
        fetchUrlWeather();
    }
});