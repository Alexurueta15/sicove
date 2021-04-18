app.controller('loginController', function ($scope, $http, APP_DEFAULT_URL, $window) {

	$scope.desconversion = function (token) {

		var base64Url = token.split(".")[1];
		var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		var jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map(function (c) {
					return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join("")
		);
		return JSON.parse(jsonPayload);

	}

	$scope.inicioSesion = function () {

		$http.post(APP_DEFAULT_URL.url + "login", $scope.credencials, {

		}).then(function (response) {

			if (response.status == 200) {
				Swal.fire(
					'Exito',
					'Inició correctamentes',
					'success'
				);
				var responseHeader = response.headers(["authorization"]);
				var tokendata = responseHeader.slice(7);
				$window.localStorage.setItem('token', JSON.stringify(tokendata));
				$scope.rolToken = $scope.desconversion(tokendata);
				console.log($scope.rolToken);
				if ($scope.rolToken.role == "Administrador") {
					console.log("administrador")
					$window.location.href = "#/administrar/admin"; 	
					$window.setTimeout(() => {
			
					}, 3000);	
					$window.location.reload();
				}

				if ($scope.rolToken.role == "Enlace") {
					console.log("enlace")
					$window.location.href = "#/enlace/comite"; 
					$window.setTimeout(() => {
			
					}, 3000);	
					$window.location.reload();	
				}

				if ($scope.rolToken.role == "Comité") {
					console.log("Miembro comite")
					$window.location.href = "#/comite/peticion"; 
					$window.setTimeout(() => {
			
					}, 3000);	
					$window.location.reload();
				}

			} else {
				Swal.fire(
					'Advertencia',
					'Usuario y/o contraseña incorrecto',
					'warning'
				);
				$scope.credencials = {}


			}


		}, function errorCallback(response) {
			Swal.fire(
				'Advertencia',
				'Algo salío mal, intentelo nuevamente ',
				'warning'
			);
			console.log("No inicio sesion");
			console.log(response);
		})
	};

});