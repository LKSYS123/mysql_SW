const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/get/data', controller.api.getData);
router.post('/add/data', controller.api.addData);
router.post('/update/data', controller.api.updateData);
router.post('/delete/data', controller.api.deleteData);

router.post('/api/addPost', controller.api.addPost);
router.get('/api/posts', controller.api.getPostList);
router.get('/api/post/:id', controller.api.getPost);
router.post('/register', controller.api.register);
router.post('/login', controller.api.login);
router.get('/authCheck', controller.api.authCheck);
router.post('/logout', controller.api.logout);

module.exports = router;