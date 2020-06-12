var express = require('express')
var app = express()
var port = process.env.PORT || 3000;
var auth = require('./server_components/routes/authentication');
var api = require('./server_components/routes/api')
var web = require('./server_components/routes/serveHtml')
var cookieParser = require('cookie-parser');
const path = require('path');

// Server middleware
app.use(express.json())
app.use(cookieParser());

//html serving
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', web)
// API routes goes here
app.use('/auth', auth)
app.use('/api',api)

app.listen(port);

console.log('JWT authentication RESTful API server started on: ' + port);
console.log('Authentication API is located on /auth')
console.log('Functions API is located on /api')
console.log('========================================\n\n')