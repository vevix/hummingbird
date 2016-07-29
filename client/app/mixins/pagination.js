import Mixin from 'ember-metal/mixin';
import get from 'ember-metal/get';
import service from 'ember-service/inject';
import computed from 'ember-computed';
import { task } from 'ember-concurrency';

/**
 * Pagination based on JSON-API's top level links object.
 * Due to ember-data not having support for pagination yet, this requires a
 * hackish fix implemented in `client/initializers/store-links.js`
 */
export default Mixin.create({
  store: service(),

  /**
   * Grabs the latest `next` URL from the `links` object
   */
  nextLink: computed('links', {
    get() {
      const links = get(this, 'links') || {};
      return get(links, 'next') || undefined;
    }
  }),

  /**
   * Grabs the `links` object from the models metadata
   */
  links: computed('model', {
    get() {
      let model = get(this, 'model');
      const metadata = get(model, 'meta') || {};
      return get(metadata, '_links') || undefined;
    }
  }),

  /**
   * Droppable task that queries the next set of data and sends an action
   * up to the owner.
   */
  getNextData: task(function *() {
    const nextLink = get(this, 'nextLink');
    if (nextLink === undefined) {
      return;
    }
    let model = get(this, 'model');
    model = get(model, 'firstObject') || model;
    const { modelName } = model.constructor;
    const options = this._parseLink(nextLink);
    const records = yield get(this, 'store').query(modelName, options);
    get(this, 'update')(records);
  }).drop(),

  /**
   * Decodes and rebuilds the query params object from the URL passed.
   */
  _parseLink(url) {
    url = window.decodeURI(url);
    url = url.split('?');
    if (url.length !== 2) {
      return {};
    }
    url = url[1].split('&');
    const filter = {};
    url.forEach((option) => {
      option = option.split('=');
      if (option[0].includes('[') === true) {
        const match = option[0].match(/(.+)\[(.+)\]/);
        filter[match[1]] = filter[match[1]] || {};
        filter[match[1]][match[2]] = decodeURIComponent(option[1]);
      } else {
        filter[option[0]] = decodeURIComponent(option[1]);
      }
    });
    return filter;
  }
});
