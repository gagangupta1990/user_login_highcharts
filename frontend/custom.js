var myApp = angular.module('myApp', []);

myApp.controller('giveOutput', ['$scope', '$timeout','$http', function ($scope, $timeout, $http) {

    var url = 'http://localhost:3000/api/v1/users/isLoggedIn';
    $http({
        url: url,
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    }).then(function(response) {
        $scope.isLoggedIn = true;
        $scope.highchart.show = true;
    }).catch(err => {
        $scope.isLoggedIn = false;
        $scope.highchart.show = false;
    });

    $scope.highchart = {};
    //$scope.highchart.show = true;
    $scope.highchart.change=true;
    $scope.user = {};
    $scope.submit = function () {
        var url = 'http://localhost:3000/api/v1/users/login';
        $http({
            url: url,
            method: "POST",
            data: { 'email' : $scope.user.email ,'password': $scope.user.password},
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            alert('Successfully Login');
            $scope.isLoggedIn = true;
            $scope.highchart.show = true;
        }).catch(err => {
            alert('Invalid Credentials');
        })
    }
    $scope.logout = function () {
        var url = 'http://localhost:3000/api/v1/users/logout';
        $http({
            url: url,
            method: "PUT",
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            alert('Logged out successfully');
            $scope.isLoggedIn = false;
            $scope.highchart.show = false;
        }).catch(err => {
            alert('Something went wrong');
        })
    }
    $scope.months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.orders=[29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

    var topTenPRoducts = function(){
        $http({
            url: 'http://localhost:3000/api/v1/chart/top_ten_products',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            console.log(response);
        }).catch(err => {
            alert('Something went wrong');
        });
    }

    var monthlyRevenue = function(){
        $http({
            url: 'http://localhost:3000/api/v1/chart/monthly_revenue',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            console.log(response);
        }).catch(err => {
            alert('Something went wrong');
        });
    }

    $scope.chartOptions = {
        title: {
            text: 'Yearly Order Chart'
        },
        xAxis: {
            categories: $scope.months
        },
        series: [{
            data: $scope.orders
        }]
    };

    $scope.checkmonth=function (month) {
        $scope.highchart.change=false;
        var i = $scope.chartOptions.xAxis.categories.indexOf(month);
        if(i != -1) {
            $scope.chartOptions.xAxis.categories.splice(i, 1);
            $scope.chartOptions.series[0].data.splice(i, 1);
        }
        $timeout(function () {
            $scope.highchart.change=true;
        })
        console.log('ggg',$scope.chartOptions.xAxis.categories,$scope.chartOptions.series[0].data)
    }
}]);

myApp.directive('hcChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], scope.options);
        }
    };
})
