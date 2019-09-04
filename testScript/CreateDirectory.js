
var mkdirp = require('mkdirp');
var dateFormat = require('dateformat');
var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
mkdirp('New folder'+day, function(err) { 


    // path exists unless there was an error
    console.log(day);

});