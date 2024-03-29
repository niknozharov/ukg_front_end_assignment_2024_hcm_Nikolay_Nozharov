# Angular User Management Application

===================================

This is a user management application built with Angular that allows users to register, log in, view registered users, edit user data, and delete users. The application uses JSON Server as a mock backend and Angular Material for UI components.

## Features

1.  HeaderComponent: The header component displays the application logo, user name, and logout button.

2.  LoginPageComponent: Users can log in to the application using their email and password. The login form is implemented using Angular Reactive Forms.

3.  RegistrationPageComponent: New users can register for the application by providing their username, name, email, password, and gender. The registration form includes input fields and radio buttons for gender selection.

4.  HomePageComponent: The home page displays a table of all registered users. Users with an admin role can view and edit extended user data such as company, address, and phone number.

5.  EditUserDialogComponent: Users can edit user data by clicking on a user in the main table. This opens a dialog where users can update the selected user's information.

6.  ConfirmDialogComponent: When an admin attempts to delete another user, a confirmation dialog is displayed to validate if the user wants to proceed with the deletion.

7.  AuthGuard: Protects routes based on user authentication status. Only authenticated users can access certain routes like home.

## Prerequisites

- Node.js and npm installed on your machine

- Angular CLI installed globally (npm install -g @angular/cli)

## Setup

- Clone this repository to your local machine.

- Install dependencies by running npm install.

- Start the JSON Server by running - json server db.json

- Start the Angular application by running - ng serve

## Usage

- Navigate to http://localhost:4200 in your web browser.

- Register a new user or login with one from the db.json file

- Log in using the registered email and password.

- For admin rights use following credentials - email: name1@name.cc, password: abcd1234!Q@W

- Once logged in, you will be redirected to the home page where you can view the list of registered users.

- Click on a user in the table to edit their data (only accessible for users with role ADMIN).

- To delete a user, click on the delete button next to their information and confirm the deletion in the dialog (only accessible for users with role ADMIN).

## Folder Structure

- src/app/components: Contains all Angular components.

- src/app/shared/components: Contains all dialogs for better reusability

- src/app/shared/models: Contains models for better typing

- src/app/shared/services: Contains services for authentication, user management, and API communication.

- src/assets: Contains static assets such as images and CSS files.

## Technologies Used

- Angular

- Angular Material

- JSON Server
