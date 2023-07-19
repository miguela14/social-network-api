
# Social Network API

This is a backend API for a social networking application where users can create thoughts and interact with other users through reactions and friendships.

## Installation

Clone the repository to your local machine.
Navigate to the project folder and install dependencies using npm install.
Make sure you have MongoDB installed and running on your system.
## Usage

Start the server by running npm start. The application will listen on http://localhost:3001 by default.
Use an API client like Insomnia or Postman to test the API endpoints.
API Endpoints
## Users

GET /api/users: Get all users.
GET /api/users/:userId: Get a single user by their ID.
POST /api/users: Create a new user.
PUT /api/users/:userId: Update a user by their ID.
DELETE /api/users/:userId: Delete a user by their ID.
POST /api/users/:userId/friends/:friendId: Add a friend to a user's friend list.
DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user's friend list.
## Thoughts

GET /api/thoughts: Get all thoughts.
GET /api/thoughts/:thoughtId: Get a single thought by its ID.
POST /api/thoughts: Create a new thought.
PUT /api/thoughts/:thoughtId: Update a thought by its ID.
DELETE /api/thoughts/:thoughtId: Delete a thought by its ID.
POST /api/thoughts/:thoughtId/reactions: Create a reaction for a thought.
DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Delete a reaction from a thought.

## Walkthrough Video

link to walkthrough video:
 https://drive.google.com/file/d/1m3wIqKQt5ZPbi1RLOib3kfMGP6h-rtug/view 

In the walkthrough video, I demonstrate how to:

Start the application's server.
Test GET routes for all users and thoughts in Insomnia.
Test GET routes for a single user and a single thought in Insomnia.
Test POST, PUT, and DELETE routes for users and thoughts in Insomnia.
Test POST and DELETE routes for a user's friend list in Insomnia.
Test POST and DELETE routes for reactions to thoughts in Insomnia.

## Credits

This application was developed as part of a coding bootcamp project. Credits to the bootcamp instructors and the team for their support and guidance.