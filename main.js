angular.module('ghPagesApp', []).controller('mainController', function($http){

        var vm = this;
        vm.title = 'List your github pages';
        vm.username = 'MartinSandstrom';
        vm.allGhPages = [];

        var onSearchComplete = function(result){
            var url = 'http://' + vm.username + '.github.io/';
            result.data.forEach(function(data){
                    if(data.fork) return;


                    var newUrl = url + data.name
                    $http.get(newUrl).then(function(result){
                        vm.allGhPages.push(newUrl);
                    });
            });
        }

        var onError = function(err){
            console.log(err);
        }

        vm.list = function(username){
            $http.get('https://api.github.com/users/'+ username + '/repos')
            .then(onSearchComplete, onError);
        }
});
