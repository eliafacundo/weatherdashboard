function renderButtons() {
    console.log("render");
    $(".cityPlaceHolder").empty();
  
    if (localStorage.getItem("city")) {
      city = JSON.parse(localStorage.getItem("city"));
    }
  
    for (var i = 0; i < city.length; i++) {
      var citiesbutton = $("<button>");
      citiesbutton.addClass("city-name");
      citiesbutton.attr("data-name", encodeURI(city[i]));
      citiesbutton.text(city[i]);
      citiesbutton.css("border-radius", ".25rem");
      citiesbutton.css("border-color", "#FF7F50");
      citiesbutton.css("background-color", "#FF7F50");
      citiesbutton.css("color", "gray");

  
  
      $(".cityPlaceHolder").append(citiesbutton);
  
      
    }
  }
  
  function getWeatherInfo(name) {
    if (name != "") {
      var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        name +
        "&units=imperial" +
        "&APPID=c1e92f1102f974ef4c31578d4a625bfa";
      console.log(queryURL);
  
      $.ajax({
        type: "GET",
        url: queryURL
      })
        .then(function (response) {
          console.log(queryURL);
          console.log(response);
          $(".card1").attr("class", "card1");
          $("#weather1").css("background-color", "white");
          $(".city").html(response.name);
          $(".temp").html("Temperature: " + parseInt(response.main.temp));
          $(".humidity").html("Humidity: " + parseInt(response.main.humidity));
          $(".condition").html(response.weather[0].description);
          $("#weatherIcon").attr(
            "src",
            "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
          );
          $(".wind").html("Wind Speed: " + parseInt(response.wind.speed));
          $("#weather1").css({
            border: "1px solid black",
            "border-radius": "16px"
          });
        })
        .fail(function (error) {
          console.log(JSON.parse(error));
          
        });
  
      queryURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        name +
        "&units=imperial" +
        "&APPID=c1e92f1102f974ef4c31578d4a625bfa";
      console.log(queryURL);
  
      $.ajax({
        type: "GET",
        url: queryURL
      })
        .then(function (response) {
  
          console.log(response);
  
          for (let i = 0; i < 5; i++) {
  
  
            let temp = parseInt(response.list[i].main.temp);
            let humidity = parseInt(response.list[i].main.humidity);
            let date = response.list[i].dt_txt;
            let icon = response.list[i].weather[0].icon
  
            var cardDeck = $('<div class="card-deck"/>');
            var card = $('<div class="card"/>');
            var cardBody = $('<div class="card-body"/>');
            $(cardBody).append(`<p class="card-text1.1">Temperature: ${temp}</>`);
            $(cardBody).append(`<p class="card-text1.1">Humidity: ${humidity}</>`);
            $(cardBody).append(`<p class="card-text1.1">${date}</>`);
            $(cardBody).append(`<img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon" class="card-text1.1">`);
            $(card).append(cardBody);
            $(cardDeck).append(card);
            $("#weather2").append(cardDeck);
  
  
  
          }
  
        })
        .fail(function (error) {
          console.log(JSON.parse(error));
          
        });
    } else {
      alert("Please enter a search option.");
    }
  }
  
  $(function () {
    $(document).on("click", ".city-name", function (event) {
      var title = $(this).attr("data-name");
      console.log(title);
      getWeatherInfo(title);
     
    });
  
    $("#submit").click(function (event) {
      event.preventDefault();
      $("#weather2").empty();
      console.log("Search");
      var name = $("#value")
        .val()
        .trim();
  
      console.log("name:" + name);
  
      if (city.indexOf(name) === -1) {
        console.log("Not in Array");
        city.push(name);
        localStorage.setItem("city", JSON.stringify(city));
      }
      getWeatherInfo(name);
    });
  
   
    var city = [];
    renderButtons();
  });