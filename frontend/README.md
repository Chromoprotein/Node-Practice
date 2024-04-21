Example app with Node.js (Express) and MongoDB.
It has user authentication, normal and admin users, upload, search, edit, and delete functions.

### Schemas and routes
Schemas for MongoDB: User.js and Book.js.

Auth/Auth.js contains the functions for API calls such as registering a user and logging in.
Auth/Route.js sets up the API endpoints which are used in server.js like:
    app.use("/api/auth", require("./Auth/Route"))
Basic/BookFunctions.js and Basic/Route.js contain the same for book-related actions.

### Server-side authentication
JWT is used for user authentication. Most API endpoints (except register and log in) are protected so that only logged-in users or admins can use them. They're protected by middleware located in middleware/auth.js that checks that the token is valid.

For user authentication purposes, these are added to server.js:
    app.use(cors({ 
        origin: 'http://localhost:3000', 
        credentials: true 
    }));
    app.use(cookieParser());

And credentials must be sent with the Axios calls.

The API URIs are stored in frontend/.env and frontend/.env.local and in Heroku's config settings. Remember to restart localhost:3000 after adding new env vars.

### Client-side authentication
JWT isn't saved in the browser's session storage. Instead, a flag telling if the user is logged in or is an admin is saved. The status is sent by userStatus in auth/Auth.js which is called by frontend/src/useAuth.js. (Session storage prevents having to frequently call userStatus, reducing annoying loading.)
This is used to:
- prevent unauthorized users from navigating to pages (React router protection in frontend/src/index.js)
- rendering different content, like links (example: frontend/src/App.js)
However, even if the user gets around this, they can't do any damage because the API endpoints are protected server-side.