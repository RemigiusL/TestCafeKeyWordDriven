const request = require('request');
const fs = require('fs');
const uploadApiUrl = 'https://slack.com/api/files.upload';

module.exports = {
    upload : (options) => {
        fileupload(options);
    }
}

const fileupload = (options) => {

    const imageStream = fs.createReadStream(options.filename);

    request.post({
      url: uploadApiUrl,
      formData: {
        token: options.token,
        channels: options.channels,
        file: imageStream
      }}, function(err, res, body){
        // console.log(res);
        console.log(err);
      });
}
