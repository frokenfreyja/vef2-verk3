const express = require('express');

const { selectUsers, makeAdmin } = require('./users');

const router = express.Router();

/**
 * Higher-order fall sem umlykur async middleware með villumeðhöndlun.
 *
 * @param {function} fn Middleware sem grípa á villur fyrir
 * @returns {function} Middleware með villumeðhöndlun
 */
function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/**
 * Ósamstilltur route handler fyrir notendalista.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @returns {string} Lista af notendum
 */
async function admin(req, res) {
  const list = await selectUsers();

  const data = {
    title: 'Notendur',
    list,
  };

  return res.render('admin', data);
}

/**
 * Ósamstilltur route handler sem uppfærir stjórnendur.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @returns Redirect á `/admin`
 */
async function updateAdmin(req, res) {
  const adminId = req.body.admin;

  await makeAdmin(adminId);

  return res.redirect('/admin');
}


router.get('/', admin);

router.post('/updateAdmin', catchErrors(updateAdmin));

module.exports = router;
