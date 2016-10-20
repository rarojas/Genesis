var controllers = angular.module('controllers',[]);
var mainCtrl = function($scope,products) {
	$scope.products = products.query();
}
controllers.controller('mainCtrl',mainCtrl);


var services = angular.module('services',['ngResource'])

var servicesImpl = function($resource,servicesConst) {
		return	$resource(servicesConst.urlProducts);
};

services.factory('products', ['$resource','servicesConst',servicesImpl]);



var app  = angular.module('genesis', ['controllers','services'])
.constant('servicesConst', { urlProducts : 'api/products'});
