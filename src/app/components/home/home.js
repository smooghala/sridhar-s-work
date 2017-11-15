function HomeCtrl() {
  this.category = ['Road', 'Ocean', 'Rail', 'Air', '3PL', 'Warehouse & Distribution', 'Freight Forwarding', 'Consolidation'];
}

angular
  .module('app')
  .component('appHome', {
    templateUrl: 'app/components/home/home.html',
    controller: HomeCtrl
  });
