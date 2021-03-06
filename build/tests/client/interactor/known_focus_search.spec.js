// Generated by CoffeeScript 1.3.3
(function() {

  define(['model/word', 'model/grapheme', 'model/phoneme', 'collection/graphemes', 'collection/phonemes', 'collection/gpcs', 'collection/words', 'collection/sentences', 'interactor/known_focus_search'], function(Word, Grapheme, Phoneme, Graphemes, Phonemes, GPCs, Words, Sentences, KnownFocusSearch) {
    return describe("KnownFocusSearch", function() {
      var gpcs, graphemes, phonemes, sentenceSearch, sentences, wordSearch, words;
      graphemes = new Graphemes(DB.graphemes, {
        parse: true
      });
      phonemes = new Phonemes(DB.phonemes, {
        parse: true
      });
      gpcs = new GPCs(DB.gpcs, {
        parse: true,
        graphemes: graphemes,
        phonemes: phonemes
      });
      words = new Words(DB.words, {
        parse: true,
        gpcs: gpcs
      });
      sentences = new Sentences(DB.sentences, {
        parse: true,
        words: words
      });
      wordSearch = new KnownFocusSearch(words);
      sentenceSearch = new KnownFocusSearch(sentences);
      it("should be able to find words with target GPCs", function() {
        var aword, focus, gpc;
        gpc = gpcs.getByName("ei_ei");
        aword = words.getByName("edukeitim");
        focus = wordSearch.getFocusItems([gpc]);
        (expect(focus.length)).toEqual(5);
        return (expect(_.include(focus, aword))).toBeTruthy();
      });
      it("should be able to filter words only including certain GPCs", function() {
        var avail, aword, gpcE, gpcM;
        gpcE = gpcs.getByName("e_e");
        gpcM = gpcs.getByName("m_m");
        avail = wordSearch.getKnownItems([gpcE, gpcM]);
        (expect(avail.length)).toEqual(4);
        aword = words.getByName("meme");
        return (expect(_.include(avail, aword))).toBeTruthy();
      });
      it("should be able to filter words only including certain GPCs but must have other GPCs", function() {
        var avail, aword, gpcE, gpcM;
        gpcE = gpcs.getByName("e_e");
        gpcM = gpcs.getByName("m_m");
        avail = wordSearch.getKnownFocusItems([gpcE, gpcM], [gpcM]);
        (expect(avail.length)).toEqual(3);
        aword = words.getByName("meme");
        return (expect(_.include(avail, aword))).toBeTruthy();
      });
      return it("should work with sentences too", function() {
        var asentence, avail;
        asentence = sentences.getByName("Jhn 7:22");
        gpcs = asentence.gpcs();
        avail = sentenceSearch.getKnownFocusItems(gpcs, [gpcs[0]]);
        (expect(avail.length)).toEqual(1);
        return (expect(_.include(avail, asentence))).toBeTruthy();
      });
    });
  });

}).call(this);
