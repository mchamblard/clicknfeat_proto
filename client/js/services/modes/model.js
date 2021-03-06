'use strict';

angular.module('vassalApp.services')
  .factory('model_place_mode', [
    'command',
    function(command) {
      return function(modes, common) {
        var model_place_mode = _.deepCopy(common);
        _.deepExtend(model_place_mode, {
          name: 'Model Place',
          group: 'Model Place',
          template: 'model_place.html',
          enter: function(scope) {
          },
          leave: function(scope, next) {
            if(next.group !== 'Model Place') {
              scope.game.newCommand(command('onSelection', 'endPlace'));
            }
          },
          'D': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'deviate'));
          },
          'I': function(scope) {
            scope.game.newCommand(command('onSelection', 'toggle', 'image'));
          },
          'M': function(scope) {
            var new_val = !scope.game.models[scope.game.selection[0]].state.show_melee;
            scope.game.newCommand(command('onSelection', 'toggle', 'melee', new_val));
          },
          'O': function(scope) {
            modes.goTo('model_place_origin', scope);
          },
          'P': function(scope) {
            modes.goTo('default', scope);
          },
          'R': function(scope) {
            var new_val = !scope.game.models[scope.game.selection[0]].state.show_reach;
            scope.game.newCommand(command('onSelection', 'toggle' ,'reach', new_val));
          },
          'Alt R': function(scope) {
            scope.game.newCommand(command('onSelection', 'resetShow'));
          },
          'S': function(scope) {
            var new_val = !scope.game.models[scope.game.selection[0]].state.show_strike;
            scope.game.newCommand(command('onSelection', 'toggle' ,'strike', new_val));
          },
          'T': function(scope) {
            modes.goTo('model_place_target', scope);
          },
          'Left': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'rotatePlaceLeft', false));
          },
          'Shift Left': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'rotatePlaceLeft', true));
          },
          'Ctrl Left': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 
                                          scope.game.board.zoom.flipped ? 'moveRight' : 'moveLeft',
                                          true));
          },
          'Down': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'movePlaceBack', false));
          },
          'Shift Down': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'movePlaceBack', true));
          },
          'Ctrl Down': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 
                                          scope.game.board.zoom.flipped ? 'moveUp' : 'moveDown',
                                          true));
          },
          'Right': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'rotatePlaceRight', false));
          },
          'Shift Right': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'rotatePlaceRight', true));
          },
          'Ctrl Right': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 
                                          scope.game.board.zoom.flipped ? 'moveLeft' : 'moveRight',
                                          true));
          },
          'Up': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'movePlaceFront', false));
          },
          'Shift Up': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'movePlaceFront', true));
          },
          'Ctrl Up': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 
                                          scope.game.board.zoom.flipped ? 'moveDown' : 'moveUp',
                                          true));
          },
          'Click': function(scope, event, drag, user_x, user_y) {
            if(drag.event === 'Model' &&
               drag.target.state.id !== scope.game.selection[0]) {
              if(event.ctrlKey) {
                scope.game.newCommand(command('onSelection', 'setPlaceOrigin', drag.target));
                return true;
              }
              if(event.shiftKey) {
                scope.game.newCommand(command('onSelection', 'setPlaceTarget', drag.target));
                return true;
              }
            }
            return false;
          },
        });
        return model_place_mode;
      };
    }
  ])
  .factory('model_place_origin_mode', [
    'command',
    function(command) {
      return function(modes, common) {
        var model_place_origin_mode = _.deepCopy(common);
        _.deepExtend(model_place_origin_mode, {
          name: 'Model Place Origin',
          group: 'Model Place',
          template: 'model_place_origin.html',
          enter: function(scope) {
          },
          leave: function(scope, next) {
            if(next.group !== 'Model Place') {
              scope.game.newCommand(command('onSelection', 'endPlace'));
            }
          },
          'P': function(scope) {
            modes.goTo('model_place', scope);
          },
          'Click': function(scope, event, drag, user_x, user_y) {
            if(drag.event === 'Model' &&
               drag.target.state.id !== scope.game.selection[0]) {
              scope.game.newCommand(command('onSelection', 'setPlaceOrigin', drag.target));
              modes.goTo('model_place', scope);
              return true;
            }
            return false;
          },
        });
        return model_place_origin_mode;
      };
    }
  ])
  .factory('model_place_target_mode', [
    'command',
    function(command) {
      return function(modes, common) {
        var model_place_target_mode = _.deepCopy(common);
        _.deepExtend(model_place_target_mode, {
          name: 'Model Place Target',
          group: 'Model Place',
          template: 'model_place_target.html',
          enter: function(scope) {
          },
          leave: function(scope, next) {
            if(next.group !== 'Model Place') {
              scope.game.newCommand(command('onSelection', 'endPlace'));
            }
          },
          'P': function(scope) {
            modes.goTo('model_place', scope);
          },
          'Click': function(scope, event, drag, user_x, user_y) {
            if(drag.event === 'Model' &&
               drag.target.state.id !== scope.game.selection[0]) {
              scope.game.newCommand(command('onSelection', 'setPlaceTarget', drag.target));
              modes.goTo('model_place', scope);
              return true;
            }
            return false;
          },
        });
        return model_place_target_mode;
      };
    }
  ])
  .factory('model_charge_mode', [
    'command',
    function(command) {
      return function(modes, common) {
        var model_charge_mode = _.deepCopy(common);
        _.deepExtend(model_charge_mode, {
          name: 'Model Charge',
          template: 'model_charge.html',
          enter: function(scope) {
          },
          leave: function(scope) {
            scope.game.newCommand(command('onSelection', 'endCharge'));
          },
          'C': function(scope) {
            modes.goTo('default', scope);
          },
          'Shift C': function(scope) {
            if(scope.game.selection.length === 1 &&
               (scope.game.models[scope.game.selection[0]].info.focus ||
                scope.game.models[scope.game.selection[0]].info.fury)) {
              scope.game.newCommand(command('onSelection', 'toggleControl'));
            }
          },
          'I': function(scope) {
            scope.game.newCommand(command('onSelection', 'toggle', 'image'));
          },
          'M': function(scope) {
            var new_val = !scope.game.models[scope.game.selection[0]].state.show_melee;
            scope.game.newCommand(command('onSelection', 'toggle', 'melee', new_val));
          },
          'R': function(scope) {
            var new_val = !scope.game.models[scope.game.selection[0]].state.show_reach;
            scope.game.newCommand(command('onSelection', 'toggle' ,'reach', new_val));
          },
          'Alt R': function(scope) {
            scope.game.newCommand(command('onSelection', 'resetShow'));
          },
          'S': function(scope) {
            var new_val = !scope.game.models[scope.game.selection[0]].state.show_strike;
            scope.game.newCommand(command('onSelection', 'toggle' ,'strike', new_val));
          },
          'Alt 0': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 10 ? 0 : 10;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt Shift 0': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 20 ? 0 : 20;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt 1': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 1 ? 0 : 1;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt Shift 1': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 11 ? 0 : 11;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt 2': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 2 ? 0 : 2;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt Shift 2': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 12 ? 0 : 12;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt 3': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 3 ? 0 : 3;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt Shift 3': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 13 ? 0 : 13;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt 4': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 4 ? 0 : 4;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt Shift 4': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 14 ? 0 : 14;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt 5': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 5 ? 0 : 5;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt Shift 5': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 15 ? 0 : 15;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt 6': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 6 ? 0 : 6;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt Shift 6': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 16 ? 0 : 16;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt 7': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 7 ? 0 : 7;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt Shift 7': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 17 ? 0 : 17;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt 8': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 8 ? 0 : 8;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt Shift 8': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 18 ? 0 : 18;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt 9': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 9 ? 0 : 9;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Alt Shift 9': function(scope) {
            var new_val = scope.game.models[scope.game.selection[0]].state.show_area === 19 ? 0 : 19;
            scope.game.newCommand(command('onSelection', 'toggle', 'area', new_val));
          },
          'Left': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'rotateChargeLeft', false));
          },
          'Shift Left': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'rotateChargeLeft', true));
          },
          'Ctrl Left': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 
                                          scope.game.board.zoom.flipped ? 'moveRight' : 'moveLeft',
                                          true));
          },
          'Down': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'moveChargeBack', false));
          },
          'Shift Down': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'moveChargeBack', true));
          },
          'Ctrl Down': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 
                                          scope.game.board.zoom.flipped ? 'moveUp' : 'moveDown',
                                          true));
          },
          'Right': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'rotateChargeRight', false));
          },
          'Shift Right': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'rotateChargeRight', true));
          },
          'Ctrl Right': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 
                                          scope.game.board.zoom.flipped ? 'moveLeft' : 'moveRight',
                                          true));
          },
          'Up': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'moveChargeFront', false));
          },
          'Shift Up': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 'moveChargeFront', true));
          },
          'Ctrl Up': function(scope) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('onSelection', 
                                          scope.game.board.zoom.flipped ? 'moveDown' : 'moveUp',
                                          true));
          },
          'Click': function(scope, event, drag, user_x, user_y) {
            if(event.shiftKey &&
               drag.event === 'Model' &&
               drag.target.state.id !== scope.game.selection[0]) {
              scope.game.newCommand(command('onSelection', 'setChargeTarget', drag.target));
              return true;
            }
            return false;
          },
        });
        return model_charge_mode;
      };
    }
  ])
  .factory('model_create_mode', [
    'command',
    function(command) {
      return function(modes, common) {
        var model_create_mode = _.deepCopy(common);
        _.deepExtend(model_create_mode, {
          name: 'Model Create',
          template: 'model_create.html',
          'MouseMove': function(scope, event, user_x, user_y) {
            if(!scope.game.id) return;
            model_create_mode.x = user_x;
            model_create_mode.y = user_y;
          },
          'Click': function(scope, event, drag, user_x, user_y) {
            if(!scope.game.id) return;
            var create_options = [];
            _.each(model_create_mode.info, function(info) {
              var state = _.omit(info, 'offset_x', 'offset_y');
              create_options.push(_.extend(state, {
                x: user_x+info.offset_x,
                y: user_y+info.offset_y,
                user: scope.user.name
              }));
            });
            scope.game.newCommand(command('createModel',
                                          create_options));

            modes.goTo('default', scope);
          },
        });
        return model_create_mode;
      };
    }
  ])
  .factory('model_drag_mode', [
    'command',
    function(command) {
      return function(modes, common) {
        var model_drag_mode = _.deepCopy(common);
        _.deepExtend(model_drag_mode, {
          name: 'Model Drag',
          template: 'model_selected.html',
          'Drag': function(scope, event, drag, user_x, user_y, dx, dy) {
            if(!scope.game.id) return;
            scope.game.onSelection('draging', dx, dy);
            this.end_x = this.start_x + dx;
            this.end_y = this.start_y + dy;
            this.length = ((Math.sqrt(dx*dx+dy*dy) * 10) >> 0) / 100;
          },
          'DragEnd': function(scope, event, drag, user_x, user_y, dx, dy) {
            if(!scope.game.id) return;
            scope.game.newCommand(command('endDragingSelection', dx, dy));

            modes.goTo('default', scope);
          },
        });
        return model_drag_mode;
      };
    }
  ])
  .factory('model_target_mode', [
    'command',
    function(command) {
      return function(modes, common) {
        var model_target_mode = _.deepCopy(common);
        _.deepExtend(model_target_mode, {
          name: 'Model Target',
          template: 'model_target.html',
          'Click': function(scope, event, drag) {
            if(!scope.game.id) return;
            if(drag.event === 'Model' &&
               0 > _.indexOf(scope.game.selection, drag.target.state.id)) {
              scope.game.newCommand(command('onSelection', 'alignWith',
                                            drag.target.state.x, drag.target.state.y));
              modes.goTo('default', scope);
              return true;
            }
            return false;
          },
        });
        return model_target_mode;
      };
    }
  ]);
