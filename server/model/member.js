const Member = require('../functions/member');

module.exports = {
  get: (req) => {
    return new Promise((resolve, reject) => {
      const spaceid = parseInt(req.query.space_id);
      Member.getAllMembers(spaceid)
      .then((result) => {
        return resolve(result.toJSON());
      })
      .catch((err) => {
        return reject(err);
      });
    });
  },
  post: (req) => {
    return new Promise((resolve, reject) => {
      console.log(req.body)
      const ifMemberExistByEmail = Member.checkExistingMemberByEmail(req.body.email);
      const ifMemberExistByMobile = Member.checkExistingMemberByMobile(req.body.mobile);
      Promise.all([ifMemberExistByEmail, ifMemberExistByMobile])
      .then((check) => {
        console.log(check);
        if (check[0] && check[1]) {
          Member.addNewMember(req.body, req.body.space_id)
          .then((result) => {
            return resolve(result);
          });
        }
        else {
          return reject('member already exist 3');
        }
      })
      .catch((err) => {
        return reject(err);
      });
    })
  },
};