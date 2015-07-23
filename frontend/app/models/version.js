import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user', { async: false }),
  anime: DS.belongsTo('full-anime', { async: false }),
  manga: DS.belongsTo('full-manga', { async: false }),

  objectType: DS.attr('string'),
  object: DS.attr(),
  objectChanges: DS.attr(),
  state: DS.attr('string'),
  comment: DS.attr('string'),
  createdAt: DS.attr('date'),

  item: function() {
    return this.get(this.get('objectType'));
  }.property('objectType')
});
