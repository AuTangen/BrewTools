const db = require('../config/connection');
const Fermentable = require('../models/Fermentables')
const Hops = require('../models/Hops')
const Yeast = require('../models/Yeast')
const fermSeeds = require('./fermSeeds.json');
const hopSeeds = require('./hopSeeds.json');
const yeastSeeds = require('./yeastSeeds.json');



db.once('open', async () => {
  try {
    
    await Fermentable.create(fermSeeds);

    await Hops.create(hopSeeds);

    await Yeast.create(yeastSeeds);


    console.log('database seeded');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});