
var React = require('react');
var request = require('../utils');
var WeatherToday = require('./WeatherToday.react');
var WeatherForecast = require('./WeatherForecast.react');

var WeatherApp = React.createClass({

  getInitialState: function() {
    return {
    
    }                 
  },

  componentDidMount: function() {

    var self = this;

    request.getLocation(function(location) {

      self.setState({
        city: location.city,
        country: location.country
      });
      
    });
  },

  render: function() {

    return (
      <div className='row'>

        <div className='columns large-5 small-12'>

          <div className="region">
            <h1>{this.state.city || 'let\'s see...'}</h1>
            <p>{this.state.city}, {this.state.country}</p>
          </div>

          <WeatherToday city={this.state.city} />
        
        </div>

        <WeatherForecast city={this.state.city} />
      </div>
    )        
  }

});

module.exports = WeatherApp;
