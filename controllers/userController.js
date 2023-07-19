const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        // Get all users
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUser => res.json(dbUser))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUser => {
                // If no user is found, send 404
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //create a user
    createUser(req, res) {
        console.log(req.body);
        User.create(req.body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(400).json(err));
    },
    //update a user _id
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true})
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                return dbUser.save();
            })
            .then(savedUser => {
              res.json(savedUser);
            })
            .catch(err => {
              console.log(err);
              res.status(400).json(err);
            });
    },
    // delete a user by _id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                return Thought.deleteMany({ username: dbUser.username});
            })
            .then(() => res.json({ message: 'User and associated thoughts deleted successfully'}))
            .catch(err => res.status(400).json(err));
    },
    // add a friend to a users friends list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true }
        )  
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.json(err));
    },
    // remove a friend from a users friends list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.json(err));
    },
};