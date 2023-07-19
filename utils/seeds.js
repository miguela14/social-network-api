const mongoose = require('mongoose');
const { User, Thought } = require('../models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userData = [
  {
    username: 'user1',
    email: 'user1@example.com'
  },
  {
    username: 'user2',
    email: 'user2@example.com'
  }
];

const thoughtData = [
  {
    thoughtText: 'Thought 1',
    username: 'user1'
  },
  {
    thoughtText: 'Thought 2',
    username: 'user2'
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create users
    const createdUsers = await User.create(userData);

    const createdThoughts = await Thought.create([
      {
        thoughtText: 'Thought 1',
        username: createdUsers[0].username,
        userId: createdUsers[0]._id
      },
      {
        thoughtText: 'Thought 2',
        username: createdUsers[1].username,
        userId: createdUsers[1]._id
      }
    ]);

    console.log('Seed data created successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();