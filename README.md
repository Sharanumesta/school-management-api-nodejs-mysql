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
