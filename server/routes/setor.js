var setores = require('../controllers').setores;

module.exports = (route) => {
  route.get('/setor', setores.list);
  route.post('/setor', route.isAuthenticated, setores.create);
  route.get('/setor/:id', setores.select);
  route.put('/setor/:id', route.isAuthenticated, setores.update);
  route.delete('/setor/:id', route.isAuthenticated, setores.remove);
}
