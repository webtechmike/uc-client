(function() {
    'use strict';

    var app = angular.module('UC');

    function controller(API, $http) {
        var model = this;
        model.artists = [];

        model.updateSelection = function(artist){
            model.selected = JSON.parse(artist);
            // model.selected = artist;
        };

        model.textSearch = function(searchTerm){
            API.textSearch(searchTerm)
                .then(function(response){
                    model.results = response.data;
                }, function(err){
                    console.log(err);
                });
        };

        model.onSearch = function(artist){
            console.log('ARTEEST:', artist);
            model.search({'artist': artist});
        };

        model.$onInit = function(){
            API.fetchArtists($http)
                .then(function(response){
                    console.log('res', response.data);
                    model.artists = response.data;
                    model.results = response.data;
                });
        };
    }

    app.component('app', {
        templateUrl: 'dashboard.component.html',
        controllerAs: 'model',
        controller: ['API', '$http', controller]
    });

})();
