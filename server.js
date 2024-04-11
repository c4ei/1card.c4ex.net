// npm init -y 
// npm install express cors
// node server.js

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
var cors = require('cors');
app.use(cors());
var corsOptions = {
	origin: 'https://poker.c4ex.net',
	credentials: true
}
app.use(cors(corsOptions));

app.use(express.static( path.join(__dirname, './front/dist') ))

app.get('/', function(req,resp){
  resp.sendFile( path.join(__dirname, './front/dist/index.html') )
}) 
//이 코드는 항상 가장 하단에 놓아야 잘됩니다. 
app.get('*', function (req, resp) {
  resp.sendFile(path.join(__dirname, './front/dist/index.html'));
});


app.listen(3111, function () {
  console.log('poker.c4ex.net listening on 3111')
}); 