function appRegisterCtrl(UserService, $state, $mdToast, $scope) {
  var self = this;
  this.user = {};

  this.register = function () {
    UserService
      .createUser(self.user)
      .then(self.registerSuccess)
      .catch(self.handleError);
  };


this.focusMethod= function(){
  $scope.userRegisterForm.confirmPassword.$error = false;
    $scope.userRegisterForm.confirmPassword.$dirty = false;
}

this.comparePassword = function () {

  if (!angular.equals(self.user.password, self.user.confirmPassword)) {

    $scope.userRegisterForm.confirmPassword.$error = true;
    $scope.userRegisterForm.confirmPassword.$dirty = true;

  } else {
    $scope.userRegisterForm.confirmPassword.$error = false;
    $scope.userRegisterForm.confirmPassword.$dirty = false;

  }

}


  this.registerSuccess = function (response) {

    var redirectState = 'login';
    $state.go(redirectState);

    $mdToast.show(
      $mdToast.simple()
        .textContent('User Created Successfully!! Please login')
        .theme('success-toast')
        .hideDelay(6000)
    );


  }



  this.handleError = function (err) {
    console.error('Error Creating User', err);
  };

}






angular
  .module('app')
  .component('appRegister', {
    templateUrl: 'app/components/register/register.html',
    controller: appRegisterCtrl
  });
