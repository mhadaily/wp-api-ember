import DS from 'ember-data';
import config from 'ember-get-config';

// The WP API requires a rest adapter.
export default DS.RESTAdapter.extend({
  host: config.wpHost,
  // This is the default namespace for WP API v2.
  namespace: 'wp-json/wp/v2',

  handleResponse(status, headers, payload, requestData) {
    // Wordpress sends meta data (useful for pagination) in GET requests headers.
    // Here we move it to a `meta` property which Ember expects.
    if (payload) {
      payload.meta = {
        total: headers['X-WP-Total'],
        totalPages: headers['X-WP-TotalPages']
      };
    }
    return this._super(status, headers, payload, requestData);
  },
  // always send Ember=1 in params since we are baypassing wordpress policy with this
  // ajax(url, type, hash) {
  //   if (Ember.isEmpty(hash)) hash = {};
  //   if (Ember.isEmpty(hash.data)) hash.data = {};
  //   hash.data.per_page = 30;
  //   return this._super(url, type, hash);
  // },
});
