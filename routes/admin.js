const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

let User = require('../models/User');
let Exam = require('../models/Exam');
let Question = require('../models/Question');
let Class = require('../models/Class');

let adminBro = new AdminBro({
  resources: [User, Exam, Question, Class],
});

const router = AdminBroExpress.buildRouter(adminBro)

module.exports = router;