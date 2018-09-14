const Usuario = require('../models').Usuario;
const Contribuinte = require('../models').Contribuinte;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');
const Joi = require('joi');
module.exports = {
    login(req, res) {
      Usuario
        .findOne({
          where: {
            email: req.body.email,
            senha: crypto.createHash('md5').update(req.body.senha).digest("hex")
          }
        })
        .then((usuario) => {
          if(usuario) {

            let token = jwt.sign(usuario.email+Date.now().toString(), config.secret);
            // res.status(200).send({message:"Usuário logado com sucesso"});
            delete usuario.dataValues.senha;
            res.status(200).send({
              token: token,
              usuario: usuario
            });

          }else {
            res.status(200).send({message:"email ou senha inválidos"});
          }
        })
        .catch(error => {console.log(error);res.status(400).send(error)});
    },

    contribuinteLogin(req, res) {
      Contribuinte
        .findOne({
          where: {
            email: req.body.email,
            senha: crypto.createHash('md5').update(req.body.senha).digest("hex")
          }
        })
        .then((contribuinte) => {
          if(contribuinte) {
            let token = jwt.sign(contribuinte.email+Date.now().toString(), config.secret);
            // res.status(200).send({message:"Usuário logado com sucesso"});
            delete contribuinte.dataValues.senha;
            res.status(200).send({
              token: token,
              contribuinte: contribuinte
            });

          } else {
            res.status(200).send({message:"email ou senha inválidos"});
          }
        })
        .catch(error => {console.log(error);;res.status(400).send(error)});
    }
}
