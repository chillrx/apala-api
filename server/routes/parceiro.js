const parceiros = require('../controllers').parceiros;

module.exports = (route) => {
    route.get('/parceiro', route.isAuthenticated, parceiros.list);
    route.post('/parceiro', route.isAuthenticated, parceiros.create);
    route.delete('/parceiro/:id', route.isAuthenticated, parceiros.remove);
    route.put('/parceiro/:id', route.isAuthenticated, parceiros.update);
}
