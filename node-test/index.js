const superrequest = require('../dist').default;

const BASEURL = 'http://api.hub2.delinternet.com:3002/v1';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM4ODIsImludm9pY2VDbGllbnRJZCI6Mzg4NSwiaWF0IjoxNjc1MDEzMjIxfQ.dKjILig6YYQFAQGvZW84I47V_4TZ3IDum-mbk6tRkng';

superrequest.setBaseURL(BASEURL);
superrequest.setAuthToken(TOKEN);
superrequest.enableLogs();
superrequest.setDefaultCacheTime(30);

module.exports = superrequest;
