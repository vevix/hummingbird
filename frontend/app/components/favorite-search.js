import Ember from 'ember';
/* global Bloodhound */

export default Ember.Component.extend({
  store: Ember.inject.service(),
  query: "",
  searchResults: [],

  bloodhound: function() {
    var bloodhound = new Bloodhound({
      datumTokenizer: function(d) {
        return Bloodhound.tokenizers.whitespace(d.value);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      limit: 10,
      remote: {
        url: '/search.json?scope=all&depth=instant&query=%QUERY',
        filter: function(results) {
          return results.search;
        }
      }
    });
    bloodhound.initialize();
    return bloodhound;
  }.property(),

  filteredSearchResults: function() {
    var self = this;
    return this.get('searchResults').filter(function(item){
      var favs = self.get('favorites').map(function(x){
        return x.get('item.id');
      });

      var isInFavs = favs.contains(item.link);
      var isTypeOk = ( item.type === self.get('type') );

      return ( !isInFavs && isTypeOk );
    });
  }.property('searchResults.@each'),

  updateSearchResults: function() {
    var self = this;
    if (this.get('query').length > 2) {
      this.get('bloodhound').get(this.get('query'), function(results) {
        self.set('searchResults', results);
      });
    }
  },

  queryObserver: function() {
    Ember.run.debounce(this, this.updateSearchResults, 300);
  }.observes('query'),

  actions: {
    addMediaToFavorites: function(media){
      var cuser = this.get('currentUser'),
          store = this.get('store'),
          self = this;

      var newFav = store.createRecord('favorite', {
        'favRank': 9999
      });

      store.findRecord('user', cuser.get('id')).then(function(user){
        newFav.set('user', user);

        store.findRecord(media.type, media.link).then(function(item){
          newFav.set('item', item);
          newFav.save();
          self.sendAction('action', newFav);
        });
      });
    }
  }
});
