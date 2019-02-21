const express = require('express');

const router = express.Router();
/**
 * Route handler fyrir form umsóknar.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @returns {string} Formi fyrir umsókn
 */
function login(req, res) {
  const data = {
    title: 'Innskráning',
    username: '',
    password: '',
    errors: [],
    page: 'login',
  };
  res.render('login', data);
}

router.get('/', login, (req, res) => {
  let message = '';
  console.log('MESSAGE: ', message);
  if (req.session.messages && req.session.messages.length > 0) {
    message = req.session.messages.join(', ');
    req.session.messages = [];
    res.locals.message = message;
  }
});

module.exports = router;
