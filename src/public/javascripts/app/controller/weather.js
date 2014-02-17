'use strict';

angular.module('SimpleWeather').

controller('WeatherCtrl', function(
    $scope,
    location,
    OpenWeatherMap
){
    //
    console.log('ng run');

    $scope.now = {};

    location.get().success(function success (data) {
        $scope.city = data.city;
        $scope.loc  = data.loc;

        updateWeather($scope.city);
    });

    function updateWeather (city) {
        OpenWeatherMap.now( city ).success(function success (data) {
            $scope.now.temp = data.main.temp;
            $scope.now.tempMax = data.main.temp_max;
            $scope.now.tempMin = data.main.temp_min;

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
