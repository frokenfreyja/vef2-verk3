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
  let message = '';

  // Athugum hvort einhver skilaboð séu til í session, ef svo er birtum þau
  // og hreinsum skilaboð
  if (req.session.messages && req.session.messages.length > 0) {
    message = req.session.messages.join(', ');
    req.session.messages = [];
  }
  const data = {
    title: 'Innskráning',
    username: '',
    password: '',
    err: message,
    errors: [],
    page: 'login',
  };
  res.render('login', data);
}

router.get('/', login);

module.exports = router;
