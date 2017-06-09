angular.module('UC').run(['$templateCache', function($templateCache) {$templateCache.put('artist-list.component.html','<div>\n    <label for="artists">Browse By Artist</label><br>\n    <select id="artists">\n        <option value="" selected="selected">--select artist--</option>\n        <option ng-repeat="artist in model.artists | orderBy" value="{{ artist._id }}">\n            {{ artist._id }}\n        </option>\n    </select>\n</div>\n');
$templateCache.put('dashboard.component.html','<div class="container-fluid">\n    <div class="row">\n        <navbar on-search="model.textSearch(search)"></navbar>\n        <div class="container">\n            <div class="row">\n                <div class="col-xs-12 col-sm-4">\n                    <section class="panel panel-default">\n                        <div class="panel-heading">\n                            <h2>Search filters</h2>\n                        </div>\n                        <div class="panel-body">\n                            <artist-list artists="model.artists"></artist-list>\n                        </div>\n                    </section>\n                </div>\n                <div class="col-xs-12 col-sm-8">\n                    <search-results results="model.results"></search-results>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n');
$templateCache.put('navbar.component.html','<nav class="navbar navbar-inverse">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class="container-fluid">\n        <div class="navbar-header">\n            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">\n                <span class="sr-only">Toggle navigation</span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n            </button>\n            <a class="navbar-brand" href="#">Righteous Grooves</a>\n        </div>\n        <div class="nav navbar-nav navbar-right">\n            <form>\n                <input type="text" class="form-control" placeholder="Search" ng-model="model.form.search" ng-model-options="{ debounce: 800 }">\n            </form>\n        </div>\n    </div>\n</nav>\n');
$templateCache.put('search-results.component.html','<section class="panel panel-default">\n    <div class="panel-heading">\n\n    </div>\n    <div class="panel-body">\n        <div ng-if="undefined === model.results.length || model.results.length == 0">\n            Please try searching...\n        </div>\n        <div ng-if="model.results.length > 0" class="list-group">\n            <h3 class="text-center" ng-if="model.selected._id">\n                {{ model.artist._id }}\n            </h3>\n            <dl>\n                <dt>\n                    Total Songs:\n                </dt>\n                <dd>\n                    {{ model.artist.songs }}\n                </dd>\n            </dl>\n\n            <a href="#" class="list-group-item" ng-repeat="track in model.results | orderBy: $index">\n                <strong>{{track._id}}</strong> by <em>{{track.album_artist}}</em>\n                <span class="pull-right glyphicon glyphicon-chevron-right"></span>\n            </a>\n            <!-- <a href="#" class="list-group-item" ng-repeat="track in model.results | orderBy:\'track_name\'">\n                <strong>{{track.track_name}}</strong> by <em>{{track.album_artist}}</em>\n                <span class="pull-right glyphicon glyphicon-chevron-right"></span>\n            </a> -->\n        </div>\n    </div>\n</section>\n');}]);