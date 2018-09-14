const Setor = require('../models').Setor;

module.exports = {
  list(req, res) {
    return Setor
      .findAll()
      .then(setores => res.json(setores))
      .catch(error => res.status(400).send({message:error}));
  },
  create(req, res) {
    return Setor
      .create(req.body)
      .then(setor => res.status(201).send(setor))
      .catch(error => res.status(400).send({message:error+""}))
  },
  select(req, res) {
    return Setor
      .find({
        where: {
          id: req.params.id
        }
      })
      .then(setor => res.json(setor))
      .catch(error => res.status(400).send({message:error+""}));
  },
  update(req, res) {
    return Setor
      .find({ where: { id: req.params.id } })
      .then(setor => Object.assign(setor, req.body).save().then(setor => res.json(setor)))
      .catch(err => res.status(400).send({messaage:err+""}));
  },
  remove(req, res) {
    return Setor
      .find({ where: { id: req.params.id } })
      .then(setor => {
        if (setor) {
          setor.destroy();
          return res.status(200).send({message:"removido"});
        }
        else
          res.status(400).send({message:"não encontrado"});
      })
      .catch(err => res.status(400).send({message:err}));
  }
}
