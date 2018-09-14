var usuarios = require('../controllers').usuarios;
module.exports = (route) => {
  route.get('/usuario', route.isAuthenticated, usuarios.list);
  route.get('/usuario/:id', route.isAuthenticated, usuarios.select);
  route.put('/usuario/:id', route.isAuthenticated, usuarios.update);
  route.delete('/usuario/:id', route.isAuthenticated, usuarios.remove);
}
