// Generated by CoffeeScript 1.3.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(['underscore', 'collection/base', 'model/user_gpc'], function(_, BaseCollection, UserGPC) {
    var UserGPCs;
    return UserGPCs = (function(_super) {

      __extends(UserGPCs, _super);

      UserGPCs.name = 'UserGPCs';

      UserGPCs.prototype.model = UserGPC;

      UserGPCs.prototype.url = '/api/v1/user_gpcs/';

      function UserGPCs(models, options) {
        if (options == null) {
          options = {};
        }
        this.gpcs = options.gpcs;
        UserGPCs.__super__.constructor.call(this, models, options);
        if (this.gpcs != null) {
          this.gpcs.on('reset', this.onGPCsReset, this);
          this.onGPCsReset();
        }
      }

      UserGPCs.prototype.onGPCsReset = function() {
        var _this = this;
        this.gpcs.each(function(gpc) {
          var ugpcs;
          ugpcs = _this.where({
            gpc: gpc
          });
          if (ugpcs.length === 0) {
            return _this.add({
              gpc: gpc
            }, {
              silent: true
            });
          }
        });
        console.log("user gpcs reset because gpcs reset:", this.length);
        return this.trigger('reset', this, {});
      };

      UserGPCs.prototype.getKnownGPCs = function() {
        var ugpcs;
        ugpcs = this.filter(function(ugpc) {
          return ugpc.isKnown();
        });
        return _.map(ugpcs, function(ugpc) {
          return ugpc.gpc();
        });
      };

      UserGPCs.prototype.getFocusGPCs = function() {
        var ugpcs;
        ugpcs = this.filter(function(ugpc) {
          return ugpc.hasFocus();
        });
        return _.map(ugpcs, function(ugpc) {
          return ugpc.gpc();
        });
      };

      return UserGPCs;

    })(BaseCollection);
  });

}).call(this);