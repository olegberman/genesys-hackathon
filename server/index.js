var express = require('express'),
    app = express(),
    users = [{
        username: 'oleg',
        password: 'letmein',
        phoneNumber: '2894004192'
    }];

app.use(require('cookie-parser')());
app.use(express.static(__dirname + '/../client'));

app.get('/session', function(req, res) {
    id = '666';
    res.cookie('uid', id);
    res.send('id ' + id + ' set');
});

app.get('/user', function (req, res) {
    res.send('id is ' + req.cookies.uid);
})

app.listen(8080);
