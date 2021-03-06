var moment = require('moment');
const weather = require('./weather');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};

var generateWeatherMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${latitude},${longitude}`,
    // currentTemp: weather.getWeather(latitude, longitude, (errorMessage, weatherResults) => {
    //       if (errorMessage) {
    //         console.log(errorMessage);
    //       } else {
    //         console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
    //       }
    //     }),
    createdAt: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage, generateWeatherMessage};
