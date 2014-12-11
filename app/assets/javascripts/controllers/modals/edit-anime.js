HB.ModalsEditAnimeController = Ember.ObjectController.extend(HB.ModalControllerMixin, HB.ModalVersionableMixin, {
  startingDate: Em.computed('startedAiring', function(k, v) {
    if (v !== undefined) {
      var date = new Date(v);
      if (!isNaN(date.getTime()) && /^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(v)) {
        this.set('startedAiring', moment(v).toDate());
      }
    }
    var fmt = moment(this.get('startedAiring'));
    if (isNaN(fmt.toDate().getTime())) {
      return "";
    } else {
      return fmt.format('YYYY-MM-DD');
    }
  }),

  finishedDate: Em.computed('finishedAiring', function(k, v) {
    if (v !== undefined) {
      var date = new Date(v);
      if (!isNaN(date.getTime()) && /^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(v)) {
        this.set('finishedAiring', moment(v).toDate());
      }
    }
    var fmt = moment(this.get('finishedAiring'));
    if (isNaN(fmt.toDate().getTime())) {
      return "";
    } else {
      return fmt.format('YYYY-MM-DD');
    }
  })
});
