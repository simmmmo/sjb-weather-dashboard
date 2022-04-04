# WEEK 6 Assignment - Weather Dashboard
In this weeks task we were required to build a weather dashboard that uses the openweathermap api to acquire weather data for the current day as well as the five day forecast. 

User is presented with a search feature to call the the current weather data and forecast of their desired city. The data is is presented in a clean user-friendly UI, the users previous searches are saved as buttons so they can easily call back the cities data. 

## APIs  
Query city by name and retreive longitude and latitude to use to call the OneCall API's data
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

Exclude parameter was used to reduce the data called. 
https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}&units=metric

## Project Links

* Repo name

sjb-weather-dashboard

* Live site

https://simmmmo.github.io/sjb-weather-dashboard/

* GitHub enviroment

https://github.com/simmmmo/sjb-weather-dashboard.git

git@github.com:simmmmo/sjb-weather-dashboard.git

* Screenshots

![Search Result - Ciro](/assets/screenshots/Weather%20Dashboard%20-%20Ciro.png)

![Search Result - Sydney](/assets/screenshots/Weather%20Dashboard%20-%20Sydney.png)

![Refresh page - results saved](/assets/screenshots/Weather%20Dashboard%20-%20saved%20elements.png)