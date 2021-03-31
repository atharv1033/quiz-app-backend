const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

let User = require('../models/User');
let Exam = require('../models/Exam');
//let Question = require('../models/Question');
let Class = require('../models/Class');
let Answersheet = require('../models/Answersheet');

let adminBro = new AdminBro({
  resources: [User, Exam, Class, Answersheet],
});

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (username, password) => {
    if(username === "superuser" && password === "") {
      console.log('here');
      return true
    } else {
      return false
    }
  },
  cookieName: 'adminbro',
  cookiePassword: 'somePassword',
});

module.exports = router;