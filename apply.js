const express = require('express');

const router = express.Router();
/**
 * Route handler fyrir form umsóknar.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @returns {string} Formi fyrir umsókn
 */
function form(req, res) {
  const data = {
    title: 'Atvinnuumsókn',
    name: '',
    email: '',
    phone: '',
    text: '',
    job: '',
    errors: [],
    page: 'apply',
  };
  res.render('form', data);
}

/* todo færa og stilla aðra virkni úr v2 */

router.get('/', form);

module.exports = router;
