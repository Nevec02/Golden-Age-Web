import { conn } from "./mysql";

//TODO: Add error handling and check wrong data type

// region SERVICES DB
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
    console.log(error, "error getting services");
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
export const deleteService = async (id) => {
  try {
    const sql = "DELETE FROM service WHERE id = ?";
    await conn.query(sql, [id]);
  } catch (error) {
    console.log(error, "error deleting service");
  }
};
