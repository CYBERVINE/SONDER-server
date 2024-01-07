const router = require("express").Router()
const promosController = require("../controllers/promos-controller")

router
  .route("/promos/:id")
  .get(promosController.getPromos)
  .post(promosController.makePromo)
  .delete(promosController.deletePromo)
module.exports = router