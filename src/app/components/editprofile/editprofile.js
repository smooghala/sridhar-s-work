function appEditProfilerCtrl(UserService, $state, $mdToast) {
    var self = this;
    this.user = {};

    this.$onInit = function () {
        UserService
            .getUserInfo("munna.sridhar@gmail.com")
            .then(self.getSuccess)
            .catch(self.handleError);
    };

    this.getSuccess = function (user) {
        self.user = user.data.getUserResponse.userDetails;
         self.user.line1=user.data.getUserResponse.userDetails.address.line1;
         self.user.line2=user.data.getUserResponse.userDetails.address.line2;
         self.user.city=user.data.getUserResponse.userDetails.address.city;
         self.user.state=user.data.getUserResponse.userDetails.address.state;
         self.user.zipcode=user.data.getUserResponse.userDetails.address.zipcode;

    };

    this.handleError = function (err) {
        console.error('Error retrieving User', err);
    };

    this.editProfile = function () {
        UserService
            .editProfile(self.user)
            .then(self.editSuccess)
            .catch(self.handleError);
    };


    this.editSuccess = function (response) {
        var redirectState = 'home';
        $state.go(redirectState);

        $mdToast.show(
            $mdToast.simple()
                .textContent('User Updated Successfully!!')
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
    .component('appEditProfile', {
        templateUrl: 'app/components/editprofile/editprofile.html',
        controller: appEditProfilerCtrl
    });
