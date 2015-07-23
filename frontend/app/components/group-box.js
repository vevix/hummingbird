import Ember from 'ember';
/* global Messenger */

export default Ember.Component.extend({
  store: Ember.inject.service(),
  userIsMemberOfGroup: Ember.computed.notEmpty('group.currentMember'),

  userMembershipIsPending: function(){
    if (!this.get('userIsMemberOfGroup')) { return false; }
    return this.get('group.currentMember.pending');
  }.property('userIsMemberOfGroup'),

  actions: {
    joinGroup: function(){
      var member = this.get('store').createRecord('group-member', {
        groupId: this.get('group.id'),
        user: this.get('currentUser.content.content'),
        pending: true
      });
      Messenger().expectPromise(function() {
        return member.save();
      }, {
        progressMessage: 'Contacting server...',
        successMessage: () => {
          this.get('group').set('currentMember', member);
          return 'You have joined ' + this.get('group.name') + '.';
        },
        errorMessage: function(type, xhr) {
          if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
            return xhr.responseJSON.error + '.';
          }
          return 'There was an unknown error.';
        }
      });
    }
  }

});
