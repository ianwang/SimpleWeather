'use strict';

angular.module('SimpleWeather').

controller('WeatherCtrl', function(
    $scope,
    location,
    OpenWeatherMap
){
    //
    console.log('ng run');

    location.get().success(function success (data) {
        $scope.city = data.city;
        $scope.loc  = data.loc;

        console.log('location', data);

    });

    OpenWeatherMap.now().success(function success (data) {
        console.log('OpenWeatherMap', data);
    });

});
