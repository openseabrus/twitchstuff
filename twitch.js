var app = angular.module('myApp', ['ngRoute']);
app.controller('myCtrl', function ($scope, $http) {
    $scope.rawdata = 1;
    $http({
            method: "get",
            url: 'https://api.twitch.tv/kraken/games/top',
            headers: {
                'Client-ID': 'tiju3v0q53ox9fxp7za3vjdalpfthu2'
            }
        })
        .success(function (data, status, config) {
            test(data);
        });

    function test(data) {
        $scope.stat = data._total + " games being streamed right now.";
        $scope.test = data.name;
        $scope.logo = data.logo;
        $scope.top = data.top;
        return data;
    }

    function check(data, streamer) {
        if (data.stream) {
            var dated = new Date(data.stream.created_at).getTime();
            var daten = new Date().getTime();
            var diff = new Date(daten - dated);

            var days = diff.getDate() - 1;
            days = days > 0 ? (days == 1 ? days + " day, " : days + " days, ") : "";
            var hours = diff.getHours();
            hours = hours > 0 ? (hours == 1 ? hours + " hour, " : hours + " hours, ") : "";
            var minutes = diff.getMinutes();
            minutes = minutes == 1 ? minutes + " minute and " : minutes + " minutes and ";
            var seconds = diff.getSeconds();
            seconds = seconds == 1 ? seconds + " second." : seconds + " seconds.";
        }
        $scope.uptime = data.stream ? streamer + " has been streaming for " + days + hours + minutes + seconds : streamer + " is not live.";
    }

    function err(data, streamer) {
        $scope.uptime = "The user " + streamer + " does not exist."
    }

    $scope.submit = function (streamer) {
        if (this.isBtnActive() == 'disabled')
            return;
        $scope.uptime = null;
        var uri = 'https://api.twitch.tv/kraken/streams/' + streamer;
        $http({
                method: "get",
                url: uri,
                headers: {
                    'Client-ID': 'tiju3v0q53ox9fxp7za3vjdalpfthu2'
                }
            })
            .success(function (data, status, config) {
                check(data, streamer);
            }).error(function (data, status, config) {
                err(data, streamer);
            });
        this.rawdata = 0;
    };

    $scope.isBtnActive = function () {
        if (!$scope.user || $scope.user.length < 4 || $scope.user.length > 25)
            return 'disabled';
        else
            return '';
    };

    $scope.activeTab = function (arg) {
        var hash = document.location.hash;
        hash = hash.substr(1, hash.length - 1);
        return hash;
    };
});

app.controller('emotesCtrl', function ($scope, $http) {
    $scope.emotes = {};
    $scope.canShow = false;

    function check(data, streamer) {
        $scope.emotes = data.emoticons;
    }

    function err(data, streamer) {
        $scope.turnOff();
        $scope.uptime = "The user " + streamer + " does not exist."
    }

    $scope.submit = function (streamer) {
        if (this.isBtnActive() == 'disabled')
            return;
        $scope.turnOn();
        $scope.uptime = null;
        var uri = 'https://api.twitch.tv/kraken/chat/' + streamer + '/emoticons';
        $http({
                method: "get",
                url: uri,
                headers: {
                    'Client-ID': 'tiju3v0q53ox9fxp7za3vjdalpfthu2'
                }
            })
            .success(function (data, status, config) {
                check(data, streamer);
            }).error(function (data, status, config) {
                err(data, streamer);
            });
        this.rawdata = 0;
    };

    $scope.isBtnActive = function () {
        if (!$scope.user || $scope.user.length < 4 || $scope.user.length > 25)
            return 'disabled';
        else
            return '';
    };

    $scope.turnOn = function () {
        $scope.canShow = true;
    }

    $scope.turnOff = function () {
        $scope.canShow = false;
    }

});


app.controller('followCtrl', function ($scope, $http) {

    function succ(data, username, target) {
        if (data) {
            var dated = new Date(data.created_at).getTime();
            var daten = new Date().getTime();
            var diff = new Date(daten - dated);

            var years = diff.getFullYear();
            years -= 1970;
            years = years > 0 ? (years == 1 ? years + " year, " : years + " years, ") : "";
            var months = diff.getMonth();
            months = months > 0 ? (months == 1 ? months + " month, " : months + " months, ") : "";
            var days = diff.getDate() - 1;
            days = days > 0 ? (days == 1 ? days + " day, " : days + " days, ") : "";
            var hours = diff.getHours();
            hours = hours > 0 ? (hours == 1 ? hours + " hour, " : hours + " hours, ") : "";
            var minutes = diff.getMinutes();
            minutes = minutes == 1 ? minutes + " minute and " : minutes + " minutes and ";
            var seconds = diff.getSeconds();
            seconds = seconds == 1 ? seconds + " second." : seconds + " seconds.";
        }
        $scope.uptime = data ? username + " has been following " + target + " for " + years + months + days + hours + minutes + seconds : username + " is not following " + target + ".";
    }

    function err(data, username, target) {
        $scope.uptime = username + " is not following " + target + ".";
    }

    $scope.submit = function (username, target) {
        if (this.isBtnActive() == 'disabled')
            return;
        $scope.uptime = null;
        var uri = 'https://api.twitch.tv/kraken/users/' + username + '/follows/channels/' + target;
        $http({
                method: "get",
                url: uri,
                headers: {
                    'Client-ID': 'tiju3v0q53ox9fxp7za3vjdalpfthu2'
                }
            })
            .success(function (data, status, config) {
                succ(data, username, target);
            }).error(function (data, status, config) {
                err(data, username, target);
            });
        this.rawdata = 0;
    };

    $scope.isBtnActive = function () {
        if (!$scope.username || $scope.username.length < 4 || $scope.username.length > 25 || !$scope.target || $scope.target.length < 4 || $scope.target.length > 25)
            return 'disabled';
        else
            return '';
    };
});


app.controller('ageCtrl', function ($scope, $http) {

    function succ(data, username) {
        if (data) {
            var dated = new Date(data.created_at).getTime();
            var daten = new Date().getTime();
            var diff = new Date(daten - dated);

            var years = diff.getFullYear();
            years -= 1970;
            years = years > 0 ? (years == 1 ? years + " year, " : years + " years, ") : "";
            var months = diff.getMonth();
            months = months > 0 ? (months == 1 ? months + " month, " : months + " months, ") : "";
            var days = diff.getDate() - 1;
            days = days > 0 ? (days == 1 ? days + " day, " : days + " days, ") : "";
            var hours = diff.getHours();
            hours = hours > 0 ? (hours == 1 ? hours + " hour, " : hours + " hours, ") : "";
            var minutes = diff.getMinutes();
            minutes = minutes == 1 ? minutes + " minute and " : minutes + " minutes and ";
            var seconds = diff.getSeconds();
            seconds = seconds == 1 ? seconds + " second." : seconds + " seconds ";
        }
        $scope.uptime = data ? username + "'s account is " + years + months + days + hours + minutes + seconds + " old." : username + " does not exist.";
    }

    function err(data, username) {
        $scope.uptime = username + " does not exist.";
    }

    $scope.submit = function (username) {
        if (this.isBtnActive() == 'disabled')
            return;
        $scope.uptime = null;
        var uri = 'https://api.twitch.tv/kraken/users/' + username;
        $http({
                method: "get",
                url: uri,
                headers: {
                    'Client-ID': 'tiju3v0q53ox9fxp7za3vjdalpfthu2'
                }
            })
            .success(function (data, status, config) {
                succ(data, username);
            }).error(function (data, status, config) {
                err(data, username);
            });
        this.rawdata = 0;
    };

    $scope.isBtnActive = function () {
        if (!$scope.username || $scope.username.length < 4 || $scope.username.length > 25)
            return 'disabled';
        else
            return '';
    };
});


app.controller('subCtrl', function ($scope, $http) {
  
  if(document.location.hash != undefined){
    alert(document.location.hash)
    $scope.uptime = document.location.hash.split("=")[1].split("&")[0];
  }
  $scope.link = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=tiju3v0q53ox9fxp7za3vjdalpfthu2&redirect_uri=http://twitchstuff.neocities.org/#/subage&scope=user_read&force_verify';

    function succ(data, username) {
        if (data) {
            var dated = new Date(data.created_at).getTime();
            var daten = new Date().getTime();
            var diff = new Date(daten - dated);

            var years = diff.getFullYear();
            years -= 1970;
            years = years > 0 ? (years == 1 ? years + " year, " : years + " years, ") : "";
            var months = diff.getMonth();
            months = months > 0 ? (months == 1 ? months + " month, " : months + " months, ") : "";
            var days = diff.getDate() - 1;
            days = days > 0 ? (days == 1 ? days + " day, " : days + " days, ") : "";
            var hours = diff.getHours();
            hours = hours > 0 ? (hours == 1 ? hours + " hour, " : hours + " hours, ") : "";
            var minutes = diff.getMinutes();
            minutes = minutes == 1 ? minutes + " minute and " : minutes + " minutes and ";
            var seconds = diff.getSeconds();
            seconds = seconds == 1 ? seconds + " second." : seconds + " seconds ";
        }
        $scope.uptime = data ? username + "'s account is " + years + months + days + hours + minutes + seconds + " old." : username + " does not exist.";
    }

    function err(data, username) {
        $scope.uptime = username + " does not exist.";
    }

    $scope.submit = function (username, target) {
        if (this.isBtnActive() == 'disabled')
            return;
        $scope.uptime = null;
        var uri = 'https://api.twitch.tv/kraken/users/' + username;
        $http({
                method: "get",
                url: uri,
                headers: {
                    'Client-ID': 'tiju3v0q53ox9fxp7za3vjdalpfthu2'
                }
            })
            .success(function (data, status, config) {
                succ(data, username);
            }).error(function (data, status, config) {
                err(data, username);
            });
        this.rawdata = 0;
    };

    $scope.isBtnActive = function () {
        if (!$scope.username || $scope.username.length < 4 || $scope.username.length > 25)
            return 'disabled';
        else
            return '';
    };
});



app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.

    when('/', {
        templateUrl: 'uptime.html'
    }).

    when('/emotes', {
        templateUrl: 'emotes.html'
    }).

    when('/followage', {
        templateUrl: 'followage.html'
    }).

    when('/accountage', {
        templateUrl: 'accountage.html'
    }).

    when('/subage', {
        templateUrl: 'underconstruction.html'
    }).


    otherwise({
        templateUrl: '404.html'
    });
}]);