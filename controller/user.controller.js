const User = require("../model/user.model");
const { generateAccessToken } = require('../utils/jwt');
const { promisify } = require('util');
const clientRedis = require("../config/redis.config");

function userController() {

    //Create User Data
    const addUser = async (req, res) => {
        try {
            let addUser = await new User(req.body).save();
            let getToken = generateAccessToken(req.body.userName)
            res.status(200).json({ error: false, message: "Create User Success!", token: getToken, addUser });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    //Get all user data
    const getUsers = async (req, res) => {
        try {
            const key = 'getAllUser';
            let get = await promisify(clientRedis.get).bind(clientRedis);
            let cekCache = await get(key);

            if (cekCache) {
                let data = JSON.parse(cekCache);
                res.status(200).json({ error: false, message: 'All User Data from Redis', data });
            } else {
                let getAllUsers = await User.find();
                if (!getAllUsers) return res.status(404).json({ message: "Data Not Available!" })
                clientRedis.setex(key, 405, JSON.stringify(getAllUsers));
                res.status(200).json({ error: false, message: "All User Data Founded!", getAllUsers });
            }
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    //to get user by accountNumber
    const getUserByAcountNum = async (req, res) => {
        try {
            const accountNum = req.params.accountNumber;
            const getUserByAccNum = await User.findOne({ accountNumber: accountNum });
            if (!getUserByAccNum) return res.status(404).json({ message: "User not found" })
            res.status(200).json({ error: false, message: `Account Number : ${accountNum} Founded!`, getUserByAccNum });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //to get user by IdentityNumber
    const getUserByIdNum = async (req, res) => {
        try {
            const idNumber = req.params.identityNumber;
            const getUserByIdNumb = await User.findOne({ identityNumber: idNumber });
            if (!getUserByIdNumb) return res.status(404).json({ message: "Id Number not found" })
            res.status(200).json({ error: false, message: `Identity Number : ${idNumber} Founded!`, getUserByIdNumb });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //update user
    const updateUser = async (req, res) => {
        try {
            const userId = req.params.id;
            const updateUserQuery = await User.updateOne({ _id: userId }, { $set: req.body });
            clientRedis.del('getAllUser');
            res.status(200).json({ error: false, message: `Id: ${userId} Has been Updated!`, updateUserQuery });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    const deleteUser = async (req, res) => {
        try {
            const username = req.params.userName;
            const delUserQuery = await User.deleteOne({ userName: username })
            clientRedis.del(`getAllUser`);
            res.status(200).json({ error: false, message: `Username: ${username} Has been removed!`, delUserQuery });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    return {
        addUser: addUser,
        getUsers: getUsers,
        getUserByAcountNum: getUserByAcountNum,
        getUserByIdNum: getUserByIdNum,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
}

module.exports = userController();