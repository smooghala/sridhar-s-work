function NavCtrl(AuthService, $state){
  this.authService = AuthService;

  this.userInfo = this.authService.getUserInfo();

  this.logout = function(){
    AuthService.logout();
    $state.go('home');
  }
}

angular
  .module('app')
  .component('appNav', {
    templateUrl: 'app/components/nav/nav.html',
    controller: NavCtrl
  });
