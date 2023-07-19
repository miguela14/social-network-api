# social-network-api

GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

-----------------------------------------------------------------------------

Get all users:

Set the HTTP method to GET.
Enter the URL: http://localhost:<PORT>/api/users (replace <PORT> with the appropriate port number for your application).
Send the request.

Get a single user:

Set the HTTP method to GET.
Enter the URL: http://localhost:<PORT>/api/users/:userId (replace :userId with the ID of the user you want to retrieve).
Send the request.
Create a user:

Set the HTTP method to POST.
Enter the URL: http://localhost:<PORT>/api/users.
In the request body, select "raw" and choose JSON from the dropdown.
Enter the user data in JSON format, for example:
json
Copy code
{
  "username": "JohnDoe",
  "email": "johndoe@example.com"
}
Send the request.

Update a user:

Set the HTTP method to PUT.
Enter the URL: http://localhost:<PORT>/api/users/:userId (replace :userId with the ID of the user you want to update).
In the request body, select "raw" and choose JSON from the dropdown.
Enter the updated user data in JSON format, for example:
json
Copy code
{
  "username": "NewUsername",
  "email": "newemail@example.com"
}
Send the request.

Delete a user:

Set the HTTP method to DELETE.
Enter the URL: http://localhost:<PORT>/api/users/:userId (replace :userId with the ID of the user you want to delete).
Send the request.
Add a friend to a user's friends list:

Set the HTTP method to POST.
Enter the URL: http://localhost:<PORT>/api/users/:userId/friends/:friendId (replace :userId with the ID of the user and :friendId with the ID of the friend you want to add).
Send the request.
Remove a friend from a user's friends list:

Set the HTTP method to DELETE.
Enter the URL: http://localhost:<PORT>/api/users/:userId/friends/:friendId (replace :userId with the ID of the user and :friendId with the ID of the friend you want to remove).
Send the request.


-------------------------------------------------
Open Postman and create a new request.

Set the request URL to the appropriate endpoint for adding a friend, including the userId and friendId parameters. For example: http://localhost:3001/api/users/:userId/friends/:friendId. Replace :userId and :friendId with the actual IDs you want to use.

Set the HTTP method to POST.

Click on the "Body" tab below the URL field.

Select the "raw" option.

From the dropdown next to "raw," choose "JSON (application/json)".

In the request body, provide a JSON object with the userId and friendId properties. For example:

json
Copy code
{
  "userId": "user1",
  "friendId": "user2"
}
Verify that the JSON body contains the correct userId and friendId.

Click the "Send" button to send the request.