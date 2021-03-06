// Generated by CoffeeScript 1.3.3
(function() {

  define(['model/store', 'model/grapheme', 'model/phoneme', 'model/word', 'collection/sequence_elements', 'model/gpc', 'model/sentence'], function(Store, Grapheme, Phoneme, Word, SequenceElements, GPC, Sentence) {
    return describe("DB", function() {
      var gpcs, graphemes, phonemes, sentences, sequences, store, words;
      store = new Store(DB, {
        parse: true
      });
      graphemes = store.graphemes();
      phonemes = store.phonemes();
      gpcs = store.gpcs();
      words = store.words();
      sentences = store.sentences();
      sequences = store.sequences();
      describe("graphemes", function() {
        return it("should load", function() {
          return (expect(graphemes.getByName('a'))).not.toBeNull();
        });
      });
      describe("phonemes", function() {
        return it("should load", function() {
          return (expect(phonemes.getByName('a'))).not.toBeNull();
        });
      });
      describe("GPCs", function() {
        it("should load", function() {
          return (expect(gpcs.getByName('s_s'))).not.toBeNull();
        });
        it("should associate grapheme id to graphemes", function() {
          var gpc, grapheme;
          gpc = gpcs.getByName('s_s');
          grapheme = gpc.get('grapheme');
          return (expect(grapheme instanceof Grapheme)).toBeTruthy();
        });
        return it("should associate phoneme id to phonemes", function() {
          var gpc, phoneme;
          gpc = gpcs.getByName('s_s');
          phoneme = gpc.get('phoneme');
          return (expect(phoneme instanceof Phoneme)).toBeTruthy();
        });
      });
      describe("words", function() {
        it("should load", function() {
          return (expect(words.getByName('long'))).not.toBeNull();
        });
        return it("should associate gpc ids to gpcs", function() {
          var gpc, long, longGpcs;
          long = words.getByName('long');
          longGpcs = long.get('gpcs');
          gpc = _.first(longGpcs);
          return (expect(gpc.get('name'))).toEqual('l_l');
        });
      });
      describe("sentences", function() {
        it("should load", function() {
          return (expect(sentences.getByName('Jhn 3:16'))).not.toBeNull();
        });
        return it("should associate word ids to words", function() {
          var sentence, word;
          sentence = sentences.getByName('Jhn 3:16');
          word = _.first(sentence.get('words'));
          return (expect(word instanceof Word)).toBeTruthy();
        });
      });
      return describe("sequences", function() {
        var elements, sequence;
        sequence = null;
        elements = null;
        beforeEach(function() {
          sequence = sequences.getByName('Productivity Sequence');
          return elements = sequence.get('elements');
        });
        it("should load", function() {
          return (expect(sequence)).not.toBeNull();
        });
        it("should contain a collection of SequenceElements", function() {
          return (expect(elements instanceof SequenceElements)).toBeTruthy();
        });
        return describe("elements", function() {
          var element;
          element = null;
          beforeEach(function() {
            return element = elements.last();
          });
          it("should associate gpc ids to gpcs", function() {
            var gpc;
            gpc = element.get('gpc');
            return (expect(gpc instanceof GPC)).toBeTruthy();
          });
          it("should associate word ids to words", function() {
            var word;
            word = _.first(element.get('new_words'));
            return (expect(word instanceof Word)).toBeTruthy();
          });
          return it("should associate sentence ids to sentences", function() {
            var sentence;
            sentence = _.first(element.get('new_sentences'));
            return (expect(sentence instanceof Sentence)).toBeTruthy();
          });
        });
      });
    });
  });

}).call(this);
