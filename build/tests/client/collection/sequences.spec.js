// Generated by CoffeeScript 1.3.3
(function() {

  define(['model/sequence', 'collection/sequences'], function(Sequence, Sequences) {
    return describe("Sequences", function() {
      var sequence1, sequence2, sequence3, sequences, _ref;
      sequences = null;
      _ref = [null, null, null], sequence1 = _ref[0], sequence2 = _ref[1], sequence3 = _ref[2];
      beforeEach(function() {
        sequence1 = new Sequence({
          name: 'a'
        });
        sequence2 = new Sequence({
          name: 'b'
        });
        sequence3 = new Sequence({
          name: 'c'
        });
        return sequences = new Sequences([sequence1, sequence2, sequence3]);
      });
      return it("should exist", function() {
        return (expect(sequences.length)).toEqual(3);
      });
    });
  });

}).call(this);
