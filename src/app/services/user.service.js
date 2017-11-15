function UserService($http, APP_CONFIG) {
    var service = {};

    service.createUser = function (userObj) {

        var payload = {
            "createUser": {
                "userDetails": {
                    "firstName": userObj.firstName,
                    "lastName": userObj.lastName,
                    "emailId": userObj.emailId,
                    "password": userObj.password,
                    "address": {
                        "line1": userObj.line1,
                        "line2": userObj.line2,
                        "city": userObj.city,
                        "state": userObj.state,
                        "country": "USA",
                        "zipcode": userObj.zipcode
                    },
                    "phoneNumber": userObj.phoneNumber,
                    "faxNumber": userObj.faxNumber
                }
            }
        };

        return $http
            .post(APP_CONFIG.BaseUrl + APP_CONFIG.createUser, payload)
            .then(function (result) {
                return result.data;
            });



    }

    service.editProfile = function (userObj) {

        var payload = {
            "updateUser": {
                "userDetails": {
                    "firstName": userObj.firstName,
                    "lastName": userObj.lastName,
                    "emailId": userObj.emailId,
                    "address": {
                        "line1": userObj.line1,
                        "line2": userObj.line2,
                        "city": userObj.city,
                        "state": userObj.state,
                        "country": "USA",
                        "zipcode": userObj.zipcode
                    },
                    "phoneNumber": userObj.phoneNumber,
                    "faxNumber": userObj.faxNumber
                }
            }
        };

        return $http
            .post(APP_CONFIG.BaseUrl + APP_CONFIG.editUser, payload)
            .then(function (result) {

                return result.data;
            });
    }

    service.getUserInfo = function (email) {
        encodeEmail = email.replace('@', "%40");


        var url = APP_CONFIG.BaseUrl + APP_CONFIG.getUser + '?emailId=' + encodeEmail;

        return $http({
            method: 'GET',
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

        });


    };

    return service;
}

angular
    .module('app')
    .factory('UserService', UserService);