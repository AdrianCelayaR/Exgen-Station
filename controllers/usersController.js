const models = require("../models");
const path = require('path');

exports.getAllUsers = async (req, res) => {
    await models.users.findAll().then(users => {
        console.log(JSON.stringify(users));
        res.render(path.join(__dirname, '../public/views/Users/index'), { users: users });
        // res.sendFile(path.join(__dirname, '../public/views/Users/index.html'), { users: users });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};