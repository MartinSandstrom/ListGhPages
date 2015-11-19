angular.module('ghPagesApp', []).controller('mainController', ['$http', '$q', function ($http, $q) {

	var vm = this;
	vm.title = 'List your github pages';
	vm.username = 'MartinSandstrom';
	vm.allGhPages = [];
	vm.errorMessage = '';

	var onSearchComplete = function (result) {
		var url = 'http://' + vm.username + '.github.io/';
		result.data.forEach(function (data) {
			if (data.fork) {
				return;
			}

			hasGhPage(data.name).then(function (response) {
				if (!response) {
					return;
				}
				var newUrl = url + data.name;
				vm.allGhPages.push(newUrl);
			});
		});
	};

	var onError = function () {
		vm.errorMessage = 'Could not find user: ' + vm.username;
	};

	vm.list = function (username) {
		vm.allGhPages = [];
		$http.get('https://api.github.com/users/' + username + '/repos')
		.then(onSearchComplete, onError);
	};

	function hasGhPage(repo) {
		var deferred = $q.defer();
		var url = 'https://api.github.com/repos/' + vm.username + '/' + repo + '/branches';
		var hasGhPage = false;

		$http.get(url).then(function (response) {
			response.data.forEach(function (data) {
				if (data.name === 'gh-pages') {
					hasGhPage = true;
				}
			});
			deferred.resolve(hasGhPage);
		});
		return deferred.promise;
	}
}]);
