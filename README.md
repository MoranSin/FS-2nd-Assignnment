Express Server for Reports
This Express server is designed to handle CRUD operations for reports via a RESTful API. It utilizes MongoDB for data storage and retrieval. Below is a breakdown of the components and how to use them.

POSTMAN 
https://documenter.getpostman.com/view/31989007/2s9YyzeJpF

Components
server.js
This file initializes the Express server, sets up middleware, defines routes, and starts the server listening on a specified port.

reportRouter.js
The router file defines routes for handling different CRUD operations related to reports. It utilizes the reportsController for handling requests.

reportController.js
The controller file contains functions for handling various HTTP requests related to reports. It interacts with the ReportsRepository for data operations and sends appropriate responses.

reportRepository.js
The repository file encapsulates data access logic. It communicates with the MongoDB database through the MongoStorage class.

mongoStorage.js
This file provides a MongoDB storage implementation for the repository. It handles database connections and CRUD operations using Mongoose.

reportModel.js
Defines the Mongoose schema for the 'reports' collection in the MongoDB database.

Setup and Usage
Installation

bash
Copy code
npm install
Environment Variables

Ensure that you have the necessary environment variables set up for connecting to your MongoDB database. These variables include DB_USER, DB_PASS, and DB_HOST.

Starting the Server

bash
Copy code
node server.js
The server will start running on the specified port (default is 3000).

API Endpoints
GET /api/reports: Get all reports.
GET /api/reports/:id: Get a specific report by ID.
POST /api/reports: Create a new report.
PUT /api/reports/:id: Update an existing report.
DELETE /api/reports/:id: Delete a report by ID.
Error Handling
Errors are handled using a custom error handler middleware (errorHandler). The server responds with appropriate error messages and status codes.

Logging
The server utilizes Morgan for logging HTTP requests. Logs are printed to the console in the development environment.


