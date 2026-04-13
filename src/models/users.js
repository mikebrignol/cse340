import db from './db.js'
import bcrypt from 'bcrypt';

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    `;
    const query_params = [name, email, passwordHash, default_role];
    
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
    const query = `
        SELECT user_id, name, email, password_hash, role_name 
        FROM users 
        JOIN roles ON users.role_id = roles.role_id
        WHERE email = $1
    `;
    const query_params = [email];
    
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        return null; // User not found
    }
    
    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => { 
    const user = await findUserByEmail(email);
    if (!user) {
        return null; // User not found
    }

    const isMatch = await verifyPassword(password, user.password_hash);
    if (!isMatch) {
        return null; // Password does not match
    }

    return user; // Authentication successful
};

const getAllUsersFromDb = async() => {
    const query = `SELECT name, email, role_name 
    FROM users
    JOIN roles ON users.role_id = roles.role_id
    `;
    const results = await db.query(query);
    return results.rows;
}

const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO project_volunteers (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        ;`
    
    await db.query(query, [userId, projectId]);
};

const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM project_volunteers
        WHERE user_id = $1 AND project_id = $2
        ;`

    await db.query(query, [userId, projectId]);
};

const getUserVolunteeredProjects = async (userId) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date AS date,
            p.location,
            p.organization_id,
            o.name as org_name
            FROM project_volunteers pv
            JOIN service_project p ON pv.project_id = p.project_id
            JOIN organization o ON p.organization_id = o.organization_id
            WHERE pv.user_id = $1
            ORDER BY p.project_date;
            `;
            const result = await db.query(query, [userId]);
            return result.rows;
};

const checkIfUserIsVolunteer = async (userId, projectId) => {
    const query = `
        SELECT 1
        FROM project_volunteers
        WHERE user_id = $1 AND project_id = $2
        `;

        const result = await db.query(query, [userId, projectId]);

        return result.rows.length > 0;

}

export { createUser, authenticateUser, getAllUsersFromDb, addVolunteer, removeVolunteer, getUserVolunteeredProjects, checkIfUserIsVolunteer };