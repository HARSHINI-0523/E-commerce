# E-Commerce Website

## Description

This is a fully functional **E-Commerce Website** built as part of a **Full-Stack Development** course. The website provides a shopping platform with the ability to view products, add them to the cart and remove the products from the cart . It also includes a login and registration system for users to sign up and log in.

## Features

- **Home Page**: Displays the information about the webpage
- **Login & Registration**: Users can sign up, log in.
- **Product Catalog**: A selection of products that can be added to the cart.
- **Shopping Cart**: Users can add, view, and delete products from their shopping cart.
- **About Us**: Information about the project and its creators.

## Technologies Used

- **Frontend**:
  - HTML
  - CSS
  - JavaScript
  - React.js

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (for database)

- **Authentication**:
  - JWT (JSON Web Tokens)

- **Version Control**:
  - Git
  - GitHub

## Setup Instructions

### Prerequisites

1. **Node.js**: Ensure you have **Node.js** installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
2. **MongoDB**: Make sure MongoDB is set up locally or use a cloud database like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Clone the Repository
```bash
git clone https://github.com/HARSHINI-0523/E-commerce.git
cd E-commerce
```

### Install Dependencies
Install the backend dependencies:
```bash
cd backend
npm install
```

Install the frontend dependencies:
```bash
cd frontend
npm install
```

### Environment Variables
Create a .env file in the backend directory with the following variables:
```.env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

### Run the Application
To run the backend server:
```bash
cd backend
npm start
```

To run the frontend application:
```bash
cd frontend
npm start
```

The app will now be running on http://localhost:3000 (frontend) and http://localhost:5000 (backend).

### Usage
1. Sign Up: Register a new account to start shopping.

2. Login: Log into your account to manage your cart and profile.

3. Shop: Browse products, add them to the cart.

4. Cart Management: You can add or remove items from your shopping cart.
