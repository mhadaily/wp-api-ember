import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  content: DS.attr('string'),
  excerpt: DS.attr('string'),
  slug: DS.attr('string'),
  date: DS.attr('date'),
  featured_media: DS.attr('number'),
  format: DS.attr(),
  categories: DS.hasMany('category', {async: true}),
  tags: DS.hasMany('tag', {async: true}),
  acf: DS.attr() // for Advanced custom Fields component,need to be explained more...
});
