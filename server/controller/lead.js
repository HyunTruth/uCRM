const lead = require('../model/lead');

module.exports = {
  get:
  (req, res) => (lead.get(req))
  .then((result) => {
    console.log('RESULT', result)
    if (result.length) {
      res.json(result);
    }
    res.status(300).send('unauthorized access');
  })
  .catch((err) => {
    console.log(err.stack);
    if (err === 'unauthorized') {
      res.status(401).send(err);
    }
    res.status(400).send(err);
  }),
  post:
  (req, res) => {
    const dataIncomplete = (
      !req.body.date
      || !req.body.space_id
      || !req.body.email
      || !req.body.type
      || !req.body.name
    );
    if (dataIncomplete) {
      res.status(400).send('post data incomplete');
    }
    return lead.post(req)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.stack);
      if (err === 'unauthorized') {
        res.status(401).send(err);
      }
      res.status(400).send(err);
    });
  },
};