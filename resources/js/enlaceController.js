app.controller('enlaceController', function ($scope, $http, APP_DEFAULT_URL, $window) {
	$scope.token = JSON.parse($window.localStorage.getItem("token"));
	$scope.comite = {};

	/*-----CRUD-----*/

	$scope.ObtenerMunicipios = function () {
		$http.get("https://api-sepomex.hckdrk.mx/query/get_municipio_por_estado/Morelos" + "?token=55d025b2-48cd-46db-8748-6955ac7a580d", {}).then(function (response) {
			console.log(response.data)
			$scope.municipiosMor = response.data;

		});
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



	$scope.registrarNuevoComite = function () {

		$http.post(APP_DEFAULT_URL.url + "enlace/committee", $scope.comiteData, {
			headers: {

				Accept: "*/*",
				"Content-Type": "application/json",
				Authorization: "Bearer " + $scope.token,
				"Access-Control-Allow-Origin": "http://localhost:8080",
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
				$scope.comiteData = {};
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

		})


	};


	$scope.getCommittees = function () {






		$scope.token = JSON.parse($window.localStorage.getItem("token"));

		if ($scope.token != null) {
			$scope.sesion = $scope.desconversion($scope.token);
			console.log($scope.sesion);
			if ($scope.sesion.role == "Enlace") {

				$http.get(APP_DEFAULT_URL.url + "enlace/committee", {
					headers: {

						Accept: "*/*",
						"Content-Type": "application/json",
						Authorization: "Bearer " + $scope.token,

						"Access-Control-Allow-Origin": "http://localhost:8080",
						"Access-Control-Allow-Methods": "*",
						"Access-Control-Allow-Headers": "Content-Type",
						"Access-Control-Allow-Headers": "Authorization"
					}
				}).then(function (response) {
					console.log(response.data)
					$scope.comites = response.data;
					$scope.ObtenerMunicipios();
				});

			} else {
				$window.location.href = "#/";


			}
		} else {
			$window.location.href = "#/";

		}





	};



	$scope.EditarCommittee = function (comite) {

		$scope.editarComite = angular.copy(comite);
		$scope.ObtenerMunicipios();
		$("#editarModal").modal('show');

	};


	$scope.editarComiteData = function () {

		$scope.editarDatosComite = {
			id: $scope.editarComite.id,
			alias: $scope.editarComite.alias,
			municipality: $scope.editarComite.municipality
		}


		console.log($scope.editarDatosComite);
		$http.put(APP_DEFAULT_URL.url + "enlace/committee", $scope.editarDatosComite, {

			headers: {

				Accept: "*/*",
				"Content-Type": "application/json",
				Authorization: "Bearer " + $scope.token,

				"Access-Control-Allow-Origin": "http://localhost:8080",
				"Access-Control-Allow-Methods": "PUT",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Headers": "Authorization"
			}
		}).then(function (response) {
			console.log(response);
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
		console.log("SE borrarar:" + id);
		$("#borrarModal").modal('show');
	};

	$scope.deleteComite = function () {
		$scope.borrar = {
			"id": $scope.borrarComite
		};

		$http({
				method: 'DELETE',
				url: APP_DEFAULT_URL.url + "enlace/committee",
				data: $scope.borrar,
				headers: {
					Accept: "*/*",
					"Content-Type": "application/json",
					Authorization: "Bearer " + $scope.token,

					"Access-Control-Allow-Origin": "http://localhost:8080",
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


	/*-----CRUD MIEMBRO COMITE-----*/

	$scope.AgregarMiembro = function (comite) {

		$window.localStorage.setItem('comite', JSON.stringify(comite));
		$window.location.href = "#/enlace/miembro";

	};

	$scope.getData = function () {

		$scope.MiembroData.members[0].residence.street = null;
		$scope.MiembroData.members[0].residence.municipality = "";
		$scope.MiembroData.members[0].residence.locality = "";
		console.log($scope.MiembroData.members[0].residence.zipCode);

		$http.get("https://api-sepomex.hckdrk.mx/query/info_cp/" + $scope.MiembroData.members[0].residence.zipCode + "?token=55d025b2-48cd-46db-8748-6955ac7a580d", {}).then(function (response) {
			console.log(response.data)
			$scope.domicilioData = response.data;
			$scope.colonias = response.data;
			console.log("--------")
			// console.log($scope.cps);
		});


	};

	$scope.getData2 = function () {

		$scope.editarMiembro.residence.street = null;
		$scope.editarMiembro.residence.municipality = "";
		$scope.editarMiembro.residence.locality = "";
		console.log($scope.editarMiembro.residence.zipCode);

		$http.get("https://api-sepomex.hckdrk.mx/query/info_cp/" + $scope.editarMiembro.residence.zipCode + "?token=55d025b2-48cd-46db-8748-6955ac7a580d", {}).then(function (response) {
			console.log(response.data)
			$scope.domicilioData = response.data;
			$scope.colonias = response.data;
			console.log("--------")
			// console.log($scope.cps);
		});
	};

	$scope.getPosiciones = function () {
		/*--------*/
		var header = {

			Accept: "*/*",
			"Content-Type": "application/json",
			Authorization: "Bearer " + $scope.token,
			"Access-Control-Allow-Origin": "http://localhost:8080",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Allow-Headers": "Authorization"
		}

		$http.get(APP_DEFAULT_URL.url + "enlace/committee/positions", {
			headers: header
		}).then(function (response) {

			console.log(response.data)
			$scope.posiciones = response.data;
			$scope.posiciones.splice(0, 1);
			var miembros = $scope.miembrosComite;
			var posiciones = $scope.posiciones;
			console.log(posiciones);
			miembros.forEach(element => {

				console.log(element.position.position);
				if (posiciones[0].position == element.position.position && posiciones[0].position == "Presidente") {
					console.log("La posicion es: " + element.position.position);
					$scope.posiciones.splice(0, 1);
				}
				if (posiciones[1].position == element.position.position && posiciones[1].position == "Vicepresidente") {
					console.log("La posicion es: " + element.position.position);
					$scope.posiciones.splice(1, 1);
				}
				if (posiciones[0].position == element.position.position && posiciones[0].position == "Vicepresidente") {
					console.log("La posicion es: " + element.position.position);
					$scope.posiciones.splice(0, 1);
				}
			});

			console.log($scope.posiciones);




		});



	}



	$scope.getPosicionesEditar = function () {

		var miembros = $scope.editarMiembro;
		var posiciones = $scope.posiciones;
		console.log(posiciones);
		posiciones.forEach(function (element, indice, array) {

			console.log(element.position);
			console.log(miembros.position.position);
			if (element.position !== miembros.position.position) {
				console.log("Entro a la posicion que debe ")
				$scope.posiciones.push(miembros.position);
			}


		});

		console.log($scope.posiciones);







	}

	$scope.mostrarUserPassword = function () {

		if ($scope.editarMiembro.position.position == "Vicepresidente") {
			$scope.mostrarSeccionUser = true;
		} else if ($scope.editarMiembro.position.position == "Presidente") {
			$scope.mostrarSeccionUser = true;
		} else {
			$scope.mostrarSeccionUser = false;
		}

	}

	$scope.getMiembros = function () {


		$scope.token = JSON.parse($window.localStorage.getItem("token"));

		if ($scope.token != null) {
			$scope.sesion = $scope.desconversion($scope.token);
			console.log($scope.sesion);
			if ($scope.sesion.role == "Enlace") {


				$scope.datosComiteLocal = JSON.parse($window.localStorage.getItem("comite"));
				$scope.comiteConsultado = {
					"id": $scope.datosComiteLocal.id
				}
				/*--------*/
				var header = {

					Accept: "*/*",
					"Content-Type": "application/json",
					Authorization: "Bearer " + $scope.token,
					"Access-Control-Allow-Origin": "http://localhost:8080",
					"Access-Control-Allow-Methods": "*",
					"Access-Control-Allow-Headers": "Content-Type",
					"Access-Control-Allow-Headers": "Authorization"
				}
				$http.post(APP_DEFAULT_URL.url + "enlace/committee/one", $scope.comiteConsultado, {
					headers: header
				}).then(function (response) {

					console.log("miembros");
					console.log(response);
					$scope.miembrosComite = response.data.members;
					$scope.getPosiciones();

				});


				$http.get("https://api-sepomex.hckdrk.mx/query/get_cp_por_estado/Morelos?token=55d025b2-48cd-46db-8748-6955ac7a580d", {}).then(function (response) {
					console.log(response.data.response)
					$scope.codigoPostal = response.data.response;

					$scope.cps = [];
					angular.forEach($scope.codigoPostal.cp, function (value, key) {

						var tecnologia = {
							id: key,
							cp: value
						}
						$scope.cps.push(tecnologia);
					});
					console.log("--------")
					console.log($scope.cps);
				});

			} else {
				$window.location.href = "#/";


			}
		} else {
			$window.location.href = "#/";

		}



	};


	//Miembros

	$scope.registrarNuevoMiembro = function () {
		var datosComite = JSON.parse($window.localStorage.getItem("comite"));
		var posiciones = $scope.posiciones;
		posiciones.forEach(element => {

			console.log(element.position.position);
			if (element.position == $scope.MiembroData.members[0].position.position) {
				$scope.MiembroData.members[0].position.id = element.id
			}
		});
		console.log($scope.MiembroData);

		$scope.data = {
			"id": datosComite.id,
			"members": [{
				"name": $scope.MiembroData.members[0].name,
				"lastname": $scope.MiembroData.members[0].lastname,
				"phoneNumber": $scope.MiembroData.members[0].phoneNumber,
				"email": $scope.MiembroData.members[0].email,
				"residence": {
					"municipality": $scope.MiembroData.members[0].residence.municipality,
					"locality": $scope.MiembroData.members[0].residence.locality,
					"street": $scope.MiembroData.members[0].residence.street,
					"zipCode": $scope.MiembroData.members[0].residence.zipCode
				},
				"position": {
					"id": $scope.MiembroData.members[0].position.id,
					"position": $scope.MiembroData.members[0].position.position
				},
				"user": {
					"username": $scope.MiembroData.members[0].user.username,
					"password": $scope.MiembroData.members[0].user.password
				}
			}]
		};

		console.log($scope.data);
		console.log("----------------- ")

		$http.post(APP_DEFAULT_URL.url + "enlace/committee/member", $scope.data, {
			headers: {

				Accept: "*/*",
				"Content-Type": "application/json",
				Authorization: "Bearer " + $scope.token,
				"Access-Control-Allow-Origin": "http://localhost:8080",
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
					$scope.getMiembros();
					$scope.data = {};
					$scope.MiembroData = {};
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


	$scope.EditarMiembro = function (miembro) {

		$scope.editarMiembro = angular.copy(miembro);
		var codigoPostalEditar = $scope.editarMiembro.residence.zipCode;
		console.log(codigoPostalEditar);
		$http.get("https://api-sepomex.hckdrk.mx/query/info_cp/" + codigoPostalEditar + "?token=55d025b2-48cd-46db-8748-6955ac7a580d", {}).then(function (response) {
			console.log(response.data)
			$scope.domicilioData = response.data;
			$scope.colonias = response.data;
			console.log("--------")
			// console.log($scope.cps);
		});
		$scope.getPosicionesEditar();
		$("#editarModal").modal('show');
		$scope.mostrarUserPassword();
	};


	$scope.editarMiembroData = function () {
		var datosComite = JSON.parse($window.localStorage.getItem("comite"));
		var posiciones = $scope.posiciones;
		console.log(posiciones);
		var posicionMiembro = $scope.editarMiembro.position.position;
		posiciones.forEach(element => {

			console.log(element.position);
			if (element.position == posicionMiembro) {
				$scope.editarMiembro.position.id = element.id
			}
		});
		if ($scope.editarMiembro.position.position == "Miembro") {
			$scope.editarDatosMiembro = {
				"id": datosComite.id,
				"members": [{
					"id": $scope.editarMiembro.id,
					"name": $scope.editarMiembro.name,
					"lastname": $scope.editarMiembro.lastname,
					"phoneNumber": $scope.editarMiembro.phoneNumber,
					"email": $scope.editarMiembro.email,
					"residence": {
						"municipality": $scope.editarMiembro.residence.municipality,
						"locality": $scope.editarMiembro.residence.locality,
						"street": $scope.editarMiembro.residence.street,
						"zipCode": $scope.editarMiembro.residence.zipCode
					},
					"position": {
						"id": $scope.editarMiembro.position.id,
						"position": $scope.editarMiembro.position.position
					},
					"user": {
						"username": "default@gmail.com",
						"password": "Uno234"
					}
				}]
			}

		} else {
			$scope.editarDatosMiembro = {
				"id": datosComite.id,
				"members": [{
					"id": $scope.editarMiembro.id,
					"name": $scope.editarMiembro.name,
					"lastname": $scope.editarMiembro.lastname,
					"phoneNumber": $scope.editarMiembro.phoneNumber,
					"email": $scope.editarMiembro.email,
					"residence": {
						"municipality": $scope.editarMiembro.residence.municipality,
						"locality": $scope.editarMiembro.residence.locality,
						"street": $scope.editarMiembro.residence.street,
						"zipCode": $scope.editarMiembro.residence.zipCode
					},
					"position": {
						"id": $scope.editarMiembro.position.id,
						"position": $scope.editarMiembro.position.position
					},
					"user": {
						"username": $scope.editarMiembro.user.username,
						"password": $scope.editarMiembro.user.password
					}
				}]
			}
		}

		console.log($scope.editarDatosMiembro);
		$http.put(APP_DEFAULT_URL.url + "enlace/committee/member", $scope.editarDatosMiembro, {

			headers: {

				Accept: "*/*",
				"Content-Type": "application/json",
				Authorization: "Bearer " + $scope.token,

				"Access-Control-Allow-Origin": "http://localhost:8080",
				"Access-Control-Allow-Methods": "PUT",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Headers": "Authorization"
			}
		}).then(function (response) {

			console.log(response);
			if (response.data.statusCode == 200) {
				Swal.fire(
					'Exito',
					'Actualizacion correcta',
					'success'
				);
				$scope.getMiembros();
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

	$scope.BorrarMiembro = function (id) {

		$scope.borrarMiembro = id;
		console.log("----------------");
		console.log("SE borrarar:" + id);
		$("#borrarModal").modal('show');
	};

	$scope.deleteMiembro = function () {
		var datosComite = JSON.parse($window.localStorage.getItem("comite"));
		$scope.borrar = {
			"id": datosComite.id,
			"members": [{
				"id": $scope.borrarMiembro
			}]
		}

		console.log($scope.borrar);

		$http({
				method: 'DELETE',
				url: APP_DEFAULT_URL.url + "enlace/committee/member",
				data: $scope.borrar,
				headers: {
					Accept: "*/*",
					"Content-Type": "application/json",
					Authorization: "Bearer " + $scope.token,

					"Access-Control-Allow-Origin": "http://localhost:8080",
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
					$scope.getMiembros();
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