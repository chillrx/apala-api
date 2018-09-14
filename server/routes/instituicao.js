const instituicoes = require('../controllers').instituicoes;

module.exports = (route) => {
    route.get('/instituicao', route.isAuthenticated, instituicoes.list);
    route.post('/instituicao', route.isAuthenticated, instituicoes.create);
    route.put('/instituicao/:id', route.isAuthenticated, instituicoes.update);
}