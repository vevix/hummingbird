import Ember from 'ember';
import setTitle from '../../utils/set-title';
/* global Messenger */

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('manga');
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  },

  afterModel: function(resolvedModel) {
    return setTitle(resolvedModel.get('romajiTitle'));
  },

  saveMangaLibraryEntry: function(mangaLibraryEntry) {
    var manga = this.currentModel;
    return Messenger().expectPromise((function() {
      return mangaLibraryEntry.save();
    }), {
      progressMessage: "Saving " + manga.get('romajiTitle') + "...",
      successMessage: function() {
        // update the 'full-manga' relationship since it seems
        // to disappear into the void
        manga.set('mangaLibraryEntry', mangaLibraryEntry);
        return "Saved " + manga.get('romajiTitle') + "!";
      }
    });
  },

  actions: {
    loadFullCharacters: function() {
      var manga_id = this.currentModel.get('id');
      this.store.query('casting', { manga_id: manga_id }).then((castings) => {
        this.controller.set('fullCharacters', castings);
      });
    },

    toggleFavorite: function() {
      if (!this.get('currentUser.isSignedIn')) {
        alert('Need to be signed in');
        return;
      }

      var mangaLibraryEntry = this.currentModel.get('mangaLibraryEntry');
      mangaLibraryEntry.set('isFavorite', !mangaLibraryEntry.get('isFavorite'));
      return this.saveMangaLibraryEntry(mangaLibraryEntry);
    },

    removeFromLibrary: function() {
      var manga = this.currentModel,
          mangaLibraryEntry = manga.get('mangaLibraryEntry');
      return Messenger().expectPromise((function() {
        return mangaLibraryEntry.destroyRecord();
      }), {
        progressMessage: "Removing " + manga.get('romajiTitle') + " from your library...",
        successMessage: "Removed " + manga.get('romajiTitle') + " from your library!"
      });
    },

    setLibraryStatus: function(newStatus) {
      var mangaLibraryEntry = this.currentModel.get('mangaLibraryEntry');
      if (this.controller.get('mangaLibraryEntryExists')) {
        mangaLibraryEntry.set('status', newStatus);
      } else {
        mangaLibraryEntry = this.store.createRecord('manga-library-entry', {
          status: newStatus,
          manga: this.currentModel
        });
      }
      if (newStatus === "Completed") {
        mangaLibraryEntry.set('chaptersRead', mangaLibraryEntry.get('manga.chapterCount'));
        mangaLibraryEntry.set('volumesRead', mangaLibraryEntry.get('manga.volumeCount'));
      }
      return this.saveMangaLibraryEntry(mangaLibraryEntry);
    },

    setLibraryRating: function(newRating) {
      var mangaLibraryEntry = this.currentModel.get('mangaLibraryEntry');
      mangaLibraryEntry.set('rating', newRating);
      return this.saveMangaLibraryEntry(mangaLibraryEntry);
    }
  }
});
