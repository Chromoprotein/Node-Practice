const express = require('express');
const Item = require('./Item');
const path = require('path');
const cors = require('cors');
const app = express();
// prevent unauthenticated users from accessing the private route
const cookieParser = require("cookie-parser");
const { adminAuth, userAuth } = require("./middleware/auth.js");

//process.env.PORT for deployment, 8000 for local development
app.listen(process.env.PORT || 8000, () => {
    console.log("server started on port 8000");
});

require('./db')

app.use(cors({ 
    origin: 'http://localhost:3000', 
    credentials: true 
}));
app.use(cookieParser());

app.use(express.json());

// Get the routes for user authentication
// When a call is made to /api/auth/(route specified in the Route.js file), a function that the Route.js file imports gets run. The functions are in Auth.js
// register
// log in
// getUsers
// update
// deleteUser
app.use("/api/auth", require("./Auth/Route"))

// To do: put something in admin
//app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.use("/basic", require("./Basic/Route"))

if (process.env.NODE_ENV === 'production') {

    // Have Node serve the files for our built React app
    app.use(express.static(path.resolve(__dirname, 'frontend/build')));

    //This one should be the last
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
    });

}

