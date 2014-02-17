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
    $scope.next7d = {};
    $scope.next7d2= [];

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
        });

        OpenWeatherMap.forecast().success(function success (data) {
            $scope.forecast = [];

            var list = data.list;
                list.length = 3;

            list.forEach(function (ele) {
                var _time = new Date( ele.dt * 1000 );
                // console.log('forecast ele', _time, ele );

                $scope.forecast.push({
                    time: ele.dt * 1000,
                    tempMin: ele.main.temp_min,
                    tempMax: ele.main.temp_max,
                    description: ele.weather[0].description,
                    icon: ele.weather[0].icon
                });
            });

            // console.log('forecast', $scope.forecast);
        });

        OpenWeatherMap.next7d().success(function success (data) {
            //
            console.log('next7d', data);

            $scope.next7d.date = [];
            $scope.next7d.icon = [];
            $scope.next7d.tempMin = [];
            $scope.next7d.tempMax = [];
            $scope.next7d.description = [];


            var list = data.list;
            list.forEach(function (weather, index) {
                // weather.dt * 1000
                // weather.temp.min
                // weather.temp.max
                // weather.weather[0].description
                // weather.weather[0].icon
                $scope.next7d.date[index] = weather.dt * 1000;
                $scope.next7d.tempMin[index] = weather.temp.min;
                $scope.next7d.tempMax[index] = weather.temp.max;
                $scope.next7d.description[index] = weather.weather[0].description;
                $scope.next7d.icon[index] = weather.weather[0].icon;

                $scope.next7d2.push({
                    date:           weather.dt * 1000,
                    tempMin:        weather.temp.min,
                    tempMax:        weather.temp.max,
                    description:    weather.weather[0].description,
                    icon:           weather.weather[0].icon,
                });

            });

            // $scope.next7d = {};
            // $scope.next7d.date = []
            // $scope.next7d.icon = []
            // $scope.next7d.tempMin = []
            // $scope.next7d.tempMax = []
            console.log($scope.next7d2);
        });
    }


    function dateParse(_date){
        return (_date.getMonth()+1) + '/' + _date.getDate();
    }
});
