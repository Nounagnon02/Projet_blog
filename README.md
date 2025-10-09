# Blog Hub

Blog Hub is a full-stack web application designed for content management. It features a robust backend built with Laravel, providing a comprehensive API, and a dynamic frontend developed with React, offering a seamless user experience for both content creators and administrators.

## Project Structure

The project is organized into two main directories:

- **`bh_backend/`**: This directory contains the Laravel backend. It handles the business logic, data storage, and provides a RESTful API for the frontend. For more details, refer to the `bh_backend/README.md` file.

- **`bh_frontend/`**: This directory houses the React frontend. It consumes the API provided by the backend to display content and manage administrative tasks. For more details, refer to the `bh_frontend/README.md` file.

## Features

- **Article Management**: Create, read, update, and delete articles.
- **Category Management**: Organize articles into categories.
- **Email Management**: Handle and store emails from users.
- **Static Page Management**: Edit content for "About," "Contact," and "Privacy" pages.
- **Announcements**: Create and manage site-wide announcements.
- **Admin Dashboard**: A central place for administrators to manage all content.

## Installation and Setup

### Backend (Laravel)

1.  Navigate to the `bh_backend` directory:
    ```bash
    cd bh_backend
    ```
2.  Install Composer dependencies:
    ```bash
    composer install
    ```
3.  Create a copy of the `.env.example` file and name it `.env`:
    ```bash
    cp .env.example .env
    ```
4.  Generate a new application key:
    ```bash
    php artisan key:generate
    ```
5.  Configure your database settings in the `.env` file.
6.  Run the database migrations:
    ```bash
    php artisan migrate
    ```

### Frontend (React)

1.  Navigate to the `bh_frontend` directory:
    ```bash
    cd bh_frontend
    ```
2.  Install npm dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `bh_frontend` directory and add the following line, replacing `http://localhost:8000` with your backend's URL:
    ```
    REACT_APP_API_URL=http://localhost:8000
    ```

## Available Commands

### Backend (Laravel)

-   **Start the development server**:
    ```bash
    php artisan serve
    ```
    The backend will be available at `http://localhost:8000`.

### Frontend (React)

-   **Start the development server**:
    ```bash
    npm start
    ```
    The frontend will be available at `http://localhost:3000`.