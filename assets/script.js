var searchBtn = document.getElementById("search-btn");
var searchBox = document.getElementById("search-box");
console.log(searchBtn);
console.log(searchBox);
var searchTerm;
var zipcode;
var weatherInfoEl = document.getElementById("weather-info");
var weatherIconEl = $("i");
var productDetails;
var outfitDetails;
var outfit;
var item;
var product;
var tempK;
var summer = ["tank%20top", "shorts", "sandals"];
var spring = ["blouse", "pants", "cardigan", "sneakers"];
var autumn = [
  "long%20sleeve%20top",
  "jeans",
  "cardigan",
  "light%20jacket",
  "boots",
];
var winter = ["pullover", "jeans", "puffer", "boots", "beanie"];

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  // window.location.reload();
  outfitDetails = JSON.parse(localStorage.getItem("outfit"));

  if (outfitDetails !== null || undefined) {
    localStorage.removeItem("outfit");
  }
  // localStorage.removeItem('outfit');
  console.log("event triggered");
  searchTerm = searchBox.value.trim();
  // console.log(searchTerm);
  zipcode = searchTerm;
  // console.log(zipcode);
  // console.log(searchBox);
  // storeSearch(searchTerm);
  getLocation(zipcode);
});

//API for weather based on zip code end
function getCurrentWeather() {
  weather = [];

  requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=a0290a3291b38896066eaae36dc53ecf";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //     todayDateEl.text(city.toUpperCase() + " " + dayjs().format('DD/MM/YYYY'));

      sky = data.weather[0].main;
      // console.log(sky);
      temp = "Temp: " + Math.round(1.8 * (data.main.temp - 273) + 32) + " °F";
      // console.log(temp);
      minTemp =
        "Min Temp: " +
        Math.round(1.8 * (data.main.temp_min - 273) + 32) +
        " °F";
      // console.log(minTemp);
      maxTemp =
        "Max Temp: " +
        Math.round(1.8 * (data.main.temp_max - 273) + 32) +
        " °F";
      // console.log(maxTemp);
      wind = "Wind: " + Math.round(data.wind.speed * 2.236936) + " MPH";
      // console.log(wind);
      humidity = "Humidity: " + data.main.humidity + " %";
      // console.log(humidity);
      sunrise = data.sys.sunrise;
      // console.log(sunrise);
      sunset = data.sys.sunset;
      // console.log(sunset);
      sunriseTime = "Sunrise: " + timeConversion(sunrise);
      sunsetTime = "Sunset: " + timeConversion(sunset);
      // console.log(typeof sunriseTime);

      weather = [
        sky,
        temp,
        minTemp,
        maxTemp,
        wind,
        humidity,
        sunriseTime,
        sunsetTime,
      ];
      console.log(weather);
      tempK = data.main.temp;
      displayWeather(weather);
      checkTemp(tempK);
    });
}

// Function to get the latitude and longitude of the search city through the GeoAPI
function getLocation(zipcode) {
  requestUrl =
    "http://api.openweathermap.org/geo/1.0/zip?zip=" +
    zipcode +
    "&appid=a0290a3291b38896066eaae36dc53ecf";
  // todayDateEl.text(city.toUpperCase() + " " + dayjs().format('DD/MM/YYYY'));
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      latitude = data.lat;
      longitude = data.lon;
      getCurrentWeather();
    });
}

// Function to convert time in Unix into HH:MM:SS
function timeConversion(unixTimestamp) {
  //Since JavaScript works in milliseconds, you should convert
  // the time into milliseconds by multiplying it by 1000.
  let date = new Date(unixTimestamp * 1000);
  // Hours part from the timestamp
  let hours = date.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  let seconds = "0" + date.getSeconds();
  // Will display time in 11:10:22 format
  let formatTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  console.log(formatTime);
  return formatTime;
}

function displayWeather(weather) {
  console.log(weather);
  console.log(weatherInfoEl);

  for (var i = 0; i < weather.length; i++) {
    weatherInfoEl.children[i].textContent = weather[i];
  }

  //  console.log(weatherIconEl);
  //     // CODE TO DUSPLAY ICONS ACCORDING TO SKY STATUS
  //         if (sky == "Thunderstorm") {
  //             weatherIconEl.attr("class", "fa-solid fa-bolt");
  //         }

  //         else if (sky == "Clouds") {
  //             weatherIconEl.attr("class", "fa-solid fa-cloud");
  //         }

  //         else if (sky == "Rain" || data.weather[0].main == "Drizzle") {
  //             weatherIconEl.attr("class", "fa-solid fa-cloud-rain");

  //         } else if (sky == "Snow") {
  //             weatherIconEl.attr("class", "fa-solid fa-snowflake");
  //         } else if (sky == "Clear") {
  //             weatherIconEl.attr("class", "fa-solid fa-sun");
  //         } else {
  //             weatherIconEl.attr("class", "");
  //         }
}

function checkTemp(tempK) {
  if (tempK < 284) {
    outfit = winter;
  } else if (tempK > 284 && tempK < 293) {
    outfit = spring;
  } else if (tempK > 294) {
    outfit = summer;
  }
//   console.log(outfit);
  searchOutfit(outfit);
}

function searchOutfit(outfit) {
  console.log("searching");
  for (var i = 0; i < outfit.length; i++) {
    getOutfit(outfit[i]);
    // console log name item to be searched
    // console.log(outfit[i]);
  }
  if ((i = outfit.length)) {
    displayOutfit(outfitDetails);
  }
}

// function getOutfit(item) {

//     var settings = {
//       async: true,
//       crossDomain: true,
//       url:
//         "https://asos2.p.rapidapi.com/v2/auto-complete?store=US&country=US&currency=USD&sizeSchema=US&lang=en-US&q=" +
//         item,
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": "043b3bad18mshd179abfcca37a49p16e669jsn3d102d03cc97",
//         "X-RapidAPI-Host": "asos2.p.rapidapi.com",
//       },
//     };

//     $.ajax(settings).done(function (response) {
//         // console.log(response);
//         var randomIndex = Math.floor(Math.random() * response.data.products.length);
//         // console.log(randomIndex);
//         product = response.data.products[randomIndex];
//         console.log(product);
//         getDetails(product);
//     });

// };

async function getOutfit(item) {
  const url =
    "https://real-time-product-search.p.rapidapi.com/search?q=" +
    item +
    "&country=us&language=en&page=1&limit=10&sort_by=BEST_MATCH&product_condition=ANY&min_rating=ANY";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "043b3bad18mshd179abfcca37a49p16e669jsn3d102d03cc97",
      "x-rapidapi-host": "real-time-product-search.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    let randomIndex = Math.floor(Math.random() * 10);
    // console.log("result");
    product = result.data.products[randomIndex];
     console.log(product);
    getDetails(product);
  } catch (error) {
    console.error(error);
  }

  //   // replace `octocat` with anyone else's GitHub username
  //   var requestUrl = "https://api.github.com/users/krausyd/repos";

  //   fetch(requestUrl)
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       for (var i = 0; i < data.length; i++) {
  //         var listItem = document.createElement("li");
  //         listItem.textContent = data[i].html_url;
  //         repoList.appendChild(listItem);
  //       }
  //     });
}

// getOutfit("puffer");

function getDetails(product) {
  var itemName = product.product_title;
  var itemPrice = product.offer.price;
//   var itemColor = product.colour;
  var itemImg = product.product_photos[0];
//   var itemLink = "https://www.asos.com/us/" + product.url;

 console.log(itemName);
 console.log(itemPrice);
 console.log(itemImg);

  productDetails = {
    name: itemName,
    price: itemPrice,
    // color: itemColor,
    image: itemImg,
    // link: itemLink,
  };

//   console.log(productDetails);
  storeDetails(productDetails);
}

function storeDetails(productDetails) {
  outfitDetails = JSON.parse(localStorage.getItem("outfit")) || [];
  outfitDetails.push(productDetails);
  localStorage.setItem("outfit", JSON.stringify(outfitDetails));
  console.log(outfitDetails);
}

function displayOutfit(outfitDetails) {
  var itemDetailsEl;
  var productImg;
  var productName;
  var productPrice;
//   var productColor;
//   var productLink;

  console.log("displaying");

  for (var i = 0; i < outfitDetails.length; i++) {
    itemId = "#item-" + i;
    console.log(itemId);

    itemDetailsEl = $(itemId);
    itemDetailsEl.removeClass("hidden");
    // console.log(itemDetailsEl);
    // console.log(typeof itemDetailsEl);
    productImg = itemDetailsEl.children("img");
    // console.log(productImg);
    productImg.attr("src", outfitDetails[i].image);
    // console.log(productImg.attr("src", productDetails[3]));

    productName = itemDetailsEl.children(1).children("h5");
    console.log(productName);
    productName.text(outfitDetails[i].name);
    // console.log(productName.text(outfitDetails[i].name));

    productPrice = itemDetailsEl.children(1).children("p").eq(0);
    console.log(productPrice);
    productPrice.text(outfitDetails[i].price);
    // console.log(productPrice.text(productDetails[1]));

    productColor = itemDetailsEl.children(1).children("p").eq(1);
    // console.log(productColor);
    productColor.text(outfitDetails[i].color);
    // console.log(productColor.text(productDetails[2]));

    productLink = itemDetailsEl.children(1).children("a");
    console.log(productLink);
    productLink.attr("href", outfitDetails[i].link);
    // console.log(productLink.attr("href", productDetails[4]));
  }
}
// displayOutfit(outfitDetails);

// outfitDetails = JSON.parse(localStorage.getItem('outfit'));
// console.log(outfitDetails)
// displayOutfit(outfitDetails);
