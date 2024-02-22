const sonder = require('../database')

const getPromos = async (req,res) => {
  try{
    const promos = await sonder.userPromos(req.params.id)
    res.send(promos)
  } catch (err) {
    res.send(err)
  }
}

const deletePromo = async (req,res) => {
  try{
    const promo = await sonder.deletePromo(req.params.id)
    console.log(promo)
    res.sendStatus(200)
  } catch (err) {
    res.send(err)
  }
}

const makePromo = async (req,res) => {
  try{
    const promo = await sonder.makePromo(req.body)
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