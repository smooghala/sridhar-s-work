var STORE_TYPE = {
    LOCAL: 'localStorage',
    SESSION: 'sessionStorage'
};

function ObjectStore(key, storeType) {
        this.key = key;
        this.storeType = storeType || STORE_TYPE.LOCAL;
        this.__data = angular.fromJson(window[this.storeType].getItem(this.key)) || [];
    }
    ObjectStore.prototype.add = function (value) {
        if (!angular.isObject(value)) {
            return false;
        }
        value.id = UUIDjs.create().hex;
        value.updatedOn = new Date();
        this.getAll().push(value);
        this.save();
        return true;
    };
    ObjectStore.prototype.update = function (id, value) {
        if (!angular.isObject(value)) {
            return false;
        }
        var obj = this.getById(id);
        if (obj) {
            for (var k in value) {
                obj[k] = value[k];
            }
            obj.updatedOn = new Date();
            this.save();
            return true;
        }
        return false;
    };
    ObjectStore.prototype.delete = function (id) {
        var obj = this.getById(id);
        if (obj) {
            var index = this.getAll().indexOf(obj);
            if (index >= 0) {
                this.getAll().splice(index, 1);
                this.save();
                return true;
            }
        }
        return false;
    };
    ObjectStore.prototype.getById = function (id) {
        return this.getAll().filter(function (obj) {
            return obj.id === id;
        })[0];
    };
    ObjectStore.prototype.getAll = function(){
        return this.__data;
    };
    ObjectStore.prototype.getStore = function(){
        return window[this.storeType];
    };
    ObjectStore.prototype.save = function () {
        this.getStore().setItem(this.key, angular.toJson(this.getAll()));
    };
    ObjectStore.prototype.clear = function(){
        this.__data = [];
        this.save();
    };


angular
    .module('app')
    .constant('STORE_TYPE', STORE_TYPE)
    .factory('ObjectStore', function(){
        return {
            get: function(key, storeType){
                return new ObjectStore(key, storeType);
            }
        };
    });