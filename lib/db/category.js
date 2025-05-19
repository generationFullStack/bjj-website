import { pool } from ".";

export async function getCategoryChild(category) {
  try {
    const result = await pool.query(
      `SELECT c1.*
       FROM categories c1
       JOIN categories c2 ON c1.parent_id = c2.id
       WHERE c2.name = '${category}'`
    );
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}
