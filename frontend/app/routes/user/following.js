import Ember from 'ember';
import Paginated from '../../mixins/paginated';
import setTitle from '../../utils/set-title';

export default Ember.Route.extend(Paginated, {
  fetchPage: function(page) {
    return this.store.query('user', {
      followed_by: this.modelFor('user').get('id'),
      page: page
    });
  },

  afterModel: function() {
    return setTitle("Followed by " + this.modelFor('user').get('username'));
  }
});
