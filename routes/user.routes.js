const express = require("express");
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt');
const userController = require("./../controller/user.controller");

router.post('/addUser', userController.addUser);
router.get('/', verifyAccessToken, userController.getUsers);
router.get('/search/:accountNumber', verifyAccessToken, userController.getUserByAcountNum);
router.get('/idSearch/:identityNumber', verifyAccessToken, userController.getUserByIdNum);
router.patch('/update/:id', verifyAccessToken, userController.updateUser);
router.delete('/delete/:userName', verifyAccessToken, userController.deleteUser);

module.exports = router;