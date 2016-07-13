import { moduleFor, test } from 'ember-qunit';
import run from 'ember-runloop';
import get from 'ember-metal/get';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import RSVP from 'rsvp';
import setupStore from 'client/tests/helpers/setup-store';

moduleFor('service:current-session', 'Unit | Service | current session', {
  beforeEach() {
    this.store = setupStore({
      user: Model.extend({
        name: attr('string')
      })
    });
  },

  afterEach() {
    run(this.store, 'destroy');
  }
});

test('#getCurrentUser sets the account', function(assert) {
  assert.expect(1);
  const service = this.subject({
    store: this.store,
    ajax: {
      request() {
        return new RSVP.Promise((resolve) => {
          resolve({
            data: [{
              type: 'user',
              id: '1',
              attributes: { name: 'Holo' }
            }]
          });
        });
      }
    }
  });

  service.getCurrentUser().then(() => {
    const account = get(service, 'account');
    assert.equal(get(account, 'name'), 'Holo');
  });
});

test('#invalidate calls #invalidate on the session', function(assert) {
  assert.expect(1);
  const service = this.subject({
    session: {
      invalidate() {
        assert.ok(true);
      }
    }
  });
  service.invalidate();
});

test('#isCurrentUser tests if the passed user is the current user', function(assert) {
  const service = this.subject({
    session: { isAuthenticated: true },
    account: { id: 1 }
  });
  let result = service.isCurrentUser({ id: 1 });
  assert.ok(result);
  result = service.isCurrentUser({ id: 2 });
  assert.notOk(result);
});
