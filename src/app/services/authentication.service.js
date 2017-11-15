function AuthService($http, APP_CONFIG, SessionManager) {
    var service = {};

/**
 * Sample Response:
 * 
 * {
	    "userLoginResponse": {
	        "loginStates": "Success",
	        "passworrdResetEnabled": "false"
	    }
    }
 */
    service.authenticate = function (username, password) {
        var payload = {
            "userLogin": {
                "emailId": username,
                "password": password
            }
        };
        return $http
            .post(APP_CONFIG.BaseUrl + APP_CONFIG.AuthApi, payload)
            .then(function(result){
                SessionManager.add({
                    user:result.data.userLoginResponse
                });
                return result.data.userLoginResponse;
            });
    };

    service.logout = function(){
        SessionManager.clear();
    };

    service.isLoggedIn = function () {
        return !!SessionManager.getAll().length;
    };

    service.getUserInfo = function () {
        return SessionManager.getAll()[0];
    };

    return service;
}

angular
    .module('app')
    .factory('AuthService', AuthService);