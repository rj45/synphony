// Generated by CoffeeScript 1.3.3
(function() {

  define(['model/word'], function(Word) {
    return describe("Word", function() {
      var word;
      word = null;
      beforeEach(function() {
        return word = new Word({
          name: "one"
        });
      });
      return it("should be valid", function() {
        return (expect(word.isValid())).toBeTruthy();
      });
    });
  });

}).call(this);
