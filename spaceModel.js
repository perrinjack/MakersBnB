const { client } = require("./dbConfig");

const add = function(body, owner) {
  const text = {
    text: 'INSERT INTO spaces (name, description, price,date, owner_id) VALUES($1, $2, $3, $4, $5)',
    values: [body.name, body.description, body.price, body.date, owner],
  }
  client.query(text, (err) => {
    if (err) {
      console.log(err.stack);
    }
  });
};

const book = function(id) {
  const text = {
    text: 'DELETE FROM spaces WHERE id = $1',
    values: [id],
  }
  client.query(text, (err) => {
    if (err) {
      console.log(err.stack);
    }
  });
}

async function getSpaces(id) {
  const spaces =  await client.query('SELECT * FROM spaces WHERE owner_id <> $1', [id])
  return spaces;
}

async function getDates(id) {
  const dates =  await client.query('SELECT * FROM spaces WHERE id = $1', [id])
  return dates.rows[0];
}

exports.add = add;
exports.getSpaces = getSpaces;
exports.getDates = getDates;
exports.book = book;
