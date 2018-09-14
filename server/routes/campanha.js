var campanhas = require('../controllers').campanhas;

module.exports = (route) => {
  route.get('/campanha', campanhas.list);
  route.post('/campanha', route.isAuthenticated, campanhas.create);
  route.get('/campanha/:id', campanhas.select)
  route.put('/campanha/:id', route.isAuthenticated, campanhas.update);
  route.delete('/campanha/:id', route.isAuthenticated, campanhas.remove);
}
