(function(ns){

  var User = Backbone.Model.extend({
    idAttribute: "_id",

    url: function() {
      if(this.isNew()) {
        return this.collection.url();
      } else {
        return "/users/" + this.id;
      }
    }
  });

  var Users = Backbone.Collection.extend({
    model: User,
    url: function() {
      return "/teams/" + this.team.id + "/users"
    },
    initialize: function(data, options) {
      this.team = options.team;
      this.on("add", function(model){
        if(model.isNew()) {
          model.set("_team_id", this.team.id);
        }
      });
    }
  });

  ns.Users = Users;

})(window);
