(function() {
    'use strict';
    var app = angular.module('UC');

    function controller(){
        var model = this;
    }

    app.component('artistList', {
        templateUrl: "artist-list.component.html",
        bindings: {
            artists: '<'
        },
        controllerAs: "model",
        controller: [controller]
    });
})();
