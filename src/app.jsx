(function() {

  var WeatherNow = React.createClass({
    getInitialState: function() {
      return {};
    },

    render: function() {
      return (
        <p>temp is {this.props.weather.main.temp}</p>
      );
    }

  });

  var WeatherForecast = React.createClass({
    render: function() {
      var days = function(list) {
        return <li>{list.temp.day}</li>;
      }
      return (
        <p>
          <ul>forecast is {this.props.weather.list.map(days)}</ul>
        </p>
      );
    }
  });

  var Board = React.createClass({
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
          <div>
            <WeatherNow weather={ this.state.weather_now} />
            <WeatherForecast weather={this.state.weather_forecast} />
          </div>
      }

      return (
        <div>
          <h1>Morning, {this.state.city || 'let\'s see...'}!</h1>
          {dataPanel}
        </div>
      )        
    }
  });

/*
  var w_now_desc = React.creatClass({});

*/

  React.render(
    <Board />,
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
