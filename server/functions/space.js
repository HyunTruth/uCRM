const Space = require('../db/space');
const Room = require('../db/room');
const Member = require('../db/member');
const Activity = require('../db/activity');

module.exports = {
  getMemberList: (spaceid) => {
    return new Promise((resolve, reject) => {
      Space.where({ id: spaceid })
      .fetch({ withRelated: ['member'] })
      .then(function(result) {
        if (!result) {
          return resolve([]);
        }
        return resolve(result.related('member').toJSON());
      })
      .catch(function(err) {
        return console.log(err);
      });
    });
  },

  getReservedList: (spaceid) => {
    return new Promise((resolve, reject) => {
      Room.where({ space_id: spaceid })
      .fetch({ withRelated: ['reservation'] })
      .then((result) => {
        if (!result) {
          return resolve([]);
        }
        return resolve(result.related('reservation').toJSON());
      })
      .catch(function(err) {
        return console.log(err);
      });
    });
  },

  getUnpaidSum: (spaceid) => {
    return new Promise((resolve, reject) => {
      Member.where({ space_id: spaceid })
      .fetch({ withRelated: ['payment'] })
      .then((result) => {
        if (!result) {
          return resolve([]);
        }
        return resolve(result.related('payment').toJSON());
      })
    });
  },

  getLatestActivity: (spaceid) => {
    return new Promise((resolve, reject) => {
      Activity.where({ space_id: spaceid })
      .query((query) => {
        query.whereBetween('date', ['2017-02-01', '2017-03-02'])
      })
      .fetch()
      .then((result) => {
        if (!result) {
          return resolve([]);
        }
        return resolve(result.attributes);
      });
    });
  },

  getSpaceDetail: (spaceid) => {
    return new Promise((resolve, reject) => {
      Space.where({ id: spaceid })
      .fetch()
      .then((result) => {
        if (!result) {
          return reject('corresponding space does not exist');
        }
        return resolve(result.attributes);
      });
    });
  },

  getAllSpaces: (companyid) => {
    return new Promise((resolve, reject) => {
      Space
      .where({ company_id: companyid })
      .fetchAll()
      .then((result) => {
        return resolve(result);
      });
    });
  }
};
