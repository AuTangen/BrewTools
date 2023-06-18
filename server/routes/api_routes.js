const router = require('express').Router();
const User = require('../models/User');
const Recipe = require('../models/Recipe');

function isAuthenticated(req, res, next) {
  if (!req.session.user_id) 
  return res.status(401).send({error: 'you must be logged in'});
  
  next();
}

// // get all drinks or get by search query
// router.get('/drinks', async (req, res) => {
// let drinks;
// const search = req.query.search

//   if (search) {
// drinks = Drink.find({
//   '$regex': search,
//   '$options': 'i'

// }).populate('user');
//   }
// else {
//   drinks = await Drink.find().populate('user');
//   }
//     res.send(drinks)
// });

// // get one drink
// router.get('/drink/:id', async (req, res) => {
// const drink = Drink.findById(req.params.id).populate({
//   path: 'user',
//   select: '-password'
// });



// res.send({drink: drink})
// });


// // get favorite drinks for a user

// router.get('/drinks/user', isAuthenticated, async (req, res) => {
//   const user_id = req.session.user_id;

//   const user = await User.findById(user_id).populate('favorites');

//   res.send(user.favorites);
// })


// // add a favorite drink

// router.put('/drink/:id', isAuthenticated, async (req,  res) => {
//   const user_id = req.session.user_id;
  
//   const drink = await Drink.findById(req.params.id)

//   if (!drink) return res.status(404).send({error: 'no drink found with that id'});
   
//   try {
//    const user = await User.findOneAndUpdate({
//       _id: user_id
//     }, {
//       '$addToSet': {
//         favorites: drink._id
//       }
//     }, {new: true}).populate('favorites');
//     res.send({user: user});
//       } catch (err) {
//         res.status(500).send({ error: err })
//   }

 
// })

// // create a drink and adds it to the users favorites
// router.post('/drinks', isAuthenticated, async (req, res) => {
// const user_id = req.session.user_id
// try {
//   const drink = await Drink.create({
//     ...req.body,
//     user: user_id
//    });

//    const user = await User.findOneAndUpdate({
//     _id: user_id
//   }, {
//     '$addToSet': {
//       favorites: drink._id
//     }, 
//   }, {new: true}).populate('favorites');

   
//   res.send({user})
 
// } catch {
// res.status(500).send({ error: err})
// }
// });



// // delete a favorite

// router.put('/fav/:id', isAuthenticated, async (req, res) => {
// const user = await User.findOneAndUpdate({
//   _id: req.session.user_id
// }, {
//   '$pull': {
//     favorites: req.params.id
//   }
// }, {new: true}).populate('favorites');
// res.send({user: user})
// })

// // delete a drink
// router.delete('/drink/:id', isAuthenticated, async (req, res) => {

//   const drink_id = req.params.id

//   const drink = await Drink.findById(drink_id)

//   if (!drink) return res.status(500).send({error: 'no drink found with that id'})

//   if (drink.user !== req.session.user_id) return res.status(401).send({error: 'you are not authorized to delete others\' posts'})

//  await Drink.findByIdAndDelete(drink_id)
//   res.send({message: 'drink deleted successfully'})
// })
module.exports = router;