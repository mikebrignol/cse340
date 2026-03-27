import { getAllprojects, getProjectDetails, getUpcomingProjects } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

const projectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(5);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => { 
    const { id } = req.params;
    const categories = await getCategoriesByProjectId(id);
    const project = await getProjectDetails(id);
    const title = project ? project.title : 'Project Not Found';

    res.render('project', { title, project, categories });
};

export { projectsPage, showProjectDetailsPage };