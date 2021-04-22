const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const { validateSignup } = require('../validation/validations');

const router = express();

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  // console.log(req.body)

  const { userName, userNickname, userEmail, userPassword } = req.body;

  // Verificar se ele enviou as infos necessarias (todas)
  const validationErrors = validateSignup(userName, userNickname, userEmail, userPassword);

  // se houver pelo menos um erro...
  if (Object.keys(validationErrors).length > 0) {
    return res.render('signup', validationErrors); // garantir que nenhum cógigo abaixo seja executado
  }

  try {
    // Verifica se usuario já foi cadastrado anteriormente (email)
    const userFromDb = await User.findOne({ email: userEmail }); // transforma um método assíncrono em síncrono

    if (userFromDb) {
      return res.render('signup', { userEmailErrors: ['Este e-mail já foi cadastrado no nosso sistema. Por favor escolha outro'] });
    }

    // Encriptar a senha que recebemos do usuário
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const encryptedPassword = bcrypt.hashSync(userPassword, salt);

    // Salvar usuário no banco de dado
    await User.create({
      name: userName,
      email: userEmail,
      nickname: userNickname,
      password: encryptedPassword,
    });

    res.redirect('/login');
  } catch (error) {
    console.log('ERRRO NA ROTA /signup -> ', error)
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    const { userEmail, userPassword, userNickname } = req.body;

    // verificação dos campos --- Implementar com base na rota de signup ;-)

    const userFromDb = await User.findOne({ email: userEmail });

    if (!userFromDb) {
      return res.render('login', { userEmailErrors: ['Usuário ou senha incorretos'], userPasswordErrors: ['Usuário ou senha incorretos'] });
    }

    const isPasswordValid = bcrypt.compareSync(userPassword, userFromDb.password); // 123456

    if (!isPasswordValid) {
      return res.render('login', { userEmailErrors: ['Usuário ou senha incorretos'], userPasswordErrors: ['Usuário ou senha incorretos'] });
    }

    // Iniciar uma sessão para este usuário (após o almoço)
    req.session.currentUser = userFromDb; 

    // Encaminha o usuário para a sua área logada
    res.redirect('/cards');

  } catch (error) {
    console.log(error);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();

  res.redirect('/login');
});

module.exports = router;
