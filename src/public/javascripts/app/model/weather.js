'use strict';

angular.module('SimpleWeather').

factory('OpenWeatherMap', function(
    $q,
    $http
){

    function now () {
        var _apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
        var _params = {
            q: 'Taipei',
            lang: 'zh_tw'
        };

        return $http.get( _apiUrl, { 'params': _params });
    }

    return {
        now: now
    };

});
