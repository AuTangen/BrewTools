const router = require('express').Router();

const Fermentable = require('../models/Fermentables')
const Hops = require('../models/Hops')
const Yeast = require('../models/Yeast')
const Recipe = require('../models/Recipe')
const User = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId;

function isAuthenticated(req, res, next) {
  if (!req.session.user_id) 
  return res.status(401).send({error: 'you must be logged in'});
  
  next();
}

// get all fermentables for dropdown list

router.get('/fermentables', async (req,res) => {
  fermentables = await Fermentable.find();
  res.send(fermentables)
  
});


// find one fermentable for calculator data

router.get('/fermentable/:name', async (req,res) => {
  fermentable = await Fermentable.findOne({name: req.params.name})
  res.send(fermentable)
})


// get all hops for dropdown list
router.get('/hops', async (req,res) => {
  hops = await Hops.find();
  res.send(hops)
});

  // get all yeast for dropdown list
router.get('/yeast', async (req,res) => {
  yeast = await Yeast.find();
  res.send(yeast)
  
});


// get one hop
router.get('/hops/:name', async (req,res) => {
  hop = await Hops.findOne({name: req.params.name})
  res.send(hop)
})


// get one yeast
router.get('/yeast/:name', async (req,res) => {
  yeast= await Yeast.findOne({name: req.params.name})
  res.send(yeast)
})


// // add a new fermentable to the list
router.post('/fermentables', async (req, res) => {

  try {
    const fermentable = await Fermentable.create({
      ...req.body,
     
     });
     res.send('Fermentable Created')
  console.log(fermentable)
    
  } catch {
  res.status(402).send({ error: err})
  }
  });

  // // add a new hop to the list
router.post('/hops', async (req, res) => {

  try {
    const hop = await Hops.create({
      ...req.body,
     
     });
     res.send('Hop Created')
  console.log(hop)
    
  } catch {
  res.status(402).send({ error: err})
  }
  });

  // add a yeast type to the list
  router.post('/yeast', async (req, res) => {

    try {
      const yeast = await Yeast.create({
        ...req.body,
       
       });
       res.send('Yeast Created')
    console.log(yeast)
      
    } catch {
    res.status(402).send({ error: err})
    }
    });

  
  // save recipe to user
// send just the json name or send the whole ferm objecT???
  router.post('/myrecipes', isAuthenticated, async (req, res) => {
    const user_id = req.session.user_id
    

    try {
      const recipe = await Recipe.create({
        ...req.body,
        // fermentables: fermentables,
        user: user_id
       });
    
       const user = await User.findOneAndUpdate({
        _id: user_id
      }, {
        '$addToSet': {
          myRecipes: recipe._id
        }, 
      }, {new: true}).populate('myRecipes');
    
      res.send({user})
     
    } catch {
    res.status(500).send({ error: err})
    }
    });

    // get user's saved recipes for dropdown list

    router.get('/myrecipes/user', isAuthenticated, async (req, res) => {
      const user_id = req.session.user_id;
    
      const user = await User.findById(user_id).populate('myRecipes');
    
      res.send(user.myRecipes);
    })

// get full recipe info for one recipe by ID

    router.get('/recipe/:id', async (req, res) => {
      // const band = await Band.findOne({name: req.params.name })
      const recipe = await Recipe.findById(new ObjectId(req.params.id))
   
      
      res.send(recipe)
  });

  // delete user recipe

  router.delete('/recipe/:id', isAuthenticated, async (req, res) => {
    
    const recipe_id = req.params.id

    await Recipe.findByIdAndDelete(new ObjectId(recipe_id))

    res.send({message: 'Recipe was deleted successfully.'})
 
})


// SEED DATABASE

router.post('/seedferm' , async (req, res) => {
  await Fermentable.create(req.body)

  res.send('fermentalbes seeded')
})

router.post('/seedhops' , async (req, res) => {
  await Hops.create(req.body)

  res.send('hops seeded')
})

router.post('/seedyeast' , async (req, res) => {
  await Yeast.create(req.body)

  res.send('yeast seeded')
})
  

module.exports = router;