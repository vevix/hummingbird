import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    controller.set('loading', true);

    var promises = {
      anime: this.store.query('anime', { 'sort_by': 'bayesian_rating', 'sort_reverse': true }),
      manga: this.store.query('manga', { 'sort_by': 'created_at', 'sort_reverse': true }),
      libraryEntries: this.store.query('library-entry', { 'user_id': this.get('currentUser.id') }),
      mangaLibraryEntries: this.store.query('manga-library-entry', { 'user_id': this.get('currentUser.id') })
    };

    Ember.RSVP.hash(promises).then(function(hash){
      controller.setProperties({
        'content': hash,
        'importFromMal': false,
        'totalRatings': (parseInt(hash.libraryEntries.get('length')) + parseInt(hash.mangaLibraryEntries.get('length'))),
        'loading': false
      });
    });
  }
});
