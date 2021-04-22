const express = require('express');
const Card = require('../models/Card');
const User = require('../models/User');
const fileUploader = require('../config/cloudinary.config');
const { format } = require('date-format-parse');
const router = express();

router.get('/', (req, res) => {
  const { cardTitle } = req.query;

  Card.find({ owner: req.session.currentUser._id, title: { $regex: new RegExp(cardTitle, 'i') } })
    .then(cardsFromDatabase => {
      res.render('cards', { cards: cardsFromDatabase, currentUser: req.session.currentUser });
    });
});

// Entregar o HTML com o formulario de cadastro do novo card
router.get('/new', (req, res) => {
  res.render('newCard', { currentUser: req.session.currentUser } );
});

router.get('/:cardId', (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId).populate('owner')
    .then(cardFromDatabase => {

      const mongoDbObject = cardFromDatabase.toJSON();

      const newObject = { ...mongoDbObject };
      
      res.render('cardDetail', { card: newObject, currentUser: req.session.currentUser });
    });
});

router.post('/new', fileUploader.single('cardImage'),  (req, res) => {

  const { cardTitle, cardMessage, cardEmail, cardTwitter, cardMobile, cardWebsite, cardFacebook, cardInstagram, cardOther, cardLink } = req.body;

  const newCard = {
    owner: req.session.currentUser._id,
    title: cardTitle,
    message: cardMessage,
    image: req.file.path,
    email: cardEmail,
    twitter: cardTwitter,
    mobile: cardMobile,
    website: cardWebsite,
    facebook: cardFacebook,
    instagram: cardInstagram,
    other : cardOther,
    link: cardLink,
  }

  Card.create(newCard)
    .then(() => {
      res.redirect('/cards');
    })
    .catch(error => console.log(error));

});

router.post('/edit/:cardId', (req, res) => {
  const { cardTitle, cardImage, cardMessage, cardEmail, cardMobile, cardWebsite, cardFacebook, cardInstagram, cardTwitter, cardOther, cardLink } = req.body;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { title: cardTitle, image: cardImage, message: cardMessage, email: cardEmail, mobile: cardMobile, website: cardWebsite, facebook: cardFacebook, instagram: cardInstagram, twitter: cardTwitter, other: cardOther, link: cardLink })
    .then(() => {
      res.redirect(`/cards/${cardId}`);
    })
    .catch(error => console.log(error));

});

module.exports = router;