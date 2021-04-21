app.controller(
  'comiteController',
  function ($scope, $http, APP_DEFAULT_URL, $window) {

    $scope.token = JSON.parse($window.localStorage.getItem('token'));
    $scope.infoSesion = {};
    $scope.peticionActual = {};

    /* C R U D   P E T I C I O N E S */

    $scope.getPeticiones = function () {


      $scope.token = JSON.parse($window.localStorage.getItem("token"));

      if ($scope.token != null) {
        $scope.sesion = $scope.desconversion($scope.token);
        console.log($scope.sesion);
        if ($scope.sesion.role == "Comité") {

          $http
            .get(APP_DEFAULT_URL.url + 'comite/committee', {
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
              $scope.infoSesion = response.data;

              $scope.idComite = {
                id: $scope.infoSesion.id
              };

              $http
                .post(
                  APP_DEFAULT_URL.url + 'comite/application/committee',
                  $scope.idComite, {
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
                .then(function (response2) {
                  $scope.peticiones = response2.data;
                });
            });

        } else {
          $window.location.href = "#/";


        }
      } else {
        $window.location.href = "#/";

      }
    };

    $scope.registrarPeticion = function () {
      $http
        .get(APP_DEFAULT_URL.url + 'comite/committee', {
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
          $scope.infoSesion = response.data;

          $scope.peticionData.committee = {
            id: $scope.infoSesion.id
          };

          $http
            .post(
              APP_DEFAULT_URL.url + 'comite/application',
              $scope.peticionData, {
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
        });
    };

    $scope.editarPeticionData = function (peticion) {
      $scope.editarPeticion = angular.copy(peticion);
      $('#editarModal').modal('show');
    };

    $scope.editPeticion = function () {
      $scope.actualizarData = {
        id: $scope.editarPeticion.id,
        description: $scope.editarPeticion.description,
      };

      $http
        .get(APP_DEFAULT_URL.url + 'comite/committee', {
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
        .then(function (response2) {
          $scope.infoSesion = response2.data;

          $scope.actualizarData.committee = {
            id: $scope.infoSesion.id
          };

          $http
            .put(
              APP_DEFAULT_URL.url + 'comite/application',
              $scope.actualizarData, {
                headers: {
                  Accept: '*/*',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + $scope.token,

                  'Access-Control-Allow-Origin': 'http://localhost:8080',
                  'Access-Control-Allow-Methods': 'PUT',
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
        });
    };

    /* C R U D   C O M E N T A R I O S */

    $scope.revisarPeticion = function (id) {
      $window.localStorage.setItem('idAppComite', id);
    };

    $scope.getInfo = function () {

      $scope.token = JSON.parse($window.localStorage.getItem("token"));

      if ($scope.token != null) {
        $scope.sesion = $scope.desconversion($scope.token);
        console.log($scope.sesion);
        if ($scope.sesion.role == "Comité") {

          $scope.petiData = {
            id: $window.localStorage.getItem('idAppComite'),
          };
          $http
            .post(APP_DEFAULT_URL.url + 'comite/application/one', $scope.petiData, {
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
              $scope.peticionActual = response.data;
            });

        } else {
          $window.location.href = "#/";

        }
      } else {
        $window.location.href = "#/";

      }
    };

    $scope.getComentarios = function () {
      $scope.revisar = {
        id: $window.localStorage.getItem('idAppComite'),
      };
      console.log('$scope.revisar');

      console.log($scope.revisar);
      $http
        .post(
          APP_DEFAULT_URL.url + 'comite/application/comentario',
          $scope.revisar, {
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
        });
    };

    $scope.registrarComentario = function () {
      $scope.mensajitoDos = $scope.nuevoCommentComite;

      console.log($scope.mensajitoDos);

      $scope.addCommentTo = {
        application: {
          id: $window.localStorage.getItem('idAppComite')
        },
        message: $scope.mensajitoDos.message,
      };

      console.log('$scope.addCommentTo');
      console.log($scope.addCommentTo);

      $http
        .post(
          APP_DEFAULT_URL.url + 'comite/application/comment',
          $scope.addCommentTo, {
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
          console.log(response);
          if (response.data.statusCode == 200) {
            Swal.fire('Exito', 'Registro correcto', 'success');
            $scope.addCommentTo = {};
            $scope.nuevoCommentComite={};
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
          let estados = response.data;
          estados.splice(0, 2);
          $scope.estaditos = estados;
        });
    };

    $scope.finalizarStatus = function () {
      $scope.statusDataCom = {
        id: $window.localStorage.getItem('idAppComite'),
        status: JSON.parse($scope.peticionStatusDataCom.status)
      };

      console.log($scope.statusDataCom);
      $http({
        method: 'PATCH',
        url: APP_DEFAULT_URL.url + 'comite/application',
        data: $scope.statusDataCom,
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
        console.table(response)
        if (response.data.statusCode == 200) {
          Swal.fire('Exito', 'Eliminación correcta', 'success');
          $('#CerrarEliminar').click();
          $scope.getPeticiones();
          $scope.getInfo();
        } else {
          Swal.fire(
            'Advertencia',
            'La finalizacion no puede realizarse hasta que el enlace lo autorice',
            'warning'
          );
        }
      });
    };



  }
);