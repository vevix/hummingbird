import Component from 'ember-component';
import computed, { alias } from 'ember-computed';
import get from 'ember-metal/get';
import service from 'ember-service/inject';
import { task, timeout } from 'ember-concurrency';
import IsOwner from 'client/mixins/is-owner';
import jQuery from 'jquery';

export default Component.extend(IsOwner, {
  isExpanded: false,

  currentSession: service(),
  i18n: service(),
  media: alias('entry.media'),
  user: alias('entry.user'),

  episodeCount: computed('media.episodeCount', {
    get() {
      return get(this, 'media.episodeCount') || '—';
    }
  }).readOnly(),

  rating: computed('entry.rating', {
    get() {
      return get(this, 'entry.rating') || '—';
    }
  }).readOnly(),

  type: computed('media.showType', {
    get() {
      const mediaType = get(this, 'mediaType');
      const type = get(this, 'media.showType');
      return get(this, 'i18n').t(`media.${mediaType}.show-type.${type}`);
    }
  }).readOnly(),

  updateProperty: task(function *(key, value) {
    // @TODO: make timeout optional
    yield timeout(1000);
    yield get(this, 'update')(key, value);
  }).restartable(),

  /**
   * Toggle the `isExpanded` property when the component is clicked.
   * Returns early if the click is not within the desired container or
   * is within an input element.
   */
  click(event) {
    const target = get(event, 'target');
    const isChild = jQuery(target).is('.entry-wrapper *, .entry-wrapper');
    if (isChild === false || get(target, 'tagName') === 'INPUT') {
      return;
    }
    this.toggleProperty('isExpanded');
  },

  actions: {
    destroyEntry() {
      return get(this, 'delete')();
    },

    rewatch() {
      const reconsumeCount = get(this, 'entry.reconsumeCount') + 1;
      const updates = {
        reconsumeCount,
        progress: 0,
        status: 'current'
      };
      get(this, 'updateProperty').perform(updates);
    }
  }
});
