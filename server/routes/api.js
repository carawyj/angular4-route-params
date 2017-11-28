const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/try', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/users/:id', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find({"id": req.params.id})
            .toArray()
            .then((user) => {
                response.data = user;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// router.get('/users/:id', getUserById);
//
// function getUserById(req, res) {
//   return new Promise((resolve, reject) => {
//     connection((db) => {
//       db.collection('users')
//       .find({"id": req.query.id}, function(err, person){
//         if (err) {
//         reject({
//           success: false,
//           message: "服务器错误：获取部门信息失败！"
//         });
//       } else {
//         resolve({
//           success: true,
//           message: "获取成功！",
//           person: person
//         });
//       }
//     })
//     .then(info => {
//       if (info && info.success) {
//         res.send(info);
//       } else if(!info) {
//         res.status(401).send('Cannot get user');
//       } else {
//         res.status(401).send(info);
//       }
//     }).catch(err => {
//       res.status(400).send(err);
//     });
//   })
// })
// }

module.exports = router;
