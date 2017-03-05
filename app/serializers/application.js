import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  isNewSerializerAPI: true,

  // The payload should be wrapped in a named object after the model type
  // Ember is expecting to see { page: { your-data } }
  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    const payloadTemp = {};
    payloadTemp[primaryModelClass.modelName] = [payload];

    return this._super(store, primaryModelClass, payloadTemp, id, requestType);
  },

  // Now I am going to deal with our missing root element when extracting arrays from the JSON.
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    const payloadTemp = {};
    const rootKey = Ember.String.pluralize(primaryModelClass.modelName);

    payloadTemp[rootKey] = payload;

    return this._super(store, primaryModelClass, payloadTemp, id, requestType);
  },

  normalize(modelClass, resourceHash, prop) {
    //it is so boring to type every time `title.rendered` or
    // `excerpt.rendered`, so I bring that a level up to be `rendered`.
    if (resourceHash.content && resourceHash.title.rendered) {
      resourceHash.content = resourceHash.content.rendered;
      resourceHash.title = resourceHash.title.rendered;
    }
    if (resourceHash.title && resourceHash.title.rendered) {
      resourceHash.title = resourceHash.title.rendered;
    }
    if (resourceHash.excerpt && resourceHash.excerpt.rendered) {
      resourceHash.excerpt = resourceHash.excerpt.rendered;
    }
    return this._super(modelClass, resourceHash, prop);
  }

});
