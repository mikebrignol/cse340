import { getAllCategories, getCategoryById, getProjectsByCategoryId, createCategory, updateCategory } from '../models/categories.js';
import { body } from 'express-validator';

const categoryValidation = [
  body('categoryName')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Category name must be between 3 and 100 characters')
];

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

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const showNewCategoryForm = async (req, res) => {
    const title = 'Create New Category';
    res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
  const { categoryName } = req.body;

  // Server-side validation
  if (!categoryName || categoryName.trim().length === 0) {
    req.flash('error', 'Category name is required.');
    return res.redirect('/new-category');
  }

  if (categoryName.length > 100) {
    req.flash('error', 'Category name must be at most 100 characters.');
    return res.redirect('/new-category');
  }

  if (categoryName.length < 3) {
    req.flash('error', 'Category name must be at least 3 characters.');
    return res.redirect('/new-category');
  }

  await createCategory(categoryName.trim());

  req.flash('success', 'Category created successfully.');
  res.redirect('/categories');
};

const showEditCategoryForm = async (req, res) => { 
    const { id } = req.params;
    const category = await getCategoryById(id);
    const title = category ? 'Edit Category' : 'Category Not Found';
    res.render('edit-category', { title, category });
};

const processEditCategoryForm = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;

  // Server-side validation
  if (!categoryName || categoryName.trim().length === 0) {
    req.flash('error', 'Category name is required.');
    return res.redirect(`/edit-category/${id}`);
  }

  if (categoryName.length > 100) {
    req.flash('error', 'Category name must be at most 100 characters.');
    return res.redirect(`/edit-category/${id}`);
  }

  if (categoryName.length < 3) {
    req.flash('error', 'Category name must be at least 3 characters.');
    return res.redirect(`/edit-category/${id}`);
  }

  await updateCategory(id, categoryName.trim());

  req.flash('success', 'Category updated successfully.');
  res.redirect('/categories');
};


export { categoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, categoryValidation };