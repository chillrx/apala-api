const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const appConfi = require('./config/config.json');
const cors = require('cors');
const app = express();

app.use(cors());

let db = require('./server/models');
// db.sequelize.sync({force:true}).then((result, err)=> {
db.sequelize.sync().then((result, err)=> {
  if(err){
    console.log(err);
    process.exit();
  }
});

// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('tkSecret', appConfi.secret);

app.get('/uploads/imagens/:filename', function(req, res){
    res.sendfile('./uploads/imagens/'+req.params.filename);
});

require('./server/routes/index')(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'apala-api',
}));

module.exports = app;
