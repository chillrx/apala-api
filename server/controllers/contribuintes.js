const Contribuinte = require('../models').Contribuinte;
const Doacao = require('../models').Doacao;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

module.exports = {
  list (req, res) {
    return Contribuinte
      .findAll({include:[{model: Doacao, as: 'doacoes'}]})
      .then(contribuintes => res.json(contribuintes))
      .catch(err => res.status(400).send({message:err.toString()}))
  },
  create (req, res) {
    req.senha = crypto.createHash('md5').update(req.body.senha).digest("hex");
    return Contribuinte
      .create(req.body)
      .then(contribuinte => res.json(contribuinte))
      .catch(err => res.status(400).send({message:err.toString()}))
  },
  select (req, res) {
    return Contribuinte
      .find({ where: { id:req.params.id } , include:[{model:Doacao, as: 'doacoes'}]})
      .then(contribuinte => res.json(contribuinte))
      .catch(err => res.status(400).send({message:err.toString()}))
  },
  update (req, res) {

    req.senha = crypto.createHash('md5').update(req.body.senha).digest("hex");
    return Contribuinte
      .find({ where: { id:req.params.id } })
      .then(contribuinte => Object.assign(contribuinte, req.body).save().then(()=> res.json(contribuinte)))
      .catch(err => res.status(400).send({message:err.toString()}))
  },
  remove (req, res) {
    return Contribuinte
      .find({ where: { id: req.params.id }})
      .then(contribuinte => contribuinte.destroy().then(()=> res.json({message:"removido"})))
      .catch(err => res.status(400).send({message:err.toString()}))
  },
  register (req, res) {
    return Contribuinte
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then((contribuinte, err)=> {
        if(err) res.status(400).send({message:err+""});
        if(contribuinte) {
          res.status(200).send({message:"Já existe cadastro com esse email"});
        }else {
          if (
            (req.body.senha == ""   || req.body.senha == null) ||
            (req.body.nome  == ""   || req.body.nome  == null)
          )
            res.status(400).send({message:"dados de cadastro inválidos"})
          Contribuinte
            .create({
              nome: req.body.nome,
              senha: crypto.createHash('md5').update(req.body.senha).digest("hex"),
              email: req.body.email,
              createdAt: Date.now(),
              updatedAt: Date.now()
            })
            .then((contribuinte, err) => {
              if(err) {
                res.status(400).send({message:err+""});
              }
              let token = jwt.sign(contribuinte.email+Date.now().toString(), config.secret);
              delete contribuinte.dataValues.senha;
              res.status(200).send({
                  message: "usuário criado com sucesso!",
                  token: token,
                  contribuinte: contribuinte
              });
            });
        }
      });
  }
}
