const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname,'../public');

var port = process.env.PORT || 3000;
var app = express();
//using middleware to server up public folder
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
