var weatherApp = angular.module("myApp", ["ngRoute"]);
weatherApp.constant("moment", moment);

weatherApp.config(function ($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: "static/partials/main.html"
		})
		.otherwise({
			redirectTo: "/"
		});
})