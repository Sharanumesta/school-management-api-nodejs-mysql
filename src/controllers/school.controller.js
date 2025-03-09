import dbConnect from "../db/dbConnection.js";

const addSchool = async (req, res) => {
  try {
    const pool = await dbConnect();
    const { id, name, address, latitude, longitude } = req.body;

    // Check for existing school using a unique index on latitude and longitude
    const [result] = await pool.execute(
      `SELECT * FROM schools WHERE name = ?`,
      [id]
    );
    if (result.length > 0) {
      return res.status(409).json({ message: "School data already exists" });
    }

    // Insert the new school
    const [insertResult] = await pool.execute(
      `INSERT INTO schools (id, name, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
      [id, name, address, latitude, longitude]
    );

    res.status(201).json({
      message: "School data has been added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error while adding school data",
        error: error.message,
      });
  }
};

const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ message: "Latitude and Longitude are required" });
  }

  try {
    const pool = await dbConnect();
    const [results] = await pool.execute("SELECT * FROM schools");

    // Calculate the distance for each school from the provided latitude and longitude
    const schoolsWithDistance = results.map((school) => {
      const distance = haversine(
        parseFloat(latitude),
        parseFloat(longitude),
        school.latitude,
        school.longitude
      );
      return { ...school, distance };
    });

    // Sort schools by distance in ascending order
    const sortedSchools = schoolsWithDistance.sort(
      (a, b) => a.distance - b.distance
    );

    // Return the sorted list of schools with distance
    return res.status(200).json(sortedSchools);
  } catch (error) {
    console.log("Server error:", error);
    return res.status(500).json({ message: "Server error", error: error });
  }
};

export { addSchool, listSchools };
