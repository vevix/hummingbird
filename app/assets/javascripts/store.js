HB.ApplicationStore = DS.Store.extend({});
HB.ApplicationAdapter = DS.ActiveModelAdapter.extend({});
HB.ApplicationSerializer = DS.ActiveModelSerializer.extend({});

// The internal API serializes dates as 'YYYY-MM-DD', so it only makes sense
// to push the same format upstream.
// Usage:
//    DS.attr('isodate')
HB.IsodateTransform = DS.Transform.extend({
  serialize: function(value) {
    return moment(value).format('YYYY-MM-DD');
  },

  deserialize: function(value) {
    return new DS.DateTransform().deserialize(value);
  }
});
