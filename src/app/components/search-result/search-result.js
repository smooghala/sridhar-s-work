function appSearchResultCtrl(SearchService, $state) {
  var self = this;
  this.searchResult = [];

  this.selected = [];
  //this.limitOptions = [10, 20, 30];

  this.options = {
    rowSelection: true,
    multiSelect: true,
    autoSelect: true
  };


  this.query = {
    order: 'companyName',
    limit: 10,
    page: 1
  };

  this.promise = null;

  this.paginate = function () {
    self.promise = SearchService.searchCompanies(self.query.page, self.query.limit);
    self.promise
      .then(function (res) {
        self.searchResult = res.ServiceProvidersList.map(function (c) {
          return c.serviceProvider;
        });
      });
  };

  this.$onInit = function () {
    self.paginate();
  };

  this.sendRFQ = function () {
    SearchService
      .sendRFQ(this.selected)
      .then(function (res) {

        $state.go('getUser');
      });
  }




}


angular
  .module('app')
  .component('appSearchResult', {
    templateUrl: 'app/components/search-result/search-result.html',
    controller: appSearchResultCtrl
  });