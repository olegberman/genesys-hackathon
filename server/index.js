var http = require('http'),
    express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    users = [{
        id: 1,
        username: 'olegBerman',
        firstName: 'oleg',
        lastName: 'berman',
        password: 'password',
        photo: 'https://avatars1.githubusercontent.com/u/6267340',
        phoneNumber: '+12894004192',
        recommendations: [{
            image: 'http://ia.media-imdb.com/images/M/MV5BMjE3MDU2NzQyMl5BMl5BanBnXkFtZTgwMzQxMDQ3NTE@._V1_SX214_AL_.jpg',
            name: 'Maze Runner'
        }, {
            image: 'http://ia.media-imdb.com/images/M/MV5BNzg0ODI3NDQxNF5BMl5BanBnXkFtZTgwMzgzNDA0NjE@._V1_SX214_AL_.jpg',
            name: 'Black Mass'
        }, {
            image: 'http://ia.media-imdb.com/images/M/MV5BMTg3OTM2OTc5MV5BMl5BanBnXkFtZTgwMjMxNDM0NTE@._V1_SX214_AL_.jpg',
            name: 'The Visit'
        }, {
            image: 'http://ia.media-imdb.com/images/M/MV5BMjA4NzcwMTkzMF5BMl5BanBnXkFtZTgwMDAwNDUxNjE@._V1_SY317_CR0,0,214,317_AL_.jpg',
            name: 'The Perfect Guy'
        }, {
            image: 'http://ia.media-imdb.com/images/M/MV5BMjMzMjIxOTIxMl5BMl5BanBnXkFtZTgwNTk4NDI0NjE@._V1_SX214_AL_.jpg',
            name: 'Everest'
        }]
    }],
    tokenToUser = {},
    getUser = function (req) {
        if (req.cookies.uid) {
        //  IDP
            return users.filter(function (user) {
                return user.id === Number(req.cookies.uid);
            })[0];
        } else if (req.query.token) {
        //  Third-parties
            return tokenToUser[req.query.token];
        } else if (req.body.phoneNumber) {
        //  Genesys Designer
            return users.filter(function (user) {
                return user.phoneNumber === req.body.phoneNumber;
            })[0];
        }
    };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/../client', { maxAge: 1 }));

app.post('/api/session', function(req, res) {
    var user = users.filter(function (user) {
        return user.username === req.body.username && user.password === req.body.password;
    })[0];
    if (user) {
        res.cookie('uid', user.id);
        res.json(user);
    } else {
        res.cookie('uid', '');
        res.sendStatus(401);
    }
});

app.post('/api/session/end', function(req, res) {
    res.cookie('uid', '');
    res.redirect('/');
});

app.get('/api/token', function (req, res) {
    var token = Math.random().toString(16).slice(2, 6),
        user = getUser(req),
        url;
    if (user) {
        tokenToUser[token] = user;
        setTimeout(function () {
            tokenToUser[token] = undefined;
        }, 30000);
        url = 'http://69.204.255.92/api/text/send?' +
                'to=' + encodeURIComponent(user.phoneNumber) +
                '&msg=' + encodeURIComponent(token);
        http.get(url, res.sendStatus.bind(res, 200))
            .on('error', res.sendStatus.bind(res, 500));
    } else {
        res.sendStatus(404);
    }
});

app.get('/api/user', function (req, res) {
    var user = getUser(req);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
});

app.put('/api/user', function (req, res) {
    var user = getUser(req);
    if (user) {
        var valid = Object.keys(req.body).every(function (key) {
            var isValid = {
                password: function () {
                    return user.isOnThePhone;
                }
            } [key] || function () {
                return true;
            };
            return isValid();
        });
        if (valid) {
            Object.keys(req.body).forEach(function (key) {
                user[key] = req.body[key];
            });
            res.json(user);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(404);
    }
});

app.listen(80);
