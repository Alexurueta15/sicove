app.controller('loginController', function ($scope, $http, APP_DEFAULT_URL, $window) {

	$scope.desconversion = function(token){
			var token2 = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQWRtaW5pc3RyYWRvciIsInVzZXJuYW1lIjoic2ljb3ZlQGxvY2FsaG9zdC5jb20iLCJzdWIiOiJzaWNvdmVAbG9jYWxob3N0LmNvbSIsImlhdCI6MTYxODI5MTc0MiwiZXhwIjoxNjE4MzA5NzQyfQ.2cHCyp0FDRD0-BVPrjk6ejIA8GSxDc5L-r9gtUU8PyE";
			var base64Url = token2.split(".")[1];
			var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
			var jsonPayload = decodeURIComponent(
			  atob(base64)
				.split("")
				.map(function(c) {
				  return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join("")
			);
			return JSON.parse(jsonPayload);
	
	}

    $scope.inicioSesion = function () {
		
		$http.post(APP_DEFAULT_URL.url + "login", $scope.credencials, {
			headers: {
               
         //    Authorization: localStorage.getItem("token") === null ? '': "Bearer " + localStorage.getItem("token"),
	
                "Content-Type":"application/json",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Headers": "Authorization",
				"Access-Control-Expose-Headers": "Authorization",
				
			}
		}).success(function(data,status,headers,response){
			console.log('token' + response.headers('Autori'));
		})
	};
});
