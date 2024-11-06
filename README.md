# Healthy Living FAQs

### By Sophia Ray

---

## Overview

Healthy Living FAQs is a web application that helps users access frequently asked questions about healthy living. Users can log in to browse various categories and find answers to questions related to health and wellness. Built with React for the front-end and a RESTful API for data handling, this app provides a responsive, user-friendly experience.

---

## Features

- **User Authentication**: Secure login and registration with password protection.
- **Category Browsing**: Users can browse different categories of questions.
- **Dynamic Question and Answer Display**: Displays questions and answers dynamically based on the selected category.
- **Error Handling**: Friendly error messages for incorrect login details, duplicate usernames, and other issues.
- **Session Management**: The app keeps users logged in by storing session information.
- **Responsive Design**: Optimized layout for smooth experience on both desktop and mobile devices.

---

## Technologies

- **Front-End**:
  - React: Component-based user interface development.
  - React Router: Navigation between login, registration, and the main content.
  - CSS (Flexbox & Responsive Design): Custom styling for a clean, modern look.
- **Back-End**:
  - RESTful API: Serves categories, questions, and user data.
  - Node.js and Express (optional if your API is built with Node): Backend JavaScript runtime and server framework.
- **Database**:
  - mySQL: Manages user data, categories, and questions.

---

## Usage

1. **Register** for a new account, or **log in** with an existing account.
2. Browse the available **categories** on the left side.
3. Click a category to view the **questions and answers** related to that topic.
4. Log out when finished.

---

---

## API Endpoints

### Users

- **POST /api/user_info/register**: Register a new user.
- **POST /api/user_info/login**: Authenticate a user and start a session.
- **POST /api/user_info/check_username**: Check if a username already exists.

### Categories

- **GET /api/categories**: Get all categories.

### Questions

- **GET /api/questions/:category_id/questions**: Get questions for a specific category.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


