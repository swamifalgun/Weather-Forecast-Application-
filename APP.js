/*jshint -W117 */
/*jshint -W098 */

// get module, decalre the app and add dependencies
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//Route the view and controller 
weatherApp.config(function ($routeProvider) {
    'use strict';

    $routeProvider

        .when('/', {
            templateUrl: 'pages/home.htm',
            controller: 'homeController'
        })

        .when('/forecast', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
        })

        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
        });
});

/* custom service , inject service to controllers*/
weatherApp.service('cityService', function () {

    this.city = "";
});



/*define the controllers for each page, use array form for minification*/
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
    'use strict';
    $scope.city = cityService.city;
    //watch the value on the scope for text input
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService) {
    'use strict';
    $scope.city = cityService.city;

    $scope.days = $routeParams.days || '2';

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=0da8bf02d464f868d2b80fb19664efdb", {
        callback: "JSON_CALLBACK"
    }, {
        get: {
            method: "JSONP"
        }
    });
    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.city,
        cnt: $scope.days
    });

    /* function for converting the temperature from kelvin to celcius */
    $scope.convertToCelcius = function (degK) {
        return Math.round((degK - 273.15));
    };
    /* convert to date function */
    $scope.convertToDate = function (dt) {
        return new Date(dt * 1000);
    };
    }]);
