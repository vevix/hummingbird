import Ember from 'ember';

export default Ember.ArrayController.extend({
  init: function(){
    this.set('content', this.store.findAll('notification'));
    this._super();
  },

  sortProperties: ['createdAt'],
  sortAscending: false
});
