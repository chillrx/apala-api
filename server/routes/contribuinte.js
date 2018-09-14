var contribuintes = require('../controllers').contribuintes;

module.exports = (route) => {
  route.get('/contribuinte', route.isAuthenticated, contribuintes.list);
  route.post('/contribuinte', route.isAuthenticated, contribuintes.create);
  route.get('/contribuinte/:id', route.isAuthenticated, contribuintes.select)
  route.put('/contribuinte/:id', route.isAuthenticated, contribuintes.update);
  route.delete('/contribuinte/:id', route.isAuthenticated, contribuintes.remove);
}
