
var React = require('react');
var request = require('../utils');

var WeatherToday = React.createClass({
  getInitialState: function() {
    return {
    	ready: false
    };
  },

  componentWillReceiveProps: function(newProps) {

  	var self = this;
  	var city = newProps.city;

  	request.getNow(city, function(res) {
    	self.setState({
    		weather: res,
    		ready: true
    	})    
    });

  },

  render: function() {
    return (
    	<div>
	    	<div className="weather_main clearfix">
	      	<p className="temp small-7">
	      		{this.state.ready ? 
	      			this.state.weather.main.temp.toFixed(0) + '°C' : 
	      			'fetching...'
	      		}
	      	</p>
	      	<div className="in_short small-5">
	      		<img/>
	        	<div>
	         
			        <h4>description</h4>
			        <p>tempMin ~ tempMax °C</p>
			      </div>
			    </div>
	    	</div>

	    	<div className="summary">
		      <h5>受到強烈大陸冷氣團影響，氣溫偏低，有短暫陣雨。</h5>
		      <p>受強烈大陸冷氣團影響，北部及東部地區濕濕冷冷的感覺會持續到周六，這幾天持續濕冷，大家家裡相信都是非常潮濕，要小心可能會有家具或衣服發霉的情況，必要的時候可以打開除濕機除溼一下喲。</p>
		    </div>

		  </div>
    );
  }

});

module.exports = WeatherToday;
