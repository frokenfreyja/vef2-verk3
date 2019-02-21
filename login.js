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

router.get('/', login);

module.exports = router;
