'use strict';

angular.module('SimpleWeather').

factory('OpenWeatherMap', function(
    $q,
    $http
){

    var localtion = {
        city: 'Taipei',
        lat: undefined,
        lon: undefined,
    };

    var _params = {
        lang: 'zh_tw',
        units: 'metric',
        q: localtion.city
    };


    function now (city) {
        var _apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
        var _params = {
            units: 'metric',
            q: city,
            lang: 'zh_tw'
        };

        return $http.get( _apiUrl, { 'params': _params });
    }

    function forecast() {
        var _apiUrl = 'http://api.openweathermap.org/data/2.5/forecast';

        return $http.get( _apiUrl, { 'params': _params });
    }

    function next7d() {
        var _apiUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily';

        return $http.get( _apiUrl, { 'params': _params });
    }

    return {
        now: now,
        forecast: forecast,
        next7d: next7d
    };

});
