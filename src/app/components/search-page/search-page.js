function appSearchPageCtrl(SearchService, $state) {
  var self = this;
  this.searchParam = SearchService.getSearchParams() || {};

  this.carrierType = {
    "fields": [
      {
        "carrierType": "Full Truck Load(FTL)"
      },
      {
        "carrierType": "Less Than Truck Load(LTL)"
      },
      {
        "carrierType": "Refrigerated"
      },
      {
        "carrierType": "Flat Bed"
      },
      {
        "carrierType": "Dry Van"
      },
      {
        "carrierType": "Step Deck"
      },
      {
        "carrierType": "Long Haul Trucking"
      },
      {
        "carrierType": "Short Haul Trucking"
      },
      {
        "carrierType": "Heavy Haul Freight"
      },
      {
        "carrierType": "Oversized Freight"
      }
    ]
  };

  this.commodityType = {
    "commodityFields": [
      {
        "commodityType": "Solid"
      },
      {
        "commodityType": "Liquid"
      },
      {
        "commodityType": "Gas"
      }
    ]
  };

  this.searchPage = function () {
    SearchService
      .setSearchParams(self.searchParam);
    $state.go('searchResult');
  };

}


angular
  .module('app')
  .component('appSearchPage', {
    templateUrl: 'app/components/search-page/search-page.html',
    controller: appSearchPageCtrl
  });