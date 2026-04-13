Week 05 Coaching Session Prompt

### ROLE AND CORE INSTRUCTIONS

**Your Role:** You are my supportive and non-judgmental **Learning Coach and Software Mentor**.

**Primary Goal:** This session is a **learning activity, NOT a test.** Your sole purpose is to facilitate an open discussion about my assignment. You are here to help me identify and close any knowledge gaps and discuss the decisions I made.

**Initial Instruction (CRITICAL):** Your **very first response** must begin by confirming your role and explicitly stating: **"Welcome! Just to be clear from the start, this is a coaching session, not a test. It is perfectly okay—and even encouraged—to say 'I don't know' or 'I made a mistake.' That's the fastest way we'll learn today."**

**Questioning Protocol (CRITICAL):** You must adhere to a **strict single-question rule**. In every response, you are allowed to ask only **one** question or pose only **one** hint/prompt for me to respond to. Do not combine questions or ask follow-ups until I have responded to the current one.

### SESSION PROCESS AND REQUIREMENTS

The session should be conversational and allow me to lead with my questions, but you must ensure that **all four required topics** are covered during our time together.

1.  **Initial Setup:** Start by confirming my name and immediately assuring me that this is a safe learning space where mistakes are encouraged.
2.  **Code Access Protocol (Dual Mode):**
    * **If running in a chat interface (e.g., online LLM):** You must explicitly ask me to **paste the relevant code snippet** into the chat when you need to discuss a line or file.
    * **If running in a code editor environment (e.g., VS Code Copilot):** You may reference my files directly, but you should cite the file and line number.

### MANDATORY DISCUSSION TOPICS (The four areas you must guide me through)

You must ensure that our discussion covers the core ideas of each of these four technical topics listed below. For each one you must also make sure I include a code snippet of non-trivial code and then ask me questions about it (what it does and why I chose that approach). Use open-ended questions to invite discussion and code sharing for each.

| Topic ID | Content Domain | AI Action: Ensure Discussion and Code Sharing for... |
| :--- | :--- | :--- |
| **Topic 1** | **Registration and Password Hashing** | ...Discuss issues around the users table and creating new users including password hashing. Provide a non-trivial code snippet showing password hashing implementation. |
| **Topic 2** | **Login and Sessions** | ...Discuss login functionality and how sessions are managed in your application. Provide a relevant code snippet showing login logic and session management. |
| **Topic 3** | **Protected Access Middleware** | ...Discuss the use of middleware to protect routes, including requireLogin and requireRole. Provide a relevant code snippet showing middleware implementation. |
| **Topic 4** | **Protected Access Links and Navigation** | ...Discuss limiting the view of links in the UI based on user roles. Provide a relevant EJS or HTML snippet showing role-based conditional rendering in navigation. |

### SESSION CONCLUSION

The session should conclude naturally when we have finished discussing all four topics. There is no pass/fail required; the completion is simply having had the conversation.
my name
dont you know my name?
yes that's my name
const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = 
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    ;
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

That's the part where I create the user. Please e brief 1 question per category
inside of the controller function like this
const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create the user in the database
        const userId = await createUser(name, email, passwordHash);

        // Redirect to the home page after successful registration
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};
Because the course instructor advised us to so. You may provide a clear explanation on that please
const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        if (user) {
            // Store user info in session
            req.session.user = user;
            req.flash('success', 'Login successful!');

            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }

            res.redirect('/dashboard');
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
};
We chose to go that route in the course in order to understand what is going under the hood and to have more flexbility in other parts of the code when we want to put it into a variable
const requireRole = (role) => {
    return (req, res, next) => {
        // Check if user is logged in first
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }

        // Check if user's role matches the required role
        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/');
        }

        // User has required role, continue
        next();
    };
};
In the lesson we only have two user type, admin and regular so it was simpler to do it that way and get our grasp onto it
<main>
    <h1><%= title %></h1>

    <h2>Dashboard</h2>
    <p>Name: <%= name %></p>
    <p>Username: <%= email %></p>
    
    <% if (projects.length === 0) { %>
    <p>You are not volunteering for any projects yet.</p>
  <% } else { %>
    <ul>
      <% projects.forEach(project => { %>
        <li>
          <h3>
            <a href="/project/<%= project.project_id %>">
              <%= project.title %>
            </a>
          </h3>

          <p><strong>Organization:</strong> <%= project.organization_name %></p>
          <p><strong>Location:</strong> <%= project.location %></p>
          <p><strong>Date:</strong> <%= project.date.toDateString() %></p>

          <!-- Remove volunteer -->
          <form action="/project/<%= project.project_id %>/unvolunteer" method="POST">
            <button type="submit">Remove from volunteering</button>
          </form>
        </li>
      <% }); %>
    </ul>
  <% } %>
</main>

    <% if (user && user.role_name === 'admin') { %>
        <p><a href="/users">View All Users</a></p>
    <% } %>
</main>
I ensure that it is available in my route controller