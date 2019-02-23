const bcrypt = require('bcrypt');
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;

async function query(q, values = []) {
  const client = new Client({ connectionString });
  await client.connect();

  let result;

  try {
    result = await client.query(q, values);
  } catch (err) {
    throw err;
  } finally {
    await client.end();
  }

  return result;
}

async function comparePasswords(password, user) {
  const ok = await bcrypt.compare(password, user.password);

  if (ok) {
    return user;
  }

  return false;
}

async function findByUsername(username) {
  const q = 'SELECT * FROM users WHERE username = $1';

  const result = await query(q, [username]);

  if (result.rowCount === 1) {
    return result.rows[0];
  }

  return null;
}

async function findById(id) {
  const q = 'SELECT * FROM users WHERE id = $1';

  const result = await query(q, [id]);

  if (result.rowCount === 1) {
    return result.rows[0];
  }

  return null;
}

async function createUser(username, password, name, email) {
  const hashedPassword = await bcrypt.hash(password, 11);

  const q = `
  INSERT INTO users 
  (username, password, name, email)
  VALUES 
  ($1, $2, $3, $4)
  RETURNING *`;

  const result = await query(q, [username, hashedPassword, name, email]);

  return result.rows[0];
}

async function selectUsers() {
  const result = await query('SELECT * FROM users ORDER BY id');

  return result.rows;
}

async function isAdmin(username) {
  const q = 'SELECT * FROM users WHERE username = $1 AND admin != false';

  const result = await query(q, [username]);

  if (result.rowCount === 1) {
    return result.rows[0];
  }

  return null;
}

async function makeAdmin(id) {
  const q = `
  UPDATE users
  SET admin = true
  WHERE id = $1`;

  if (id) {
    for (let i = 0; i < id.length; i += 1) {
      await query(q, [id[i]]); /* eslint-disable-line */
    }
  }
  return false;
}


module.exports = {
  comparePasswords,
  findByUsername,
  findById,
  createUser,
  selectUsers,
  isAdmin,
  makeAdmin,
};
