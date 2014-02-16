'use strict';

angular.module('SimpleWeather').

factory('location', function(
    $q,
    $http
){

    function get () {
        return $http.get('http://ipinfo.io/json');
    }

    return {
        get: get
    };

});
