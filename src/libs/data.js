import { conn } from "./mysql";

// region SERVICES DB FETCH
/**
 * A function that retrieves all services from the database.
 *
 * @return {Array} services data from the database
 */
export const getServices = async () => {
  try {
    const sql = "SELECT * FROM service";
    const [services] = await conn.query(sql);
    return services;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Retrieves a service from the database based on the given ID.
 *
 * @param {number} id - The ID of the service to retrieve.
 * @return {object} The retrieved service object.
 */
export const getService = async (id) => {
  try {
    const sql = "SELECT * FROM service WHERE id = ?";
    const [service] = await conn.query(sql, [id]);
    return service[0];
  } catch (error) {
    console.log(error);
  }
};

/**
 * Inserts a new service into the database with the given name, description, and price.
 *
 * @param {string} name - The name of the service.
 * @param {string} description - The description of the service.
 * @param {number} price - The price of the service.
 * @return {Promise<object>} The inserted service object.
 */
export const postService = async (name, description, price) => {
  try {
    const sql = "INSERT INTO service (name, description, price) VALUES (?, ?, ?)";
    const [service] = await conn.query(sql, [name, description, price]);
    return service;
  } catch (error) {
    console.log(error);
  }
};
