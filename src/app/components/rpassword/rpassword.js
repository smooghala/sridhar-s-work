function appResetPasswordrCtrl(){
    var self = this;
    this.user = {};

    this.resetPassword = function(){
        alert(self.user.oldPassword);
    };
}


angular
  .module('app')
  .component('appResetPassword', {
    templateUrl: 'app/components/rpassword/rpassword.html',
    controller: appResetPasswordrCtrl
  });
