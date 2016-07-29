import { camelize } from 'ember-string';
import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  keyForAttribute(key) {
    return camelize(key);
  },

  keyForRelationship(key) {
    return camelize(key);
  },

  /**
   * Serialize attributes if the record is not new or attribute is dirty.
   */
  serializeAttribute(snapshot, json, key) {
    if (snapshot.record.isNew === false || key in snapshot.changedAttributes()) {
      return this._super(...arguments);
    }
  }
});
