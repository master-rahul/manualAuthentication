const express = require('express');
const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static('./asset'));
app.use('/',require('./route/home'));

app.listen(port, function(error){
    if(error) console.log('Error in starting express Server at port : ',port);
    else console.log('Express Server running at port : ',port);
});