# Interview Scheduler

## Project Description

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted.

## Screenshots

Screen recording of basic functionalities \
\
\
\
![screen-gif](https://github.com/sherimin/scheduler/blob/08392692125d51672acf17e9857f32560c587662/Screen_Recording.gif)

Display error messages \
\
![ScreenShot](https://github.com/sherimin/scheduler/blob/08392692125d51672acf17e9857f32560c587662/Screenshot_ErrorCancel.png)
\
![ScreenShot](https://github.com/sherimin/scheduler/blob/08392692125d51672acf17e9857f32560c587662/Screenshot_ErrorSave.png)

## How to run this project

1. Fork and clone this repository
2. Fork and clone [scheduler-api repository](https://github.com/sherimin/scheduler-api). This repository contains the database for this project.
3. Install all dependencies in both folders (scheduler & scheduler-api) using the `npm install` command.
4. Open two terminals, one for scheduler and one for scheduler-api.
5. Run both servers using `npm start` command.
6. Go to <http://localhost:8000/> in your browser and tinker with the app!

### Testing

1. For individual units of code testing, run the Jest Test Framework using `npm test` in a different terminal.
2. To test React components in isolation from the other parts of the application, run the Storybook Visual Testbed using `npm run storybook` in a different terminal.
3. To test the entire application flow, run the Cypress Test Framework using `npm run cypress`.

## Project Stack

** Front-End: ** React, JavaScript, Axios, JSX, HTML&CSS, SASS
** Back-End: ** PostgreSQL, Node.js, Express
** Testing: ** Storybook, Jest, Testing Library and Cypress, WebpackDev Server
