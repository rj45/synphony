define ['model/sentence', 'collection/sentences'], (Sentence, Sentences) ->
  describe "Sentences", ->
    sentences = null
    [sentence1, sentence2, sentence3] = [null, null, null]

    beforeEach ->
      sentence1 = new Sentence name: 'a'
      sentence2 = new Sentence name: 'b'
      sentence3 = new Sentence name: 'c'
      sentences = new Sentences([sentence1, sentence2, sentence3])

    it "should exist", ->
      (expect sentences.length).toEqual 3
