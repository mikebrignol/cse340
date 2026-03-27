import express from 'express';
import { organizationsPage, showOrganizationDetailsPage } from './organizations.js';
import { categoriesPage, showCategoryDetailsPage } from './categories.js';
import { projectsPage, showProjectDetailsPage } from './projects.js';
import { homePage } from './index.js';
import { testErrorPage } from './errors.js';

const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/organizations/:id', showOrganizationDetailsPage);
router.get('/categories', categoriesPage);
router.get('/categories/:id', showCategoryDetailsPage);
router.get('/projects', projectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/test-error', testErrorPage);

export default router;