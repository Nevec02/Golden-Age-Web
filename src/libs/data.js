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
