const Usuario = require('../models').Usuario;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

module.exports = {

    register(req, res) {

        return Usuario
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((usuario, err) => {
                if (err) res.status(400).send({ message: err + "" });
                if (usuario) {
                    res.status(200).send({ message: "Já existe cadastro com esse email" });
                } else {
                    if (
                        (req.body.senha == "" || req.body.senha == null) ||
                        (req.body.nome == "" || req.body.nome == null)
                    )
                        res.status(400).send({ message: "dados de cadastro inválidos" })
                    Usuario
                        .create({
                            nome: req.body.nome,
                            senha: crypto.createHash('md5').update(req.body.senha).digest("hex"),
                            email: req.body.email,
                            createdAt: Date.now(),
                            updatedAt: Date.now()
                        })
                        .then((usuario, err) => {
                            if (err) {
                                res.status(400).send({ message: err + "" });
                            }
                            
                            let token = jwt.sign(usuario.email + Date.now().toString(), config.secret);

                            delete usuario.dataValues.senha;
                            res.status(200).send({
                                token: token,
                                usuario: usuario
                            });
                        });
                }
            });

    },
    list(req, res) {

        return Usuario
            .findAll({ attributes: ['id', 'nome', 'email', 'createdAt', 'updatedAt'] })
            .then(usuarios => res.json(usuarios))
            .catch(err => res.status(400).send({ message: err + "" }));

    },
    select(req, res) {

        return Usuario
            .find({
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'nome', 'email', 'createdAt', 'updatedAt']
            })
            .then(usuario => {
                if (usuario)
                    res.json(usuario);
                else
                    res.status(400).send({ message: "usuário não encontrado" })
            })
            .catch(error => res.status(400).send({ message: err + "" }));

    },
    update(req, res) {

        return Usuario
            .find({ where: { id: req.params.id } }).then((usuario, err) => {
                if (err) res.status(400).send({ message: err + "" });
                if (usuario) {
                    if (req.body.senha != "" && req.body.senha != null) {
                        usuario.senha = crypto.createHash('md5').update(req.body.senha).digest("hex");
                    }
                    usuario.nome = req.body.nome || usuario.nome;
                    usuario.save().then((usuario, err) => {
                        if (err) res.status(400).send({ message: err + "" });
                        delete usuario.dataValues.senha;
                        res.json(usuario);
                    });
                } else {
                    res.status(200).send({ message: "usuário não encontrado" });
                }
            })

    },
    remove(req, res) {

        return Usuario
            .find({ where: { id: req.params.id } })
            .then(usuario => {
                if (usuario) {
                    usuario.destroy().then(() => {
                        res.status(200).send({ message: "usuário removido" });
                    });
                } else {
                    res.status(400).send({ message: "usuário não encontrado" })
                }
            })
            .catch(err => res.status(400).send({ message: err }));

    }

}
