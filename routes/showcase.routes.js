const express = require('express');
const Card = require('../models/Card');
const router = express();

router.get('/:cardLink', (req, res) => {
    const { cardLink } = req.query;
  
    Card.findOne({ link: { $regex: new RegExp(cardLink, 'i') } })
      .then(cardFromDatabase => {
        const mongoDbObject = cardFromDatabase.toJSON();
        const newObject = { ...mongoDbObject };
        res.render('showcase', { card: newObject });
    });
});

// router.get('/:cardId', (req, res) => {
//     const { cardId } = req.params;
  
//     Card.findById(cardId)
//       .then(cardFromDatabase => {
  
//         const mongoDbObject = cardFromDatabase.toJSON();
  
//         const newObject = { ...mongoDbObject };
        
//         res.render('showcase', { card: newObject });
//       });
// });

module.exports = router;

  