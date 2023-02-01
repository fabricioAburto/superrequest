const superrequest = require('./index');

const controller = new AbortController();

superrequest
  .get('/contracts', { signal: controller.signal })
  .then((data) => {
    console.log(data.data.data.length);
  })
  .catch(() => {});

controller.abort();
const controller2 = new AbortController();
superrequest.get('/contracts', { signal: controller2.signal }).then((data) => {
  console.log(data.data.data.length);
});
