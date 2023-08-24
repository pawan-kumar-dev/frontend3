# Next Todo App

This repository contains a Todo app built using React, Firebase, and Tailwind CSS. The app provides users with the ability to log in using their Google accounts, and only logged-in users can access and manage their tasks. Users can add, edit, delete, and mark tasks as complete. An additional feature is the ability to download the task list. Below is an overview of the implemented features and potential future enhancements.

## Instructions

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the dependencies using the command: `npm install`
4. Run the development server using the command: `npm run dev`
5. Open your web browser and go to http://localhost:3000 to access the app.

## Deploying to Vercel

To deploy the app to Vercel, follow these steps:

1. Ensure you have the Vercel CLI installed by running: `npm install -g vercel`
2. Run the command: `vercel login` to log in to your Vercel account.
3. Run the command: `vercel` and follow the prompts to deploy your app.
4. Once deployed, Vercel will provide you with a deployment URL that you can use to access the live app.

Note: Firebase requires the domains of authorized websites to be specified in its authentication settings. If you generate a new deployment URL for the app, we'll need to ensure that the updated domain is added to Firebase's authorized domains to prevent any login errors.

## Implemented Features

### Google Login with Firebase

The app offers secure user authentication through Firebase's Google login. Users can log in using their Google accounts, ensuring a seamless and trusted authentication process.

### Task Management

Logged-in users have access to their own task list. They can add new tasks, edit existing tasks, and mark tasks as complete. Tasks can also be deleted when no longer needed.

### Download Task List

Users can download their task list as a CSV file. This feature allows users to have an offline copy of their tasks for reference.

## Potential Improvements

Given more time, there are several exciting features that could further enhance the Todo app

- **Task Analytics and Visualization**: Implement a graphical representation of completed and pending tasks based on dates. Users can gain insights into their productivity over time, helping them to manage their tasks more effectively.

- **Dark Theme Support**: Add a dark theme option to the app to provide users with a personalized experience. Dark themes are not only aesthetically pleasing but also reduce eye strain during nighttime usage.

- **Task Sorting and Filtering**: Enhance task management by adding sorting and filtering options. Users can sort tasks by due date, priority, or other criteria, and they can filter tasks based on their completion status.

