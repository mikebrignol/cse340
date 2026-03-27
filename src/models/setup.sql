-- creation of table organization
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- inserting sample data 
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

-- creation of table service_project
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    org_id INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    project_date DATE,

    CONSTRAINT fk_organization
        FOREIGN KEY (org_id)
        REFERENCES organization(org_id)
        ON DELETE CASCADE
);

-- Adding data to table
INSERT INTO service_project (org_id, title, description, location, project_date)
VALUES
-- BrightFuture Builders (org_id = 1)
(1, 'Community Housing Build', 'Building affordable homes for low-income families.', 'Port-au-Prince', '2026-04-10'),
(1, 'School Renovation Project', 'Renovating classrooms and facilities in local schools.', 'Carrefour', '2026-05-15'),
(1, 'Clean Water Initiative', 'Installing clean water systems in rural areas.', 'Gonaïves', '2026-06-01'),
(1, 'Bridge Repair Program', 'Repairing damaged community bridges.', 'Cap-Haïtien', '2026-06-20'),
(1, 'Disaster Relief Construction', 'Rebuilding homes after natural disasters.', 'Les Cayes', '2026-07-05'),

-- GreenHarvest Growers (org_id = 2)
(2, 'Urban Garden Setup', 'Creating community gardens in urban neighborhoods.', 'Delmas', '2026-04-12'),
(2, 'Sustainable Farming Workshop', 'Teaching sustainable farming techniques.', 'Pétion-Ville', '2026-05-10'),
(2, 'School Garden Program', 'Introducing gardening programs in schools.', 'Jacmel', '2026-05-25'),
(2, 'Composting Initiative', 'Promoting composting in local communities.', 'Kenscoff', '2026-06-15'),
(2, 'Farmers Market Launch', 'Launching a local organic farmers market.', 'Port-au-Prince', '2026-07-01'),

-- UnityServe Volunteers (org_id = 3)
(3, 'Food Drive अभियान', 'Organizing food distribution for needy families.', 'Port-au-Prince', '2026-04-05'),
(3, 'Clothing Donation Event', 'Collecting and distributing clothes.', 'Carrefour', '2026-05-08'),
(3, 'Community Clean-Up', 'Cleaning public spaces and streets.', 'Delmas', '2026-05-30'),
(3, 'Health Awareness Campaign', 'Raising awareness about basic health practices.', 'Cap-Haïtien', '2026-06-18'),
(3, 'Volunteer Training Program', 'Training new volunteers for service initiatives.', 'Les Cayes', '2026-07-10');

-- Creating table catefory
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL UNIQUE
);

-- Creating junction table
CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

-- Inserting data into category table
INSERT INTO category (category_name)
VALUES
('Construction'),
('Education'),
('Environment'),
('Health'),
('Community Service');


INSERT INTO project_category (project_id, category_id)
VALUES
(1, 1), -- Project 1 → Construction
(1, 5), -- Project 1 → Community Service
(2, 2),
(3, 4),
(4, 1),
(5, 1),
(6, 3),
(7, 2),
(8, 2),
(9, 3),
(10, 3);