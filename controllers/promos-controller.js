const knex = require("knex")(require("../knexfile"))

const getPromos = async (req,res) => {
  try{
    const promos = await knex("promos")
      .where("user_id", req.params.id)
    res.send(promos)
  } catch (err) {
    res.send(err)
  }
}

const deletePromo = async (req,res) => {
  console.log(req.params.id)
  try{
    const promo = await knex("promos")
      .where("id", req.params.id)
      .del()
    res.sendStatus(200)
  } catch (err) {
    res.send(err)
  }
}

const makePromo = async (req,res) => {
  try{
    const promo = await knex("promos")
    .insert(req.body)
    res.send(promo)
  } catch (err) {
    res.send(err)
  }
}


module.exports = {
  getPromos,
  makePromo,
  deletePromo
}