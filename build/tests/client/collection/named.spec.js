// Generated by CoffeeScript 1.3.3
(function() {

  define(['model/named', 'collection/named'], function(NamedModel, NamedCollection) {
    return describe("NamedCollection", function() {
      var collection, one, three, two, _ref;
      collection = null;
      _ref = [null, null, null], one = _ref[0], two = _ref[1], three = _ref[2];
      beforeEach(function() {
        collection = new NamedCollection;
        one = new NamedModel({
          name: "one"
        });
        two = new NamedModel({
          name: "two"
        });
        three = new NamedModel({
          name: "three"
        });
        return collection.reset([one, two, three]);
      });
      it("should be able to quickly find a model by name", function() {
        return (expect(collection.getByName('one'))).toEqual(one);
      });
      it("should be valid in a collection", function() {
        return (expect(one.isValid())).toBeTruthy();
      });
      return it("should return undefined if a name is not in the collection", function() {
        return (expect(collection.getByName('random'))).toBeNull();
      });
    });
  });

}).call(this);
