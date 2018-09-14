const Doacao = require('../models').Doacao;
const Contribuinte = require('../models').Contribuinte;
module.exports = {
  list (req, res) {
    return Doacao
      .findAll()
      .then(doacoes => res.json(doacoes))
      .catch(err => res.status(400).send({message:err.toString()}))
  },
  create (req, res) {
    return Doacao
      .create(req.body)
      .then(doacao => res.status(201).send(doacao))
      .catch(err => res.status(400).send({message:err.toString()}))
  },
  select (req, res) {
    return Doacao
      .find({ where: { id: req.params.id }})
      .then(doacao => res.json(doacao))
      .catch(err => res.status(400).send({message:err.toString()}))
  },
  update (req, res) {
    return Doacao
      .find({ where: { id: req.params.id }})
      .then(doacao => Object.assign(doacao,req.body).save().then(doacao => res.json(doacao)))
      .catch(err => res.status(400).send({message:err.toString()}))
  },
  remove (req, res) {
    return Doacao
      .find({ where: { id: req.params.id }})
      .then(doacao => doacao.destroy().then(() => res.json({message:"removido"})))
      .catch(err => res.status(400).send({message:err.toString()}))
  }
}
