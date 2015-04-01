var gulp = require("gulp");
var bower = require("main-bower-files");

gulp.task("default", function(){

  gulp.src(bower())
    .pipe(gulp.dest("public"));

});
