function CollectionRouter(db, opts) {
  opts || (opts = {});
  var Router = require("express").Router;
  this.db = db;
  this.scope = opts.scope;
  this.router = new Router({
    mergeParams: true
  });
  this.setupRoutes();
}

CollectionRouter.prototype = {

  setupRoutes: function() {

    // INDEX
    this.router.get("/", function(req, res) {
      var query = {}
      if (req.params.id && this.scope) {
        query[this.scope] = req.params.id;
      }

      this.db.find(query, function(err, data){
        if(err) {
          res.status(500).json({error: err.toString()});
        }
        else {
          res.json(data);
        }
      });
    }.bind(this));

    // CREATE
    this.router.post("/", function(req, res){
      this.db.insert(req.body, function(err, data){
        if(err) {
          res.status(500).json({error: err.toString()});
        }
        else {
          res.json(data);
        }
      });
    }.bind(this));

  }

};

module.exports = CollectionRouter;

