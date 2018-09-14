var doacoes = require('../controllers').doacoes;

module.exports = (route) => {
  route.get('/doacao', route.isAuthenticated, doacoes.list);
  route.post('/doacao', route.isAuthenticated, doacoes.create);
  route.get('/doacao/:id', route.isAuthenticated, doacoes.select)
  route.put('/doacao/:id', route.isAuthenticated, doacoes.update);
  route.delete('/doacao/:id', route.isAuthenticated, doacoes.remove);
}
