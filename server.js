const express = require('express');
const Item = require('./Item');
const path = require('path');
const cors = require('cors');
const app = express();

//Cors should prevent CORS errors. If they happen anyway, clearing the cache works
app.use(cors());
app.use(express.json());

require('./db')

app.get("/item", (req,res) => {
    Item
        .find()
        .then((data) => {
            return res.status(200).json({
                data
            })
        })
        .catch((err) => {
            return res.status(400).json({
                err
            })
        })

})

if (process.env.NODE_ENV === 'production') {

    // Have Node serve the files for our built React app
    app.use(express.static(path.resolve(__dirname, 'frontend/build')));

    //This one should be the last
    app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
    });

}

//process.env.PORT for deployment, 8000 for local development
app.listen(process.env.PORT || 8000, () => {
    console.log("server started on port 8000");
});