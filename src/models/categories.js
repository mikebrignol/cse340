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

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

const createCategory = async (categoryName) => { 
    const query = `
        INSERT INTO category (category_name)
        VALUES ($1)
        RETURNING category_id;
    `;
    const result = await db.query(query, [categoryName]);
    return result.rows[0].category_id;
};

const updateCategory = async (categoryId, categoryName) => { 
    const query = `
        UPDATE category
        SET category_name = $2
        WHERE category_id = $1;
    `;
    await db.query(query, [categoryId, categoryName]);
};


export {getAllCategories, getCategoriesByProjectId, getCategoryById, getProjectsByCategoryId, updateCategoryAssignments, assignCategoryToProject, createCategory, updateCategory}  