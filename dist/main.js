angular.module("ghPagesApp",[]).controller("mainController",["$http","$q",function(t,n){function e(e){var o=n.defer(),r="https://api.github.com/repos/"+a.username+"/"+e+"/branches",i=!1;return t.get(r).then(function(t){t.data.forEach(function(t){"gh-pages"===t.name&&(i=!0)}),o.resolve(i)}),o.promise}var a=this;a.title="List your github pages",a.username="MartinSandstrom",a.allGhPages=[];var o=function(t){a.allGhPages=[];var n="http://"+a.username+".github.io/";t.data.forEach(function(t){if(!t.fork){e(t.name).then(function(e){if(e){var o=n+t.name;a.allGhPages.push(o)}})}})},r=function(t){console.log(t)};a.list=function(n){t.get("https://api.github.com/users/"+n+"/repos").then(o,r)}}]);