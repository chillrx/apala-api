const Instituicao = require('../models').Instituicao;

module.exports = {
    create(req, res) {
        return Instituicao.create(req.body)
            .then(instituicao => res.json(instituicao))
            .catch(err => res.status(400).send({
                message: err.toString()
            }))
    },
    list(req, res) {
        return Instituicao.findAll()
            .then(instituicoes => res.json(instituicoes))
            .catch(err => res.status(400).send({
                message: err.toString()
            }))
    },
    update(req, res) {
        return Instituicao.find({
            where: {
                id: req.params.id
            }
        })
            .then(instituicao => {
                Object.assign(instituicao, req.body).save().then(instituicao => res.json(instituicao))
            })
            .catch(err => res.status(400).send({
                message: err.toString()
            }))
    },
    remove(req, res) {
        return Instituicao
            .find({
                where: {
                    id: req.params.id
                }
            }).then(instituicao => instituicao.destroy().then(() => res.json({
                message: 'Instituição deletada com sucesso!'
            })))
            .catch(err => res.status(400).send({
                message: err.toString()
            }));
    }
}