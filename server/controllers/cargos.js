const Cargo = require('../models').Cargo;

module.exports = {
  list (req, res) {
    return Cargo
      .findAll()
      .then(cargos => res.json(cargos))
      .catch(err => res.status(400).send({message:err.toString()}))
  },
  create (req, res) {
    return Cargo
      .create( req.body )
      .then(cargo => res.status(201).send(cargo))
      .catch(err => res.status(400).send({message:err.toString()}))
  },
  select (req, res) {
    return Cargo
      .find({
        where: {
          id: req.params.id
        }
      })
      .then(cargo => res.json(cargo))
      .catch(err => res.status(400).send({message:err}));
  },
  update (req, res) {
    return Cargo
      .find({ where: { id:req.params.id }})
      .then(cargo => Object.assign(cargo, req.body).save().then(cargo => res.json(cargo)))
      .catch(err => res.status(400).send({messaage:err.toString()}));
  },
  remove (req, res) {
    return Cargo
      .find({ where: { id: req.params.id }})
      .then(cargo => cargo.destroy().then(() => res.json({message:"removido"})))
      .catch(err => res.status(400).send({message:err.toString()}));
  }
}
