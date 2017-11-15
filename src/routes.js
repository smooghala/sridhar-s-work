angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('!');
  $urlRouterProvider.otherwise('home');

  $stateProvider
    .state('app', {
      abstract: true,
      url: '/',
      component: 'appMain'
    })
    .state('home', {
      parent: 'app',
      url: 'home',
      component: 'appHome'
    })
    .state('register', {
      parent: 'app',
      url: 'register',
      component: 'appRegister'
    })
    .state('login', {
      parent: 'app',
      url: 'login',
      component: 'appLogin'
    })
    .state('forgotPassword', {
      parent: 'app',
      url: 'fpassword',
      component: 'appForgotPassword'
    })
    .state('resetPassword', {
      parent: 'app',
      url: 'rpassword',
      component: 'appResetPassword'
    })
    .state('searchPage', {
      parent: 'app',
      url: 'searchpage',
      component: 'appSearchPage'
    })
    .state('searchResult', {
      parent: 'app',
      url: 'searchResult',
      component: 'appSearchResult'
    }).state('editprofile', {
      parent: 'app',
      url: 'editprofile',
      component: 'appEditProfile'
    }).state('getUser', {
      parent: 'app',
      url: 'getUser',
      component: 'appGetUser'
    }).state('aboutus', {
      parent: 'app',
      url: 'aboutus',
      component: 'aboutus'
    });
}
