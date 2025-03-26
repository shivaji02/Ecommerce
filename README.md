
   This project implements a Node.js server with routing for handling
   various entities such as users, products, carts, and orders. Each entity
   has its own controller and service layer to manage the business logic
   and data operations. The server routes incoming requests to the appropriate
   controllers based on the defined endpoints.
  
   Features:
   - User management: Handles user-related operations such as registration, login, and profile management.
   - Product management: Manages product-related operations including listing, adding, updating, and deleting products.
   - Cart management: Provides functionality for managing user carts, including adding/removing items and viewing cart details.
   - Order management: Handles order-related operations such as placing orders, viewing order history, and updating order status.
  
   Technologies:
   - Node.js: Backend runtime environment.
   - Express.js: Web framework for routing and middleware.
   - MongoDB: NoSQL database for storing application data.
   - Mongoose: ODM (Object Data Modeling) library for MongoDB to manage schema and data operations.
  
   Structure:
   - Models:Defines entities involved in each services.
   - Controllers: Define the request handling logic for each entity.
   - Services: Contain the business logic and interact with the data layer.
   - Routes: Map HTTP endpoints to the corresponding controller methods.
  