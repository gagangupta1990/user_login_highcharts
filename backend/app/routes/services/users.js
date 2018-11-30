// dependencies
const usersCtrl = require('../../controllers/users');

module.exports = (router)=> {

  router.post('/api/v1/users/login', async (req, res)=> {
    const response = await usersCtrl.login(req);
    res.status = response.statusCode;
    res.payload = response.payload;
    res.send(res.status,res.payload);
  });

  router.put('/api/v1/users/logout', async (req, res)=> {
    const response = await usersCtrl.logout(req);
      res.status = response.statusCode;
      res.payload = response.payload;
      res.send(res.status,res.payload);
  });

  router.get('/api/v1/users/isLoggedIn', async (req, res)=> {
    const response = await usersCtrl.isLoggedIn(req);
      res.status = response.statusCode;
      res.payload = response.payload;
      res.send(res.status,res.payload);
  });
}
