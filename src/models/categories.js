import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, category_name
      FROM public.category;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (id) => {
  const query = `
    SELECT category_id, category_name
    FROM public.category
    WHERE category_id = $1;
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT c.category_id, c.category_name
    FROM project_category pc
    JOIN category c
      ON pc.category_id = c.category_id
    WHERE pc.project_id = $1;
  `;

  const result = await db.query(query, [projectId]);
  return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.project_date AS date,
      p.location,
      p.organization_id
    FROM project_category pc
    JOIN service_project p
      ON pc.project_id = p.project_id
    WHERE pc.category_id = $1;
  `;

  const result = await db.query(query, [categoryId]);
  return result.rows;
};

export {getAllCategories, getCategoriesByProjectId, getCategoryById, getProjectsByCategoryId}  