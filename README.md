# 🏨 **Hotel Management System** 🌟

## Overview

The **Hotel Management System** allows **administrators** to manage rooms (CRUD operations) and manage room bookings for customers. The system includes two roles: **Admin** and **Customer**.

- **👩‍💼 Admin**: Can perform CRUD operations on rooms, change room status (e.g., Available, Booked, Maintenance), and view customer bookings.
- **👨‍💻 Customer**: Can view available rooms and make bookings.

The system is developed using **Spring Boot** for the backend (with **Spring Security** and **JWT Authentication**) and **Angular** with **NG-ZORRO** for the frontend.

---

## 🚀 Features

### Backend (Spring Boot)
- **Room Management**: Admin can create, read, update, and delete rooms.
- **Room Status Management**: Admin can change the status of rooms (Available, Booked, Maintenance).
- **JWT Authentication**: Secure authentication using JWT tokens.
- **Spring Security**: Enforces role-based access control (Admin, Customer).
- **RESTful API**: Exposes endpoints for room management and booking functionality.
  
### Frontend (Angular with NG-ZORRO)
- **Admin Dashboard**: Admin can manage rooms, view bookings, and update room statuses.
- **Customer Dashboard**: Customers can view available rooms and make bookings.
- **Role-Based UI**: Displays different menus based on user roles (Admin, Customer).

---

## 🛠️ Tech Stack

### Backend
- **Java 19+** ☕
- **Spring Boot**: For building the backend application.
- **Spring Security**: For securing the application and handling roles.
- **JWT**: For authentication and authorization.
- **MYSQL Database**: In-memory database for development (can be switched to another database for production).

### Frontend
- **Angular**: Frontend framework for building the client-side application.
- **NG-ZORRO**: UI component library based on Ant Design for Angular, providing modern UI elements.
- **TypeScript**: Superset of JavaScript used for the frontend logic.

---

## 📦 Prerequisites

Before running the application, ensure you have the following installed:

- **Java 19** or later.
- **Node.js** and **npm** (for Angular).
- **Maven** (for building the Spring Boot project).
- **Postman** or a similar API testing tool.

---

## ⚙️ Setup Instructions

### Backend Setup (Spring Boot)

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/your-username/hotel-management-system.git
    cd hotel-management-system/backend
    ```

2. **Build the Backend**:
   
   - Open the project in your IDE and build the Spring Boot application.
   - Or, run the following command in the terminal:

     ```bash
     mvn clean install
     mvn spring-boot:run
     ```

3. **Configuration**:
   - The Spring Boot application will run on `http://localhost:8080` by default.
   - JWT authentication keys and other configurations are defined in `application.properties` or `application.yml`.

4. **Backend API Endpoints**:
    - **POST** `/api/auth/login`: Authenticate users and generate a JWT token.
    - **GET** `/api/admin/rooms`: Get a list of all rooms (Admin only).
    - **POST** `/api/admin/rooms`: Add a new room (Admin only).
    - **PUT** `/api/adminrooms/{roomId}`: Update room details (Admin only).
    - **DELETE** `/api/admin/rooms/{roomId}`: Delete a room (Admin only).
    - **POST** `/api/customer/bookings`: Book a room (Customer only).
    - **GET** `/api/customer/bookings`: Get a list of bookings (Admin and Customer).
    - **PUT** `/api/admin/rooms/status/{roomId}`: Update the status of a room (Admin only).

### Frontend Setup (Angular)

1. **Clone the Frontend Repository**:

    ```bash
    git clone https://github.com/meetmoodon/hotel-management-system.git
    cd hotel-management-system/frontend
    ```

2. **Install Dependencies**:

    Make sure you have **Node.js** and **npm** installed, then run the following command:

    ```bash
    npm install
    ```

3. **Run the Angular Application**:

    After installing the dependencies, you can start the Angular development server:

    ```bash
    ng serve
    ```

    The frontend application will be available at `http://localhost:4200`.

4. **Frontend Configuration**:

    - In `src/environments/environment.ts`, set the backend API URL to `http://localhost:8080`.
    - Ensure JWT tokens are handled correctly for authentication in the frontend.

---

## 🔐 Authentication & Authorization

- **Admin Login**:
    - Username: `admin@test.com`
    - Password: `admin`
  
- **Customer Login**:
    - Customer are generate username and password by using signup form
- **JWT Token**:
    - After logging in, you will receive a JWT token which should be stored and sent with each subsequent request in the `Authorization` header.

---

## 📝 Usage

### Admin:
- Log in using the admin credentials.
- Admin can perform CRUD operations on rooms, change room statuses, and view bookings.
  
### Customer:
- Log in using customer credentials.
- Customers can view available rooms and book them.
- Customers can view their own bookings.

---

## 📸 Example API Requests (Postman or API Testing Tool)

### Admin Login (POST)

**Request**:

```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "admin@test.com",
  "password": "admin"
}
