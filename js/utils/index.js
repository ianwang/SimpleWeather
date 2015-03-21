var $ = require('jquery');
var WEATHER_API = 'http://api.openweathermap.org/data/2.5/';

module.exports = {

  getLocation: function(cb) {
    $.getJSON('http://ipinfo.io/json', function(res) {
      if(res && res.city && res.country) {
        cb(res);
      } else {
        cb('failed');
      }
    });
  },

  getNow: function(city, cb) {
    var url = WEATHER_API + 'weather?units=metric&q=' + city;
    $.getJSON(url, function(res) {
      cb(res);
    });
  },
  
  getForecast: function(city, cb) {
    var url = WEATHER_API + 'forecast/daily?units=metric&q=' + city;
    $.getJSON(url, function(res) {
      cb(res);
    });
  }

};

