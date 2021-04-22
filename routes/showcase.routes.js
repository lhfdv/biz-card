const express = require('express');
const Card = require('../models/Card');
const router = express();

// router.get('/:cardLink', (req, res) => {
//   const { cardTitle, cardImage, cardMessage, cardEmail, cardMobile, cardWebsite, cardFacebook, cardInstagram, cardTwitter, cardOther, cardLink } = req.body;
//   const { cardId } = req.params;

//   Card.findById(cardId, { title: cardTitle, image: cardImage, message: cardMessage, email: cardEmail, mobile: cardMobile, website: cardWebsite, facebook: cardFacebook, instagram: cardInstagram, twitter: cardTwitter, other: cardOther, link: cardLink })
//     .then(() => {
//       res.redirect(`/cards/${cardId}`);
//     })
//     .catch(error => console.log(error));
// });

// Busca por id
router.get('/:cardId', (req, res) => {
    const { cardId } = req.params;
  
    Card.findById(cardId)
      .then(cardFromDatabase => {
  
        const mongoDbObject = cardFromDatabase.toJSON();
  
        const newObject = { ...mongoDbObject };
        
        res.render('showcase', { card: newObject });
      });
});

module.exports = router;

  