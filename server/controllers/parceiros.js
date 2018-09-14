const Parceiro = require('../models').Parceiro;

module.exports = {
    list(req, res) {
        return Parceiro
            .findAll()
            .then(parceiros =>{
                let par = parceiros;
                par.sort((a, b) => {
                    return a.posicao > b.posicao;
                });
                res.json(par);
            })
            .catch(err => res.status(400).send({
                message: err.toString()
            }));
    },
    create(req, res) {
        return Parceiro
            .create(req.body)
            .then(parceiro => res.json(parceiro))
            .catch(err => res.status(400).send({
                message: err.toString()
            }));
    },
    update(req, res) {
        return Parceiro
            .find({
                where: {
                    id: req.params.id
                }
            })
            .then(parceiro => {
                Object.assign(parceiro, req.body).save().then(campanha => res.json(parceiro))
            }).catch(err => res.status(400).send({
                message: err.toString()
            }));
    },
    remove(req, res) {
        return Parceiro
            .find({
                where: {
                    id: req.params.id
                }
            }).then(parceiro => parceiro.destroy().then(() => res.json({
                message: 'Parceiro deletado com sucesso!'
            })))
            .catch(err => res.status(400).send({
                message: err.toString()
            }));
    }
}
