# School Management API

This project implements a **Node.js** application for managing school data. It provides APIs to add new schools to a database and retrieve a sorted list of schools based on proximity to a user-provided location. The system is built using the **Express.js** framework and **MySQL** for database management.

---

## Features

1. **Add New Schools**  
   - Allows users to add school details (name, address, latitude, and longitude) into the system.
   - Validates user input for accuracy and consistency before storing the data.

2. **Retrieve Schools by Proximity**  
   - Fetches a list of all schools from the database.  
   - Sorts the schools based on their geographical distance from the user's specified location.  
   - Returns the sorted list in ascending order of distance.

---

## Project Setup

### 1. **Database Configuration**  
Create a table named `schools` in MySQL with the following structure:

```sql
CREATE TABLE schools (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```
## 2. Environment Configuration

Create a `.env` file in the root directory of your project and configure the MySQL database connection details. An example `.env` file might look like this:

```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
DB_PORT=3306
```
## 3. Install Dependencies
Run the following command to install the necessary dependencies:
```plaintext
npm install
```

## 4. Run the Application
Start the server using the following command:
```plaintext
npm start
```

## API Endpoints

### 1. Add School
- **URL**: `http://localhost:8000/api/v1/schools/`
- **Endpoint**: `/addSchool`
- **Method**: `POST`
- **Payload**:
  ```json
  {
      "name": "Example School",
      "address": "123 Main Street, Example City",
      "latitude": 12.9716,
      "longitude": 77.5946
  }
  ```
#### Functionality:
- Validates the input data.
- Adds the validated data to the schools table in the database.

### 2. List Schools by Proximity

- **Endpoint**: `/listSchools`
- **Method**: `GET`

- **Parameters**:
  - `latitude`: User's current latitude.
  - `longitude`: User's current longitude.

- **Example URL**:
 ```plaintext
 `http://localhost:8000/api/v1/schools/listSchools?latitude=80&longitude=-73.9682846069336`
```

#### Functionality:
  - Fetches all school records from the database.
  - Sorts them by distance from the user's location using the Haversine formula.
  - Returns the sorted list of schools.

## Deliverables:

1. **Source Code Repository**  
   The complete API implementation is available at the following GitHub repository:  
   [School Management API Repository](https://github.com/Sharanumesta/school-management-api-nodejs-mysql)

2. **Live API Endpoints**  
   The live API endpoints are accessible for testing. Please use the provided URLs to test the functionality.

3. **Postman Collection**  
   You can access the API documentation and Postman collection using the following [link](https://alone7-8517.postman.co/workspace/Alone-Workspace~e9c75852-334e-4411-a7fd-4319c6f95992/request/25239808-a9cb411d-c166-419f-b351-ed6a1b28f6ef?action=share&creator=25239808&ctx=documentation&active-environment=25239808-41befb3b-c5be-497e-b613-5a5036789c94)

