import express from 'express';
import { requireRole } from './users.js';
import { organizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './organizations.js';
import { categoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showEditCategoryForm, showNewCategoryForm, processEditCategoryForm, processNewCategoryForm, categoryValidation } from './categories.js';
import { projectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from './projects.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, getAllUsers } from './users.js';
import { homePage } from './index.js';
import { testErrorPage } from './errors.js';

const router = express.Router();

// router.get('/', homePage);
// router.get('/organizations', organizationsPage);
// router.get('/organizations/:id', showOrganizationDetailsPage);
// router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
// router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
// router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
// router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);
// router.get('/categories', categoriesPage);
// router.get('/categories/:id', showCategoryDetailsPage);
// router.get('/new-category', requireRole('admin'), showNewCategoryForm);
// router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
// router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
// router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);
// router.get('/assign-categories/:projectId', showAssignCategoriesForm);
// router.post('/assign-categories/:projectId', processAssignCategoriesForm);
// router.get('/projects', projectsPage);
// router.get('/project/:id', showProjectDetailsPage);
// router.get('/new-project', requireRole('admin'), showNewProjectForm);
// router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
// router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
// router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);
// router.get('/test-error', testErrorPage);

// // Users, authentication, and other routes
// router.get('/register', showUserRegistrationForm);
// router.post('/register', processUserRegistrationForm);
// router.get('/login', showLoginForm);
// router.post('/login', processLoginForm);
// router.get('/logout', processLogout);
// router.get('/dashboard', requireLogin, showDashboard);

// router.get('/users', requireRole('admin'), getAllUsers);


router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/organizations/:id', showOrganizationDetailsPage);

// Organization routes
router.get('/edit-organization/:id', showEditOrganizationForm);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Category routes
router.get('/categories', categoriesPage);
router.get('/categories/:id', showCategoryDetailsPage);
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

// Assign categories (projects)
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Projects
router.get('/projects', projectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// Error test
router.get('/test-error', testErrorPage);

// Users, authentication, and other routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', showDashboard);

// Users page
router.get('/users', getAllUsers);
export default router;