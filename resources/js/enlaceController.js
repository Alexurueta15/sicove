app.controller('enlaceController', function ($scope, $http, APP_DEFAULT_URL, $window) {
	$scope.token="eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiRW5sYWNlIiwidXNlcm5hbWUiOiJhbGFuQGdtYWlsLmNvbSIsInN1YiI6ImFsYW5AZ21haWwuY29tIiwiaWF0IjoxNjE4MjkxNzc3LCJleHAiOjE2MTgzMDk3Nzd9.si5mi9p9Kcon2V9FYjhVAolDekSKLby7yQcECRKWiYk";
    $scope.comite={};
	
    /*-----CRUD-----*/
	$scope.registrarNuevoComite = function () {
		
		$http.post(APP_DEFAULT_URL.url + "enlace/committee", $scope.comiteData, {
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

            console.log(response);
			if (response.data.statusCode == 200) {
				Swal.fire(
					'Exito',
					'Registro correcto',
					'success'
					);
					$scope.comiteData={};
					$scope.getCommittees();
					$("#CerrarCrear").click();
					

			} else {
				Swal.fire(
					'Adverte',
					'El registro no pudo realizarse',
					'warning'
					);
			}

		
		}, function errorCallback(response) {
			Swal.fire(
				'Adverte',
				'Algo salío mal',
				'warning'
				);
            console.log(response);
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
   
	
	$scope.getCommittees = function () {
		$http.get(APP_DEFAULT_URL.url + "enlace/committee",{
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
            console.log(response.data)
			$scope.comites = response.data;
		});
	};



	$scope.EditarCommittee = function (comite) {

		$scope.editarComite= angular.copy(comite);
		$("#editarModal").modal('show');

	};


	$scope.editarComiteData = function () {
		
		$scope.editarDatosComite={
			id: $scope.editarComite.id,
            alias: $scope.editarComite.alias,
            municipality: $scope.editarComite.municipality
	   }
	

		console.log($scope.editarDatosComite);
		$http.put(APP_DEFAULT_URL.url + "enlace/committee",$scope.editarDatosComite, {

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
				$scope.getCommittees();
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

	$scope.BorrarComite = function (id) {

		$scope.borrarComite = id;
		console.log("----------------");
		console.log("SE borrarar:"+id);
		$("#borrarModal").modal('show');
	};

	$scope.deleteComite = function () {
		$scope.borrar= {
			"id":$scope.borrarComite
		};

		$http({
			method: 'DELETE',
			url: APP_DEFAULT_URL.url + "enlace/committee",
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
                    $scope.getCommittees();
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


    $scope.AgregarMiembro = function (comite) {

		$window.localStorage.setItem('comite', JSON.stringify(comite));
        $window.location.href = "#/enlace/miembro";

	};

	$scope.getMiembros = function () {

		var datosComite = JSON.parse($window.localStorage.getItem("comite"));
		

		$http.get(APP_DEFAULT_URL.url + "enlace/committee/one",datosComite,{
			headers: {
			   
				Accept:"*/*",
				"Content-Type":"application/json",
				Authorization: "Bearer "+ $scope.token,
				"Access-Control-Allow-Origin":  "http://localhost:8080",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Headers": "Authorization"
			}
		}).then(function (response) {
            //console.log(response.data)
			$scope.comites = response.data;
			$scope.miembros = response.date.members;
			console.log("miembros");
			console.log(response);
		});

		$http.get(APP_DEFAULT_URL.url + "enlace/committee/positions",{
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
			console.log("esto es una prueba _--------------")
            console.log(response.data)
			$scope.posiciones = response.data;

		});
	};


	//Miembros

	$scope.registrarNuevoMiembro = function (MiembroData) {
		var datosComite = JSON.parse($window.localStorage.getItem("comite"));

		$scope.data = {
			"id":datosComite.id,
			"members": [
				{
					"name": $scope.MiembroData.members[0].name,
					"lastname": $scope.MiembroData.members[0].lastname,
					"phoneNumber": $scope.MiembroData.members[0].phoneNumber,
					"email": $scope.MiembroData.members[0].email,
					"residence": {
						"municipality": $scope.MiembroData.members[0].residence.municipality,
						"locality":  $scope.MiembroData.members[0].residence.locality,
						"street":  $scope.MiembroData.members[0].residence.street,
						"zipCode":  $scope.MiembroData.members[0].residence.zipCode
					},
					"position": {
						"id":"606ff8b14c111767bfa40150",
						"position": "Miembro"
					},
					"user": {
						"username":  $scope.MiembroData.members[0].user.username,
						"password": $scope.MiembroData.members[0].user.password
					}
				}
			]
		};

		console.log($scope.data);
		console.log("----------------- ")

		$http.post(APP_DEFAULT_URL.url + "enlace/committee/member", $scope.data, {
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

            console.log(response);
			if (response.data.statusCode == 200) {
				Swal.fire(
					'Exito',
					'Registro correcto',
					'success'
					);
					$scope.data={};
					//$scope.getCommittees();
					$("#CerrarCrear").click();
					

			} else {
				Swal.fire(
					'Adverte',
					'El registro no pudo realizarse',
					'warning'
					);
			}

		
		}, function errorCallback(response) {
			Swal.fire(
				'Adverte',
				'Algo salío mal',
				'warning'
				);
            console.log(response);
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
   
	$scope.posicionId = function(){

		var posiciones = $scope.posiciones;
		console.log($scope.MiembroData);
		posiciones.forEach(element => {
			if($scope.MiembroData.members[0].position.position == element.position){
				$scope.MiembroData.members[0].position.id=element.id; 
			}
		});
		console.log("llenado es ---- ");
		console.log($scope.MiembroData);
	}

	$scope.getCommittees = function () {
		$http.get(APP_DEFAULT_URL.url + "enlace/committee",{
			headers: {
			   
				Accept:"*/*",
				"Content-Type":"application/json",
				Authorization: "Bearer "+ $scope.token,
 
				"Access-Control-Allow-Origin":  "http://localhost:8080",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Headers": "Authorization"
			}
		}).then(function (response) {
            console.log(response.data)
			$scope.comites = response.data;
			
			var comites = $scope.comites;
			comites.forEach(element => {
				if($scope.MiembroData.members[0].position.position == element.position){
					$scope.MiembroData.members[0].position.id=element.id; 
				}
			});
		});
	};

	


	$scope.EditarMiembro = function (miembro) {

		$scope.editarMiembro= angular.copy(miembro);
		$("#editarModal").modal('show');

	};


	$scope.editarMiembroData = function () {
		
		$scope.editarDatosMiembro={
			id: $scope.editarMiembro.id,
            alias: $scope.editarMiembro.alias,
            municipality: $scope.editarMiembro.municipality
	   }
	

		console.log($scope.editarDatosMiembro);
		$http.put(APP_DEFAULT_URL.url + "enlace/committee/member",$scope.editarDatosMiembro, {

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
				//$scope.getCommittees();
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

	$scope.BorrarMiembro= function (id) {

		$scope.borrarMiembro = id;
		console.log("----------------");
		console.log("SE borrarar:"+id);
		$("#borrarModal").modal('show');
	};

	$scope.deleteMiembro = function () {
		$scope.borrar= {
			"id":$scope.borrarMiembro
		};

		$http({
			method: 'DELETE',
			url: APP_DEFAULT_URL.url + "enlace/committee/member",
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
                  //  $scope.getCommittees();
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
