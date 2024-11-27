import dbConnect from "../db/dbConnection.js";

const addSchool = async (req, res) => {
  try {
    const pool = await dbConnect();
    
    const { name, address, latitude, longitude } = req.body;
    const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    const [result] = await pool.execute(sql, [name, address, latitude, longitude]);

    res.status(201).json({
      message: "School data has been added successfully",
      data: {
        id: result.insertId,
        name,
        address,
        latitude,
        longitude,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error while adding school data" });
  }
};

const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Latitude and Longitude are required' });
  }

  try {
    const pool = await dbConnect();
    const [results] = await pool.execute('SELECT * FROM schools');

    const schoolsWithDistance = results.map(school => {
      const distance = haversine(parseFloat(latitude), parseFloat(longitude), school.latitude, school.longitude);
      return { ...school, distance };
    });

    // Sort schools by distance (ascending)
    const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    // Send the sorted list of schools
    return res.status(200).json({
      message: 'Schools fetched successfully',
      data: sortedSchools,
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { addSchool, listSchools };