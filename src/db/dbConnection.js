import mysql from 'mysql2/promise';

const dbConnect = async () => {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("Connected to the MySQL database!");
    return pool;
  } catch (err) {
    console.log("Error connecting to MySQL", err);
  }
};

export default dbConnect;