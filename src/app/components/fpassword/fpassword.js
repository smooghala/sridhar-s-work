
function appForgotPasswordrCtrl(){
    var self = this;
    this.user = {};

    this.forgotPassword = function(){
        alert(self.user.email);
    };
}




angular
  .module('app')
  .component('appForgotPassword', {
    templateUrl: 'app/components/fpassword/fpassword.html',
    controller: appForgotPasswordrCtrl
  });
