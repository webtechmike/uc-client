(function() {
    'use strict';
    var app = angular.module('UC');

    function controller($http){
        var model = this;

        model.form = {
            search: 'love'
        };

        model.onSearch = function(search){
            console.log('SEARCHING...', search);
            model.search({'search': search});
        };
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
