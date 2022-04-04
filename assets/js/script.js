

var userFormEl = document.querySelector('#user-form');
var cityButtonsEl = document.querySelector('#city-buttons');
var cityInputEl = document.querySelector('#username');
// var forcastContainerEl = document.querySelector('#forcast-results');
var repoSearchTerm = document.querySelector('#repo-search-term');
var repoSearchTemp = document.querySelector('#repo-search-temp');
var repoSearchWind = document.querySelector('#repo-search-wind');
var repoSearchHumidity = document.querySelector('#repo-search-humidity');
var repoSearchIcon = document.querySelector('#repo-search-icon');
var resultsWeather = document.querySelector('#card-weather');


var rightNow = moment().format('DD/MM/YYYY');  
var currentListEl = document.createElement('ul');
currentListEl.classList = 'current-list';

var APIKey = "aa82d8e67049c580a964573e4eb0645c";

var saveListEl = {};

var cityStoredList = [];
// function init() {
//   // Get stored todos from localStorage
//   var storedHighScores = JSON.parse(localStorage.getItem("todos"));

//   // If todos were retrieved from localStorage, update the todos array to it
//   if (storedHighScores !== null) {
//     highScores = storedHighScores;
//   }

//   // This is a helper function that will render todos to the DOM
//   renderTodos();
// }


function storeCity (saveName) {
  
  cityStoredList = JSON.parse(localStorage.getItem("cityList"));
  cityStoredList.push(saveName);
  localStorage.setItem("cityList", JSON.stringify(cityStoredList));
};

function renderStoredcity () {

  cityButtonsEl.innerHTML = "";

 console.log(cityStoredList);
 for (var i = 0; i < cityStoredList.length; i++) {
   var cityBtnName = cityStoredList[i];
   var addBtn = document.createElement('button');
   addBtn.textContent = cityBtnName;
   addBtn.setAttribute("class", "btn");
   addBtn.setAttribute("data-language", cityBtnName);
   cityButtonsEl.prepend(addBtn);
   console.log(addBtn)
 }
}


function init() {
  
  // cityStoredList = JSON.parse(localStorage.getItem("cityList"));

  if (JSON.parse(localStorage.getItem("cityList")) !== null) {
    cityStoredList = JSON.parse(localStorage.getItem("cityList"));
  } else {
    localStorage.setItem("cityList", JSON.stringify([]));
  }
  renderStoredcity ()
}


init()



// function renderLastGrade() {
//   // Use JSON.parse() to convert text to JavaScript object
//   var lastGrade = JSON.parse(localStorage.getItem("studentGrade"));
//   // Check if data is returned, if not exit out of the function
//   if (lastGrade !== null) {
//   document.getElementById("saved-name").innerHTML = lastGrade.student;
//   document.getElementById("saved-grade").innerHTML = lastGrade.grade;
//   document.getElementById("saved-comment").innerHTML = lastGrade.comment;
//   } else {
//     return;
//   }
// }

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityNameEl = cityInputEl.value.trim();

  if (cityNameEl) {
    // localStorage.setItem("Cty name", cityName);
    
    getUserRepos(cityNameEl);
    
    resultsWeather.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a city');
  }
};


var buttonClickHandler = function (event) {
  var getCity = event.target.getAttribute('data-language');

  if (getCity) {
    getUserRepos(getCity);
    resultsWeather.textContent = '';
  }
};



var getUserRepos = function (city) {

  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=metric";

  fetch(queryURL)
    .then(function (response) {
      response.json().then(function (data) {
        
        var cityName = data.name;
        var icon = data.weather[0].icon;
        var currentTemp = data.main.temp;
        var windSpeed = data.wind.speed;
        var currentHum = data.main.humidity;
        var currentLong = data.coord.lon;
        var currentLat = data.coord.lat;

        var currentEl = document.createElement('div');
        currentEl.classList = 'current-container';
        currentEl.innerHTML = 
          `<h2>${cityName} ${rightNow}<img src="http://openweathermap.org/img/w/${icon}.png"></h2> `
        resultsWeather.append(currentEl);

        currentListEl.innerHTML = 
          `<li>Temp: ${currentTemp} °C</li>
          <li>Wind: ${windSpeed} KPH</li>
          <li>Humidity: ${currentHum} %</li>  `
      
        currentEl.append(currentListEl);
        renderData(currentLong, currentLat);
        storeCity (cityName);
        createBtn (cityName);
      })
    });

  var renderData = function (long, lat) {
    var queryForcastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + long +"&exclude=minutely,hourly,alerts&appid=" + APIKey + "&units=metric";

    fetch(queryForcastURL)
    .then(function (response) {
      response.json().then(function (forecastData) {
        var currentUv = forecastData.current.uvi;
        

        var uvTitleEl = document.createElement('li');
        uvTitleEl.textContent = 'UV Index: ';
        var uvEl = document.createElement('span');
        uvEl.textContent = currentUv;
        var uvRate = Math.round(currentUv);

        if (uvRate >= 0 && uvRate <= 2) {
          uvEl.classList = 'uv-low';
        } else if (uvRate >= 3 && uvRate <= 5) {
          uvEl.classList = 'uv-mod';
        } else if (uvRate >= 6 && uvRate <= 7) {
          uvEl.classList = 'uv-high';
        } else {
          uvEl.classList = 'uv-very';
        } 

        uvTitleEl.appendChild(uvEl);
        currentListEl.appendChild(uvTitleEl);
        
        displayForcast(forecastData.daily)
      })
    });
  }
};


var displayForcast = function (repos) {
  
  var forcastTitleEl = document.createElement('div');
  forcastTitleEl.classList = 'forcast-title';
  forcastTitleEl.innerHTML =  
    `<h3>5-Day Forecast: </h3>`;
  resultsWeather.append(forcastTitleEl);

  var forcastEl = document.createElement('div');
  forcastEl.classList = 'forcast-container';
  resultsWeather.append(forcastEl);

  for (var i = 0; i < 5; i++) {
    
    var forDate = repos[i].temp.day;
    var forIcon = repos[i].weather[0].icon;
    var forTemp = Math.round(repos[i].temp.max);
    var forWind = repos[i].wind_speed;
    var forHumid = repos[i].humidity;
    var unixTime  = moment.unix(repos[i].dt);
    var forDate = moment(unixTime).format('DD/MM/YYYY');
    var forcastListEl = document.createElement('div');
    forcastListEl.classList = 'forecast-item';
    forcastListEl.innerHTML =  
    `<h4>${forDate}</h4>
      <ul>
        <li><img src="http://openweathermap.org/img/w/${forIcon}.png"></li>
        <li>Temp: ${forTemp} °C</li>
        <li>Wind: ${forWind} KPH</li>
        <li>Humidity: ${forHumid} %</li>
      </ul>`;
       
      forcastEl.appendChild(forcastListEl);

    console.log(forcastEl)


  }
};

function createBtn (cityName) {
  
  var btnText = cityName;
  var addBtn = document.createElement('button');
  // addBtn.className = 'btn';
  addBtn.textContent = btnText;
  addBtn.setAttribute("class", "btn");
  addBtn.setAttribute("data-language", cityName);
  cityButtonsEl.prepend(addBtn);
  console.log(addBtn)

};


userFormEl.addEventListener('submit', formSubmitHandler);
cityButtonsEl.addEventListener('click', buttonClickHandler);


// init()