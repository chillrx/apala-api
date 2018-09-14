const Campanha = require('../models').Campanha;

module.exports = {
  list (req, res) {
    return Campanha
      .findAll()
      .then(campanhas => res.json(campanhas))
      .catch(err => res.status(400).send({message:err.toString()}))
  },
  create (req, res) {
    return Campanha
      .create(req.body)
      .then(campanha => res.status(201).send(campanha))
      .catch(err => res.status(400).send({message:err.toString()}))
  },
  select (req, res) {
    return Campanha
      .find({
        where: {
          id: req.params.id
        }
      })
      .then(campanha => res.json(campanha))
      .catch(err => res.status(400).send({message:err}));
  },
  update (req, res) {
    return Campanha
      .find({ where: { id:req.params.id }})
      .then(campanha => {
        Object.assign(campanha, req.body).save().then(campanha => res.json(campanha))
      }).catch(err => res.status(400).send({messaage:err.toString()}));
  },
  remove (req, res) {
    return Campanha
      .find({ where: { id: req.params.id }})
      .then(campanha => campanha.destroy().then(() => res.json({message:"removido"})))
      .catch(err => res.status(400).send({message:err.toString()}));
  }
}
