import Route from 'ember-route';
import get from 'ember-metal/get';
import service from 'ember-service/inject';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  currentSession: service(),
  i18n: service(),
  metrics: service(),

  beforeModel() {
    return this._getCurrentUser();
  },

  title(tokens) {
    const base = 'Hummingbird';
    // If the route hasn't defined a `titleToken` then try to grab the route
    // name from the `titles` table in translations.
    const hasTokens = tokens && tokens.length > 0;
    if (hasTokens === false) {
      const currentRouteName = get(this, 'router.currentRouteName');
      let title = get(this, 'i18n').t(`titles.${currentRouteName}`) || undefined;
      if (title && title.toString().includes('Missing translation')) {
        title = undefined;
      }
      tokens = title ? [title] : undefined;
    }
    return tokens ? `${tokens.reverse().join(' | ')} | ${base}` : base;
  },

  // This method is fired by ESA when authentication is successful
  sessionAuthenticated() {
    this._getCurrentUser();
    this._super(...arguments);
  },

  /**
   * Retreives the current user data from the API if we have a local session
   * stored.
   */
  _getCurrentUser() {
    const isAuthenticated = get(this, 'currentSession.isAuthenticated');
    if (isAuthenticated) {
      return get(this, 'currentSession').getCurrentUser()
        .then((user) => {
          get(this, 'metrics').identify({ distinctId: get(user, 'id') });
        })
        .catch(() => {
          get(this, 'currentSession').invalidate();
        });
    }
  }
});
