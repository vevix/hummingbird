import DS from 'ember-data';
import Manga from '../models/manga';

export default Manga.extend({
  bayesianRating: DS.attr('number'),
  communityRatings: DS.attr('array'),
  coverImage: DS.attr('string'),
  coverImageTopOffset: DS.attr('number'),
  featuredCastings: DS.hasMany('casting', { async: false }),
  pendingEdits: DS.attr('number')
});
