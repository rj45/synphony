// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['view/common/template', 'text!templates/common/menu.handlebars'], function(TemplateView, hbsTemplate) {
    var MenuView;
    return MenuView = (function(_super) {

      __extends(MenuView, _super);

      function MenuView() {
        return MenuView.__super__.constructor.apply(this, arguments);
      }

      MenuView.prototype.template = hbsTemplate;

      MenuView.prototype.tagName = 'span';

      MenuView.prototype.templateData = function() {
        return this.model;
      };

      return MenuView;

    })(TemplateView);
  });

}).call(this);
