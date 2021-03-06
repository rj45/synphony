// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'model/base'], function(_, BaseModel) {
    var NamedModel;
    return NamedModel = (function(_super) {

      __extends(NamedModel, _super);

      function NamedModel() {
        return NamedModel.__super__.constructor.apply(this, arguments);
      }

      NamedModel.prototype.name = function() {
        return this.get('name');
      };

      NamedModel.prototype.validate = function(attribs) {
        var modelsWithMyName;
        if (!(attribs.name != null)) {
          return "Must have a name";
        } else if (this.collection != null) {
          modelsWithMyName = this.collection.where({
            name: attribs.name
          });
          if (_.isEmpty(modelsWithMyName)) {
            return null;
          } else if (modelsWithMyName.length > 1 || (_.first(modelsWithMyName)) !== this) {
            return "Model with name " + attribs.name + " already exists";
          }
        } else {
          return null;
        }
      };

      return NamedModel;

    })(BaseModel);
  });

}).call(this);
