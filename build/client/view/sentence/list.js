// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'view/common/base'], function(_, BaseView) {
    var SentenceListView;
    return SentenceListView = (function(_super) {

      __extends(SentenceListView, _super);

      SentenceListView.prototype.tagName = 'div';

      SentenceListView.prototype.id = 'sentence-list';

      function SentenceListView(options) {
        SentenceListView.__super__.constructor.call(this, options);
        this.filter = options.filter || function(collection) {
          return collection.models;
        };
        this.knownGPCs = options.knownGPCs;
        this.bug = false;
        this.knownGPCs.on('update', this.render, this);
      }

      SentenceListView.prototype.wordHTML = function(word) {
        var gpcs, html,
          _this = this;
        html = "<span class='word'>";
        if (word != null) {
          gpcs = word.gpcs();
          _.each(gpcs, function(gpc) {
            return html += _this.gpcHTML(gpc);
          });
        } else {
          this.bug = true;
          html += "<span class='bug'>[NULL]</span>";
        }
        html += "</span>";
        return html;
      };

      SentenceListView.prototype.gpcHTML = function(gpc) {
        var focus, known;
        known = "";
        if (this.knownGPCs.isKnown(gpc)) {
          known = "known";
        }
        focus = "";
        if (this.knownGPCs.hasFocus(gpc)) {
          focus = "focus";
        }
        return "<span class='" + known + " " + focus + "'>" + (gpc.graphemeName()) + "</span>";
      };

      SentenceListView.prototype.render = function() {
        var html, sentences,
          _this = this;
        sentences = this.filter(this.collection);
        html = "";
        _.each(sentences, function(sentence) {
          var words;
          words = _.map(sentence.words(), function(word) {
            return _this.wordHTML(word);
          });
          html += "<p>" + (words.join(' '));
          if (_this.bug) {
            _this.bug = false;
            html += "<br /><span class='bug-info'>(" + (_.escape(sentence.get('text'))) + ")</span>";
          }
          return html += "</p>";
        });
        this.$el.html(html);
        return this;
      };

      return SentenceListView;

    })(BaseView);
  });

}).call(this);
