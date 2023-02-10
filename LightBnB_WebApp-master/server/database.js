const properties = require('./json/properties.json');
const users = require('./json/users.json');

// console.log('Connected to database!')
// pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response)})
/// Users


/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
// const getUserWithEmail = function(email) {
//   let user;
//   for (const userId in users) {
//     user = users[userId];
//     if (user.email.toLowerCase() === email.toLowerCase()) {
//       break;
//     } else {
//       user = null;
//     }
//   }
//   return Promise.resolve(user);
// }
// exports.getUserWithEmail = getUserWithEmail;

const getUserWithEmail = (email) => {

  return pool
  .query (`SELECT * FROM users WHERE email = $1`, [email])
  .then((result) => {
    console.log(result.rows);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message)
    return null;
  })
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
// const getUserWithId = function(id) {
//   return Promise.resolve(users[id]);
// }
// exports.getUserWithId = getUserWithId;

const getUserWithId = (id) => {
  return pool
  .query(`SELECT * FROM users WHERE id = $1`, [id])
  .then((result) => {
    console.log(result.rows)
    return result.rows[0];
  })
  .catch((err) => {
    return err.message;
  })
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
// const addUser =  function(user) {
//   const userId = Object.keys(users).length + 1;
//   user.id = userId;
//   users[userId] = user;
//   return Promise.resolve(user);
// }
// exports.addUser = addUser;
const addUser = (user) => {
  const {name, email, password} = user;
  return pool
  .query(`
  INSERT INTO users (id, name, email, password) 
  VALUES(DEFAULT, $1, $2, $3) 
  RETURNING *;`, [name, email, password])
  .then((result) => {
    console.log(result.rows)
    return result.rows;
  })
  .catch((err) => {
    return err.message;
  })
}
exports.addUser = addUser;
/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
// const getAllReservations = function(guest_id, limit = 10) {
//   return getAllProperties(null, 2);
// }
// exports.getAllReservations = getAllReservations;
const getAllReservations = (guest_id, limit = 10) => {
  return pool
  .query(`SELECT reservations.*, properties.*, avg(rating) as average_rating
          FROM reservations
          JOIN properties ON reservations.property_id = properties.id
          JOIN property_reviews ON properties.id = property_reviews.property_id
          WHERE reservations.guest_id = $1
          GROUP BY properties.id, reservations.id
          ORDER BY reservations.start_date
          LIMIT = $2`, [guest_id, limit])
  .then((result) => {
    console.log(result.rows);
    return result.rows
  })
  .catch((err) => {
    return err.message
  })          
};
exports.getAllReservations = getAllReservations;



/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const { city, owner_id, minimum_price_per_night, maximum_price_per_night, minimum_rating } = options;
  const values = [];
  // 2 Start the query with all information that comes before the WHERE clause.
  let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating 
    FROM properties
    JOIN property_reviews ON properties.id = property_id
  `;

   // 3 Check if a city, owner_id or price_per_night has been passed in as an option. Add them to the params array and create a WHERE clause
  if (options.city) {
    values.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${values.length} `
  }
  if (options.owner_id) {
    values.push(options.owner_id);
    queryString += `AND owner_id = $${values.length} `
  }
  if (options.minimum_price_per_night) {
    values.push(options.minimum_price_per_night);
    queryString += `AND cost_per_night/100 >= $${values.length} `
  }
  if (options.maximum_price_per_night) {
    values.push(options.maximum_price_per_night);
    queryString += `AND cost_per_night/100 < $${values.length} `
  }
  // 4 Add any query that comes after the WHERE clause.
  queryString += `GROUP BY properties.id `;
  if (options.minimum_rating) {
    values.push(options.minimum_rating);
    queryString += `HAVING AVG(property_reviews.rating) >= $${values.length} `
  }
  queryString += `ORDER BY cost_per_night `
  values.push(limit);
  queryString += `LIMIT $${values.length};`;

  // 5 Console log everything just to make sure we've done it right.
  console.log(queryString, queryParams);

  // 6 Run the query.
  return db.query(queryString, queryParams)
  .then(res => res.rows);
};
exports.getAllProperties = getAllProperties;




// const getAllProperties = (options, limit = 10) => {

//   return pool
//     .query(
//     `SELECT * 
//     FROM properties
//     LIMIT $1`    
//     ,[limit])
//   .then((result) => {
//     console.log(result.rows);
//     return result.rows;
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// };
// exports.getAllProperties = getAllProperties;


// const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// }








/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
