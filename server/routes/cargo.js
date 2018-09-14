var cargos = require('../controllers').cargos;

module.exports = (route) => {
  route.get('/cargo', cargos.list);
  route.post('/cargo', route.isAuthenticated, cargos.create);
  route.get('/cargo/:id', cargos.select)
  route.put('/cargo/:id', route.isAuthenticated, cargos.update);
  route.delete('/cargo/:id', route.isAuthenticated, cargos.remove);
}
