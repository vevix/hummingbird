import Ember from 'ember';
import propertyEqual from '../utils/computed/property-equal';
/* global Messenger */

export default Ember.Controller.extend({
  commentStory: Ember.computed.equal('model.type', 'comment'),
  mediaStory: Ember.computed.equal('model.type', 'media_story'),
  followedStory: Ember.computed.equal('model.type', 'followed'),
  knownStory: Ember.computed.any('commentStory', 'mediaStory', 'followedStory'),
  unknownStory: Ember.computed.not('knownStory'),
  substories: Ember.computed.any('allSubstories', 'model.substories'),
  selfPost: propertyEqual('model.poster.id', 'model.user.id'),
  moreThanTwoSubstories: Ember.computed.gt('model.substoryCount', 2),
  isExpanded: false,
  overflowing: false,
  showMoreText: 'Show More',

  collapsed: Ember.computed.equal('model.adult', true),
  showAll: false,
  loadingAll: false,
  loadedAll: propertyEqual('substories.length', 'model.substoryCount'),

  // Determine if we are on a group page
  isOnGroupPage: function() {
    return window.location.href.indexOf('/groups/') !== -1;
  }.property(),

  extraLikers: function() {
    return this.get('model.totalVotes') - this.get('model.recentLikers.length');
  }.property('model.totalVotes', 'model.recentLikers.length'),
  showExtraLikers: Ember.computed.gt('extraLikers', 0),

  mediaRoute: function() {
    return this.get('model.media.constructor.modelName');
  }.property('model.media'),

  displaySubstories: function () {
    var sorted = this.get('substories').sortBy('createdAt').reverse();
    if (sorted.length > 2 && !this.get('showAll')) {
      return sorted.slice(0, 2);
    } else {
      return sorted;
    }
  }.property('substories.@each', 'showAll'),

  reversedDisplaySubstories: function() {
    return this.get('displaySubstories').reverse();
  }.property('displaySubstories.@each'),

  actions: {
    submitReply: function() {
      if (this.get('reply').replace(/\s/g, '').replace(/\[[a-z]+\](.?)\[\/[a-z]+\]/i, '$1').length === 0) {
        return;
      }

      var self = this;
      this.store.findRecord('user', this.get('currentUser.id')).then(function(user) {
        var reply = self.store.createRecord('substory', {
          storyId: self.get('model.id'),
          user: user,
          type: "reply",
          reply: self.get('reply'),
          createdAt: new Date()
        });
        reply.save();
        self.incrementProperty('model.substoryCount');
        self.get('substories').addObject(reply);
        self.set('reply', '');
      });
    },

    toggleShowAll: function () {
      var self = this;
      if (!this.get('loadedAll')) {
        if (!this.get('loadingAll')) {
          // Load all substories for this story.
          this.store.query('substory', {story_id: this.get('model.id')}).then(function(substories) {
            self.set('allSubstories', substories);
            self.set('loadingAll', false);
          });
        }
        this.set('loadingAll', true);
      }
      return this.set('showAll', !this.get('showAll'));
    },

    deleteStory: function() {
      if (confirm('Are you sure you want to delete this post?')) {
        this.get('model').destroyRecord();
      }
    },

    deleteSubstory: function(substory) {
      if (confirm('Are you sure you want to delete this post?')) {
        substory.destroyRecord().then(() => {
          this.get('substories').removeObject(substory);
          this.decrementProperty('model.substoryCount');
        });
      }
    },

    toggleFullPost: function() {
      this.set('isExpanded', !this.get('isExpanded'));
      if (this.get('isExpanded')) { this.set('showMoreText', 'Show Less'); }
      else { this.set('showMoreText', 'Show More'); }
    },

    showCollapsedPost: function() {
      this.set('collapsed', false);
    },

    toggleLike: function() {
      if (!this.get('currentUser.isSignedIn')) {
        return this.transitionTo('sign-up');
      }

      this.toggleProperty('model.isLiked');
      Messenger().expectPromise(() => this.get('model').save(), {
        progressMessage: () => {
          if (this.get('model.isLiked')) {
            return "Liking post...";
          } else {
            return "Unliking post...";
          }
        },
        successMessage: () => {
          if (this.get('model.isLiked')) {
            return "Liked!";
          } else {
            return "Unliked.";
          }
        },
        errorMessage: "Something went wrong."
      });
    },

    toggleNSFW: function() {
      this.get('model').toggleProperty('adult');
      this.get('model').save();
    }
  }
});
