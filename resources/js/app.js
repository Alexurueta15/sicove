var app = angular.module('sicove',['ngRoute','ngMessages']);

app.controller('mainCtrl',['$scope','$http','$window', function ($scope,$http,$window) {

	$scope.message = "Bienvenidos";
	$scope.showError = function(ngModelCtrl, error) {
		return ngModelCtrl.$error[error];
	  };

	  $scope.comiteId={};

	  $scope.cerrarSesion = function(){
		  
		localStorage.removeItem('token');
		
		$window.location.href = "#/"; 
		$window.setTimeout(() => {
			
		}, 3000);	
		$window.location.reload();
		
	}


	$scope.MostrarIniciarSesionBotones = function(){

		


		$scope.token=JSON.parse($window.localStorage.getItem("token"));

		if($scope.token!=null){
		$scope.sesion = $scope.desconversion($scope.token);
		console.log($scope.sesion);
		if ($scope.sesion.role == "Administrador") {
			$scope.administrador=true;
			$scope.cerrarSesionBot=true;
		}

		if ($scope.sesion.role == "Enlace") {
			$scope.enlace =true;
			$scope.cerrarSesionBot=true;
		}

		if ($scope.sesion.role == "Comité") {
			$scope.comite=true;
		$scope.cerrarSesionBot=true;
			
		}

		}else{
			$scope.administrador=false;
			$scope.enlace =false;
			$scope.comite=false;
			$scope.cerrarSesionBot=false;
		}

	}

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

	  
}]);

app.constant('APP_DEFAULT_URL', {

	url: "http://localhost:8080/sicove/"

});


app.config(function ($routeProvider) {

	$routeProvider.when('/',{
		templateUrl: 'resources/views/login.html',
		controller: 'loginController'

	}).when('/login',{
		templateUrl: 'resources/views/login.html',
		controller: 'loginController'
	})
	.when('/administrar/admin',{  //rutas de administrador
		templateUrl: 'resources/views/Administrador/administrador.html',
		controller: 'administradorController'
	})
	.when('/admnistrar/bitacora',{
		templateUrl: 'resources/views/Administrador/bitacora.html',
		controller: 'administradorController'
	})
	.when('/admnistrar/enlace',{
		templateUrl: 'resources/views/Administrador/enlace.html',
		controller: 'administradorController'
	})
	.when('/comite/peticion',{   //rutas comite
		templateUrl: 'resources/views/Comite/peticion.html',
		controller: 'comiteController'
	})
	.when('/comite/comentario',{ 
		templateUrl: 'resources/views/Comite/comite.html',
		controller: 'comiteController'
	})
	.when('/enlace/comite',{  //rutas enlace
		templateUrl: 'resources/views/Enlace/comite.html',
		controller: 'enlaceController'
	})
	.when('/enlace/solicitudes',{
		templateUrl: 'resources/views/Enlace/solicitudes.html',
		controller: 'enlaceController'
	})
	.when('/enlace/miembro',{
		templateUrl: 'resources/views/Enlace/miembro.html',
		controller: 'enlaceController'
	})
	.when('/enlace/comentario',{
		templateUrl: 'resources/views/Enlace/comentario.html',
		controller: 'enlaceController'
	})
	.when('/404',{
		templateUrl: 'resources/views/404.html'
	})
	.otherwise({
		redirectTo: '/404'
	});
});


