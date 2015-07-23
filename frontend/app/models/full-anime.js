import Em from 'ember';
import DS from 'ember-data';
import Anime from '../models/anime';

export default Anime.extend({
  alternateTitle: DS.attr('string'),
  coverImage: DS.attr('string'),
  coverImageTopOffset: DS.attr('number'),
  languages: DS.attr('array'),
  screencaps: DS.attr('array'),
  episodes: DS.hasMany('episode', { async: false }),
  youtubeVideoId: DS.attr('string'),
  communityRatings: DS.attr('array'),
  bayesianRating: DS.attr('number'),
  producers: DS.hasMany('producer', { async: false }),
  franchises: DS.hasMany('franchise', { async: true, inverse: null }),
  featuredQuotes: DS.hasMany('quote', { async: false }),
  trendingReviews: DS.hasMany('review', { async: false }),
  featuredCastings: DS.hasMany('casting', { async: false }),
  pendingEdits: DS.attr('number'),
  hasReviewed: DS.attr('boolean'),

  hasTrailer: Em.computed.bool('youtubeVideoId'),

  episodeSortOrder: ['number'],
  sortedEpisodes: Em.computed.sort('episodes', 'episodeSortOrder')
});
