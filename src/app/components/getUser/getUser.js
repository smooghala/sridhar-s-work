function appGetUserCtrl(UserService, $state, $mdToast) {
    var self = this;
    this.user = {};

    this.$onInit = function () {
        UserService
            .getUserInfo(self.user.email)
            .then(self.getSuccess)
            .catch(self.handleError);
    };


    this.getSuccess = function (user) {
        self.user = user;
    };

    this.handleError = function (err) {
        console.error('Error retrieving User', err);
    };

}

angular
    .module('app')
    .component('appGetUser', {
         templateUrl: 'app/components/getUser/getUser.html',
        controller: appGetUserCtrl
    });
