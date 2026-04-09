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


export { createUser, authenticateUser, getAllUsersFromDb };