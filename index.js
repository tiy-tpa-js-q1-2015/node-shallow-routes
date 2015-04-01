var express   = require("express");
var DataStore = require("nedb");
var path      = require("path");

var app = express();

app.use(require("body-parser").json());

app.use(express.static("public"));

app.set("view engine", "jade");

var db = function(name) {
  var filepath = path.join(__dirname, "nedb", name);
  return new DataStore({
    filename: filepath,
    autoload: true
  });
}

var teamsDB = db("teams");
var usersDB = db("users");
var goalsDB = db("user_goals");
var entryDB = db("goal_entries");

var colRouter = require("./collection_router");
var memRouter = require("./member_router");

app.use("/teams",             new colRouter(teamsDB).router);
app.use("/teams/:id/users",   new colRouter(usersDB, {scope: "_team_id"}).router);
app.use("/users/:id/goals",   new colRouter(goalsDB, {scope: "_user_id"}).router);
app.use("/goals/:id/entries", new colRouter(entryDB, {scope: "_goal_id"}).router);

app.use("/teams",   new memRouter(teamsDB).router);
app.use("/users",   new memRouter(usersDB).router);
app.use("/goals",   new memRouter(goalsDB).router);
app.use("/entries", new memRouter(entryDB).router);

app.get("/", function(req, res) {
  res.render("index");
});

var port = process.env.PORT || 8025;
console.log("listening on :" + port);
app.listen(port);

