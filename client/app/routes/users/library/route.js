import Route from 'ember-route';
import get from 'ember-metal/get';
import set, { setProperties } from 'ember-metal/set';
import { capitalize } from 'ember-string';
import service from 'ember-service/inject';
import libraryStatus from 'client/utils/library-status';
import jQuery from 'jquery';
import { task } from 'ember-concurrency';

export default Route.extend({
  queryParams: {
    media: { refreshModel: true },
    status: { refreshModel: true }
  },

  i18n: service(),

  /**
   * Using a `ember-concurrency` task for the model hook, so that
   * if the user changes the query param mid-request, the task is
   * restarted.
   */
  modelTask: task(function *(media, status) {
    const user = this.modelFor('users');
    const userId = get(user, 'id');
    const options = {};

    if (status === 'all') {
      status = '1,2,3,4,5';
      Object.assign(options, { sort: 'status' });
    } else {
      status = libraryStatus.enumToNumber(status);
    }

    Object.assign(options, {
      include: 'media.genres,user',
      filter: {
        user_id: userId,
        media_type: capitalize(media),
        status
      },
      page: {
        offset: 0,
        limit: 50
      }
    });
    return yield get(this, 'store').query('library-entry', options);
  }).restartable(),

  model({ media, status }) {
    return get(this, 'modelTask').perform(media, status);
  },

  titleToken() {
    const model = this.modelFor('users');
    const name = get(model, 'name');
    return get(this, 'i18n').t('titles.users.library', { user: name });
  },

  actions: {
    /**
     * Ember route loading state during our `model()` hook
     */
    loading(transition) {
      const controller = this.controllerFor(get(this, 'routeName'));
      set(controller, 'isLoading', true);
      transition.promise.finally(() => set(controller, 'isLoading', false));
    },

    /**
     * Updates the `media` query param
     */
    updateMedia(media) {
      const controller = this.controllerFor(get(this, 'routeName'));
      set(controller, 'media', media);
    },

    /**
     * Add new records we receive from `scrolling-paginator` to our
     * model.
     */
    newRecords(records) {
      const controller = this.controllerFor(get(this, 'routeName'));
      const model = get(controller, 'model');
      const content = model.toArray();
      content.addObjects(records);
      set(controller, 'model', content);
      // Update the meta record on the model so we have latest link data
      const meta = get(records, 'meta');
      set(controller, 'model.meta', meta);
    },

    /**
     * Update properies on an entry within our model.
     */
    updateEntry(entry, key, value) {
      if (jQuery.isPlainObject(key)) {
        setProperties(entry, key);
      } else {
        set(entry, key, value);
      }

      // @TODO: Feedback to user on success and failure
      if (get(entry, 'validations.isValid') === true) {
        return entry.save().catch(() => entry.rollbackAttributes());
      }
    },

    /**
     * Destroys an entry within our model.
     */
    destroyEntry(entry) {
      // @TODO: Feedback to user on success and failure
      return entry.destroyRecord().catch(() => entry.rollbackAttributes());
    }
  }
});
