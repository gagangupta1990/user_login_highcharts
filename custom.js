var myApp = angular.module('myApp', []);

myApp.controller('giveOutput', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.highchart = {};
    //$scope.highchart.show = true;
    $scope.highchart.change=true;
    $scope.user = {};
    $scope.submit = function () {
        alert('Successfilly Login');
       $scope.highchart.show = true;
    }
    $scope.months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.orders=[29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
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
