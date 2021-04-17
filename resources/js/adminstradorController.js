app.controller('administradorController', function ($scope, $http, APP_DEFAULT_URL, $window) {
	$scope.token= JSON.parse($window.localStorage.getItem("token"));
				  
	$scope.registrarNuevoAdministrador = function () {
		
		$http.post(APP_DEFAULT_URL.url + "admin", $scope.adminData, {
			headers: {
               
         //    Authorization: localStorage.getItem("token") === null ? '': "Bearer " + localStorage.getItem("token"),
                Accept:"*/*",
                "Content-Type":"application/json",
                Authorization: "Bearer "+ $scope.token,
 
				"Access-Control-Allow-Origin":  "http://localhost:8080",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Headers": "Authorization"
			}
		}).then(function (response) {
			if (response.data.statusCode == 200) {
				Swal.fire(
					'Exito',
					'Registro correcto',
					'success'
					);
					$scope.adminData={};
					$scope.getAdministradores();
					$("#CerrarCrear").click();
					

			} else {
				Swal.fire(
					'Adverte',
					'El registro no pudo realizarse, revisa tus datos y verifica que el correo no este registrado en el sistema',
					'warning'
					);
			}
		})
	};

	$scope.getAdministradores = function () {

		
		$http.get(APP_DEFAULT_URL.url + "admin",{
			headers: {
			   
		 //    Authorization: localStorage.getItem("token") === null ? '': "Bearer " + localStorage.getItem("token"),
				Accept:"*/*",
				"Content-Type":"application/json",
				Authorization: "Bearer "+ $scope.token,
 
				"Access-Control-Allow-Origin":  "http://localhost:8080",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Headers": "Authorization"
			}
		}).then(function (response) {
			$scope.administradores = response.data;

		});


	};



	$scope.EditarAdministrador = function (administrador) {

		$scope.editarAdminstrador = angular.copy(administrador);
		$("#editarModal").modal('show');

	};


	$scope.editarAdministradorData = function () {
		

		$scope.actualizarData= {
			"id":$scope.editarAdminstrador.id,
			"password":$scope.editarAdminstrador.password
		};

		console.log($scope.actualizarData);
		$http.patch(APP_DEFAULT_URL.url + "admin",$scope.actualizarData, {

			headers: {
			   
				//    Authorization: localStorage.getItem("token") === null ? '': "Bearer " + localStorage.getItem("token"),
					   Accept:"*/*",
					   "Content-Type":"application/json",
					   Authorization: "Bearer "+ $scope.token,
		
					   "Access-Control-Allow-Origin":  "http://localhost:8080",
					   "Access-Control-Allow-Methods": "PATCH",
					   "Access-Control-Allow-Headers": "Content-Type",
					   "Access-Control-Allow-Headers": "Authorization"
				   }
		}).then(function (response) {

			if (response.data.statusCode == 200) {
				Swal.fire(
					'Exito',
					'Actualizacion correcta',
					'success'
					);
				$("#CerrarEditar").click();
				$scope.getAdministradores();

			} else {
				Swal.fire(
					'Adverte',
					'La actualizacion no puede realizarse',
					'warning'
					);
			}
		});



	};

	$scope.BorrarAdministrador = function (id) {

		$scope.borrarAdministrador = id;
	
		$("#borrarModal").modal('show');
	};

	$scope.deleteAdministrador = function () {
		$scope.borrar= {
			"id":$scope.borrarAdministrador
		};

		$http({
			method: 'DELETE',
			url: APP_DEFAULT_URL.url + "admin",
			data: $scope.borrar,
			headers: {
			  //    Authorization: localStorage.getItem("token") === null ? '': "Bearer " + localStorage.getItem("token"),
			  Accept:"*/*",
			  "Content-Type":"application/json",
			  Authorization: "Bearer "+ $scope.token,

			  "Access-Control-Allow-Origin":  "http://localhost:8080",
			  "Access-Control-Allow-Methods": "*",
			  "Access-Control-Allow-Headers": "Content-Type",
			  "Access-Control-Allow-Headers": "Authorization"
			}
		})
		.then(function (response) {

			if (response.data.statusCode == 200) {
				Swal.fire(
					'Exito',
					'Eliminación correcta',
					'success'
					);
				$("#CerrarEliminar").click();
				$scope.getAdministradores();

			} else {
				Swal.fire(
					'Adverte',
					'La elimimación no puede realizarse',
					'warning'
					);
			}
		});


		
	};

	/*-----CRUD-----*/

	$scope.registrarNuevoEnlace = function () {
		
		$http.post(APP_DEFAULT_URL.url + "admin/enlace", $scope.enlaceData, {
			headers: {
               
         //    Authorization: localStorage.getItem("token") === null ? '': "Bearer " + localStorage.getItem("token"),
                Accept:"*/*",
                "Content-Type":"application/json",
                Authorization: "Bearer "+ $scope.token,
 
				"Access-Control-Allow-Origin":  "http://localhost:8080",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Headers": "Authorization"
			}
		}).then(function (response) {
			if (response.data.statusCode == 200) {
				Swal.fire(
					'Exito',
					'Registro correcto',
					'success'
					);
					$scope.enlaceData={};
					$scope.getEnlaces();
					$("#CerrarCrear").click();
					

			} else {
				Swal.fire(
					'Adverte',
					'El registro no pudo realizarse, correo electronico ya registrado',
					'warning'
					);
			}

		
		}, function errorCallback(response) {
			Swal.fire(
				'Adverte',
				'Algo salío mal',
				'warning'
				);
			if (response.data.statusCode == 400) {

				console.log(response.data.statusCode);
				console.log(response.data.message);
				$scope.errores = response.data.errors;
				$scope.message = response.data.message;
				console.log($scope.errores);
				return $scope.errores = response.data.errors;
			}
			
		}
		)
		

	};
	$scope.getData = function () {

		$scope.enlaceData.residence.street=null;
		$scope.enlaceData.residence.municipality="";
		$scope.enlaceData.residence.locality="";
		console.log($scope.enlaceData.residence.zipCode);
		
		$http.get("https://api-sepomex.hckdrk.mx/query/info_cp/"+$scope.enlaceData.residence.zipCode+"?token=55d025b2-48cd-46db-8748-6955ac7a580d",{
		}).then(function (response) {
            console.log(response.data)
			$scope.domicilioData = response.data;
			$scope.colonias = response.data;
			  console.log("--------")
			 // console.log($scope.cps);
		});


		};
		$scope.getData2 = function () {
	
	
			//datos de localidad por cp
			$http.get("https://api-sepomex.hckdrk.mx/query/info_cp/"+$scope.editarEnlace.residence.zipCode+"?token=55d025b2-48cd-46db-8748-6955ac7a580d",{
			}).then(function (response) {
				console.log(response.data)
				$scope.domicilioData = response.data;
				$scope.colonias = response.data;
				  console.log("----Domicilio----")
				  console.log(	$scope.domicilioData);
				  console.log("----Colonias ----")
				  console.log(	$scope.colonias)
				 // console.log($scope.cps);
			});
	
	
			};
	
	$scope.getEnlaces = function () {
		$http.get(APP_DEFAULT_URL.url + "admin/enlace",{
			headers: {
			   
		 //    Authorization: localStorage.getItem("token") === null ? '': "Bearer " + localStorage.getItem("token"),
				Accept:"*/*",
				"Content-Type":"application/json",
				Authorization: "Bearer "+ $scope.token,
 
				"Access-Control-Allow-Origin":  "http://localhost:8080",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Headers": "Authorization"
			}
		}).then(function (response) {
			$scope.enlaces = response.data;
			$scope.count = Object.keys($scope.enlaces).length;
			console.log($scope.count);

			if(	$scope.enlaces ){
				$scope.enlaces = response.data;
				console.log($scope.enlaces);
				console.log("entro ---------")
			}else{
				$scope.enlaces = {};
				console.log($scope.enlaces);
				console.log("no entro ---------")
			}
			

		});


				$http.get("https://api-sepomex.hckdrk.mx/query/get_cp_por_estado/Morelos?token=55d025b2-48cd-46db-8748-6955ac7a580d",{
		}).then(function (response) {
            console.log(response.data.response)
			$scope.codigoPostal = response.data.response;
			
			$scope.cps =[];
			angular.forEach($scope.codigoPostal.cp, function(value, key){
			
				var tecnologia = {
					id : key,
					cp : value
				}
				$scope.cps.push(tecnologia);
			  });
			  console.log("--------")
			  console.log($scope.cps);
		});
	};



	$scope.EditarEnlace = function (enlace) {

		$scope.editarEnlace= angular.copy(enlace);
		console.log($scope.editarEnlace);
		//codigos postales
		$http.get("https://api-sepomex.hckdrk.mx/query/get_cp_por_estado/Morelos?token=55d025b2-48cd-46db-8748-6955ac7a580d",{
		}).then(function (response) {
           
			$scope.codigoPostal = response.data.response;
			
			$scope.cps =[];
			angular.forEach($scope.codigoPostal.cp, function(value, key){
			
				var tecnologia = {
					id : key,
					cp : value
				}
				$scope.cps.push(tecnologia);
			  });
			  console.log("--------")
			  console.log($scope.cps);
		});

		$scope.getData2();
		$("#editarModal").modal('show');

	};


	$scope.editarEnlaceData = function () {
		
		$scope.editarDatosEnlace={
			id: $scope.editarEnlace.id,
		   name: $scope.editarEnlace.name,
		   lastname: $scope.editarEnlace.lastname,
		   phoneNumber: $scope.editarEnlace.phoneNumber,
		   email: $scope.editarEnlace.email,
		   residence:{
			   municipality:$scope.editarEnlace.residence.municipality,
			   locality: $scope.editarEnlace.residence.locality,
			   street:$scope.editarEnlace.residence.street,
			   zipCode: ""+($scope.editarEnlace.residence.zipCode)
		   }
	   }
	

		console.log($scope.editarDatosEnlace);
		$http.put(APP_DEFAULT_URL.url + "admin/enlace",$scope.editarDatosEnlace, {

			headers: {
			   
				//    Authorization: localStorage.getItem("token") === null ? '': "Bearer " + localStorage.getItem("token"),
					   Accept:"*/*",
					   "Content-Type":"application/json",
					   Authorization: "Bearer "+ $scope.token,
		
					   "Access-Control-Allow-Origin":  "http://localhost:8080",
					   "Access-Control-Allow-Methods": "PUT",
					   "Access-Control-Allow-Headers": "Content-Type",
					   "Access-Control-Allow-Headers": "Authorization"
				   }
		}).then(function (response) {

			if (response.data.statusCode == 200) {
				Swal.fire(
					'Exito',
					'Actualizacion correcta',
					'success'
					);
				$scope.getEnlaces();
				$("#CerrarEditar").click();
			

			} else {
				Swal.fire(
					'Adverte',
					'La actualizacion no puede realizarse',
					'warning'
					);
			}
		}, function errorCallback(response) {
			Swal.fire(
				'Adverte',
				'Algo salío mal',
				'warning'
				);
			if (response.data.statusCode == 400) {
	
				console.log(response.data.statusCode);
				console.log(response.data.message);
				$scope.errores = response.data.errors;
				$scope.message = response.data.message;
				console.log($scope.errores);
				return $scope.errores = response.data.errors;
			}
			
		});



	};

	$scope.BorrarEnlace = function (id) {

		$scope.borrarEnlace = id;
		console.log("----------------");
		console.log("SE borrarar:"+id);
		$("#borrarModal").modal('show');
	};

	$scope.deleteEnlace = function () {
		$scope.borrar= {
			"id":$scope.borrarEnlace
		};

		$http({
			method: 'DELETE',
			url: APP_DEFAULT_URL.url + "admin/enlace",
			data: $scope.borrar,
			headers: {
			  //    Authorization: localStorage.getItem("token") === null ? '': "Bearer " + localStorage.getItem("token"),
			  Accept:"*/*",
			  "Content-Type":"application/json",
			  Authorization: "Bearer "+ $scope.token,

			  "Access-Control-Allow-Origin":  "http://localhost:8080",
			  "Access-Control-Allow-Methods": "*",
			  "Access-Control-Allow-Headers": "Content-Type",
			  "Access-Control-Allow-Headers": "Authorization"
			}
		})
		.then(function (response) {

			if (response.data.statusCode == 200) {
				Swal.fire(
					'Exito',
					'Eliminación correcta',
					'success'
					);
				$scope.getEnlaces();
				$("#CerrarEliminar").click();

			} else {
				Swal.fire(
					'Adverte',
					'La elimimación no puede realizarse',
					'warning'
					);
			}
		});


		
	};

});
