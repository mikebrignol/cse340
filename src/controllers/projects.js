import { getAllprojects, getProjectDetails, getUpcomingProjects } from '../models/projects.js';

const projectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(5);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => { 
    const { id } = req.params;
    const project = await getProjectDetails(id);
    const title = project ? project.title : 'Project Not Found';

    res.render('project', { title, project });
};

export { projectsPage, showProjectDetailsPage };