define ['model/named', 'collection/sequence_elements'], (NamedModel, SequenceElements) ->
  # A learning sequence. For examle the productivity sequence.
  class Sequence extends NamedModel
    # Get the elements of the sequence.
    # @return [SequenceElements] A SequenceElements collection
    elements: -> @get 'elements'

    # Get the GPCs in the sequence.
    # @return [Array<GPC>] the gpcs
    getGpcs: -> @elements().getGpcs()

    # @depricated
    gpcs: -> @getGpcs()


    # @private
    parse: (data) ->
      if data.elements?
        data = _.clone data
        data.elements = new SequenceElements data.elements, {parse: true, collection: @}
      data
