const chartCtrl = require('../../controllers/charts');

module.exports = (router)=> {
  router.get('/api/v1/chart/top_ten_products', (req, res)=> {
    return new Promise((resolve, reject) => {
        resolve(chartCtrl.top_ten_products(req));
    }).then(response => {
        res.status = response.statusCode;
        res.send(res.payload);
    })
  });

  router.get('/api/v1/chart/monthly_revenue', (req, res)=> {
      return new Promise((resolve, reject) => {
          resolve(chartCtrl.monthly_revenue(req));
      }).then(response => {
          res.status = response.statusCode;
          res.send(res.payload);
      })
  });
}
