import mysql from 'mysql2/promise';

const dbConnect = async () => {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 18911, // Ensure the correct port
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: {
        rejectUnauthorized: true, // Aiven MySQL requires SSL
      },
    });

    console.log("✅ Connected to the MySQL database!");
    return pool;
  } catch (err) {
    console.error("❌ Error connecting to MySQL:", err);
  }
};

export default dbConnect;
