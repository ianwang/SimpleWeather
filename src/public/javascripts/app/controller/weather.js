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

        updateWeather($scope.city);
    });

    function updateWeather (city) {
        OpenWeatherMap.now( city ).success(function success (data) {
            $scope.tempNow = data.main.temp;
            console.log('now', data);
        });

        OpenWeatherMap.forecast().success(function success (data) {
            //
            console.log('forecast', data);
        });

        OpenWeatherMap.next7d().success(function success (data) {
            //
            console.log('next7d', data);
        });
    }


});
