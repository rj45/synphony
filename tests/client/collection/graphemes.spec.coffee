define ['model/grapheme', 'collection/graphemes'], (Grapheme, Graphemes) ->
  describe "Graphemes", ->
    graphs = null
    [graph1, graph2, graph3] = [null, null, null]

    beforeEach ->
      graph1 = new Grapheme name: 'a'
      graph2 = new Grapheme name: 'b'
      graph3 = new Grapheme name: 'c'
      graphs = (new Graphemes).reset [graph1, graph2, graph3]

    it "should exist", ->
      (expect graphs.length).toEqual 3
