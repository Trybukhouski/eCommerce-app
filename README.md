# eCommerce Application 🛍️🌐

## Welcome to Our eCommerce Platform
This platform replicates real-world shopping experiences within a digital environment. It's a comprehensive online shopping portal that provides an interactive and seamless experience to users. From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence.

## Purpose
The purpose of this application is to offer a robust digital solution for online shopping, making it as intuitive and enjoyable as visiting a physical store. It aims to provide users with a vast range of products, detailed descriptions, and a streamlined process from adding items to their basket to completing their purchase. This platform is designed to cater to both casual shoppers and dedicated buyers, ensuring that everyone's shopping experience is accommodated.

## Technology Stack
- **Front-end Technologies:** HTML5, CSS3, SCSS for styling, and TypeScript for scalable, robust JavaScript code.
- **Linting and Formatting:** ESLint and Prettier ensure code consistency and style, while Husky manages pre-commit hooks to maintain code quality.
- **Development Environment:** We employ modern development tools like Webpack for bundling our assets and managing different build environments efficiently.
- **Testing Framework:** Jest is used to perform comprehensive testing to ensure code functionality and quality.

## Key Features
- User registration and login system.
- Product search, categorisation, and sorting.
- Responsive design compatible with various devices, ensuring an optimal shopping experience across all platforms.
- Integration with CommerceTools for a backend commerce solution, providing a powerful suite of tools for managing products, customers, and other commerce-related data.

## Key Pages
- **Login and Registration Pages:** Secure user access points.
- **Main Page:** The hub of product discovery.
- **Catalog Product Page:** Browse and filter products.
- **Detailed Product Page:** View detailed information about each product.
- **User Profile Page:** Manage user information and view purchase history.
- **Basket Page:** Review items before purchase.
- **About Us Page:** Learn more about the goals and vision of our platform.

## Available Scripts and Usage

1. **start**:
   - **Usage**: This script is used to start the development server.
   - **Command**:
     ```bash
     npm start
     ```
   - **Description**: It sets the environment variable `NODE_ENV` to `development` and then runs webpack to serve the application. The `--open` flag automatically opens the default browser to the served application.

2. **dev**:
   - **Usage**: This script is used to build the application in development mode.
   - **Command**:
     ```bash
     npm run dev
     ```
   - **Description**: Similar to the `start` script, it sets the `NODE_ENV` variable to `development` and runs webpack to build the application. However, it does not start a development server.

3. **build**:
   - **Usage**: This script is used to build the application for production.
   - **Command**:
     ```bash
     npm run build
     ```
   - **Description**: Sets the `NODE_ENV` variable to `production` and runs webpack to build the application optimized for production deployment.

4. **lint**:
   - **Usage**: This script is used to run linting on the source code files.
   - **Command**:
     ```bash
     npm run lint
     ```
   - **Description**: It uses ESLint to perform linting on JavaScript (`*.js`), JSX (`*.jsx`), TypeScript (`*.ts`), and TypeScript JSX (`*.tsx`) files within the `src` directory. The `--quiet` flag suppresses output of ESLint warnings.

5. **lint:fix**:
   - **Usage**: This script is used to automatically fix linting issues in the source code files.
   - **Command**:
       - To automatically fix linting issues, use:
    ```bash
    npm run lint:fix
    ```
   - **Description**: Similar to the `lint` script, it runs ESLint on the source code files but with the `--fix` flag, which automatically fixes fixable issues.

6. **format:check**:
   - **Usage**: This script is used to check if the code formatting meets the defined rules.
   - **Command**:
     ```bash
     npm run format:check
     ```
   - **Description**: It uses Prettier to check if the formatting of JavaScript (`*.js`), JSX (`*.jsx`), TypeScript (`*.ts`), and TypeScript JSX (`*.tsx`) files within the `src` directory complies with the defined rules.

7. **prepare**:
   - **Usage**: This script is used to set up Husky, a Git hook manager.
   - **Command**:
     ```bash
     npm run prepare
     ```
   - **Description**: Husky is a tool used to manage Git hooks. This script is likely used to configure Husky for use within the project.

8. **test**:
   - **Usage**: This script is used to run tests.
   - **Command**:
     ```bash
     npm test
     ```
   - **Description**: It runs Jest to execute tests within the project.
  
9. **Environment Variables**:
  - The scripts use the `NODE_ENV` environment variable to distinguish between development and production environments. You can adjust other environment variables as needed for your specific setup.


## Running the Project 🚀

1. **Development Mode**:
   - To start the development server and run the application in development mode, use the following command:
     ```bash
     npm start
     ```
   This command sets the environment variable `NODE_ENV` to `development` and starts the webpack development server. The application will automatically open in your default web browser.

2. **Building for Development**:
   - If you want to build the application for development without starting the development server, you can run:
     ```bash
     npm run dev
     ```
   This command sets the `NODE_ENV` variable to `development` and builds the application using webpack.

3. **Building for Production**:
   - To build the application for production, use the following command:
     ```bash
     npm run build
     ```
   This command sets the `NODE_ENV` variable to `production` and builds the application optimized for production deployment.

## Project Team 🎉

- Pavel Korshunau
  - Project Mentor

- Ruslan Trybukhouski
  - Team Lead / Project Developer

- Arina Talanova
  - Project Developer

- Dmitry Nikolayev
  - Project Developer
