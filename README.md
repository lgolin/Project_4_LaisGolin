🚩Step 1: Build the database For this project, we have again developed the data schema for you, but in future projects it will be your responsibility to do so.

You need two tables, a ‘users' table and a ‘schedules' table.

Your 'users' table will have the following fields:

A unique key (ID), A surname, A first name, An email address (will be used to log in), A password (will be used to log in),

Your ’schedules' table will have the following fields:

A unique key (ID), An ID_user (will be a reference to an ID of the users table), the day of the week (1 for Monday, 2 for Tuesday... 7 for Sunday), a start time (TIME type) an end time (TIME type).

Now that your DB is ready, you are going to create a first user via the MySQL console, to be able to set up the connection logic. Don't forget to hash the password.

💡 SQL: Left Join, Foreign Key

grid

🚩Step 2: Create the login page The entry point to your site is your login page.

You are going to create a GET "/login” route, which will display a form with the fields Email address and Password.

This form will be sent by POST on the same route. If the login is successful (i.e. if the email address and hashed password match an existing user in the database), the user will be redirected to the site’s home page.

🚩Step 3: Test your login logic Create the home page that displays all existing schedules.

You can already implement a logout button in the navigation bar. This button will lead to a route that will delete the session data and redirect to the login page.

Make sure that the user session remains active, even if the user closes the browser window, as long as they haven’t clicked on the logout button.

We invite you to follow the article provided in the appendices to help you set up your logic.

🚩Step 4: Develop the home page and the user page You can already create some schedules in the DB via the MySQL console, in order to test their display on the home page.

All existing schedules will be displayed on the home page. The user name associated with the schedule will be a link to a user page that displays the user's information (first name, last name, email address) and their schedules.

💡 Tip : You will not create one route per user, but only one route that will take the user ID as parameter. Look at URL parameters.

🚩Step 5: Develop the schedule management page Now add a schedule management page for the registered user.

This page will contain:

a form to add a new schedule entry, composed of a 'select' field to select the day of the week, a start time field and an end time field (the user_ID of the created schedule will be assigned to the current user) a second section displaying the user's existing schedules.

🚩Step 6: Develop the registration logic An unregistered user will have the possibility to create an account.

You will therefore add a "/signup" page, that will be linked from the login page.

You must implement validations on the data provided via the registration form. All fields have to be properly filled in (no name consisting only of spaces for example), and the user has to confirm their password.

If the email provided already exists in the database, registration must not be possible.

🎖Bonus Steps: To practice more Several bonuses are possible to consolidate our site:

Add more serious validations to the password, to guarantee its robustness (length of the password, inclusion of digits / capitalised letters / special characters, ...)

On the schedule management page, add for each existing schedule a link to delete this schedule. The corresponding route will be requested with the verb DELETE.

Add a validation to the schedule entry creation, to prevent the creation of a schedule that would overlap with an already existing schedule.

Manage the sending of a confirmation email when a new user account is created. An "unconfirmed" user should not be able to log into the site.

Add a "forget password?" link on the login page, to send the user a unique password regeneration link.
