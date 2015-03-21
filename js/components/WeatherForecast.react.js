var React = require('react');
var request = require('../utils');

var WeatherForecast = React.createClass({

  getInitialState: function() {
    return {
      ready: false
    };
  },

  componentWillReceiveProps: function(newProps) {

    var self = this;
    var city = newProps.city;
    
    request.getForecast(city, function(res) {
      self.setState({
        weather: res,
        ready: true
      });
    });
  },

  render: function() {
    
    var createData = function(day) {
      return (
        <tr>
          <td>d</td>
          <td>time | date : 'HH:mm'</td>
          <td>tempMin ~ tempMax</td>
          <td><img className="forecast-icon"/>icon</td>
          <td>description</td>
          <td>percent%</td>
        </tr>
      )
    }

    return (
      <div className="columns large-7 small-12">
        <div className="forecast two_day">
          <h4>今明預報</h4>
          <table border="0">
            <tr>
              <td>台北市</td>
              <td></td>
              <td>溫度(C)</td>
              <td>天氣狀況</td>
              <td>舒適度</td>
              <td>降雨機率</td>
            </tr>
            {this.state.ready ? this.state.weather.map(createData) : 'fetching...'}
            
          </table>
        </div>

        <div className="forecast one_week">
          <h4>一週預報</h4>
          <table border="0">
            <tr>
              <td>date : 'MM/dd'</td>
            </tr>
            <tr>
              <td>tempMin ~ tempMax</td>
            </tr>
            <tr>
              <td><img className="forecast-icon"/>icon</td>
            </tr>
          </table>
        </div>

      </div>

    );
  }
});

module.exports = WeatherForecast;
