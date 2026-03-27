import { getAllCategories, getCategoryById, getProjectsByCategoryId } from '../models/categories.js';

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';

    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const { id } = req.params;
    const category = await getCategoryById(id);
    const title = category ? category.category_name : 'Category Not Found';
    const projects = await getProjectsByCategoryId(id);

    res.render('category', { title, category, projects });
};

export { categoriesPage, showCategoryDetailsPage };