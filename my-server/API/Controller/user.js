const User = require('../Models/user')
const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.sign_up_user = async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email }).exec();
        if (existingUser) {
            return res.status(409).json({
                message: "Mail already exists!",
                login: true
            });
        }

        // Hash the password
        const hash = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: hash
        });

        // Save the user to the database
        const result = await user.save();
        console.log("User Created:", result);

        res.status(201).json({
            message: "User Created",
            login: true
        });
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json({
            error: err
        });
    }
};


exports.login_user = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth Failed!"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth Failed!"
                    })
                }
                if (result) {

                    return res.status(200).json({
                        message: "Auth Successful!",
                        username: user[0].name
                    })
                }
                return res.status(401).json({
                    message: "Auth Failed!"
                })
            })
        })
        .catch(error =>

            res.status(500).json({
                error: error
            })
        )



};

//Show
exports.get_all_users = (req, res, next) => {

    User.find() // show all Users
        .select('_id userId name email phoneNumber')
        .exec()
        .then(docs => {
            console.log(docs)

            const response = {
                count: docs.length,
                users: docs.map(doc => {  // use map function if you have to add data like request for every item otherwise use products:docs 
                    return {
                        userId: doc.userId,
                        name: doc.name,
                        email: doc.email,
                        // _id: doc._id,
                        phoneNumber: doc.phoneNumber,
                        // request: {
                        //     type: "GET",
                        //     url: "http://localhost:4000/users"
                        // }
                    }
                })
            }
            if (docs.length >= 0) {
                res.status(200).json(response)
            } else {
                res.status(404).json({ message: "No Data found" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        });
};

//Create
exports.create_user = (req, res, next) => {

    //Store data into DB
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    });

    user.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: "Created User Successfully..",
            createdUser: {
                userID: result.userId,
                name: result.name,
                email: result.email,
                _id: result._id,
                phoneNumber: result.phoneNumber,
                // request: {
                //     type: "GET",
                //     url: "http://localhost:4000/users"
                // }
            }
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    });

};

//delete
exports.delete_user = (req, res, next) => {
    const id = req.params.userId
    if (isNaN(id)) {
        return res.status(400).json({ error: `Invalid user ID: ${id}` });
    }

    User.deleteOne({ userId: id }) // delete user by id
        .exec()
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({
                message: "User Deleted.",
                data: { name: 'String' }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        });
}

//update
exports.update_user = (req, res, next) => {
    const id = req.params.userId;

    User.updateOne({ userId: id }, { $set: req.body })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User Updated Successfully."
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

