'use strict';

angular.module('vassalApp.controllers')
  .controller('gameCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    '$http',
    '$q',
    'game',
    function($scope,
             $state,
             $stateParams,
             $http,
             $q,
             game) {
      console.log('init gameCtrl');
      if(!$stateParams.id || $stateParams.id.length <= 0) $state.go('start');

      $http.get('/api/games/'+$stateParams.id).then(function(response) {
        console.log('search game success');
        $scope.game = game(response.data);
        console.log($scope.game);
      }, function(response) {
        console.log('search game error');
        console.log(response);
        $state.go('start');
        return $q.reject();
      }).then(function() {

        var canvas = document.getElementById('canvas');
        console.log(canvas);

        $scope.onKey = function(event) {
          // console.log(event);
          switch(event.keyCode) {
          case 33: // pageUp
            {
              $scope.game.board.zoomIn();
              return;
            }
          case 34: // pageDown
            {
              $scope.game.board.zoomOut();
              return;
            }
          }
          if(event.shiftKey) {
            switch(event.keyCode) {
            case 37: // leftArrow
              {
                $scope.game.board.moveLeft();
                return;
              }
            case 38: // upArrow
              {
                $scope.game.board.moveUp();
                return;
              }
            case 39: // rightArrow
              {
                $scope.game.board.moveRight();
                return;
              }
            case 40: // downArrow
              {
                $scope.game.board.moveDown();
                return;
              }
            }
          }
          if(37 > event.keyCode ||
             40 < event.keyCode) return;
          switch(event.keyCode) {
          case 37: // leftArrow
            {
              $scope.game.onSelection('moveLeft', event.ctrlKey);
              break;
            }
          case 38: // upArrow
            {
              $scope.game.onSelection('moveUp', event.ctrlKey);
              break;
            }
          case 39: // rightArrow
            {
              $scope.game.onSelection('moveRight', event.ctrlKey);
              break;
            }
          case 40: // downArrow
            {
              $scope.game.onSelection('moveDown', event.ctrlKey);
              break;
            }
          }
        };
        $scope.onModelClick = function(event, model) {
          console.log(event);
          console.log(model);
          if(!event.ctrlKey) {
            $scope.game.clearSelection();
          }
          $scope.game.addToSelection([model]);
        };

        $scope.selection = {
          active: false,
          x: 10, y: 10,
          start_x: 10, start_y: 10,
          width: 0, height: 0,
        };
        $scope.doSelectStart = function(event) {
          console.log(event);
          $scope.selection.active = true;
          var elem_rect = canvas.getBoundingClientRect();
          console.log(elem_rect);
          var dom_x = event.clientX - elem_rect.x;
          var dom_y = event.clientY - elem_rect.y;
          console.log('dom ' + dom_x + ' ' + dom_y);
          var user_x = dom_x * $scope.game.board.width / elem_rect.width;
          var user_y = dom_y * $scope.game.board.height / elem_rect.height;
          console.log('user ' + user_x + ' ' + user_y);
          $scope.selection.start_x = user_x;
          $scope.selection.start_y = user_y;
          $scope.selection.width = 0;
          $scope.selection.height = 0;
        };
        $scope.doSelectMove = function(event) {
          if($scope.selection.active) {
            console.log(event);
            var elem_rect = canvas.getBoundingClientRect();
            console.log(elem_rect);
            var dom_x = event.clientX - elem_rect.x;
            var dom_y = event.clientY - elem_rect.y;
            console.log('dom ' + dom_x + ' ' + dom_y);
            var user_x = dom_x * $scope.game.board.width / elem_rect.width;
            var user_y = dom_y * $scope.game.board.height / elem_rect.height;
            console.log('user ' + user_x + ' ' + user_y);
            $scope.selection.x = $scope.selection.start_x;
            $scope.selection.width = user_x - $scope.selection.start_x;
            if($scope.selection.width < 0) {
              $scope.selection.width = -$scope.selection.width;
              $scope.selection.x = $scope.selection.x - $scope.selection.width;
            }
            if($scope.selection.width < 1) {
              $scope.selection.width = 0;
            }
            $scope.selection.y = $scope.selection.start_y;
            $scope.selection.height = user_y - $scope.selection.start_y;
            if($scope.selection.height < 0) {
              $scope.selection.height = -$scope.selection.height;
              $scope.selection.y = $scope.selection.y - $scope.selection.height;
            }
            if($scope.selection.height < 1) {
              $scope.selection.height = 0;
            }
            // console.log($scope.selection.x + ' ' +
            //             $scope.selection.y + ' ' +
            //             $scope.selection.width + ' ' +
            //             $scope.selection.height);
          }
        };
        $scope.doSelectStop = function(event) {
          console.log(event);
          if($scope.selection.active) {
            $scope.selection.active = false;
            var elem_rect = canvas.getBoundingClientRect();
            console.log(elem_rect);
            var dom_x = event.clientX - elem_rect.x;
            var dom_y = event.clientY - elem_rect.y;
            console.log('dom ' + dom_x + ' ' + dom_y);
            var user_x = dom_x * $scope.game.board.width / elem_rect.width;
            var user_y = dom_y * $scope.game.board.height / elem_rect.height;
            console.log('user ' + user_x + ' ' + user_y);
            $scope.selection.x = $scope.selection.start_x;
            $scope.selection.width = user_x - $scope.selection.start_x;
            if($scope.selection.width < 0) {
              $scope.selection.width = -$scope.selection.width;
              $scope.selection.x = $scope.selection.x - $scope.selection.width;
            }
            if($scope.selection.width < 1) {
              $scope.selection.width = 0;
            }
            $scope.selection.y = $scope.selection.start_y;
            $scope.selection.height = user_y - $scope.selection.start_y;
            if($scope.selection.height < 0) {
              $scope.selection.height = -$scope.selection.height;
              $scope.selection.y = $scope.selection.y - $scope.selection.height;
            }
            if($scope.selection.height < 1) {
              $scope.selection.height = 0;
            }
            console.log($scope.selection.x + ' ' +
                        $scope.selection.y + ' ' +
                        $scope.selection.width + ' ' +
                        $scope.selection.height);
            if($scope.selection.width > 0 &&
               $scope.selection.height > 0) {
              $scope.game.clearSelection();

              var models_selected = [];
              _.each($scope.game.models, function(model) {
                var cx = model.state.x + model.img.width/2;
                var cy = model.state.y + model.img.height/2;
                if( $scope.selection.x <= cx && cx <= ($scope.selection.x+$scope.selection.width ) &&
                    $scope.selection.y <= cy && cy <= ($scope.selection.y+$scope.selection.height) ) {
                  models_selected.push(model);
                }
              });
              $scope.game.addToSelection(models_selected);

              $scope.selection.width = 0;
              $scope.selection.height = 0;
            }
          }
        };

      });
    }
  ]);
