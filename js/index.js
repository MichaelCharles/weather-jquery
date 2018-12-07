var apiKey = "7271d3292aac8f43062a11e66a3aa1b0";
var baseOpenWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
var apiOpenWeatherUrl = "";

function hideLoader() {
  $("#loader-text").html("Finishing up...");
  setTimeout(function() {
    if ($("#loading").is(":visible")) {
      $("#loading").hide();
    }
  }, 1000);
}

function parseWeatherId(id) {
  switch (id) {
    // Group 2xx: Thunderstorm
    case 200:
      return ["Thunderstorm with light rain.", "wi-thunderstorm"];
    case 201:
      return ["Thunderstorm with rain.", "wi-thunderstorm"];
    case 202:
      return ["Thunderstorm with heavy rain.", "wi-thunderstorm"];
    case 210:
      return ["Light thunderstorm.", "wi-thunderstorm"];
    case 211:
      return ["Thunderstorm.", "wi-thunderstorm"];
    case 212:
      return ["Heavy thunderstorm.", "wi-thunderstorm"];
    case 221:
      return ["Ragged thunderstorm.", "wi-thunderstorm"];
    case 230:
      return ["Thunderstorm with light drizzle.", "wi-thunderstorm"];
    case 231:
      return ["Thunderstorm with drizzle.", "wi-thunderstorm"];
    case 232:
      return ["Thunderstorm with heavy drizzle.", "wi-thunderstorm"];
    // Group 3xx: Drizzle
    case 300:
      return ["Light intensity drizzle.", "wi-raindrops"];
    case 301:
      return ["Drizzle.", "wi-raindrops"];
    case 302:
      return ["Heavy intensity drizzle.", "wi-showers"];
    case 310:
      return ["Light drizzle rain.", "wi-raindrops"];
    case 311:
      return ["Drizzle rain.", "wi-raindrops"];
    case 312:
      return ["High intensity drizzle rain.", "wi-showers"];
    case 313:
      return ["Rain and drizzle.", "wi-showers"];
    case 314:
      return ["Heavy shower rain and drizzle.", "wi-showers"];
    case 321:
      return ["Shower drizzle.", "wi-showers"];
    // Group 5xx: Rain
    case 500:
      return ["Light rain.", "wi-rain"];
    case 501:
      return ["Moderate rain.", "wi-rain"];
    case 502:
      return ["High intensity rain.", "wi-rain"];
    case 503:
      return ["Very heavy rain.", "wi-rain"];
    case 504:
      return ["Extreme rain.", "wi-rain"];
    case 511:
      return ["Freezing rain.", "wi-rain"];
    case 520:
      return ["Low intensity shower.", "wi-showers"];
    case 521:
      return ["Shower rain.", "wi-showers"];
    case 522:
      return ["Heavy intensity shower rain.", "wi-showers"];
    case 531:
      return ["Ragged shower rain.", "wi-showers"];
    // Group 6xx: Snow
    case 600:
      return ["Light snow.", "wi-snow"];
    case 601:
      return ["Snow.", "wi-snow"];
    case 602:
      return ["Heavy snow.", "wi-snow"];
    case 611:
      return ["Sleet.", "wi-sleet"];
    case 612:
      return ["Shower sleet.", "wi-sleet"];
    case 615:
      return ["Light rain and snow.", "wi-snow"];
    case 616:
      return ["Rain and snow.", "wi-snow"];
    case 620:
      return ["Light shower snow.", "wi-snow"];
    case 621:
      return ["Shower snow.", "wi-snow"];
    case 622:
      return ["heavy shower snow.", "wi-snow"];
    // Group 7xx: Atmosphere
    case 701:
      return ["Mist.", "wi-fog"];
    case 711:
      return ["Smoke.", "wi-smoke"];
    case 721:
      return ["Haze.", "wi-day-haze"];
    case 731:
      return ["Sand, dust whirls.", "wi-sandstorm"];
    case 741:
      return ["Fog.", "wi-fog"];
    case 751:
      return ["Sand.", "wi-sandstorm"];
    case 761:
      return ["Dust.", "wi-dust"];
    case 762:
      return ["Volcanic ash.", "wi-valcano"];
    case 771:
      return ["Squalls.", "wi-cloudy-gusts"];
    case 781:
      return ["Tornado.", "wi-tornado"];
    // Group 800: Clear
    case 800:
      return ["Clear.", "wi-day-sunny"];
    // Group 80x: Clouds
    case 801:
      return ["Few clouds.", "wi-cloud"];
    case 802:
      return ["Scattered clouds.", "wi-cloud"];
    case 803:
      return ["Broken clouds.", "wi-cloud"];
    case 804:
      return ["Overcast.", "wi-cloudy"];
    // Group 90x: Extreme
    case 900:
      return ["Tornado.", "wi-tornado"];
    case 901:
      return ["Tropical storm.", "wi-storm-warning"];
    case 902:
      return ["Hurricane.", "wi-hurricane"];
    case 903:
      return ["Cold.", "wi-snowflake-cold"];
    case 904:
      return ["Hot.", "wi-hot"];
    case 905:
      return ["Windy.", "wi-windy"];
    case 906:
      return ["Hail.", "wi-hail"];
    // Group 9xx: Additional
    case 951:
      return ["Calm.", "wi-hail"];
    case 952:
      return ["Light breeze.", "wi-hail"];
    case 953:
      return ["Gentle breeze.", "wi-hail"];
    case 954:
      return ["Moderate breeze.", "wi-hail"];
    case 955:
      return ["Fresh breeze.", "wi-hail"];
    case 956:
      return ["Strong breeze.", "wi-hail"];
    case 957:
      return ["High winds.", "wi-hail"];
    case 958:
      return ["Gale.", "wi-hail"];
    case 959:
      return ["Severe gale.", "wi-hail"];
    case 960:
      return ["Storm.", "wi-hail"];
    case 961:
      return ["Violent storm.", "wi-hail"];
    case 962:
      return ["Hurricane.", "wi-hurricane"];
    default:
      return ["Not available.", "wi-na"];
  }
}

function kToC(temp, getStr) {
  temp = Math.round((temp -= 273.15) * 10) / 10;
  if (getStr == true || getStr == undefined) {
    return temp + "<span>°C</span>";
  } else {
    return temp;
  }
}

function kToF(temp, getStr) {
  temp = Math.round((temp * (9 / 5) - 459.67) * 10) / 10;
  if (getStr == true || getStr == undefined) {
    return temp + "<span>°F</span>";
  } else {
    return temp;
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function updateTemp(fOrC, updateRef) {
  // construct url based on location
  $("#loader-text").html("Requesting location access...");
  if (navigator.geolocation) {
    $("#loader-text").html("Loading geolocation...");
    navigator.geolocation.getCurrentPosition(function(position) {
      apiOpenWeatherUrl =
        baseOpenWeatherUrl +
        "?lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude +
        "&APPID=" +
        apiKey;
      $.getJSON(apiOpenWeatherUrl, function(json) {
        $("#loader-text").html("Loading weather information...");
        $("#location").html(json.name);
        if ("d" == fOrC[0].toLowerCase()) {
          if ($("#opposite").html() == "Fahrenheit") {
            fOrC = "c";
          } else if ($("#opposite").html() == "Celsius") {
            fOrC = "f";
          }
        }
        setCookie("unitpref", fOrC[0].toLowerCase(), 30);
        if ("f" == fOrC[0].toLowerCase()) {
          $("#temp").html(kToF(json.main.temp));
          $("#opposite").html("Celsius");
          $("#toggle")
            .removeClass("toggleF")
            .addClass("toggleC");
        } else {
          $("#temp").html(kToC(json.main.temp));
          $("#opposite").html("Fahrenheit");
          $("#toggle")
            .removeClass("toggleC")
            .addClass("toggleF");
        }
        if (updateRef) {
          $("#ref-point").html(function(temp) {
            temp = Math.round(kToC(temp, false));
            $.getJSON(
              "/Weather-by-Reference-Point//js/reference.json",
              function(refData) {
                for (i = 0; i < refData.refPoints.length; i++) {
                  if (
                    temp <= refData.refPoints[i].maxTemp &&
                    temp >= refData.refPoints[i].minTemp
                  ) {
                    var refId = Math.floor(
                      Math.random() * refData.refPoints[i].reference.length
                    );
                    return refData.refPoints[i].reference[refId];
                  }
                }
                return "You've either died in flames, froze to death, or we encountered some sort error.";
              }
            );
          });
        }
        var iconData = parseWeatherId(json.weather[0].id);
        $("#weather-type").html(iconData[0]);
        $("#weather-icon").html("<i class='wi " + iconData[1] + "'></i>");
        hideLoader();
      });
    });
  }
}

$("document").ready(function() {
  if (!getCookie("unitpref")) {
    setCookie("unitpref", "c", 30);
  }
  updateTemp(getCookie("unitpref"), true);

  $("#toggle").on("click", function() {
    if ($("#toggle").hasClass("toggleF")) {
      updateTemp("F", false);
    } else {
      updateTemp("C", false);
    }
  });
  $("#temp").on("click", function() {
    if ($("#toggle").hasClass("toggleF")) {
      updateTemp("F", false);
    } else {
      updateTemp("C", false);
    }
  });

  $("#update-message").on("click", function() {
    updateTemp("displayed", true);
  });
  $("#ref-point").on("click", function() {
    updateTemp("displayed", true);
  });
});
