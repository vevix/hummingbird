import Ember from 'ember';

export default Ember.Controller.extend({
  userList: function (){
    return this.store.query('user', {
      to_follow: true
    });
  }.property('loading')
});
