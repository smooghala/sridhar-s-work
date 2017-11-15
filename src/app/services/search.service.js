function SearchService($http, APP_CONFIG, AuthService) {
    var service = {};
    var _searchParams = {};

    service.searchCompanies = function (page, size) {

        var payload = {
            "searchServiceProviders": {
                "startdate": _searchParams.startdate || '',
                "enddate": _searchParams.enddate || '',
                "startZipCode": _searchParams.startLocation || '',
                "endZipCode": _searchParams.endLocation || '',
                "carrierType": _searchParams.carrierType || '',
                "commodityType": _searchParams.commodityType || '',
                "pageNumber": page || 1,
                "pageSize": size || 10
            }
        };

        return $http
            .post(APP_CONFIG.BaseUrl + APP_CONFIG.search, payload)
            .then(function (result) {
                return result.data.searchServiceProvidersResponse;
            });
    };

    service.setSearchParams = function (searchParams) {
        _searchParams = searchParams || {};
    };

    service.getSearchParams = function () {
        return _searchParams;
    };


    service.sendRFQ = function (selectedRFQ) {
        this.authService = AuthService;
        this.userInfo = this.authService.getUserInfo();
        var userEmailId = this.userInfo.user.userId;
        var payload = {
            "sendRFQ": {
                "startdate": _searchParams.startdate || '',
                "enddate": _searchParams.enddate || '',
                "startZipCode": _searchParams.startLocation || '',
                "endZipCode": _searchParams.endLocation || '',
                "carrierType": _searchParams.carrierType || '',
                "commodityType": _searchParams.commodityType || '',
                "userEmailId": userEmailId,
                "quantity": "1",
                "commentsAndRequirements": "additional details"
            }
        };

        payload = Object.assign(payload);

        payload.sendRFQ.serviceProviderList = selectedRFQ.map(function (pl) {
            return {
                "dOTNo": pl.dOTNo,
                "name": pl.carrierName,
                "email": pl.email
            };
        });

        return $http
            .post(APP_CONFIG.BaseUrl + APP_CONFIG.sendRFQ, payload)
            .then(function (result) {
                return result.data.sendRFQResponse;
            });
    };


    return service;
}

angular
    .module('app')
    .factory('SearchService', SearchService);