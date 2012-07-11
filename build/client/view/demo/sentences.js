// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['view/common/template', 'view/common/composite', 'view/common/collection', 'view/sentence/list', 'model/known_focus_search', 'text!templates/demo/sentences.handlebars'], function(TemplateView, CompositeView, CollectionView, SentenceListView, KnownFocusSearch, hbsTemplate) {
    var SentencesView;
    return SentencesView = (function(_super) {

      __extends(SentencesView, _super);

      SentencesView.prototype.id = 'sentences-page';

      function SentencesView(options) {
        var _this = this;
        SentencesView.__super__.constructor.call(this, options);
        this.store = options.store;
        this.collection = this.store.sentences();
        this.knownGPCs = this.store.knownGPCs();
        this.search = new KnownFocusSearch(this.collection);
        this.addView(new TemplateView({
          template: hbsTemplate
        }));
        this.addView(new SentenceListView({
          collection: this.collection,
          knownGPCs: this.knownGPCs,
          filter: function() {
            return _this.filterSentences();
          }
        }));
      }

      SentencesView.prototype.filterSentences = function() {
        var focusGPCs, knownGPCs;
        knownGPCs = this.knownGPCs.models;
        focusGPCs = this.knownGPCs.isEmpty() ? [] : [this.knownGPCs.last()];
        return this.search.getKnownFocusItems(knownGPCs, focusGPCs);
      };

      return SentencesView;

    })(CompositeView);
  });

}).call(this);
