(function() {
    function directive() {
        return {
            templateUrl: 'visualize.data.tpl.html',
            scope: {
                SalesTransactionData : '=data',
            },
            restrict: 'E',
            controller: ['$scope', 'transformFactory', function($scope, transformFactory) {
                console.log('directive working') 
                
                $scope.setStyle = function style(obj) {
                    var width = obj.average/4
                    var randomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
                    return {
                      "background-color": randomColor,
                      "width" : width+'px'
                    }
                }

                $scope.$watch('SalesTransactionData', function (data) {
                    $scope.data = data;
                    $scope.employees = transformFactory.employeeStats($scope.data);
                    $scope.aggregate = transformFactory.aggregated($scope.data);
                });
            }]
        }
    }
    
    angular.module('takeHomeApp').directive('visualizeData', directive)
})();
