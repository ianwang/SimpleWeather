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
    $scope.forecast = [];

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
            $scope.now.description = data.weather[0].description;
            $scope.now.icon = data.weather[0].icon;
            // console.log('now', data);
        });

        OpenWeatherMap.forecast().success(function success (data) {
            $scope.forecast = [];

            var list = data.list;
                list.length = 3;

            list.forEach(function (ele) {
                var _time = new Date( ele.dt * 1000 );
                console.log('forecast ele', _time, ele );

                $scope.forecast.push({
                    time: ele.dt * 1000,
                    tempMin: ele.main.temp_min,
                    tempMax: ele.main.temp_max,
                    description: ele.weather[0].description,
                    icon: ele.weather[0].icon
                });
            });

            console.log('forecast', $scope.forecast);
        });

        OpenWeatherMap.next7d().success(function success (data) {
            //
            // console.log('next7d', data);
        });
    }


    function dateParse(_date){
        return (_date.getMonth()+1) + '/' + _date.getDate();
    }
});
