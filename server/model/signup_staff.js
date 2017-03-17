const Space = require('../functions/space');
const Staff = require('../functions/staff');
const auth = require('../functions/auth');

module.exports = {
  get: (req) => {
    return new Promise((resolve, reject) => {
      Space.getAllSpacesByCompanyName(req.query.companyname)
      .then((result) => {
        console.log('company has following spaces', result)
        return resolve(result.toJSON());
      })
      .catch(err => (reject(err)));
    });
  },
  post: (body) => {
    return new Promise((resolve, reject) => {
      auth.checkId(body.userid)
      .then((result) => {
        if (result) {
          Staff.addNewStaff(body)
          .then((result) => {
            return resolve(result);
          })
        } else {
          return reject('userid already exist');
        }
      })
      .catch(err => (reject(err)));
    });
  },
};
