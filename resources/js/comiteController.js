app.controller(
    'comiteController',
    function ($scope, $http, APP_DEFAULT_URL, $window) {
      $scope.token =
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtb25pY2FAZ21haWwuY29tIiwiZXhwIjoxNjE2NzQwNTk1LCJpYXQiOjE2MTY3MjI1OTUsInJvbCI6eyJhdXRob3JpdHkiOiJlbmxhY2UifSwidXNlcm5hbWUiOiJtb25pY2FAZ21haWwuY29tIn0.66hOqdEJgjWdrBwCJab93iWdcEWKAKEeThv870deSomzt7E1nes1uWl_CqCqeMUXQ_ZMFRS5R8XaGEgRhRfaqw';
  
      /* C R U D   P E T I C I O N E S */
  
      $scope.getPeticiones = function () {
        $http
          .get(APP_DEFAULT_URL.url + 'comite/application', {
            headers: {
              Accept: '*/*',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + $scope.token,
  
              'Access-Control-Allow-Origin': 'http://localhost:8080',
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Headers': 'Authorization',
            },
          })
          .then(function (response) {
            $scope.peticiones = response.data;
          });
      };
  
      $scope.registrarPeticion = function () {
        $http
          .post(APP_DEFAULT_URL.url + 'comite/application', $scope.peticionData, {
            headers: {
              Accept: '*/*',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + $scope.token,
  
              'Access-Control-Allow-Origin': 'http://localhost:8080',
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Headers': 'Authorization',
            },
          })
          .then(function (response) {
            if (response.data.statusCode == 200) {
              Swal.fire('Exito', 'Registro correcto', 'success');
              $scope.peticionData = {};
              $scope.getPeticiones();
              $('#CerrarCrear').click();
            } else {
              Swal.fire(
                'Advertencia',
                'El registro no pudo realizarse',
                'warning'
              );
            }
          });
      };
  
      $scope.editarPeticionData = function (peticion) {
        $scope.editarPeticion = angular.copy(peticion);
        $('#editarModal').modal('show');
      };
  
      $scope.editarPeticion = function () {
        $scope.actualizarData = {
          id: $scope.editarPeticion.id,
          committee: $scope.editarPeticion.committee.id,
          description: $scope.editarPeticion.description,
        };
  
        console.log($scope.actualizarData);
        $http
          .patch(
            APP_DEFAULT_URL.url + 'comite/application',
            $scope.actualizarData,
            {
              headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + $scope.token,
  
                'Access-Control-Allow-Origin': 'http://localhost:8080',
                'Access-Control-Allow-Methods': 'PATCH',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Headers': 'Authorization',
              },
            }
          )
          .then(function (response) {
            if (response.data.statusCode == 200) {
              Swal.fire('Exito', 'Actualizacion correcta', 'success');
              $('#CerrarEditar').click();
              $scope.getPeticiones();
            } else {
              Swal.fire(
                'Advertencia',
                'La actualizacion no puede realizarse',
                'warning'
              );
            }
          });
      };
  
      $scope.borrarPeticion = function (id) {
        $scope.varBorrarPeticion = id;
        $('#borrarModal').modal('show');
      };
  
      $scope.deletePeticion = function () {
        $scope.borrar = {
          id: $scope.varBorrarPeticion,
        };
  
        $http({
          method: 'DELETE',
          url: APP_DEFAULT_URL.url + 'comite/application',
          data: $scope.borrar,
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + $scope.token,
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Headers': 'Authorization',
          },
        }).then(function (response) {
          if (response.data.statusCode == 200) {
            Swal.fire('Exito', 'Eliminación correcta', 'success');
            $('#CerrarEliminar').click();
            $scope.getPeticiones();
          } else {
            Swal.fire(
              'Advertencia',
              'La eliminación no puede realizarse',
              'warning'
            );
          }
        });
      };
  
      /* C R U D   C O M E N T A R I O S */
  
      $scope.revisarPeticion = function (peticion) {
        $scope.varRevisarPeticion = peticion;
        $('#borrarModal').modal('show');
      };
  
      $scope.getComentarios = function () {
        $scope.revisar = {
          id: $scope.varRevisarPeticion.id,
        };
  
        $http
          .get(
            APP_DEFAULT_URL.url + 'comite/application/comment',
            $scope.revisar,
            {
              headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + $scope.token,
  
                'Access-Control-Allow-Origin': 'http://localhost:8080',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Headers': 'Authorization',
              },
            }
          )
          .then(function (response) {
            $scope.comentarios = response.data;
            $scope.peticionActual = $scope.varRevisarPeticion;
          });
      };
  
      $scope.registrarComentario = function () {
        $http
          .post(
            APP_DEFAULT_URL.url + 'comite/application/comment',
            $scope.comentarioData,
            {
              headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + $scope.token,
  
                'Access-Control-Allow-Origin': 'http://localhost:8080',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Headers': 'Authorization',
              },
            }
          )
          .then(function (response) {
            if (response.data.statusCode == 200) {
              Swal.fire('Exito', 'Registro correcto', 'success');
              $scope.comentarioData = {};
              $scope.getComentarios();
              $('#CerrarCrear').click();
            } else {
              Swal.fire(
                'Advertencia',
                'El registro no pudo realizarse',
                'warning'
              );
            }
          });
      };
  
      $scope.getEstados = function () {
        $('#estadoModal').modal('show');
  
        $http
          .get(APP_DEFAULT_URL.url + 'comite/application/status', {
            headers: {
              Accept: '*/*',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + $scope.token,
  
              'Access-Control-Allow-Origin': 'http://localhost:8080',
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Headers': 'Authorization',
            },
          })
          .then(function (response) {
            $scope.estados = response.data;
          });
      };
  
      $scope.cambiarStatus = function () {
        $scope.statusData = {
          id: $scope.varRevisarPeticion.id,
          status: { $id: scope.peticionStatusData.status.id },
        };
  
        console.log($scope.statusData);
        $http
          .patch(APP_DEFAULT_URL.url + 'application', $scope.statusData, {
            headers: {
              Accept: '*/*',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + $scope.token,
  
              'Access-Control-Allow-Origin': 'http://localhost:8080',
              'Access-Control-Allow-Methods': 'PATCH',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Headers': 'Authorization',
            },
          })
          .then(function (response) {
            if (response.data.statusCode == 200) {
              Swal.fire('Exito', 'Actualizacion correcta', 'success');
              $('#cerrarEstadoModal').click();
            } else {
              Swal.fire(
                'Advertencia',
                'La actualizacion no puede realizarse',
                'warning'
              );
            }
          });
      };
    }
  );
  