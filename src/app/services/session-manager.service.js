function SessionManager(APP_CONFIG, ObjectStore, STORE_TYPE){
    return ObjectStore.get(APP_CONFIG.StoreKey, STORE_TYPE.SESSION);
}

angular
    .module('app')
    .factory('SessionManager', SessionManager);