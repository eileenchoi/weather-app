

// object with responses
const responses = {
    currentConditions: {
        tooHot: "Find an air conditioned room and DO NOT LEAVE. It's mighty hot out, and whatever you're thinking of doing outside today is NOT A GOOD IDEA. Or, if you must go out, just go naked.",
        shorts: "Sunshine and lollipops all day today! You're not going to need pants today. Put on them short shorts and channel your inner Beyonce to shake your tush.",
        tank: "farmer's tan is not a good look for anyone, grab those spaghetti straps or that muscle tee with the sleeves cut off! It's a tank top kind of day today!",
        tShirt: "It's a beautiful day, but let's not get carried away. You'll want to be in a light tShirt today, enjoy the warmth. From my heart.",

        sweater: "YAY! IT'S SWEATER WEATHER! WEAR THAT SWEATER!",
        layers: "Bust out the layers and those thermals, it's not quite warm enough to go gallavanting in just a sweater, but if you layer layer layer, you should be quite comfortable.",
        jacket: "Winter is coming. Put on a jacket.",
        parka: "Winter is here. The Night King is coming for you. Put on your parka, it's pretty chilly right now.",
        hatScarf: "Grab your scarf, grab your hat, and the mittens, and your long johns. It's going to get even colder!",
        everything: "Even Jon Snow can't help you today. Put on everything you own and try to keep moving. It's colder than your ex's heart today.",
        warning: "Don't go outside. Chances are, there's an extreme weather warning. If you want to keep your fingers and toes I suggest you stay INSIDE"

    },
    forecastConditions: {
        tooHot: "Don't forget your sunglasses and a hat if you don't want the top of your head to burn up like an old highschool flame! More importantly, take your deoderant with you-- just because it's hot doesn't mean you need to smell like Chewbaca after a steam and sauna.",
        shorts: "Ladies, I hope you shaved your legs this morning, and gentlemen, I hope you didn't skip leg day. Its going to get hella warm later, so you may want to bring a pair of shorts or other socially acceptable piece of clothing that won't require you to wear pants. Also, don't forget your deoderant.",
        tank: "Make sure you wear a tank top under whatever you put on today. It's going to get steamy later and you're going want to strip those layers! Also, don't forget your deoderant. You'll thank me later.",
        tShirt: "All those graphic tees you bought are going to come in handy later, it's going to be t-shirt weather so plan show off those guns. Also, don't forget your deoderant- or better yet, anti-perspirant, you don't want wet pits. ew.",

        sweater: "Don't forget to take a sweater with you everywhere you go today! It's definitely going to get nippy later, and you're going to want something cuddly.",
        layers: "Layer layer layer! It's going to be chilly later but you may find it too warm inside. Wear light layers to make sure you can strip them off if you get too warm, but I promise you layering will keep you nice and comfortable today. ",
        jacket: "You might not know it yet, but Jack Frost is creeping your Facebook profile and waiting for just the right moment to scare the bejeebus out of you. Take your jacket today, you won't regret it.",
        parka: "That super expeezy parka filled with the tears of baby ducks is going to be handy later. Take this chance to show off your extreme puffiness AND stay warm later today.",
        hatScarf: "It's going to get North of the Wall cold later, take your hat, scarf, and mittens with you- you'll want them.",
        everything: "Put on everything you own. EVERYTHING.",
        warning: "Frost bite is real. If you want to find out what it's like venture outside today. Otherwise, stay the *(^%) inside, extreme cold weather warnings are in effect! "
    }

}; //responses

// general variables for ajax request
const apiKey = "28b06b5ebe6e25ca";
const apiUrl = "http://api.wunderground.com/api/28b06b5ebe6e25ca/geolookup/hourly/conditions/local_time_rfc822/q/autoip.json"


let userLocation = "default";
let currentWeather = "default";
let hourlyForecast = "default";
let hourlyTemp = "default";
let lowestTemp = "default";
let currentTemp = "tempDefault";
const responsePath = (responses.currentConditions);
const forecastPath = (responses.forecastConditions);


const ajaxCallBack = function (res) {
    
    //   current location of user variable
    userLocation = (res.current_observation.display_location.full);
    $(".displayLocation").text(userLocation)
    //display icon
    weatherIcon = (res.current_observation.icon_url);
    $("#weatherIcon").attr("src", weatherIcon);

    // current weather conditions variable
    currentWeather = (res.current_observation.feelslike_c);
    console.log("yes", currentWeather);
    // console.log(res);
    hourlyForecast = (res.hourly_forecast);
    // console.log(hourlyForecast);

    // for each method to get hourly feelslike temp in celsius
    hourlyTemp = [];
    hourlyForecast.forEach(function (item, index, array) {
        // parseInt to convert strings to numbers
        hourlyTemp.push(parseInt(hourlyForecast[index].feelslike.metric));
    });

    let lowestTemp = Math.min(...hourlyTemp);
    console.log(lowestTemp);

    let currentTemp = (res.current_observation.feelslike_c);

    //function call for getting responses
    getCurrentResponse(currentTemp);
    getForecastResponse(lowestTemp);

} 

const weather = $(function () {
    $.ajax({
        url: apiUrl,
        dataType: 'jsonp',
        method: 'GET',

    }).then(ajaxCallBack)
    getCurrentResponse(currentTemp);
    getForecastResponse(lowestTemp);

}) //ajax request end

function getCurrentResponse(currentTemp) {
    if (currentTemp >= 35) {
        $('.display').text(responsePath.tooHot)

    } else if (currentTemp >= 29 && currentTemp <= 34) {
        $('.display').text(responsePath.shorts)

    } else if (currentTemp >= 24 && currentTemp <= 28) {
        $('.display').text(responsePath.tank)

    } else if (currentTemp >= 16 && currentTemp <= 23) {
        $('.display').text(responsePath.tShirt)

    } else if (currentTemp >= 11 && currentTemp <= 15) {
        $('.display').text(responsePath.sweater)

    } else if (currentTemp > 8 && currentTemp < 10) {
        $('.display').text(responsePath.layers)

    } else if (currentTemp >= 4 && currentTemp <= 7) {
        $('.display').text(responsePath.jacket)

    } else if (currentTemp >= 0 && currentTemp <= 3) {
        $('.display').text(responsePath.parka)

    } else if (currentTemp >= -7 && currentTemp <= -1) {
        $('.display').text(responsePath.hat)

    } else if (currentTemp => -36 && currentTemp <= -8){
        $('.display').text(responsePath.everything)
    
    } else if (currentTemp <= -35) {
        ('.display').text(responsePath.warning)
    } else {
        ('.display').text("what the weather?! Something's gone horribly wrong! Please try rebooting the app, and if that doesn't work report this error to eileen.h.choi@gmail.com")
    }

}; //getCurrentResponse end

// forecastCondition responses
function getForecastResponse(lowestTemp) {
    if (lowestTemp >= 35) {
        $('.forecastDisplay').text(forecastPath.tooHot)

    } else if (lowestTemp >= 29 && lowestTemp <= 34) {
        $('.forecastDisplay').text(forecastPath.shorts)

    } else if (lowestTemp >= 24 && lowestTemp <= 28) {
        $('.forecastDisplay').text(forecastPath.tank)

    } else if (lowestTemp >= 16 && lowestTemp <= 23) {
        $('.forecastDisplay').text(forecastPath.tShirt)

    } else if (lowestTemp >= 11 && lowestTemp <= 15) {
        $('.forecastDisplay').text(forecastPath.sweater)

    } else if (lowestTemp >= 8 && lowestTemp <= 10) {
        $('.forecastDisplay').text(forecastPath.layers)

    } else if (lowestTemp >= 4 && lowestTemp <= 7) {
        $('.forecastDisplay').text(forecastPath.jacket)

    } else if (lowestTemp >= 0 && lowestTemp <= 3) {
        $('.forecastDisplay').text(forecastPath.parka)

    } else if (lowestTemp => -7 && lowestTemp <= -1) {
        $('.forecastDisplay').text(forecastPath.hatScarf)

    } else if (lowestTemp >= -36 && lowestTemp <= -8) {
        $('.forecastDisplay').text(forecastPath.everything)
    } else if (lowestTemp <= -35) {
        $('.forecastDisplay').text(forecastPath.warning)
    } else {
        $('.forecastDisplay').text("what the weather?! Something's gone horribly wrong! Please try rebooting the app, and if that doesn't work report this error to eileen.h.choi@gmail.com")
    }
}; //getForecastResponse end


//get user input values
$('#locInput').on('submit', function (e) {
    e.preventDefault();
    let searchInput = $('#location').val();
    let province = $('#province').val();
    userSearch(searchInput, province);

});

//function to GET info based on user inputs 
const userSearch = function (city, province) {
    $.ajax({
        url: `http://api.wunderground.com/api/28b06b5ebe6e25ca/geolookup/hourly/conditions/local_time_rfc822/q/${province}/${city}.json`,
        dataType: 'jsonp',
        method: 'GET',

    }).then(ajaxCallBack)
        .fail(function () {
            alert("I can't tell you what to wear if you can't spell. I also can't read your mind. Check your spelling and let's try again :) ");
        })
};
//refresh function
$('#reset').click(function(){
    location.reload();
});


weather.event = function () {
    $('#formName').on('submit', function (e) {
        e.preventDefault();
        let userName = $('#name').val();
     
     
        //display
    $('.name').addClass('nameStyle').text('Hello ' +userName + '!');
    

    });

}; //weather.event

// weather initialization
weather.init = () => {
    weather.event();
    console.log("yay");

};
// init call
$(weather.init);

