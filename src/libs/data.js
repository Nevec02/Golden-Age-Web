import { conn } from "./mysql";

//TODO: Add error handling and check wrong data type

// region 1.SERVICES
/**
 * A function that retrieves all services from the database.
 *
 * @return {Array} services data from the database
 */
// region GET ALL
export const getServices = async () => {
  try {
    const sql = "SELECT * FROM service";
    const [services] = await conn.query(sql);
    return services;
  } catch (error) {
    console.log(error, "error getting services");
  }
};

/**
 * Retrieves a service from the database based on the given ID.
 *
 * @param {number} id - The ID of the service to retrieve.
 * @return {object} The retrieved service object.
 */
// region GET ID
export const getService = async (id) => {
  try {
    const sql = "SELECT * FROM service WHERE id = ?";
    const [service] = await conn.query(sql, [id]);
    return service[0];
  } catch (error) {
    console.log(error, "error getting service");
  }
};

/**
 * Inserts a new service into the database with the given name, description, and price.
 *
 * @param {string} name - The name of the service.
 * @param {string} description - The description of the service.
 * @param {number} price - The price of the service.
 * @return {void}
 */

// region POST
export const postService = async (data) => {
  try {
    const sql =
      "INSERT INTO service (name, description, price) VALUES (?, ?, ?)";
    await conn.query(sql, [data.name, data.description, data.price]);
    return true;
  } catch (error) {
    console.log(error, "error posting service");
  }
};

/**
 * Updates a service in the database with the provided data based on the ID.
 *
 * @param {object} data - The data to update the service with.
 * @param {number} id - The ID of the service to update.
 * @return {Promise<void>} A Promise that resolves when the service is deleted.
 */
// region PATCH
export const updateService = async (data, id) => {
  try {
    const sql = "UPDATE service SET ? WHERE id = ?";
    const sql2 = "UPDATE service SET updated_at = NOW() WHERE id = ?";
    await conn.query(sql, [data, id]);
    await conn.query(sql2, [id]);
  } catch (error) {
    console.log(error, "error updating service");
  }
};

/**
 * Deletes a service from the database based on the given ID.
 *
 * @param {number} id - The ID of the service to delete.
 * @return {Promise<void>} A Promise that resolves when the service is deleted.
 */
// region DELETE
export const deleteService = async (id) => {
  try {
    const sql = "DELETE FROM service WHERE id = ?";
    await conn.query(sql, [id]);
  } catch (error) {
    console.log(error, "error deleting service");
  }
};

// region 2.USER

const bcrypt = require('bcrypt');
export const saltAndHashPassword = (password) => {
  const saltRounds = 10;
  var hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
};

export async function getUserFromDb(email, password) {
  const [rows] = await conn.query('SELECT * FROM user WHERE email = ?', [email]);

  if (rows.length > 0) {
    const user = rows[0];
    const isValidPassword = await bcrypt.compare(password, user.pass);

    if (isValidPassword) {
      return { id: user.id, rol: user.rol };
    }
  }

  return null;
}

export async function getUsers() {
  const [rows] = await conn.query('SELECT id, name, email, rol FROM user');
  return rows;
}

export const postUser = async (name, email, password) => {
  try {
    const sql =
      "INSERT INTO user (name, email, pass, rol) VALUES (?, ?, ?, 2)";
    await conn.query(sql, [name, email, saltAndHashPassword(password)]);
    return true;
  } catch (error) {
    console.log(error, "error posting user");
  }
}

// region 3.ORDERS


export const getOrders = async () => {
  try {
    const sql = "SELECT * FROM service_order";
    const [orders] = await conn.query(sql);
    return orders;
  } catch (error) {
    console.log(error, "error getting orders");
  }
};

/**
 * Retrieves all orders for a specific user from the database.
 *
 * @param {number} userId - The ID of the user whose orders are to be retrieved.
 * @return {Array} Orders data from the database.
 */
export const getOrdersByUserId = async (userId) => {
  try {
    const sql = "SELECT * FROM service_order WHERE user_id = ?";
    const [orders] = await conn.query(sql, [userId]);
    return orders;
  } catch (error) {
    console.log(error, "error getting orders");
  }
};

/**
 * Retrieves the details of a specific order from the database.
 *
 * @param {number} orderId - The ID of the order whose details are to be retrieved.
 * @return {Array} Order details data from the database.
 */
export const getOrderDetails = async (orderId) => {
  try {
    const sql = `
      SELECT od.*, s.name AS service_name
      FROM order_detail od
      JOIN service s ON od.service_id = s.id
      WHERE od.order_id = ?
    `;
    const [orderDetails] = await conn.query(sql, [orderId]);
    return orderDetails;
  } catch (error) {
    console.log(error, "error getting order details");
  }
};


