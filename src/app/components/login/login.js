function appLoginrCtrl(AuthService, $state) {
  var self = this;
  this.user = {};

  this.login = function () {
    AuthService
      .authenticate(self.user.email, self.user.password)
      .then(self.loginSuccess)
      .catch(self.handleError);
  };

  this.loginSuccess = function (response) {
    debugger;
    if (response.loginStatus === 'Success') {
      var redirectState = response.passworrdResetEnabled==='true' ? 'resetPassword' : 'searchPage';
      $state.go(redirectState);
    }
  };

  this.handleError = function (err) {
    console.error('Error Authenticating User', err);
  };
}

angular
  .module('app')
  .component('appLogin', {
    templateUrl: 'app/components/login/login.html',
    controller: appLoginrCtrl
  });
