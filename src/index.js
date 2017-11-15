angular
  .module('app', ['ui.router', 'ngMaterial', 'ngMessages', 'md.data.table']);


function loadConfig() {
  var http = angular.injector(['ng']).get('$http');

  return http.get('config.json')
    .then(function (result) {
      return result.data;
    });
}

function createConfigFactory(config) {
  return angular
    .module('app')
    .constant('APP_CONFIG', config);
}

function bootstrapApp() {
  loadConfig()
    .then(createConfigFactory)
    .then(function () {
      angular.bootstrap(document, ['app']);
    });
}

bootstrapApp();