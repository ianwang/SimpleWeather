(function() {

  var WeatherNow = React.createClass({displayName: "WeatherNow",
    getInitialState: function() {
      return {};
    },

    render: function() {
      return (
        React.createElement("p", null, "temp is ", this.props.weather.main.temp)
      );
    }

  });

  var WeatherForecast = React.createClass({displayName: "WeatherForecast",
    render: function() {
      var days = function(list) {
        return React.createElement("li", null, list.temp.day);
      }
      return (
        React.createElement("p", null, 
          React.createElement("ul", null, "forecast is ", this.props.weather.list.map(days))
        )
      );
    }
  });

  var Board = React.createClass({displayName: "Board",
    getInitialState: function() {
      return {
        weather_now: {},
        weather_forecast: [],
        xhr_num: 2
      }                 
    },

    componentDidMount: function() {
      var self = this;
      getLocation(function(city) {

        self.setState({
          city: city
        });
        
        getNow(city, function(res) {
          self.setState({
            weather_now: res,
            xhr_num: --self.state.xhr_num
          });
        });
        getForecast(city, function(res) {
          self.setState({
            weather_forecast: res,
            xhr_num: --self.state.xhr_num
          });
        });
      });
    },

    render: function() {

      // if RESTful data is not ready yet, it should present another componenet
      // btw, if I dont do this, the props sub-comps receieved will be undefined,
      // unless I predefined the data scheme it parent state, but it doesn't seem to be a good way.
      var dataPanel;
      if(this.state.xhr_num > 0) {
        dataPanel = 'loading..'; 
      } else {
        dataPanel = 
          React.createElement("div", null, 
            React.createElement(WeatherNow, {weather:  this.state.weather_now}), 
            React.createElement(WeatherForecast, {weather: this.state.weather_forecast})
          )
      }

      return (
        React.createElement("div", null, 
          React.createElement("h1", null, "Morning, ", this.state.city || 'let\'s see...', "!"), 
          dataPanel
        )
      )        
    }
  });

/*
  var w_now_desc = React.creatClass({});

*/

  React.render(
    React.createElement(Board, null),
    document.getElementById('example')
  );

/*========
*  Helpers
* =======*/

  var WEATHER_API = 'http://api.openweathermap.org/data/2.5/';

  function getLocation(cb) {
    $.getJSON('http://ipinfo.io/json', function(res) {
      if(res && res.city) {
        cb(res.city);
      } else {
        cb('failed');
      }
    });
  }

  function getNow(city, cb) {
    var url = WEATHER_API + 'weather?units=metric&q=' + city;
    $.getJSON(url, function(res) {
      cb(res);
    });
  }
  
  function getForecast(city, cb) {
    var url = WEATHER_API + 'forecast/daily?units=metric&q=' + city;
    $.getJSON(url, function(res) {
      cb(res);
    });
  }


})();
