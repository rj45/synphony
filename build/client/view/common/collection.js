// Generated by CoffeeScript 1.3.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(['underscore', 'view/common/composite', 'view/common/base'], function(_, CompositeView, BaseView) {
    var CollectionView;
    return CollectionView = (function(_super) {

      __extends(CollectionView, _super);

      CollectionView.name = 'CollectionView';

      CollectionView.prototype.modelView = BaseView;

      function CollectionView(options) {
        var _this = this;
        if (options == null) {
          options = {};
        }
        CollectionView.__super__.constructor.call(this, options);
        if (this.collection) {
          this.collection.each(function(model) {
            return _this.addModelView(model, -1, options);
          });
          this.collection.on('add', this.onCollectionAdd, this);
          this.collection.on('remove', this.onCollectionRemove, this);
          this.collection.on('reset', this.onCollectionReset, this);
        }
      }

      CollectionView.prototype.destroy = function() {
        _.each(this.views, function(view) {
          return view.destroy();
        });
        this.views = [];
        return CollectionView.__super__.destroy.call(this);
      };

      CollectionView.prototype.makeModelView = function(model, options) {
        var modelView, view;
        if (options == null) {
          options = {};
        }
        modelView = this.options.modelView || this.modelView;
        options = _.extend({
          model: model
        }, options);
        view = new modelView(options);
        if (this.rendered) {
          view.render();
        }
        return view;
      };

      CollectionView.prototype.addModelView = function(model, index, options) {
        var view;
        if (index == null) {
          index = -1;
        }
        if (options == null) {
          options = {};
        }
        view = this.makeModelView(model, options);
        return this.addView(view, index);
      };

      CollectionView.prototype.removeModelView = function(model) {
        var views;
        views = _.select(this.views, function(view) {
          return view.model.cid === model.cid;
        });
        return _.each(views, function(view) {
          return this.removeView(view);
        });
      };

      CollectionView.prototype.onCollectionAdd = function(model) {
        var index;
        index = this.collection.indexOf(model);
        return this.addModelView(model, index);
      };

      CollectionView.prototype.onCollectionRemove = function(model) {
        return this.removeModelView(model);
      };

      CollectionView.prototype.onCollectionReset = function() {
        var _this = this;
        _.each(this.views, function(view) {
          return view.destroy();
        });
        this.views = [];
        return this.collection.each(function(model) {
          return _this.addModelView(model);
        });
      };

      return CollectionView;

    })(CompositeView);
  });

}).call(this);