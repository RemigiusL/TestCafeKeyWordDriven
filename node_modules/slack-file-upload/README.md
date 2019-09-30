Usage:

To upload with Slack API token, channels and file name.
```javascript
const slackFileUpload = require('slack-file-upload');

slackFileUpload.upload({
    token: token,
    channels: 'channels',
    filename: 'README.md'
});
```
