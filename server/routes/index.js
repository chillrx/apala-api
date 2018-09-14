const jwt = require('jsonwebtoken');
const controllers = require('../controllers');
const config = require('../../config/config.json');
const express = require('express');

module.exports = (app) => {

  let apiRoutes = express.Router();

  app.get('/api', (req, res) => res.status(200).send({
    message: 'API da aplicação de doações da Apala',
    routes: apiRoutes.stack.filter((rt) => rt.route ).map((r) => r.route.path +" | "+ r.route.stack[0].method) // rotas
  }));

// rotas de autenticação e cadastro
  app.post('/api/usuarios/registrar', controllers.usuarios.register);
  app.post('/api/usuarios/login', controllers.authentications.login);
  app.post('/api/contribuinte/registrar', controllers.contribuintes.register);
  app.post('/api/contribuinte/login', controllers.authentications.contribuinteLogin);

  apiRoutes.isAuthenticated = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['token'];
    console.log(config.secret);
    console.log(token);
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.json({ success: false, message: 'Falha na autenticação do token.' });
        } else {
          req.decoded = decoded;
          return next();
        }
      });
    } else {
      return res.status(403).send({
          success: false,
          message: 'Nenhum token foi fornecido.'
      });
    }
  }

  require('./usuario')(apiRoutes);
  require('./setor')(apiRoutes);
  require('./cargo')(apiRoutes);
  require('./contribuinte')(apiRoutes);
  require('./doacao')(apiRoutes);
  require('./campanha')(apiRoutes);
  require('./parceiro')(apiRoutes);
  require('./instituicao')(apiRoutes);
  app.use('/api',apiRoutes);
};
