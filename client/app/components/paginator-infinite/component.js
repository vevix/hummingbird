import Component from 'ember-component';
import get from 'ember-metal/get';
import { setProperties } from 'ember-metal/set';
import InViewportMixin from 'ember-in-viewport';
import PaginationMixin from 'client/mixins/pagination';

export default Component.extend(InViewportMixin, PaginationMixin, {
  tolerance: { top: 0, left: 0, bottom: 50, right: 0 },

  init() {
    this._super(...arguments);
    // Setup properties for `ember-in-viewport`
    setProperties(this, {
      viewportSpy: true,
      viewportTolerance: get(this, 'tolerance')
    });
  },

  didEnterViewport() {
    this._super(...arguments);
    get(this, 'getNextData').perform();
  }
});
