const { Thought, User } = require("../models");

module.exports = {
  getThoughts(req, res) {
    // Get all thoughts
    Thought.find({})
      .select("-__v")
      .sort({ createdAt: -1 })
      .then((dbThoughts) => res.json(dbThoughts))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getSingleThought(req, res) {
    // Get a single thought by its _id
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((dbThought) => {
        // If no thought is found, send 404
        if (!dbThought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  async createThought(req, res) {
    // Create a new thought
    try {
      const dbThought = await Thought.create(req.body);
      const dbUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: dbThought._id } },
        { new: true }
      );
      if (!dbUser) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbThought); //my have to change to dbUser
      console.log(dbUser);
    } catch (err) {
      (err) => res.status(400).json(err);
    }
  },

  updateThought(req, res) {
    // Update a thought by its _id
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
      new: true,
    })
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete a thought by its _id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        // remove the thought id from the associated user's `thoughts` field
        return User.findOneAndUpdate(
          { username: dbThought.username },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => res.status(400).json(err));
  },
  // create reaction for a thought
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }, //$push:
      { new: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.status(400).json(err));
  },
  // delete reaction for a thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.status(400).json(err));
  },
};
