(function() {
    'use strict';
    var app = angular.module('UC');

    function controller($http){
        var model = this;
    }

    app.component('navbar', {
        bindings: {
            search: '&'
        },
        templateUrl: "navbar.component.html",
        controllerAs: "model",
        controller: ['$http', controller]
    });
})();
