const dashboard = require('../model/dashboard');
const space = require('../model/space');
const staffAuth = require('../model/staff_auth');
const lead = require('../model/lead');
const room = require('../model/room');
const staffSignup = require('../model/staff_signup');

module.exports = {

  dashboard: {
    get:
    (req, res) => (dashboard.get(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      console.log(err.stack);
      res.status(400).send(err);
    }),
  },

  space: {
    get:
    (req, res) => (space.get(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
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
      return new Promise((resolve, reject) => {
        const dataIncomplete = (!req.body.name || !req.body.address || !req.body.max_desks);
        if (dataIncomplete) {
          return reject('post data incomplete');
        }
        return resolve(space.post(req));
      })
      .then((result) => {
        const body = JSON.stringify(result);
        res.json(body);
      })
      .catch((err) => {
        console.log(err.stack);
        if (err === 'unauthorized') {
          res.status(401).send(err);
        }
        res.status(400).send(err);
      });
    },
  },

  staff_auth: {
    put:
    (req, res) => (staffAuth.put(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      console.log(err.stack);
      if (err === 'unauthorized') {
        res.status(401).send(err);
      }
      res.status(400).send(err);
    }),
  },

  lead: {
    get:
    (req, res) => (lead.get(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
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
      return new Promise((resolve, reject) => {
        const dataIncomplete = (!req.body.date || !req.body.email || !req.body.type || !req.body.space_id);
        if (dataIncomplete) {
          return reject('post data incomplete');
        }
        return resolve(lead.post(req));
      })
      .then((result) => {
        const body = JSON.stringify(result);
        res.json(body);
      })
      .catch((err) => {
        console.log(err.stack);
        if (err === 'unauthorized') {
          res.status(401).send(err);
        }
        res.status(400).send(err);
      });
    },
  },
  room: {
    get:
    (req, res) => (room.get(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
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
      return new Promise((resolve, reject) => {
        const dataIncomplete = (!req.body.name || !req.body.cost || !req.body.max_size || !req.body.space_id);
        if (dataIncomplete) {
          return reject('post data incomplete');
        }
        return resolve(room.post(req));
      })
      .then((result) => {
        const body = JSON.stringify(result);
        res.json(body);
      })
      .catch((err) => {
        console.log(err.stack);
        if (err === 'unauthorized') {
          res.status(401).send(err);
        }
        res.status(400).send(err);
      });
    },
  },
  signup_staff: {
    get:
    (req, res) => (staffSignup.get(req))
    .then((result) => {
      console.log(result, 'body');
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    }),
  },
};
