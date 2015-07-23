import Ember from 'ember';
import setTitle from '../../utils/set-title';

export default Ember.Route.extend({
  controllerName: 'apps.edit',

  setupController: function(controller, model) {
    controller.setProperties({
      model: model,
      creatingApp: true
    });
  },

  renderTemplate: function() {
    this.render('apps.edit');
  },

  model: function() {
    let currentUserUser = this.store.findRecord('user', this.get('currentUser.id'));
    return this.store.createRecord('app', {
      // HACK: fixes `undefined` being logged to console (bug in EV?)
      name: '',
      description: '',
      creator: currentUserUser,
      writeAccess: false,
      public: false
    });
  },

  willTransition: function() {
    this.controllerFor('apps.edit').get('model').deleteRecord();
  },

  afterModel: function() {
    return setTitle('New App');
  }
});
