weatherApp.controller("mainController", function($scope, $window, moment, $http){

	// Get users longtitude and latitude based on IP address
	$http({
		url: "http://ip-api.com/json"
	}).then(function(response){
		$scope.locate = response.data
		$scope.lat = response.data.lat
		$scope.lon = response.data.lon
		$scope.currLoc = response.data.city

	// Get weather data based on the returned Longitute and Latitude 
		$http({
			method: "JSONP",
			url: "https://api.forecast.io/forecast/a266832679f487e186018c71e106c286/"+$scope.lat+","+$scope.lon+"/",
			params: {
				format: 'jsonp',
				callback: "JSON_CALLBACK"
			}
		}).then(function(response){
			$scope.weather = response.data
			for(var index in $scope.weather.daily.data){
				$scope.weather.daily.data[index].reldate = moment.unix($scope.weather.daily.data[index].time).days(String).format("MM/DD/YYYY")
				$scope.weather.daily.data[index].sunrise = moment.unix($scope.weather.daily.data[index].sunriseTime).format("LTS")
				$scope.weather.daily.data[index].sunset = moment.unix($scope.weather.daily.data[index].sunsetTime).format("LTS")
			}
		})
	})



	$scope.weatherLocation = function(){
		if($scope.weatherLoc == undefined){
			$window.alert("Please enter a city name")
		}
		else{
			$http({
				url: "https://maps.googleapis.com/maps/api/geocode/json?address="+ $scope.weatherLoc+"&key=AIzaSyAnYae0maJ6UggD05UmBmiujCN9T_qj9xM"
			}).then(function(response){
				$scope.currLoc = response.data.results[0]['address_components'][0]['long_name']
				$scope.latty = response.data.results[0]['geometry']['location']['lat']
				$scope.lonny = response.data.results[0]['geometry']['location']['lng']
				console.log("CURRENT LOCATION: "+ $scope.currLoc + " Current Lat : "+ $scope.latty + " Current Lon : " + $scope.lonny)

				// newLocation()
				// GETTING weather for new city
				$http({
					method: "JSONP",
					url: "https://api.forecast.io/forecast/a266832679f487e186018c71e106c286/"+$scope.latty+","+$scope.lonny+"/",
					params: {
						format: 'jsonp',
						callback: "JSON_CALLBACK"
					}
				}).then(function(response){
					$scope.weather = response.data
					console.log($scope.weather)
					// console.log($scope.weather.daily.data)
					for(var index in $scope.weather.daily.data){
						// console.log($scope.weather.daily.data[index].time)
						$scope.weather.daily.data[index].reldate = moment.unix($scope.weather.daily.data[index].time).days(String).format("MM/DD/YYYY")
						$scope.weather.daily.data[index].sunrise = moment.unix($scope.weather.daily.data[index].sunriseTime).format("LTS")
						$scope.weather.daily.data[index].sunset = moment.unix($scope.weather.daily.data[index].sunsetTime).format("LTS")
						// $scope.weather.daily.data[index].reldate = moment($scope.weather.daily.data[index].time).fromNow()
					}
				})
			})
		// }
		// else{
		// 	// Get users longtitude and latitude based on IP address
		// 	$http({
		// 		url: "http://ip-api.com/json"
		// 	}).then(function(response){
		// 		$scope.locate = response.data
		// 		$scope.lat = response.data.lat
		// 		$scope.lon = response.data.lon
		// 	})
		// }
			// $http({
			// 	method: "JSONP",
			// 	url: "https://api.forecast.io/forecast/a266832679f487e186018c71e106c286/"+$scope.latty+","+$scope.lonny+"/",
			// 	params: {
			// 		format: 'jsonp',
			// 		callback: "JSON_CALLBACK"
			// 	}
			// }).then(function(response){
			// 	$scope.weather = response.data
			// 	console.log($scope.weather)
			// 	// console.log($scope.weather.daily.data)
			// 	for(var index in $scope.weather.daily.data){
			// 		// console.log($scope.weather.daily.data[index].time)
			// 		$scope.weather.daily.data[index].reldate = moment.unix($scope.weather.daily.data[index].time).days(String).format("MM/DD/YYYY")
			// 		$scope.weather.daily.data[index].sunrise = moment.unix($scope.weather.daily.data[index].sunriseTime).format("LTS")
			// 		$scope.weather.daily.data[index].sunset = moment.unix($scope.weather.daily.data[index].sunsetTime).format("LTS")
			// 		// $scope.weather.daily.data[index].reldate = moment($scope.weather.daily.data[index].time).fromNow()
			// 	}
			// })
		}

	}

	function newLocation(){
		$http({
			method: "JSONP",
			url: "https://api.forecast.io/forecast/a266832679f487e186018c71e106c286/"+$scope.latty+","+$scope.lonny+"/",
			params: {
				format: 'jsonp',
				callback: "JSON_CALLBACK"
			}
		}).then(function(response){
			$scope.weather = response.data
			console.log($scope.weather)
			// console.log($scope.weather.daily.data)
			for(var index in $scope.weather.daily.data){
				// console.log($scope.weather.daily.data[index].time)
				$scope.weather.daily.data[index].reldate = moment.unix($scope.weather.daily.data[index].time).days(String).format("MM/DD/YYYY")
				$scope.weather.daily.data[index].sunrise = moment.unix($scope.weather.daily.data[index].sunriseTime).format("LTS")
				$scope.weather.daily.data[index].sunset = moment.unix($scope.weather.daily.data[index].sunsetTime).format("LTS")
				// $scope.weather.daily.data[index].reldate = moment($scope.weather.daily.data[index].time).fromNow()
			}
		})
	}






});