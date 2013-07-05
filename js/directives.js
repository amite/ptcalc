
// Use the directive like this:
// <input type="text" ng-blur="handleInputBlur()"></input>

// $scope.handleInputBlur = function(){
//    // do some action here
// }

// ptCalc.directive('ngBlur', function() {
//     return {
//       restrict: 'A',
//       link: function postLink(scope, element, attrs) {
//         element.bind('blur', function () {
//             scope.$apply(attrs.ngBlur);
//         });
//       }
//     };
// });


ptCalc.directive("percent", function($filter){
    var p = function(viewValue){
      console.log(viewValue);
      var m = viewValue.match(/^(\d+)$/);
      if (m !== null)
        return $filter('number')(parseFloat(viewValue)/100);
    };

    var f = function(modelValue){
        return $filter('number')(parseFloat(modelValue)*100);
    };

    return {
      require: 'ngModel',
      link: function(scope, ele, attr, ctrl){
          ctrl.$parsers.unshift(p);
          ctrl.$formatters.unshift(f);
      }
    };
});