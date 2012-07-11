// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['view/common/template', 'text!templates/gpc/button.handlebars'], function(TemplateView, hbsTemplate) {
    var GPCButtonView;
    return GPCButtonView = (function(_super) {

      __extends(GPCButtonView, _super);

      GPCButtonView.prototype.template = hbsTemplate;

      GPCButtonView.prototype.tagName = 'span';

      GPCButtonView.prototype.events = {
        'click button': 'onClick'
      };

      function GPCButtonView(options) {
        if (options == null) {
          options = {};
        }
        GPCButtonView.__super__.constructor.call(this, options);
        this.model = this.model.gpc();
        this.knownGPCs = options.knownGPCs;
        this.knownGPCs.on('update', this.render, this);
      }

      GPCButtonView.prototype.templateData = function() {
        return {
          known: this.knownGPCs.isKnown(this.model),
          focus: this.knownGPCs.hasFocus(this.model),
          name: this.model.graphemeName()
        };
      };

      GPCButtonView.prototype.onClick = function(e) {
        e.preventDefault();
        return this.knownGPCs.toggle(this.model);
      };

      return GPCButtonView;

    })(TemplateView);
  });

}).call(this);
