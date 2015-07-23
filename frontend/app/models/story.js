import Ember from 'ember';
import DS from 'ember-data';
import Model from '../models/model';
import ModelCurrentUser from '../mixins/model-current-user';

export default Model.extend(ModelCurrentUser, {
  type: DS.attr('string'),
  user: DS.belongsTo('user', { async: false }),
  poster: DS.belongsTo('user', { async: false }),
  group: DS.belongsTo('group', { async: false }),
  createdAt: DS.attr('date'),
  comment: DS.attr('string'),
  media: DS.belongsTo('media', { polymorphic: true, async: false }),
  substories: DS.hasMany('substory', { async: false }),
  substoryCount: DS.attr('number'),
  totalVotes: DS.attr('number'),
  isLiked: DS.attr('boolean'),
  adult: DS.attr('boolean'),
  recentLikers: DS.hasMany('user', { async: false }),

  omittedSubstoryCount: function(){
    return this.get('substoryCount') - 2;
  }.property('substoryCount'),

  belongsToUser: function() {
    var currentUserId = this.get('currentUser.id');
    return currentUserId === this.get('poster.id') || currentUserId === this.get('user.id');
  }.property('poster.id', 'user.id'),

  canDeleteStory: function() {
    if (this.get('isNew')) { return false; }

    var currentMember = this.get('group') && this.get('group.currentMember');
    var canDeleteViaGroupRank = currentMember && (currentMember.get('isAdmin') || currentMember.get('isMod'));

    return this.get('belongsToUser') || this.get('currentUser.isAdmin') || canDeleteViaGroupRank;
  }.property('isNew', 'belongsToUser', 'currentUser.isAdmin', 'group'),

  canToggleNSFW: Ember.computed.alias('canDeleteStory')
});
